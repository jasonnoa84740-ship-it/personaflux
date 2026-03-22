type BuildScenePromptParams = {
  characterSummary: string;
  canonicalVisualPrompt: string;
  negativePrompt?: string | null;
  actionPrompt: string;
  environmentPrompt?: string | null;
  cameraPrompt?: string | null;
  wardrobeOverride?: string | null;
};

export function buildScenePrompt(params: BuildScenePromptParams) {
  const prompt = [
    params.characterSummary,
    params.canonicalVisualPrompt,
    params.wardrobeOverride ? `wardrobe: ${params.wardrobeOverride}` : undefined,
    `action: ${params.actionPrompt}`,
    params.environmentPrompt ? `environment: ${params.environmentPrompt}` : undefined,
    params.cameraPrompt ? `camera: ${params.cameraPrompt}` : undefined,
    "preserve the same face identity, same age, same visual consistency",
  ]
    .filter(Boolean)
    .join(". ");

  return {
    prompt,
    negativePrompt: params.negativePrompt ?? undefined,
  };
}