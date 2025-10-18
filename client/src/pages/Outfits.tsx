import { useState } from "react";
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Shirt, Sparkles } from "lucide-react";
import type { Analysis, OutfitRecommendation } from "@shared/schema";

const occasions = ['casual', 'party', 'formal', 'interview', 'wedding'] as const;

export default function Outfits() {
  const [, params] = useRoute("/outfits/:id");
  const analysisId = params?.id;
  const [selectedOccasion, setSelectedOccasion] = useState<typeof occasions[number] | 'all'>('all');

  const { data: analysis, isLoading: analysisLoading } = useQuery<Analysis>({
    queryKey: ["/api/analysis", analysisId],
    enabled: !!analysisId,
  });

  const { data: recommendations, isLoading: recommendationsLoading } = useQuery<OutfitRecommendation[]>({
    queryKey: ["/api/outfits", analysisId],
    enabled: !!analysisId,
  });

  const isLoading = analysisLoading || recommendationsLoading;

  const filteredRecommendations = recommendations?.filter(
    (rec) => selectedOccasion === 'all' || rec.occasion === selectedOccasion
  );

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-12 w-96 mb-8" />
          <div className="space-y-8">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
          </div>
        </div>
      </div>
    );
  }

  if (!analysis || !recommendations) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4" data-testid="text-not-found">Analysis not found</h2>
          <Link href="/upload">
            <Button data-testid="button-start-new-analysis">Start New Analysis</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href={`/results/${analysisId}`}>
            <Button variant="ghost" className="mb-4" data-testid="button-back-to-results">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Results
            </Button>
          </Link>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="font-display text-4xl font-bold mb-2" data-testid="heading-outfit-recommendations">Outfit Recommendations</h1>
              <p className="text-lg text-muted-foreground" data-testid="text-undertone-description">
                Perfect color combinations for your {analysis.undertone} undertone
              </p>
            </div>
          </div>
        </div>

        {/* Occasion Filter */}
        <div className="mb-8">
          <div className="text-sm font-medium mb-3">Filter by Occasion</div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedOccasion === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedOccasion('all')}
              className="rounded-full"
              data-testid="filter-all"
            >
              All Occasions
            </Button>
            {occasions.map((occasion) => (
              <Button
                key={occasion}
                variant={selectedOccasion === occasion ? 'default' : 'outline'}
                onClick={() => setSelectedOccasion(occasion)}
                className="rounded-full capitalize"
                data-testid={`filter-${occasion}`}
              >
                {occasion}
              </Button>
            ))}
          </div>
        </div>

        {/* Recommendations Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredRecommendations?.map((recommendation) => (
            <Card key={recommendation.id} className="shadow-lg hover-elevate transition-all" data-testid={`card-outfit-${recommendation.occasion}-${recommendation.id}`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shirt className="h-5 w-5 text-primary" />
                    <span className="capitalize" data-testid={`text-occasion-${recommendation.occasion}-${recommendation.id}`}>{recommendation.occasion}</span>
                  </div>
                  <Badge variant="outline" className="capitalize" data-testid={`badge-style-${recommendation.occasion}-${recommendation.id}`}>
                    {recommendation.styles[0]}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Color Palette */}
                <div>
                  <div className="text-sm font-medium mb-3" data-testid={`text-recommended-colors-${recommendation.occasion}-${recommendation.id}`}>Recommended Colors</div>
                  <div className="grid grid-cols-5 gap-2">
                    {recommendation.colors.map((color, index) => (
                      <div key={index} className="space-y-1">
                        <div
                          className="aspect-square rounded-lg shadow-md hover-elevate transition-all cursor-pointer"
                          style={{ backgroundColor: color }}
                          title={color}
                          data-testid={`outfit-color-${recommendation.occasion}-${recommendation.id}-${index}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <div className="text-sm font-medium mb-2" data-testid={`text-styling-advice-label-${recommendation.occasion}-${recommendation.id}`}>Styling Advice</div>
                  <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-styling-advice-${recommendation.occasion}-${recommendation.id}`}>
                    {recommendation.description}
                  </p>
                </div>

                {/* Style Tags */}
                <div className="flex flex-wrap gap-2">
                  {recommendation.styles.map((style, index) => (
                    <Badge key={index} variant="outline" className="text-xs" data-testid={`badge-outfit-style-${recommendation.occasion}-${recommendation.id}-${index}`}>
                      {style}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRecommendations?.length === 0 && (
          <div className="text-center py-12">
            <Shirt className="h-12 w-12 text-muted-foreground mx-auto mb-4" data-testid="icon-empty-shirt" />
            <p className="text-muted-foreground" data-testid="text-no-recommendations">No recommendations for this occasion yet</p>
          </div>
        )}

        {/* Chat CTA */}
        <Card className="mt-12 bg-gradient-to-br from-primary/5 to-chart-2/5 border-primary/20">
          <CardContent className="p-8 text-center space-y-4">
            <Sparkles className="h-12 w-12 text-primary mx-auto" data-testid="icon-sparkles-chat" />
            <h3 className="font-display text-2xl font-bold" data-testid="heading-more-advice">Need More Styling Advice?</h3>
            <p className="text-muted-foreground max-w-lg mx-auto" data-testid="text-chat-description">
              Chat with our AI stylist for personalized recommendations and styling tips
            </p>
            <Link href="/chat">
              <Button size="lg" className="rounded-full" data-testid="button-chat-stylist">
                Chat with AI Stylist
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
