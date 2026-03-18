"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewClonePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tone, setTone] = useState("friendly");
  const [imageUrl, setImageUrl] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams({
      name,
      description,
      tone,
      imageUrl,
    });

    router.push(`/clone/test?${params.toString()}`);
  }

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-3 text-center text-5xl font-bold">
          Create your visual clone
        </h1>

        <p className="mb-10 text-center text-gray-400">
          Ajoute une image, un nom, une personnalité. On transforme ça en clone visuel.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8"
        >
          <div>
            <label className="mb-2 block text-sm text-gray-300">Nom du clone</label>
            <input
              className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none"
              placeholder="Jason"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Description / personnalité
            </label>
            <textarea
              className="min-h-32 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none"
              placeholder="Ambitieux, direct, créatif, aime les projets stylés..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">Style</label>
            <select
              className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option value="friendly">Friendly</option>
              <option value="direct">Direct</option>
              <option value="charismatic">Charismatic</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Image URL
            </label>
            <input
              className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none"
              placeholder="https://..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <p className="mt-2 text-sm text-gray-500">
              Mets une image en ligne pour l’instant. Plus tard on fera le vrai upload.
            </p>
          </div>

          <button className="w-full rounded-2xl bg-white px-6 py-4 font-semibold text-black transition hover:opacity-90">
            Create visual clone
          </button>
        </form>
      </div>
    </main>
  );
}