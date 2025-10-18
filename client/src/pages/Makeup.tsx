import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Palette, Heart, Droplet, Smile, Flower2, Eye } from "lucide-react";
import type { Analysis, MakeupRecommendation } from "@shared/schema";

export default function Makeup() {
  const [, params] = useRoute("/makeup/:id");
  const analysisId = params?.id;

  const { data: analysis, isLoading: analysisLoading } = useQuery<Analysis>({
    queryKey: ["/api/analysis", analysisId],
    enabled: !!analysisId,
  });

  const { data: recommendations, isLoading: recommendationsLoading } = useQuery<MakeupRecommendation[]>({
    queryKey: ["/api/makeup", analysisId],
    enabled: !!analysisId,
  });

  const isLoading = analysisLoading || recommendationsLoading;

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

  const categoryIcons: Record<string, React.ReactNode> = {
    foundation: <Droplet className="h-6 w-6 text-primary" />,
    lipstick: <Smile className="h-6 w-6 text-primary" />,
    blush: <Flower2 className="h-6 w-6 text-primary" />,
    eyeshadow: <Eye className="h-6 w-6 text-primary" />,
  };

  const categoryDescriptions: Record<string, string> = {
    foundation: "Perfect foundation matches for your skin tone",
    lipstick: "Lipstick shades that complement your undertone",
    blush: "Blush colors that enhance your natural glow",
    eyeshadow: "Eyeshadow palettes that make your eyes pop",
  };

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
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-display text-4xl font-bold mb-2" data-testid="heading-makeup-recommendations">Makeup Recommendations</h1>
              <p className="text-lg text-muted-foreground" data-testid="text-skin-description">
                Personalized shades for your {analysis.skinTone} skin with {analysis.undertone} undertone
              </p>
            </div>
          </div>
        </div>

        {/* Sticky Sidebar with Analysis Summary */}
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:sticky lg:top-24 h-fit space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg" data-testid="heading-your-profile">Your Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Skin Tone</div>
                  <Badge className="capitalize" data-testid="badge-profile-skin-tone">{analysis.skinTone}</Badge>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Undertone</div>
                  <Badge variant="outline" className="capitalize" data-testid="badge-profile-undertone">{analysis.undertone}</Badge>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Face Shape</div>
                  <div className="text-sm font-medium capitalize" data-testid="text-profile-face-shape">{analysis.faceShape}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {recommendations.map((category) => (
              <Card key={category.id} className="shadow-lg" data-testid={`card-category-${category.category}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      {categoryIcons[category.category]}
                    </div>
                    <div>
                      <div className="capitalize" data-testid={`text-category-${category.category}`}>{category.category}</div>
                      <p className="text-sm font-normal text-muted-foreground mt-1" data-testid={`text-category-description-${category.category}`}>
                        {categoryDescriptions[category.category]}
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.shades.map((shade, index) => (
                      <Card key={index} className="hover-elevate active-elevate-2 transition-all group">
                        <CardContent className="p-4 space-y-3">
                          <div className="relative">
                            <div
                              className="aspect-square rounded-xl shadow-lg"
                              style={{ backgroundColor: shade.hex }}
                              data-testid={`shade-${category.category}-${index}`}
                            />
                            <Button
                              size="icon"
                              variant="ghost"
                              className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                              data-testid={`button-favorite-${category.category}-${index}`}
                            >
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                          <div>
                            <div className="font-semibold text-sm mb-1">{shade.name}</div>
                            <div className="text-xs text-muted-foreground font-mono">{shade.hex}</div>
                            {shade.finish && (
                              <Badge variant="outline" className="mt-2 text-xs">
                                {shade.finish}
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Next Steps */}
            <Card className="bg-gradient-to-br from-primary/5 to-chart-2/5 border-primary/20">
              <CardContent className="p-8 text-center space-y-4">
                <Palette className="h-12 w-12 text-primary mx-auto" data-testid="icon-palette" />
                <h3 className="font-display text-2xl font-bold" data-testid="heading-more-recommendations">Want More Recommendations?</h3>
                <p className="text-muted-foreground max-w-lg mx-auto" data-testid="text-more-recommendations">
                  Get personalized outfit suggestions based on your analysis
                </p>
                <Link href={`/outfits/${analysisId}`}>
                  <Button size="lg" className="rounded-full" data-testid="button-view-outfits">
                    View Outfit Suggestions
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
