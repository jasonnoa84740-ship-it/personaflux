import { z } from "zod";

export const cloneAppearanceSchema = z.object({
  energy: z.string().optional(),
  approxAgeRange: z.string().optional(),
  genderPresentation: z.string().optional(),
  hairColor: z.string().optional(),
  eyeColor: z.string().optional(),
  skinTone: z.string().optional(),
  fashionStyle: z.string().optional(),
});

export const createCloneSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  personalityText: z.string().optional(),
  voiceStyle: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal("")),
  appearance: cloneAppearanceSchema.optional(),
});

export type CreateCloneInput = z.infer<typeof createCloneSchema>;
export type CloneAppearanceInput = z.infer<typeof cloneAppearanceSchema>;