"use client";

import { useMemo, useRef, useState } from "react";

const STEP_LABELS = ["Fotos", "Detalhes", "Atributos", "Preço"];

const SAMPLE_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDAGzrzAUAgiA8r9yl37RbPBqUpxinJT6xLz81Gg1HtsKtZTFU-OX92kRIbEbejQbJU-gDJVvA8axSld9EiU9JFc73MkEcRYT1TOU1vXshCkPhQLYT_PqlX5w-EB3KG4-xy_dARMzMb7qO9BiCq-5dPxBHllpsffqzI_l-R6Blod0BVTTGEWxoaGj9lt_-jQMM76GfcvrKOpokeG-pgXThrKKgDNNi-qnbo_uckIpA7Lotu58TQM0Uc3K7WKuTLVxQ03J-sCRheocY",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCM9E_QYKRzOPLdSdxBHsrFWapsLKCgNGwL7QLRomvdrTZpQis2sjg--VCLKr4qIOzZ63VHH08UUzAYPIbJ2tFS2o5uh03hNL1ic3ajnJ6OdERaylZ-NswTVWdu8gy-g2iIeHugVXfHSzhpD6b4nAYJgOMSNHdUSzIRtj9S_qJ7_GlmUa934nkyw2kD3IBk2xPk2wcYB8YmgQcmxXj0NqQnPNSrWlbjuQUeYe_nHaaIWMVpQ_UQ3hUbKmX_jkvXkzpz3TLu3bxxuRA",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBEtrZZmGrdWU_ItY1zgOZfP-FxLwEWRsKuR1IMA9H-jvgaDpocdzn9ptT1RrKxW7WYtpnj7RVmaLfV9y8L2A9WiwcSr_dhffWiLpzokaNO1acACzc6IQfsGDYb6ttl434KFCawOqs66omPd40S75JvoSRme1QA3lcu3l8i-0IJp5ZVKIV3WXRo9EJvQ9fsuTL83DiUhN95ujmpLBalsHWdmKDlVWNR-RoDwEN-ZozgcGrXDAix4t16_q76lnvhMagMYZeUeDjkEXc",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCL2qi5nypxUIvIjXeJqUZBZCXsSgm-tw0xTD_zKIxZLKACEmjDjAn-ttOpoVOuq4VIpUZ1U68mdC5AR9CP7YAdjnh7-WJ1Kx1qZwUkrJLdqaWrIAXB5cXjlckR-H_9t-QCr08c3lrpO0uCKMviSCvp9k8uPEoC3pt24z3Y9rFdh2qzfCJaRmcQ55TcQbA4rtXH4IgFp0QF5MrBYX9mNgGD9xuFPsV9nao6phgOdTLKoq_zK4a7SzvYZzkQ9V6Yy5lrmVnr1ZDxD48",
];

