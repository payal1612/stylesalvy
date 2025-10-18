import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAnalysisSchema, insertChatMessageSchema } from "@shared/schema";
import { analyzeImageForStyling, generateStyleAdvice } from "./gemini";
import { generateMakeupRecommendations, generateOutfitRecommendations, getColorPalette } from "./analysis";

export async function registerRoutes(app: Express): Promise<Server> {
  // Analyze uploaded image
  app.post("/api/analyze", async (req, res) => {
    try {
      const { imageData } = req.body;

      if (!imageData) {
        return res.status(400).json({ error: "Image data is required" });
      }

      // Use Gemini to analyze the image
      const aiAnalysis = await analyzeImageForStyling(imageData);

      // Get color palette based on undertone
      const colorPalette = getColorPalette(aiAnalysis.undertone);

      // Create analysis record
      const analysisData = {
        imageData,
        skinTone: aiAnalysis.skinTone,
        undertone: aiAnalysis.undertone,
        faceShape: aiAnalysis.faceShape,
        hairColor: aiAnalysis.hairColor,
        eyeColor: aiAnalysis.eyeColor,
        confidence: aiAnalysis.confidence,
        colorPalette,
      };

      const validatedData = insertAnalysisSchema.parse(analysisData);
      const analysis = await storage.createAnalysis(validatedData);

      // Generate makeup recommendations
      const makeupRecs = generateMakeupRecommendations(analysis);
      await storage.createMakeupRecommendations(
        makeupRecs.map((rec) => ({
          analysisId: analysis.id,
          category: rec.category,
          shades: rec.shades,
        }))
      );

      // Generate outfit recommendations
      const outfitRecs = generateOutfitRecommendations(analysis);
      await storage.createOutfitRecommendations(
        outfitRecs.map((rec) => ({
          analysisId: analysis.id,
          occasion: rec.occasion,
          colors: rec.colors,
          styles: rec.styles,
          description: rec.description,
        }))
      );

      res.json(analysis);
    } catch (error) {
      console.error("Analysis error:", error);
      res.status(500).json({ error: "Failed to analyze image" });
    }
  });

  // Get analysis by ID
  app.get("/api/analysis/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const analysis = await storage.getAnalysis(id);

      if (!analysis) {
        return res.status(404).json({ error: "Analysis not found" });
      }

      res.json(analysis);
    } catch (error) {
      console.error("Get analysis error:", error);
      res.status(500).json({ error: "Failed to get analysis" });
    }
  });

  // Get makeup recommendations for an analysis
  app.get("/api/makeup/:analysisId", async (req, res) => {
    try {
      const { analysisId } = req.params;
      const recommendations = await storage.getMakeupRecommendationsByAnalysisId(analysisId);

      res.json(recommendations);
    } catch (error) {
      console.error("Get makeup recommendations error:", error);
      res.status(500).json({ error: "Failed to get makeup recommendations" });
    }
  });

  // Get outfit recommendations for an analysis
  app.get("/api/outfits/:analysisId", async (req, res) => {
    try {
      const { analysisId } = req.params;
      const recommendations = await storage.getOutfitRecommendationsByAnalysisId(analysisId);

      res.json(recommendations);
    } catch (error) {
      console.error("Get outfit recommendations error:", error);
      res.status(500).json({ error: "Failed to get outfit recommendations" });
    }
  });

  // Chat with AI stylist
  app.post("/api/chat", async (req, res) => {
    try {
      const { content } = req.body;

      if (!content) {
        return res.status(400).json({ error: "Message content is required" });
      }

      // Get the latest analysis for context (if available)
      const analyses = await storage.getAllAnalyses();
      const latestAnalysis = analyses[0];

      const context = latestAnalysis
        ? {
            skinTone: latestAnalysis.skinTone,
            undertone: latestAnalysis.undertone,
            faceShape: latestAnalysis.faceShape,
          }
        : undefined;

      // Generate AI response using Gemini
      const aiResponse = await generateStyleAdvice(content, context);

      const chatMessage = {
        id: Date.now().toString(),
        role: "assistant" as const,
        content: aiResponse,
        timestamp: new Date(),
      };

      res.json(chatMessage);
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: "Failed to generate response" });
    }
  });

  // Get user profile with analysis history
  app.get("/api/profile", async (req, res) => {
    try {
      const profile = await storage.getUserProfile();
      res.json(profile);
    } catch (error) {
      console.error("Get profile error:", error);
      res.status(500).json({ error: "Failed to get profile" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
