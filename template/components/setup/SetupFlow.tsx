"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Key, 
  Palette, 
  Type, 
  Check, 
  Copy, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Code,
  Settings,
  ExternalLink
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Alert, AlertDescription } from "../ui/alert";
import { themes } from "../../customize/themes/available-themes";
import { availableFonts, popularCombinations } from "../../customize/fonts/available-fonts";
import { useFontPreview, preloadFonts } from "../../hooks/useFontPreview";
import CelebrationConfetti from "../ui/celebration-confetti";

interface BrandingAnswers {
  appName: string;
  appTitle: string;
  appSubtitle: string;
  appDescription: string;
  companyName: string;
  contactEmail: string;
  aiAssistantName: string;
  selectedTheme: string;
  selectedFont: string;
}

const themeNames = Object.keys(themes);
const fontNames = Object.keys(availableFonts);

export default function SetupFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialStep = parseInt(searchParams?.get('step') || '1');
  
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);
  const [copiedEnv, setCopiedEnv] = useState(false);
  const [answers, setAnswers] = useState<BrandingAnswers>({
    appName: "",
    appTitle: "",
    appSubtitle: "",
    appDescription: "",
    companyName: "",
    contactEmail: "",
    aiAssistantName: "",
    selectedTheme: "slate",
    selectedFont: "Inter",
  });

  // Move font preview hook to top level - must be called every render
  const { fontFamily } = useFontPreview(answers.selectedFont);

  useEffect(() => {
    setHasApiKey(!!process.env.NEXT_PUBLIC_MOORCHEH_API_KEY);
    // Preload popular fonts for better performance
    preloadFonts(['Inter', 'Poppins', 'Roboto', 'Open Sans', 'Lato']);
  }, []);

  const brandingQuestions = [
    {
      id: "appName",
      label: "What's your app name?",
      placeholder: "My AI Assistant",
      description: "This appears in your chat header and throughout the app",
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      id: "appTitle",
      label: "Browser tab title?",
      placeholder: "My Chat App",
      description: "What users see in their browser tab",
      icon: <Settings className="w-5 h-5" />,
    },
    {
      id: "appSubtitle", 
      label: "Chat welcome message?",
      placeholder: "How can I help you today?",
      description: "The greeting message in your chat interface",
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      id: "companyName",
      label: "Your company name?",
      placeholder: "My Company",
      description: "Used in branding and contact information",
      icon: <Settings className="w-5 h-5" />,
    },
    {
      id: "contactEmail",
      label: "Support email?",
      placeholder: "support@mycompany.com",
      description: "For user support and contact",
      icon: <Settings className="w-5 h-5" />,
    },
    {
      id: "aiAssistantName",
      label: "AI assistant name?",
      placeholder: "Assistant",
      description: "What should users call your AI?",
      icon: <Sparkles className="w-5 h-5" />,
    },
  ];

  const generateEnvConfig = () => {
    const config = Object.entries(answers)
      .filter(([key]) => !['selectedTheme', 'selectedFont'].includes(key))
      .map(([key, value]) => {
        const envKey = `NEXT_PUBLIC_${key.replace(/([A-Z])/g, '_$1').toUpperCase()}`;
        return `${envKey}=${value}`;
      })
      .join('\n');

    const themeConfig = `
# Theme & Font Configuration (update the files below)
# Theme: ${answers.selectedTheme} - Edit customize/themes/theme-config.ts
# Font: ${answers.selectedFont} - Edit customize/fonts/font-config.ts`;

    return `# Required API Key\nNEXT_PUBLIC_MOORCHEH_API_KEY=${apiKey}\n\n# App Branding\n${config}${themeConfig}`;
  };

  const copyEnvConfig = async () => {
    await navigator.clipboard.writeText(generateEnvConfig());
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2000);
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowCelebration(true);
      setTimeout(() => {
        setCurrentStep(6);
      }, 2000);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderChatPreview = () => {
    const currentTheme = themes[answers.selectedTheme] || themes.green;
    
    const previewMessages = [
      { role: 'assistant', content: answers.appSubtitle || 'How can I help you today?' },
      { role: 'user', content: 'Tell me about your features' },
      { role: 'assistant', content: `I'm ${answers.aiAssistantName || 'your AI assistant'}, ready to help with any questions!` }
    ];

    return (
      <motion.div 
        className="w-full max-w-md bg-background border rounded-lg overflow-hidden shadow-lg"
        style={{
          '--background': currentTheme['--background'],
          '--foreground': currentTheme['--foreground'],
          '--primary': currentTheme['--primary'],
          '--primary-foreground': currentTheme['--primary-foreground'],
          '--card': currentTheme['--card'],
          '--card-foreground': currentTheme['--card-foreground'],
          '--border': currentTheme['--border'],
        } as React.CSSProperties}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        key={`${answers.selectedTheme}-${answers.selectedFont}`}
      >
        <motion.div 
          className="bg-primary text-primary-foreground p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 
            className="font-semibold text-lg transition-all duration-300"
            style={{ fontFamily }}
          >
            {answers.appName || 'My AI Assistant'}
          </h3>
        </motion.div>
        <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
          {previewMessages.map((msg, index) => (
            <motion.div
              key={`${msg.role}-${index}-${answers.selectedTheme}-${answers.selectedFont}`}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + (index * 0.2), duration: 0.4 }}
            >
              <motion.div
                className={`max-w-[80%] p-3 rounded-lg transition-all duration-300 ${
                  msg.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card text-card-foreground border'
                }`}
                style={{ fontFamily }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {msg.content}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  if (showCelebration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center relative overflow-hidden">
        {/* Confetti Animation */}
        <CelebrationConfetti 
          isActive={showCelebration}
          numberOfPieces={300}
          recycle={false}
          colors={['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#EC4899', '#06B6D4']}
        />
        
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
          className="text-center space-y-6 z-10 relative"
        >
          {/* Animated Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
            className="w-32 h-32 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="w-16 h-16 text-green-500"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-full h-full">
                <motion.path
                  d="m9 12 2 2 4-4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
                <motion.circle
                  cx="12"
                  cy="12"
                  r="10"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                />
              </svg>
            </motion.div>
          </motion.div>
          
          {/* Success Messages */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="space-y-2"
          >
            <h2 className="text-5xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
              Perfect! 🎉
            </h2>
            <p className="text-2xl text-muted-foreground">
              Your chat is configured!
            </p>
          </motion.div>
          
          {/* Back to Main Button with delay */}
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.0, duration: 0.5 }}
          >
            <Button 
              onClick={() => router.push('/')} 
              size="lg"
              className="px-8 py-3 text-lg font-semibold cursor-pointer"
            >
              Back to Main
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      <div className="container mx-auto py-8 px-4">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Setup Your Chat Experience</h1>
          <p className="text-muted-foreground">Let&apos;s customize your AI chat application</p>
          
          {/* Progress Steps */}
          <div className="flex justify-center items-center mt-6 space-x-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    step <= currentStep
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step < currentStep ? <Check className="w-4 h-4" /> : step}
                </div>
                {step < 5 && (
                  <div className={`w-8 h-1 ${step < currentStep ? 'bg-primary' : 'bg-muted'}`} />
                )}
              </div>
            ))}
          </div>
          
          {/* Step Labels */}
          <div className="flex justify-center mt-2 text-xs text-muted-foreground">
            <div className="grid grid-cols-5 gap-4 text-center max-w-lg">
              <span>API Key</span>
              <span>Branding</span>
              <span>Theme</span>
              <span>Font</span>
              <span>Setup</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Side - Configuration */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              
              {/* Step 1: API Key Setup */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Key className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle>API Key Setup</CardTitle>
                          <CardDescription>Connect to Moorcheh AI services</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {hasApiKey ? (
                        <Alert>
                          <Check className="w-4 h-4" />
                          <AlertDescription>
                            API key is already configured! You can proceed to customization.
                          </AlertDescription>
                        </Alert>
                      ) : (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="apiKey">Moorcheh API Key</Label>
                            <Input
                              id="apiKey"
                              type="password"
                              placeholder="Enter your API key..."
                              value={apiKey}
                              onChange={(e) => setApiKey(e.target.value)}
                            />
                          </div>
                          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                            <p className="text-sm font-medium">Don&apos;t have an API key?</p>
                            <p className="text-sm text-muted-foreground">
                              Get your free API key from Moorcheh AI dashboard
                            </p>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mt-2 cursor-pointer"
                              onClick={() => window.open('https://console.moorcheh.ai/api-keys', '_blank')}
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Get API Key
                            </Button>
                          </div>
                        </>
                      )}
                      
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => router.push('/landing')} 
                          variant="outline"
                          className="cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Back to Landing
                        </Button>
                        <Button 
                          onClick={handleNext}
                          disabled={!hasApiKey && !apiKey.trim()}
                          className="flex-1 cursor-pointer"
                        >
                          Continue Setup
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 2: Branding Questions */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle>Brand Your App</CardTitle>
                          <CardDescription>Customize the text and messaging</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {brandingQuestions.map((question, index) => (
                        <motion.div
                          key={question.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="space-y-2"
                        >
                          <Label className="flex items-center gap-2">
                            {question.icon}
                            {question.label}
                          </Label>
                          <Input
                            placeholder={question.placeholder}
                            value={answers[question.id as keyof BrandingAnswers] as string}
                            onChange={(e) => setAnswers(prev => ({ 
                              ...prev, 
                              [question.id]: e.target.value 
                            }))}
                          />
                          <p className="text-xs text-muted-foreground">{question.description}</p>
                        </motion.div>
                      ))}
                      
                      <div className="flex gap-2 pt-4">
                        <Button onClick={handlePrevious} variant="outline" className="cursor-pointer">
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Previous
                        </Button>
                        <Button onClick={handleNext} className="flex-1 cursor-pointer">
                          Continue to Theme
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 3: Theme Selection */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Palette className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle>Choose Your Theme</CardTitle>
                          <CardDescription>Pick colors that match your brand</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-3">
                        {themeNames.map((themeName) => {
                          const theme = themes[themeName];
                          return (
                            <motion.div
                              key={themeName}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`cursor-pointer p-4 rounded-lg border-2 transition-colors ${
                                answers.selectedTheme === themeName
                                  ? 'border-primary bg-primary/5'
                                  : 'border-border hover:border-primary/50'
                              }`}
                              onClick={() => setAnswers(prev => ({ ...prev, selectedTheme: themeName }))}
                            >
                              <div className="flex items-center gap-3">
                                <div 
                                  className="w-8 h-8 rounded-full border-2"
                                  style={{ backgroundColor: theme['--primary'] }}
                                />
                                <span className="font-medium capitalize">{themeName}</span>
                                {answers.selectedTheme === themeName && (
                                  <Check className="w-4 h-4 text-primary ml-auto" />
                                )}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                      
                      <div className="flex gap-2 pt-4">
                        <Button onClick={handlePrevious} variant="outline" className="cursor-pointer">
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Previous
                        </Button>
                        <Button onClick={handleNext} className="flex-1 cursor-pointer">
                          Continue to Font
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 4: Font Selection */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Type className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle>Typography Style</CardTitle>
                          <CardDescription>Select fonts that express your personality</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Popular Font Combinations */}
                      <div className="space-y-3">
                        <Label>Popular Combinations</Label>
                        <div className="grid gap-3">
                          {popularCombinations.slice(0, 4).map((combo) => (
                            <motion.div
                              key={combo.name}
                              whileHover={{ scale: 1.01 }}
                              className={`cursor-pointer p-4 rounded-lg border-2 transition-colors ${
                                answers.selectedFont === combo.primary
                                  ? 'border-primary bg-primary/5'
                                  : 'border-border hover:border-primary/50'
                              }`}
                              onClick={() => setAnswers(prev => ({ ...prev, selectedFont: combo.primary }))}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p 
                                    className="font-semibold"
                                    style={{ fontFamily: availableFonts[combo.primary]?.name }}
                                  >
                                    {combo.name}
                                  </p>
                                  <p className="text-sm text-muted-foreground">{combo.description}</p>
                                  <p 
                                    className="text-sm mt-1"
                                    style={{ fontFamily: availableFonts[combo.primary]?.name }}
                                  >
                                    Preview: {combo.primary}
                                  </p>
                                </div>
                                {answers.selectedFont === combo.primary && (
                                  <Check className="w-5 h-5 text-primary" />
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Custom Font Selection */}
                      <div className="space-y-3">
                        <Label>Or choose a specific font</Label>
                        <Select 
                          value={answers.selectedFont} 
                          onValueChange={(value) => setAnswers(prev => ({ ...prev, selectedFont: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="max-h-60">
                            {fontNames.map((fontName) => (
                              <SelectItem key={fontName} value={fontName}>
                                <span style={{ fontFamily: availableFonts[fontName]?.name }}>
                                  {fontName} - {availableFonts[fontName]?.description}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex gap-2 pt-4">
                        <Button onClick={handlePrevious} variant="outline" className="cursor-pointer">
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Previous
                        </Button>
                        <Button onClick={handleNext} className="flex-1 cursor-pointer">
                          Complete Configuration
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 5: Setup Configuration */}
              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                          <Code className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                          <CardTitle>Final Setup</CardTitle>
                          <CardDescription>Copy your configuration to complete the setup</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      
                      {/* Environment Variables */}
                      <div className="space-y-3">
                        <Label className="flex items-center gap-2">
                          <Code className="w-4 h-4" />
                          Environment Variables (.env.local)
                        </Label>
                        <div className="relative">
                          <Textarea
                            readOnly
                            value={generateEnvConfig()}
                            className="font-mono text-sm min-h-[200px]"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            className="absolute top-2 right-2 cursor-pointer"
                            onClick={copyEnvConfig}
                          >
                            {copiedEnv ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>

                      {/* Instructions */}
                      <Alert>
                        <Settings className="w-4 h-4" />
                        <AlertDescription>
                          1. Copy the environment variables above<br/>
                          2. Create a <code>.env.local</code> file in your project root<br/>
                          3. Paste the variables and save the file<br/>
                          4. Restart your development server
                        </AlertDescription>
                      </Alert>

                      {/* Configuration Preview */}
                      <div className="grid gap-4">
                        <Card className="border-dashed">
                          <CardContent className="pt-6">
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-blue-500/10 rounded-full flex items-center justify-center mt-1">
                                <Palette className="w-3 h-3 text-blue-500" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">Theme Configuration</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Selected theme: <Badge variant="outline">{answers.selectedTheme}</Badge>
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Edit <code className="bg-muted px-1 rounded">customize/themes/theme-config.ts</code> to change later
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border-dashed">
                          <CardContent className="pt-6">
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-purple-500/10 rounded-full flex items-center justify-center mt-1">
                                <Type className="w-3 h-3 text-purple-500" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">Font Configuration</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Selected font: <Badge variant="outline">{answers.selectedFont}</Badge>
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Edit <code className="bg-muted px-1 rounded">customize/fonts/font-config.ts</code> to change later
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button onClick={handlePrevious} variant="outline">
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Previous
                        </Button>
                        <Button 
                          onClick={handleNext} 
                          className="flex-1"
                        >
                          Complete Setup! 🎉
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 6: Final Completion */}
              {currentStep === 6 && (
                <motion.div
                  key="step6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                          <Check className="w-5 h-5 text-green-500" />
                        </div>
                        <div>
                          <CardTitle>Setup Complete! 🎉</CardTitle>
                          <CardDescription>Your chat application is ready to use</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      
                      <div className="text-center space-y-4">
                        <div className="text-4xl">🎊</div>
                        <div>
                          <h3 className="text-lg font-semibold">Congratulations!</h3>
                                                      <p className="text-muted-foreground">
                              Your {answers.appName || "AI Assistant"} is now configured with {answers.selectedTheme} theme and {answers.selectedFont} font.
                            </p>
                        </div>
                      </div>

                      <Alert>
                        <Check className="w-4 h-4" />
                        <AlertDescription>
                          Your environment variables have been generated. Make sure you&apos;ve copied them to your <code>.env.local</code> file and restarted your development server.
                        </AlertDescription>
                      </Alert>

                      <div className="flex gap-2 pt-4">
                        <Button onClick={() => router.push('/')} className="flex-1">
                          <Check className="w-4 h-4 mr-2" />
                          View Your Chat
                        </Button>
                        <Button variant="outline" onClick={() => setCurrentStep(1)}>
                          Start Over
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Right Side - Live Preview */}
          <div className="lg:sticky lg:top-8 h-fit">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Live Preview
                </CardTitle>
                <CardDescription>
                  See how your chat will look with current settings
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                {renderChatPreview()}
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
