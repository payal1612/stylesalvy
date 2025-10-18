import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Analysis result schema
export interface Analysis {
  id: string;
  imageData?: string;
  skinTone: 'light' | 'medium' | 'tan' | 'deep';
  undertone: 'cool' | 'warm' | 'neutral';
  faceShape: 'oval' | 'round' | 'square' | 'heart' | 'long' | 'diamond';
  hairColor: string;
  eyeColor: string;
  confidence: number;
  colorPalette: string[];
  timestamp: Date;
}

export const insertAnalysisSchema = z.object({
  imageData: z.string().optional(),
  skinTone: z.enum(['light', 'medium', 'tan', 'deep']),
  undertone: z.enum(['cool', 'warm', 'neutral']),
  faceShape: z.enum(['oval', 'round', 'square', 'heart', 'long', 'diamond']),
  hairColor: z.string(),
  eyeColor: z.string(),
  confidence: z.number().min(0).max(1),
  colorPalette: z.array(z.string()),
});

export type InsertAnalysis = z.infer<typeof insertAnalysisSchema>;

// Makeup recommendation schema
export interface MakeupRecommendation {
  id: string;
  analysisId: string;
  category: 'foundation' | 'lipstick' | 'blush' | 'eyeshadow';
  shades: MakeupShade[];
}

export interface MakeupShade {
  name: string;
  hex: string;
  brand?: string;
  finish?: string;
}

export const insertMakeupRecommendationSchema = z.object({
  analysisId: z.string(),
  category: z.enum(['foundation', 'lipstick', 'blush', 'eyeshadow']),
  shades: z.array(z.object({
    name: z.string(),
    hex: z.string(),
    brand: z.string().optional(),
    finish: z.string().optional(),
  })),
});

export type InsertMakeupRecommendation = z.infer<typeof insertMakeupRecommendationSchema>;

// Outfit recommendation schema
export interface OutfitRecommendation {
  id: string;
  analysisId: string;
  occasion: 'casual' | 'party' | 'formal' | 'interview' | 'wedding';
  colors: string[];
  styles: string[];
  description: string;
}

export const insertOutfitRecommendationSchema = z.object({
  analysisId: z.string(),
  occasion: z.enum(['casual', 'party', 'formal', 'interview', 'wedding']),
  colors: z.array(z.string()),
  styles: z.array(z.string()),
  description: z.string(),
});

export type InsertOutfitRecommendation = z.infer<typeof insertOutfitRecommendationSchema>;

// Chat message schema
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const insertChatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;

// User profile with history
export interface UserProfile {
  analyses: Analysis[];
  savedPalettes: string[][];
}
