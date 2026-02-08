"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  getUserConversations,
  getConversationMessages,
  sendMessage,
  markMessagesAsRead,
  subscribeToMessages,
  type ConversationWithDetails,
  type MessageWithSender,
} from "@/lib/messages";

export default function MensagensPage() {
  const { user, profile } = useAuth();
  const [conversations, setConversations] = useState<ConversationWithDetails[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ConversationWithDetails | null>(null);
  const [messages, setMessages] = useState<MessageWithSender[]>([]);
  const [messageText, setMessageText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Carregar conversas
  useEffect(() => {
    async function loadConversations() {
      if (!user) return;

      setIsLoading(true);
      const data = await getUserConversations(user.id);
      setConversations(data);
      setIsLoading(false);

      // Selecionar primeira conversa automaticamente se houver
      if (data.length > 0 && !selectedConversation) {
        setSelectedConversation(data[0]);
      }
    }

    loadConversations();
  }, [user]);

  // Carregar mensagens quando selecionar conversa
  useEffect(() => {
    async function loadMessages() {
      if (!selectedConversation || !user) return;

      const data = await getConversationMessages(selectedConversation.id);
      setMessages(data);

      // Marcar como lidas
      await markMessagesAsRead(selectedConversation.id, user.id);

      // Atualizar contagem de não lidas na lista
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === selectedConversation.id
            ? { ...conv, unread_count: 0 }
            : conv
        )
      );
    }

    loadMessages();
  }, [selectedConversation, user]);

  // Subscribe para novas mensagens em tempo real
  useEffect(() => {
    if (!selectedConversation) return;

    const unsubscribe = subscribeToMessages(selectedConversation.id, (newMessage) => {
      setMessages((prev) => {
        // Evitar duplicatas (mensagem já adicionada via optimistic update)
        if (prev.some((m) => m.id === newMessage.id)) {
          return prev;
        }
        return [...prev, newMessage as MessageWithSender];
      });
    });

    return unsubscribe;
  }, [selectedConversation]);

  // Scroll automático para última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Enviar mensagem
  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!messageText.trim() || !selectedConversation || !user || isSending) return;

    setIsSending(true);
    const content = messageText.trim();
    setMessageText("");

    const message = await sendMessage(selectedConversation.id, user.id, content);

    if (message) {
      // Adicionar mensagem localmente (optimistic update)
      setMessages((prev) => {
        if (prev.some((m) => m.id === message.id)) return prev;
        return [...prev, { ...message, sender: profile } as MessageWithSender];
      });

      // Atualizar última mensagem na lista de conversas
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === selectedConversation.id
            ? { ...conv, last_message: message }
            : conv
        )
      );
    } else {
      // Se falhou, restaurar o texto
      setMessageText(content);
    }

    setIsSending(false);
  }

  function formatMessageTime(timestamp: string) {
    try {
      return formatDistanceToNow(new Date(timestamp), {
        addSuffix: false,
        locale: ptBR,
      });
    } catch {
      return "";
    }
  }

  if (!user) {
    return (
      <main className="max-w-[1200px] mx-auto px-4 lg:px-0 py-6">
        <div className="text-center py-20">
          <p className="text-gray-500">
            Você precisa estar logado para ver suas mensagens.
          </p>
          <Link
            href="/entrar"
            className="mt-4 inline-block px-6 py-2 bg-primary text-black font-bold rounded-lg hover:brightness-105"
          >
            Fazer Login
          </Link>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="max-w-[1200px] mx-auto px-4 lg:px-0 py-6">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </main>
    );
  }

  const otherUser = selectedConversation
    ? selectedConversation.buyer_id === user.id
      ? selectedConversation.seller
      : selectedConversation.buyer
    : null;

  return (
    <main className="flex-1 max-w-[1280px] mx-auto w-full px-4 lg:px-10 py-6 overflow-hidden">
      <div className="flex h-[calc(100vh-180px)] bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Sidebar com lista de conversas */}
        <aside className="w-full md:w-[350px] lg:w-[400px] border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-lg font-bold mb-4">Mensagens</h1>
            <div className="flex flex-col gap-2">
              <label className="flex flex-col h-10 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-lg bg-gray-100 h-full">
                  <div className="text-gray-500 flex items-center justify-center pl-4">
                    <span className="material-symbols-outlined !text-[20px]">search</span>
                  </div>
                  <input
                    className="form-input flex w-full border-none bg-transparent focus:ring-0 text-sm placeholder:text-gray-500 pl-2"
                    placeholder="Pesquisar em conversas"
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <p>Nenhuma conversa ainda</p>
              </div>
            ) : (
              conversations.map((conv) => {
                const other = conv.buyer_id === user.id ? conv.seller : conv.buyer;
                const product = conv.product;
                const isSelected = selectedConversation?.id === conv.id;
                const hasUnread = (conv.unread_count || 0) > 0;

                return (
                  <button
                    key={conv.id}
                    type="button"
                    onClick={() => setSelectedConversation(conv)}
                    className={`w-full flex items-center gap-4 px-4 min-h-[80px] py-3 cursor-pointer transition-colors border-b border-gray-100 ${
                      isSelected
                        ? "bg-gray-100 border-l-4 border-l-primary"
                        : "hover:bg-gray-50 border-l-4 border-l-transparent"
                    }`}
                  >
                    <div className="relative shrink-0">
                      {product?.images && product.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.title || "Produto"}
                          className="w-14 h-14 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-lg bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">?</span>
                        </div>
                      )}
                      <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                          {other?.username?.charAt(0).toUpperCase() || "U"}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center flex-1 min-w-0 text-left">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <p className="text-sm font-bold truncate">
                          {other?.username || "Usuário"}
                        </p>
                        {conv.last_message && (
                          <p className="text-[11px] text-gray-500 shrink-0 ml-2">
                            {formatMessageTime(conv.last_message.created_at)}
                          </p>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <p className={`text-xs line-clamp-1 ${hasUnread ? "font-semibold" : "text-gray-500"}`}>
                          {conv.last_message?.content || "Sem mensagens ainda"}
                        </p>
                        {hasUnread && (
                          <div className="w-2 h-2 rounded-full bg-primary shrink-0 ml-2"></div>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5 truncate">
                        {product?.title || "Produto"}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </aside>

        {/* Área de chat */}
        <section className="flex-1 flex flex-col bg-white relative">
          {selectedConversation ? (
            <>
              {/* Header */}
              <header className="sticky top-0 z-10 bg-white border-b border-gray-200 p-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  {selectedConversation.product?.images?.[0] && (
                    <img
                      src={selectedConversation.product.images[0]}
                      alt={selectedConversation.product.title || "Produto"}
                      className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                    />
                  )}
                  <div className="flex flex-col">
                    <h3 className="text-sm font-bold leading-tight">
                      {selectedConversation.product?.title || "Produto"}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-bold text-primary">
                        R$ {selectedConversation.product?.price?.toFixed(2)}
                      </span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      <span className="text-[11px] font-semibold">
                        {otherUser?.username || "Usuário"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/produto?id=${selectedConversation.product_id}`}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold hover:bg-gray-100 transition-colors"
                  >
                    Ver Item
                  </Link>
                </div>
              </header>

              {/* Mensagens */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col">
                {messages.map((msg) => {
                  const isMine = msg.sender_id === user.id;
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-3 max-w-[80%] ${
                        isMine ? "self-end flex-row-reverse" : ""
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold shrink-0 mt-1">
                        {isMine
                          ? profile?.username?.charAt(0).toUpperCase() || "U"
                          : otherUser?.username?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div className={`flex flex-col ${isMine ? "items-end" : ""}`}>
                        <p className={`text-[10px] text-gray-500 mb-1 ${isMine ? "mr-1" : "ml-1"} font-bold`}>
                          {isMine ? "Você" : otherUser?.username || "Usuário"}
                        </p>
                        <div
                          className={`p-3 rounded-xl ${
                            isMine
                              ? "bg-primary/20 rounded-tr-none border border-primary/20"
                              : "bg-gray-100 rounded-tl-none"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{msg.content}</p>
                        </div>
                        <p className={`text-[10px] text-gray-500 mt-1 ${isMine ? "mr-1" : "ml-1"}`}>
                          {formatMessageTime(msg.created_at)}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input de mensagem */}
              <footer className="p-4 bg-white border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <textarea
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage(e);
                        }
                      }}
                      className="w-full bg-gray-100 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-primary/50 resize-none max-h-32 placeholder:text-gray-500"
                      placeholder="Escreva uma mensagem..."
                      rows={1}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!messageText.trim() || isSending}
                    className="bg-primary text-black w-10 h-10 flex items-center justify-center rounded-xl shadow-md shadow-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="material-symbols-outlined !text-[20px] font-bold">
                      send
                    </span>
                  </button>
                </form>
              </footer>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <p>Selecione uma conversa para começar</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
