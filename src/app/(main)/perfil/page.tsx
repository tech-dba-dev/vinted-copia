import { ProfilePage } from "@/components/ProfilePage";

export const metadata = {
  title: "Meu Perfil | EcoMarket",
  description: "Gerencie seu perfil, veja seus itens publicados e estatísticas.",
  alternates: {
    canonical: "/perfil",
  },
  openGraph: {
    title: "Meu Perfil | EcoMarket",
    description: "Gerencie seu perfil, veja seus itens publicados e estatísticas.",
    url: "/perfil",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Meu Perfil | EcoMarket",
    description: "Gerencie seu perfil, veja seus itens publicados e estatísticas.",
  },
};

export default function Page() {
  return <ProfilePage />;
}
