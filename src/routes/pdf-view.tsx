import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { lazy, Suspense, useEffect, useState } from "react";

const PdfViewerClient = lazy(() => import("@/components/PdfViewerClient"));

const searchSchema = z.object({
  url: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/pdf-view")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({ meta: [{ title: "PDF Viewer" }] }),
  component: PdfViewPage,
});

function PdfViewPage() {
  const { url } = Route.useSearch();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!url) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center font-mono text-sm text-neutral-600">
        Missing <code>?url=</code> query param.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100 py-6 px-3 sm:px-6">
      {mounted ? (
        <Suspense
          fallback={
            <div className="py-20 text-center font-mono text-sm text-neutral-600">
              Loading PDF…
            </div>
          }
        >
          <PdfViewerClient url={url} />
        </Suspense>
      ) : (
        <div className="py-20 text-center font-mono text-sm text-neutral-600">
          Loading PDF…
        </div>
      )}
    </div>
  );
}

export function openPdfInNewTab(url: string) {
  window.open(`/pdf-view?url=${encodeURIComponent(url)}`, "_blank", "noopener,noreferrer");
}
