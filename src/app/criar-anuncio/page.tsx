import { CreateListingWizard } from "@/components/CreateListingWizard";

export const metadata = {
  title: "Criar Anúncio Passo a Passo - Marketplace",
  description: "Passo a passo para criar um novo anúncio com fotos e descrição.",
  alternates: {
    canonical: "/criar-anuncio",
  },
  openGraph: {
    title: "Criar Anúncio Passo a Passo - Marketplace",
    description: "Passo a passo para criar um novo anúncio com fotos e descrição.",
    url: "/criar-anuncio",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Criar Anúncio Passo a Passo - Marketplace",
    description: "Passo a passo para criar um novo anúncio com fotos e descrição.",
  },
};

export default function Page() {
  return (
    <>
      <CreateListingWizard />
    </>
  );
}
