import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Clock, Palette, Upload } from "lucide-react";
import type { UserProfile, Analysis } from "@shared/schema";

export default function Profile() {
  const { data: profile, isLoading } = useQuery<UserProfile>({
    queryKey: ["/api/profile"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="space-y-6">
            <Skeleton className="h-48" />
            <Skeleton className="h-64" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold mb-2" data-testid="heading-your-profile">Your Profile</h1>
            <p className="text-lg text-muted-foreground" data-testid="text-profile-description">
              View your analysis history and saved palettes
            </p>
          </div>
          <Link href="/upload">
            <Button size="lg" className="rounded-full" data-testid="button-new-analysis">
              <Upload className="mr-2 h-5 w-5" />
              New Analysis
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="history" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="history" data-testid="tab-history">
              <Clock className="mr-2 h-4 w-4" />
              History
            </TabsTrigger>
            <TabsTrigger value="palettes" data-testid="tab-palettes">
              <Palette className="mr-2 h-4 w-4" />
              Saved Palettes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="space-y-6">
            {profile && profile.analyses.length > 0 ? (
              <div className="space-y-4">
                {profile.analyses.map((analysis) => (
                  <Card key={analysis.id} className="hover-elevate transition-all" data-testid={`card-analysis-${analysis.id}`}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        {analysis.imageData && (
                          <div className="w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-muted">
                            <img
                              src={analysis.imageData}
                              alt="Analysis"
                              className="w-full h-full object-cover"
                              data-testid={`img-analysis-${analysis.id}`}
                            />
                          </div>
                        )}
                        <div className="flex-1 space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="text-sm text-muted-foreground mb-2" data-testid={`text-analysis-date-${analysis.id}`}>
                                {new Date(analysis.timestamp).toLocaleDateString('en-US', {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </div>
                              <div className="flex flex-wrap gap-2">
                                <Badge className="capitalize" data-testid={`badge-analysis-skin-tone-${analysis.id}`}>{analysis.skinTone}</Badge>
                                <Badge variant="outline" className="capitalize" data-testid={`badge-analysis-undertone-${analysis.id}`}>
                                  {analysis.undertone} undertone
                                </Badge>
                                <Badge variant="outline" className="capitalize" data-testid={`badge-analysis-face-shape-${analysis.id}`}>
                                  {analysis.faceShape} face
                                </Badge>
                              </div>
                            </div>
                            <Link href={`/results/${analysis.id}`}>
                              <Button variant="outline" size="sm" className="rounded-full" data-testid={`button-view-details-${analysis.id}`}>
                                View Details
                              </Button>
                            </Link>
                          </div>
                          <div>
                            <div className="text-sm font-medium mb-2" data-testid={`text-color-palette-label-${analysis.id}`}>Color Palette</div>
                            <div className="flex gap-2">
                              {analysis.colorPalette.slice(0, 6).map((color, index) => (
                                <div
                                  key={index}
                                  className="w-10 h-10 rounded-lg shadow-md"
                                  style={{ backgroundColor: color }}
                                  title={color}
                                  data-testid={`color-palette-${analysis.id}-${index}`}
                                />
                              ))}
                              {analysis.colorPalette.length > 6 && (
                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground" data-testid={`text-more-colors-${analysis.id}`}>
                                  +{analysis.colorPalette.length - 6}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto">
                    <User className="h-8 w-8 text-muted-foreground" data-testid="icon-empty-user" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2" data-testid="text-no-analyses">No analyses yet</h3>
                    <p className="text-muted-foreground mb-6" data-testid="text-upload-first-photo">
                      Upload your first photo to get personalized recommendations
                    </p>
                    <Link href="/upload">
                      <Button className="rounded-full" data-testid="button-get-started">
                        <Upload className="mr-2 h-4 w-4" />
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="palettes" className="space-y-6">
            {profile && profile.savedPalettes.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profile.savedPalettes.map((palette, index) => (
                  <Card key={index} className="hover-elevate transition-all" data-testid={`card-palette-${index}`}>
                    <CardHeader>
                      <CardTitle className="text-lg" data-testid={`text-palette-title-${index}`}>Palette {index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-4 gap-2">
                        {palette.map((color, colorIndex) => (
                          <div
                            key={colorIndex}
                            className="aspect-square rounded-lg shadow-md"
                            style={{ backgroundColor: color }}
                            title={color}
                            data-testid={`palette-color-${index}-${colorIndex}`}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto">
                    <Palette className="h-8 w-8 text-muted-foreground" data-testid="icon-empty-palette" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2" data-testid="text-no-palettes">No saved palettes</h3>
                    <p className="text-muted-foreground" data-testid="text-save-palettes">
                      Save your favorite color combinations from your analyses
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
