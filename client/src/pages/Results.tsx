import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, User, Palette as PaletteIcon, Save, ArrowRight, Eye } from "lucide-react";
import type { Analysis } from "@shared/schema";

export default function Results() {
  const [, params] = useRoute("/results/:id");
  const analysisId = params?.id;

  const { data: analysis, isLoading } = useQuery<Analysis>({
    queryKey: ["/api/analysis", analysisId],
    enabled: !!analysisId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="grid lg:grid-cols-3 gap-8">
            <Skeleton className="h-96" />
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-48" />
              <Skeleton className="h-48" />
              <Skeleton className="h-48" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) {
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-4xl font-bold" data-testid="heading-analysis-results">Your Analysis Results</h1>
          <Button variant="outline" className="rounded-full" data-testid="button-save-results">
            <Save className="mr-2 h-4 w-4" />
            Save Results
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar with uploaded photo */}
          <div className="space-y-6">
            {analysis.imageData && (
              <Card>
                <CardContent className="p-4">
                  <div className="rounded-xl overflow-hidden bg-muted">
                    <img
                      src={analysis.imageData}
                      alt="Your photo"
                      className="w-full h-auto"
                      data-testid="img-analyzed-photo"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg" data-testid="heading-confidence-score">Confidence Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Analysis Accuracy</span>
                    <span className="font-semibold" data-testid="text-confidence-percentage">{Math.round(analysis.confidence * 100)}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${analysis.confidence * 100}%` }}
                      data-testid="progress-confidence"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skin Analysis Card */}
            <Card className="shadow-lg" data-testid="card-skin-analysis">
              <CardHeader>
                <CardTitle className="flex items-center gap-2" data-testid="heading-skin-analysis">
                  <User className="h-5 w-5 text-primary" />
                  Skin Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Skin Tone</div>
                    <Badge className="text-base px-4 py-1.5 capitalize" data-testid="badge-skin-tone">
                      {analysis.skinTone}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Undertone</div>
                    <Badge variant="outline" className="text-base px-4 py-1.5 capitalize" data-testid="badge-undertone">
                      {analysis.undertone}
                    </Badge>
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    {analysis.undertone === 'warm' && 
                      "Your warm undertone means you look best in earthy, golden tones like peach, coral, olive green, and warm browns."
                    }
                    {analysis.undertone === 'cool' && 
                      "Your cool undertone means you look best in jewel tones like emerald, sapphire, ruby, and cool purples."
                    }
                    {analysis.undertone === 'neutral' && 
                      "Your neutral undertone gives you versatility! You can wear both warm and cool colors beautifully."
                    }
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Face Features Card */}
            <Card className="shadow-lg" data-testid="card-facial-features">
              <CardHeader>
                <CardTitle className="flex items-center gap-2" data-testid="heading-facial-features">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Facial Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-6">
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Face Shape</div>
                    <div className="font-semibold capitalize" data-testid="text-face-shape">{analysis.faceShape}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Hair Color</div>
                    <div className="font-semibold capitalize" data-testid="text-hair-color">{analysis.hairColor}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Eye Color</div>
                    <div className="font-semibold capitalize" data-testid="text-eye-color">{analysis.eyeColor}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Color Palette Card */}
            <Card className="shadow-lg" data-testid="card-color-palette">
              <CardHeader>
                <CardTitle className="flex items-center gap-2" data-testid="heading-color-palette">
                  <PaletteIcon className="h-5 w-5 text-primary" />
                  Your Perfect Color Palette
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground" data-testid="text-palette-description">
                    These colors complement your skin tone and undertone beautifully
                  </p>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {analysis.colorPalette.map((color, index) => (
                      <div key={index} className="space-y-2">
                        <div
                          className="aspect-square rounded-xl shadow-lg hover-elevate transition-all cursor-pointer"
                          style={{ backgroundColor: color }}
                          title={color}
                          data-testid={`color-swatch-${index}`}
                        />
                        <div className="text-xs text-center text-muted-foreground font-mono">
                          {color}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href={`/makeup/${analysisId}`}>
                <Card className="hover-elevate active-elevate-2 transition-all cursor-pointer h-full">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <PaletteIcon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">Makeup Recommendations</div>
                        <div className="text-sm text-muted-foreground">View personalized shades</div>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>

              <Link href={`/outfits/${analysisId}`}>
                <Card className="hover-elevate active-elevate-2 transition-all cursor-pointer h-full">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-chart-2/10 flex items-center justify-center">
                        <Eye className="h-6 w-6 text-chart-2" />
                      </div>
                      <div>
                        <div className="font-semibold">Outfit Suggestions</div>
                        <div className="text-sm text-muted-foreground">Discover your style</div>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
