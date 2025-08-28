import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  Wand2, 
  Image as ImageIcon, 
  Video, 
  FileText,
  Download,
  Eye,
  Trash2,
  Copy,
  Sparkles,
  Bot
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface GeneratedContent {
  id: string;
  type: 'poster' | 'video' | 'caption';
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: Date;
}

export function ContentLab() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([
    {
      id: '1',
      type: 'poster',
      title: 'Summer Collection Poster',
      content: 'AI-generated poster for summer collection launch',
      imageUrl: '/placeholder-poster.jpg',
      createdAt: new Date(),
    },
    {
      id: '2',
      type: 'caption',
      title: 'Instagram Caption',
      content: '🌟 Discover the magic of summer with our latest collection! ✨ From breezy dresses to stylish accessories, we\'ve got everything you need to shine this season. #SummerVibes #Fashion #NewCollection',
      createdAt: new Date(),
    },
  ]);

  const [productInfo, setProductInfo] = useState({
    name: '',
    description: '',
    targetAudience: '',
    tone: 'professional',
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
    toast.success(`${files.length} file(s) uploaded successfully`);
  };

  const handleGeneratePoster = async () => {
    if (!productInfo.name) {
      toast.error("Please enter product information");
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const newPoster: GeneratedContent = {
        id: Date.now().toString(),
        type: 'poster',
        title: `${productInfo.name} Poster`,
        content: `AI-generated poster for ${productInfo.name}`,
        imageUrl: '/placeholder-poster.jpg',
        createdAt: new Date(),
      };
      
      setGeneratedContent(prev => [newPoster, ...prev]);
      setIsGenerating(false);
      toast.success("Poster generated successfully!");
    }, 3000);
  };

  const handleGenerateCaption = async () => {
    if (!productInfo.name) {
      toast.error("Please enter product information");
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const newCaption: GeneratedContent = {
        id: Date.now().toString(),
        type: 'caption',
        title: `${productInfo.name} Caption`,
        content: `✨ Introducing ${productInfo.name}! ${productInfo.description} Perfect for ${productInfo.targetAudience}. Don't miss out on this amazing product! #NewProduct #Innovation #MustHave`,
        createdAt: new Date(),
      };
      
      setGeneratedContent(prev => [newCaption, ...prev]);
      setIsGenerating(false);
      toast.success("Caption generated successfully!");
    }, 2000);
  };

  const handleVideoEdit = async () => {
    if (uploadedFiles.length === 0) {
      toast.error("Please upload a video file first");
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI video editing
    setTimeout(() => {
      const newVideo: GeneratedContent = {
        id: Date.now().toString(),
        type: 'video',
        title: 'AI Edited Video',
        content: 'Auto-trimmed and subtitled video',
        createdAt: new Date(),
      };
      
      setGeneratedContent(prev => [newVideo, ...prev]);
      setIsGenerating(false);
      toast.success("Video edited successfully!");
    }, 5000);
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };

  const deleteContent = (id: string) => {
    setGeneratedContent(prev => prev.filter(item => item.id !== id));
    toast.success("Content deleted");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content Lab</h1>
          <p className="text-muted-foreground">
            Create stunning content with AI-powered tools
          </p>
        </div>
        <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
          <Bot className="w-4 h-4 mr-1" />
          AI Powered
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Input */}
        <div className="lg:col-span-1 space-y-6">
          {/* File Upload */}
          <Card className="bg-gradient-card backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Media
              </CardTitle>
              <CardDescription>
                Upload images or videos for AI processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <div className="space-y-2">
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <Button variant="outline" className="w-full">
                      Choose Files
                    </Button>
                  </Label>
                  <Input
                    id="file-upload"
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <p className="text-xs text-muted-foreground">
                    Support for JPG, PNG, MP4, MOV
                  </p>
                </div>
              </div>
              
              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <Label>Uploaded Files ({uploadedFiles.length})</Label>
                  {uploadedFiles.slice(0, 3).map((file, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded text-sm">
                      {file.type.startsWith('image/') ? (
                        <ImageIcon className="w-4 h-4" />
                      ) : (
                        <Video className="w-4 h-4" />
                      )}
                      <span className="truncate">{file.name}</span>
                    </div>
                  ))}
                  {uploadedFiles.length > 3 && (
                    <p className="text-xs text-muted-foreground">
                      +{uploadedFiles.length - 3} more files
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Product Information */}
          <Card className="bg-gradient-card backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
              <CardDescription>
                Tell us about your product for better AI generation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="product-name">Product Name</Label>
                <Input
                  id="product-name"
                  placeholder="e.g., Summer Collection Dress"
                  value={productInfo.name}
                  onChange={(e) => setProductInfo(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="product-description">Description</Label>
                <Textarea
                  id="product-description"
                  placeholder="Describe your product features and benefits..."
                  value={productInfo.description}
                  onChange={(e) => setProductInfo(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="target-audience">Target Audience</Label>
                <Input
                  id="target-audience"
                  placeholder="e.g., Fashion-conscious millennials"
                  value={productInfo.targetAudience}
                  onChange={(e) => setProductInfo(prev => ({ ...prev, targetAudience: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Generation Tools */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="poster" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="poster">Poster Generation</TabsTrigger>
              <TabsTrigger value="caption">Caption Writing</TabsTrigger>
              <TabsTrigger value="video">Video Editing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="poster" className="space-y-4">
              <Card className="bg-gradient-card backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    AI Poster Generator
                  </CardTitle>
                  <CardDescription>
                    Create eye-catching posters from your product information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={handleGeneratePoster}
                    disabled={isGenerating}
                    className="w-full bg-gradient-primary"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                        Generating Poster...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4 mr-2" />
                        Generate Poster
                      </>
                    )}
                  </Button>
                  
                  {isGenerating && (
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Creating your poster...</span>
                        <span>60%</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="caption" className="space-y-4">
              <Card className="bg-gradient-card backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    AI Caption Writer
                  </CardTitle>
                  <CardDescription>
                    Generate engaging captions with hashtags
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={handleGenerateCaption}
                    disabled={isGenerating}
                    className="w-full bg-gradient-primary"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                        Writing Caption...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4 mr-2" />
                        Generate Caption
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="video" className="space-y-4">
              <Card className="bg-gradient-card backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="w-5 h-5" />
                    AI Video Editor
                  </CardTitle>
                  <CardDescription>
                    Auto-trim, add subtitles, and optimize your videos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={handleVideoEdit}
                    disabled={isGenerating || uploadedFiles.length === 0}
                    className="w-full bg-gradient-primary"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                        Processing Video...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4 mr-2" />
                        Edit Video
                      </>
                    )}
                  </Button>
                  
                  {uploadedFiles.length === 0 && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Upload a video file to get started
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Generated Content */}
          <Card className="bg-gradient-card backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Generated Content</CardTitle>
              <CardDescription>
                Your AI-generated assets ({generatedContent.length})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {generatedContent.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-border rounded-lg p-4 bg-background/50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          {item.type === 'poster' && <ImageIcon className="w-4 h-4 text-primary" />}
                          {item.type === 'caption' && <FileText className="w-4 h-4 text-primary" />}
                          {item.type === 'video' && <Video className="w-4 h-4 text-primary" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {item.content}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.createdAt.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(item.content)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => deleteContent(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {generatedContent.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Wand2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No content generated yet</p>
                    <p className="text-sm">Use the tools above to create your first AI-generated content</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}