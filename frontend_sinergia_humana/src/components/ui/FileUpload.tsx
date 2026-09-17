import { useCallback, useRef, useState } from "react";
import { FileText, UploadCloud, X, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  accept?: string;
  maxSizeMb?: number;
  file: File | null;
  onFileSelected: (file: File | null) => void;
  error?: string;
}

export function FileUpload({
  accept = "application/pdf",
  maxSizeMb = 5,
  file,
  onFileSelected,
  error,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateAndSet = useCallback(
    (candidate: File | undefined | null) => {
      if (!candidate) return;
      if (candidate.type !== "application/pdf") {
        setLocalError("Solo se admiten archivos en formato PDF.");
        return;
      }
      if (candidate.size > maxSizeMb * 1024 * 1024) {
        setLocalError(`El archivo supera el tamaño máximo permitido (${maxSizeMb} MB).`);
        return;
      }
      setLocalError(null);
      onFileSelected(candidate);
    },
    [maxSizeMb, onFileSelected]
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    validateAndSet(e.dataTransfer.files?.[0]);
  };

  const displayError = error ?? localError ?? undefined;

  if (file) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-emerald-400/25 bg-emerald-500/[0.06] px-4 py-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 ring-1 ring-emerald-400/20">
          <FileText className="h-5 w-5 text-emerald-300" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-slate-100">{file.name}</p>
          <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(0)} KB · PDF</p>
        </div>
        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
        <button
          type="button"
          onClick={() => onFileSelected(null)}
          className="shrink-0 rounded-lg p-1.5 text-slate-500 hover:bg-white/10 hover:text-slate-200"
          aria-label="Eliminar archivo"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Arrastra tu CV aquí o selecciona un archivo"
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors",
          isDragging
            ? "border-accent-400/60 bg-accent-500/[0.06]"
            : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]"
        )}
      >
        <div className="rounded-full bg-accent-500/10 p-3 ring-1 ring-accent-400/20">
          <UploadCloud className="h-6 w-6 text-accent-300" />
        </div>
        <p className="text-sm font-medium text-slate-200">Arrastra tu CV aquí</p>
        <p className="text-xs text-slate-500">o haz clic para seleccionar un archivo</p>
        <p className="mt-1 text-[11px] text-slate-600">Solo PDF · máx. {maxSizeMb} MB</p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => validateAndSet(e.target.files?.[0])}
        />
      </div>
      {displayError && <p className="mt-1.5 text-xs text-rose-400">{displayError}</p>}
    </div>
  );
}
