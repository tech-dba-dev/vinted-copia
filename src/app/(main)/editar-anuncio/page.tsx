"use client";

import { Suspense } from "react";
import { EditListingWizard } from "@/components/EditListingWizard";

export default function EditarAnuncioPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      }
    >
      <EditListingWizard />
    </Suspense>
  );
}
