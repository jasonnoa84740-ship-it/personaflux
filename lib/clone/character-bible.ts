type VisualAppearanceInput = {
  energy?: string | null;
  approxAgeRange?: string | null;
  genderPresentation?: string | null;
  hairColor?: string | null;
  eyeColor?: string | null;
  skinTone?: string | null;
  fashionStyle?: string | null;
  referenceImageUrl?: string | null;
};

type CloneLike = {
  name: string;
  description?: string | null;
  tone?: string | null;
  appearance?: VisualAppearanceInput | null;
};

export function buildCharacterBible(params: CloneLike) {
  const appearance = params.appearance ?? {};

  const summaryParts = [
    params.name,
    appearance.genderPresentation,
    appearance.approxAgeRange,
    appearance.skinTone,
    appearance.hairColor ? `${appearance.hairColor} hair` : undefined,
    appearance.eyeColor ? `${appearance.eyeColor} eyes` : undefined,
    appearance.fashionStyle ? `${appearance.fashionStyle} style` : undefined,
    appearance.energy ? `${appearance.energy} energy` : undefined,
  ].filter(Boolean);

  const promptParts = [
    "photorealistic adult human character",
    appearance.genderPresentation,
    appearance.approxAgeRange,
    appearance.skinTone ? `${appearance.skinTone} skin tone` : undefined,
    appearance.hairColor ? `${appearance.hairColor} hair` : undefined,
    appearance.eyeColor ? `${appearance.eyeColor} eyes` : undefined,
    appearance.fashionStyle
      ? `fashion style: ${appearance.fashionStyle}`
      : undefined,
    appearance.energy ? `energy: ${appearance.energy}` : undefined,
    params.tone ? `tone: ${params.tone}` : undefined,
    params.description ? `personality: ${params.description}` : undefined,
    appearance.referenceImageUrl
      ? "use the reference image to preserve identity consistency"
      : undefined,
    "same face identity, realistic skin texture, natural lighting, commercial lifestyle photography, coherent visual identity across scenes",
  ].filter(Boolean);

  return {
    characterSummary: summaryParts.join(", "),
    canonicalVisualPrompt: promptParts.join(", "),
    negativePrompt:
      "cartoon, anime, illustration, stylized, low quality, blurry face, distorted face, bad anatomy, extra fingers, inconsistent identity, different hair color",
  };
}