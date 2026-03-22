type CloneLike = {
  name: string;
  personalityText?: string | null;
  voiceStyle?: string | null;
  appearance?: {
    energy?: string | null;
    approxAgeRange?: string | null;
    genderPresentation?: string | null;
    hairColor?: string | null;
    eyeColor?: string | null;
    skinTone?: string | null;
    fashionStyle?: string | null;
  } | null;
};

export function buildCharacterBible(clone: CloneLike) {
  const appearance = clone.appearance ?? {};

  const summaryParts = [
    clone.name,
    appearance.genderPresentation,
    appearance.approxAgeRange,
    appearance.skinTone,
    appearance.hairColor ? `${appearance.hairColor} hair` : undefined,
    appearance.eyeColor ? `${appearance.eyeColor} eyes` : undefined,
    appearance.fashionStyle ? `${appearance.fashionStyle} style` : undefined,
    appearance.energy ? `${appearance.energy} energy` : undefined,
  ].filter(Boolean);

  const promptParts = [
    "photorealistic realistic human character",
    appearance.genderPresentation,
    appearance.approxAgeRange,
    appearance.skinTone ? `${appearance.skinTone} skin tone` : undefined,
    appearance.hairColor ? `${appearance.hairColor} hair` : undefined,
    appearance.eyeColor ? `${appearance.eyeColor} eyes` : undefined,
    appearance.fashionStyle ? `fashion style: ${appearance.fashionStyle}` : undefined,
    appearance.energy ? `vibe: ${appearance.energy}` : undefined,
    clone.personalityText ? `personality: ${clone.personalityText}` : undefined,
    "same face identity, same proportions, realistic skin, natural lighting, commercial lifestyle photography",
  ].filter(Boolean);

  return {
    characterSummary: summaryParts.join(", "),
    canonicalVisualPrompt: promptParts.join(", "),
    negativePrompt:
      "cartoon, anime, illustration, 3d render, bad anatomy, extra fingers, distorted face, different person, blurry face, uncanny skin",
  };
}