import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function PdfViewerClient({ url }: { url: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const [numPages, setNumPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setWidth(Math.min(el.clientWidth, 1000));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const pageWidth = width ? width * 0.8 : undefined;

  return (
    <div ref={wrapRef} className="mx-auto max-w-[1000px] flex flex-col items-center">
      <Document
        file={url}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        onLoadError={(e) => setError(e.message)}
        loading={
          <div className="py-20 font-mono text-sm text-neutral-600">Loading PDF…</div>
        }
        error={
          <div className="py-20 font-mono text-sm text-red-600">
            Failed to load PDF{error ? `: ${error}` : ""}
          </div>
        }
        className="flex flex-col items-center gap-4 w-full"
      >
        {Array.from({ length: numPages }, (_, i) => (
          <Page
            key={i}
            pageNumber={i + 1}
            width={pageWidth}
            renderAnnotationLayer
            renderTextLayer
            customTextRenderer={undefined}
            className="shadow-md bg-white"
          />
        ))}
      </Document>
    </div>
  );
}
