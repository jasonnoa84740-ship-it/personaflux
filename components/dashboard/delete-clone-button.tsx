"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  cloneId: string;
};

export default function DeleteCloneButton({ cloneId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Supprimer ce clone ? Cette action est irréversible."
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      const res = await fetch(`/api/clones/${cloneId}`, {
        method: "DELETE",
        cache: "no-store",
      });

      const raw = await res.text();
      let data: any = {};

      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        data = { message: raw };
      }

      if (!res.ok) {
        throw new Error(data?.error || "Impossible de supprimer le clone.");
      }

      router.refresh();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Erreur pendant la suppression."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-full border border-red-500/25 bg-red-500/10 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/15 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Trash2 className="h-4 w-4" />
      {loading ? "Suppression..." : "Supprimer"}
    </button>
  );
}