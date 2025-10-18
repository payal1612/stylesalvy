import { 
  type User, 
  type InsertUser,
  type Analysis,
  type InsertAnalysis,
  type MakeupRecommendation,
  type InsertMakeupRecommendation,
  type OutfitRecommendation,
  type InsertOutfitRecommendation,
  type UserProfile
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createAnalysis(analysis: InsertAnalysis): Promise<Analysis>;
  getAnalysis(id: string): Promise<Analysis | undefined>;
  getAllAnalyses(): Promise<Analysis[]>;
  
  createMakeupRecommendations(recommendations: InsertMakeupRecommendation[]): Promise<MakeupRecommendation[]>;
  getMakeupRecommendationsByAnalysisId(analysisId: string): Promise<MakeupRecommendation[]>;
  
  createOutfitRecommendations(recommendations: InsertOutfitRecommendation[]): Promise<OutfitRecommendation[]>;
  getOutfitRecommendationsByAnalysisId(analysisId: string): Promise<OutfitRecommendation[]>;
  
  getUserProfile(): Promise<UserProfile>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private analyses: Map<string, Analysis>;
  private makeupRecommendations: Map<string, MakeupRecommendation>;
  private outfitRecommendations: Map<string, OutfitRecommendation>;

  constructor() {
    this.users = new Map();
    this.analyses = new Map();
    this.makeupRecommendations = new Map();
    this.outfitRecommendations = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createAnalysis(insertAnalysis: InsertAnalysis): Promise<Analysis> {
    const id = randomUUID();
    const analysis: Analysis = {
      ...insertAnalysis,
      id,
      timestamp: new Date(),
    };
    this.analyses.set(id, analysis);
    return analysis;
  }

  async getAnalysis(id: string): Promise<Analysis | undefined> {
    return this.analyses.get(id);
  }

  async getAllAnalyses(): Promise<Analysis[]> {
    return Array.from(this.analyses.values()).sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );
  }

  async createMakeupRecommendations(
    insertRecommendations: InsertMakeupRecommendation[]
  ): Promise<MakeupRecommendation[]> {
    const recommendations: MakeupRecommendation[] = insertRecommendations.map((rec) => ({
      ...rec,
      id: randomUUID(),
    }));
    
    recommendations.forEach((rec) => {
      this.makeupRecommendations.set(rec.id, rec);
    });

    return recommendations;
  }

  async getMakeupRecommendationsByAnalysisId(analysisId: string): Promise<MakeupRecommendation[]> {
    return Array.from(this.makeupRecommendations.values()).filter(
      (rec) => rec.analysisId === analysisId
    );
  }

  async createOutfitRecommendations(
    insertRecommendations: InsertOutfitRecommendation[]
  ): Promise<OutfitRecommendation[]> {
    const recommendations: OutfitRecommendation[] = insertRecommendations.map((rec) => ({
      ...rec,
      id: randomUUID(),
    }));
    
    recommendations.forEach((rec) => {
      this.outfitRecommendations.set(rec.id, rec);
    });

    return recommendations;
  }

  async getOutfitRecommendationsByAnalysisId(analysisId: string): Promise<OutfitRecommendation[]> {
    return Array.from(this.outfitRecommendations.values()).filter(
      (rec) => rec.analysisId === analysisId
    );
  }

  async getUserProfile(): Promise<UserProfile> {
    const analyses = await this.getAllAnalyses();
    const savedPalettes = analyses.slice(0, 3).map((a) => a.colorPalette);
    
    return {
      analyses,
      savedPalettes,
    };
  }
}

export const storage = new MemStorage();