export function CreateListingWizard() {
  const [step, setStep] = useState(0);
  const [images, setImages] = useState(
    SAMPLE_IMAGES.map((url) => ({ id: url, url })),
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("mulher");
  const [size, setSize] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const progress = useMemo(() => ((step + 1) / STEP_LABELS.length) * 100, [step]);

  const canProceed = useMemo(() => {
    if (step === 0) {
      return images.length > 0;
    }
    if (step === 1) {
      return title.trim().length > 2 && description.trim().length > 10;
    }
    if (step === 2) {
      return category && size && brand && condition;
    }
    if (step === 3) {
      return price.trim().length > 0;
    }
    return true;
  }, [step, images.length, title, description, category, size, brand, condition, price]);

  const handleFiles = (files: FileList | null) => {
    if (!files) {
      return;
    }
    const next = Array.from(files)
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, Math.max(0, 20 - images.length))
      .map((file) => ({ id: `${file.name}-${file.size}-${file.lastModified}`, url: URL.createObjectURL(file) }));
    if (next.length > 0) {
      setImages((prev) => [...prev, ...next]);
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <main className="max-w-[960px] mx-auto px-4 py-10">
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Vender um item</h1>
          <span className="text-sm font-medium text-[#61896f]">Etapa {step + 1} de 4</span>
        </div>
        <div className="flex gap-2 h-2 rounded-full bg-[#dbe6df] overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-3 text-xs font-semibold text-[#61896f] uppercase tracking-wider">
          {STEP_LABELS.map((label, index) => (
            <span key={label} className={index === step ? "text-primary" : undefined}>
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden">
        <div className="p-8">
          {step === 0 && (
            <>
              <div className="flex flex-col gap-2 mb-6">
                <h2 className="text-xl font-bold">Adicione até 20 fotos</h2>
                <p className="text-[#61896f] text-sm">
                  Fotos nítidas e claras ajudam os compradores a encontrar seu item.
                  A primeira foto será a capa.
                </p>
              </div>
              <div
                className="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-[#dbe6df] px-6 py-16 bg-background-light hover:border-primary transition-colors cursor-pointer group"
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  handleFiles(event.dataTransfer.files);
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-4xl">cloud_upload</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <p className="text-lg font-bold">Arraste e solte suas fotos aqui</p>
                  <p className="text-sm text-[#61896f]">Suporta JPG, PNG até 10MB cada</p>
                </div>
                <button
                  className="flex items-center justify-center h-11 px-8 bg-primary text-[#102216] text-sm font-bold rounded-lg hover:brightness-105 transition-all"
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Selecionar do dispositivo
                </button>
                <input
                  ref={fileInputRef}
                  className="hidden"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(event) => handleFiles(event.target.files)}
                />
              </div>
              <div className="mt-8">
                <h3 className="text-sm font-bold text-[#61896f] uppercase tracking-wider mb-4">
                  Fotos enviadas ({images.length})
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                  {images.map((image, index) => (
                    <div
                      key={image.id}
                      className="relative aspect-square rounded-lg bg-center bg-cover group border-2 border-transparent hover:border-primary transition-colors"
                      style={{ backgroundImage: `url("${image.url}")` }}
                    >
                      {index === 0 ? (
                        <div className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-[#102216] text-[10px] font-bold rounded uppercase">
                          Capa
                        </div>
                      ) : null}
                      <button
                        className="absolute top-2 right-2 size-7 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        type="button"
                        onClick={(event) => {
                          event.preventDefault();
                          removeImage(image.id);
                        }}
                      >
                        <span className="material-symbols-outlined text-sm text-red-500">delete</span>
                      </button>
                    </div>
                  ))}
                  {images.length < 20 ? (
                    <button
                      className="aspect-square rounded-lg border-2 border-dashed border-[#dbe6df] flex items-center justify-center text-[#61896f] hover:border-primary hover:text-primary transition-all"
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  ) : null}
                </div>
              </div>
            </>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-2">Detalhes do item</h2>
                <p className="text-sm text-[#61896f]">
                  Conte a história do item e destaque o que torna ele único.
                </p>
              </div>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Título do anúncio</span>
                <input
                  className="h-12 rounded-lg border border-[#dbe6df] px-4 text-sm"
                  placeholder="Ex: Jaqueta jeans vintage 90s"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Descrição</span>
                <textarea
                  className="min-h-[140px] rounded-lg border border-[#dbe6df] px-4 py-3 text-sm"
                  placeholder="Descreva estado, medidas, detalhes e motivos da venda."
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </label>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-2">Atributos</h2>
                <p className="text-sm text-[#61896f]">Defina a categoria e características principais.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold">Categoria</span>
                  <select
                    className="h-12 rounded-lg border border-[#dbe6df] px-4 text-sm"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                  >
                    <option value="mulher">Mulher</option>
                    <option value="homem">Homem</option>
                    <option value="criancas">Crianças</option>
                    <option value="casa">Casa</option>
                  </select>
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold">Tamanho</span>
                  <input
                    className="h-12 rounded-lg border border-[#dbe6df] px-4 text-sm"
                    placeholder="Ex: M, 42, Único"
                    value={size}
                    onChange={(event) => setSize(event.target.value)}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold">Marca</span>
                  <input
                    className="h-12 rounded-lg border border-[#dbe6df] px-4 text-sm"
                    placeholder="Ex: Zara, Nike"
                    value={brand}
                    onChange={(event) => setBrand(event.target.value)}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold">Condição</span>
                  <select
                    className="h-12 rounded-lg border border-[#dbe6df] px-4 text-sm"
                    value={condition}
                    onChange={(event) => setCondition(event.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="novo">Novo com etiqueta</option>
                    <option value="muito-bom">Muito bom</option>
                    <option value="bom">Bom</option>
                    <option value="satisfatorio">Satisfatório</option>
                  </select>
                </label>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-2">Preço e publicação</h2>
                <p className="text-sm text-[#61896f]">Defina o valor final do seu anúncio.</p>
              </div>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Preço</span>
                <input
                  className="h-12 rounded-lg border border-[#dbe6df] px-4 text-sm"
                  placeholder="Ex: 45,00"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                />
              </label>
              {submitted ? (
                <div className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-[#102216]">
                  Anúncio salvo! Você pode editar ou publicar novamente.
                </div>
              ) : null}
            </div>
          )}
        </div>
        <div className="px-8 py-5 bg-[#f9fafb] border-t border-[#e5e7eb] flex items-center justify-between">
          <button
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-[#61896f] hover:text-[#111813] transition-colors"
            type="button"
            onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Voltar
          </button>
          {step < 3 ? (
            <button
              className="flex items-center gap-2 px-8 py-2.5 bg-primary text-[#102216] text-sm font-bold rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
              onClick={() => setStep((prev) => Math.min(prev + 1, 3))}
              disabled={!canProceed}
            >
              Próxima etapa
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          ) : (
            <button
              className="flex items-center gap-2 px-8 py-2.5 bg-primary text-[#102216] text-sm font-bold rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
              onClick={() => setSubmitted(true)}
              disabled={!canProceed}
            >
              Publicar anúncio
              <span className="material-symbols-outlined text-lg">campaign</span>
            </button>
          )}
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6 opacity-60 grayscale pointer-events-none">
        <div className="bg-white p-6 rounded-xl border border-[#e5e7eb] ">
          <div className="size-10 rounded-lg bg-[#f0f4f2] flex items-center justify-center mb-4">
            <span className="material-symbols-outlined">description</span>
          </div>
          <h4 className="font-bold mb-2 text-sm uppercase tracking-wide">Título e descrição</h4>
          <div className="h-2 w-full bg-[#f0f4f2] rounded mb-2"></div>
          <div className="h-2 w-2/3 bg-[#f0f4f2] rounded"></div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-[#e5e7eb] ">
          <div className="size-10 rounded-lg bg-[#f0f4f2] flex items-center justify-center mb-4">
            <span className="material-symbols-outlined">list</span>
          </div>
          <h4 className="font-bold mb-2 text-sm uppercase tracking-wide">Categoria e tamanho</h4>
          <div className="flex gap-2">
            <div className="h-6 w-12 bg-[#f0f4f2] rounded-full"></div>
            <div className="h-6 w-12 bg-[#f0f4f2] rounded-full"></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-[#e5e7eb] ">
          <div className="size-10 rounded-lg bg-[#f0f4f2] flex items-center justify-center mb-4">
            <span className="material-symbols-outlined">label</span>
          </div>
          <h4 className="font-bold mb-2 text-sm uppercase tracking-wide">Marca e condição</h4>
          <div className="h-4 w-3/4 bg-[#f0f4f2] rounded"></div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-[#e5e7eb] ">
          <div className="size-10 rounded-lg bg-[#f0f4f2] flex items-center justify-center mb-4">
            <span className="material-symbols-outlined">payments</span>
          </div>
          <h4 className="font-bold mb-2 text-sm uppercase tracking-wide">Preço e publicar anúncio</h4>
          <div className="h-8 w-1/2 bg-[#f0f4f2] rounded mb-2"></div>
        </div>
      </div>

      <div className="fixed bottom-8 right-8 max-w-xs">
        <div className="bg-primary text-[#102216] p-4 rounded-xl shadow-xl flex gap-4 items-start">
          <span className="material-symbols-outlined mt-0.5">lightbulb</span>
          <div>
            <p className="font-bold text-sm">Dica Pro</p>
            <p className="text-xs leading-relaxed opacity-90">
              Anunciar mais de 5 itens esta semana aumenta sua visibilidade em 40%!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
