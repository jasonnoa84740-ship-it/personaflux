export type SceneTemplate = {
  key: string;
  label: string;
  description: string;
  actionPrompt: string;
  defaultEnvironmentPrompt: string;
  defaultCameraPrompt: string;
};

export const sceneTemplates: SceneTemplate[] = [
  {
    key: "talking_head",
    label: "Parler face caméra",
    description: "Plan de présentation naturel",
    actionPrompt: "the character speaking directly to camera",
    defaultEnvironmentPrompt: "clean indoor lifestyle setting",
    defaultCameraPrompt: "medium close-up, eye-level framing, natural soft lighting",
  },
  {
    key: "grocery_store",
    label: "Faire les courses",
    description: "Scène lifestyle dans un supermarché",
    actionPrompt: "the character shopping for groceries naturally",
    defaultEnvironmentPrompt: "modern grocery store aisle",
    defaultCameraPrompt: "realistic lifestyle shot, slight motion feel, natural framing",
  },
  {
    key: "walking_city",
    label: "Marcher en ville",
    description: "Scène urbaine lifestyle",
    actionPrompt: "the character walking in the city with confidence",
    defaultEnvironmentPrompt: "modern urban street, daytime",
    defaultCameraPrompt: "cinematic full-body shot, candid lifestyle framing",
  },
  {
    key: "product_presentation",
    label: "Présenter un produit",
    description: "UGC / créateur qui montre un produit",
    actionPrompt: "the character presenting a product naturally to camera",
    defaultEnvironmentPrompt: "clean creator studio or home setup",
    defaultCameraPrompt: "medium shot, product visible, commercial framing",
  },
];

export function getSceneTemplate(templateKey: string) {
  return sceneTemplates.find((template) => template.key === templateKey) ?? null;
}