import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload as UploadIcon, Camera, Loader2, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Analysis } from "@shared/schema";

export default function Upload() {
  const [, setLocation] = useLocation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result as string;
        
        const analysis = await apiRequest<Analysis>(
          "POST",
          "/api/analyze",
          { imageData: base64Image }
        );

        toast({
          title: "Analysis complete!",
          description: "Your personalized recommendations are ready",
        });

        setLocation(`/results/${analysis.id}`);
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Please try again with a different photo",
        variant: "destructive",
      });
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Upload Your Photo
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take or upload a clear selfie with good lighting for the most accurate analysis
          </p>
        </div>

        <Card className="shadow-xl">
          <CardContent className="p-8">
            {!preview ? (
              <div
                className={`relative border-2 border-dashed rounded-2xl p-12 transition-all ${
                  dragActive
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                data-testid="dropzone-upload"
              >
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                    <ImageIcon className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">
                      Drop your photo here
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      or click to browse from your device
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      size="lg"
                      className="rounded-full"
                      data-testid="button-browse-file"
                    >
                      <UploadIcon className="mr-2 h-5 w-5" />
                      Browse Files
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full"
                      data-testid="button-use-camera"
                      onClick={() => {
                        toast({
                          title: "Camera feature",
                          description: "Camera capture coming soon! Please upload a photo for now.",
                        });
                      }}
                    >
                      <Camera className="mr-2 h-5 w-5" />
                      Use Camera
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Supports: JPG, PNG, WEBP (Max 10MB)
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  data-testid="input-file"
                />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative rounded-2xl overflow-hidden bg-muted">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-auto max-h-96 object-contain mx-auto"
                    data-testid="img-preview"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    size="lg"
                    className="flex-1 rounded-full"
                    data-testid="button-analyze"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Camera className="mr-2 h-5 w-5" />
                        Analyze Photo
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedFile(null);
                      setPreview("");
                    }}
                    variant="outline"
                    size="lg"
                    disabled={isAnalyzing}
                    className="rounded-full"
                    data-testid="button-choose-different"
                  >
                    Choose Different Photo
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tips Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Camera className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Good Lighting</h3>
              <p className="text-sm text-muted-foreground">
                Use natural daylight or bright, even lighting for best results
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <ImageIcon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Clear Face</h3>
              <p className="text-sm text-muted-foreground">
                Ensure your face is clearly visible without accessories blocking features
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <UploadIcon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Neutral Expression</h3>
              <p className="text-sm text-muted-foreground">
                A neutral expression helps AI detect your natural features accurately
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
