import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Camera,
  Mic,
  Monitor,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

interface SystemCheckDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SystemCheckDialog = ({ open, onOpenChange }: SystemCheckDialogProps) => {
  const [activeTab, setActiveTab] = useState("camera");
  const [cameraStatus, setCameraStatus] = useState<
    "pending" | "success" | "error"
  >("pending");
  const [micStatus, setMicStatus] = useState<"pending" | "success" | "error">(
    "pending",
  );
  const [screenStatus, setScreenStatus] = useState<
    "pending" | "success" | "error"
  >("pending");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Start camera when camera tab is active
  useEffect(() => {
    if (activeTab === "camera" && open) {
      startCamera();
    } else if (mediaStreamRef.current) {
      stopCamera();
    }

    return () => {
      if (mediaStreamRef.current) {
        stopCamera();
      }
    };
  }, [activeTab, open]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        mediaStreamRef.current = stream;
        setCameraStatus("success");
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraStatus("error");
    }
  };

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  const testMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // In a real app, you would analyze the audio levels here
      setMicStatus("success");
      // Clean up the stream after testing
      stream.getTracks().forEach((track) => track.stop());
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setMicStatus("error");
    }
  };

  const testScreenSharing = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      setScreenStatus("success");
      // Clean up the stream after testing
      stream.getTracks().forEach((track) => track.stop());
    } catch (err) {
      console.error("Error accessing screen:", err);
      setScreenStatus("error");
    }
  };

  const verifyIdentity = () => {
    if (cameraStatus !== "success") {
      return;
    }

    setIsVerifying(true);
    setVerificationProgress(0);

    // Simulate the verification process
    const interval = setInterval(() => {
      setVerificationProgress((prev) => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setVerificationComplete(true);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  const handleClose = () => {
    stopCamera();
    setActiveTab("camera");
    setCameraStatus("pending");
    setMicStatus("pending");
    setScreenStatus("pending");
    setIsVerifying(false);
    setVerificationProgress(0);
    setVerificationComplete(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>System Check & Identity Verification</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="camera">
              <Camera className="h-4 w-4 mr-2" />
              Camera Check
            </TabsTrigger>
            <TabsTrigger value="microphone">
              <Mic className="h-4 w-4 mr-2" />
              Microphone Test
            </TabsTrigger>
            <TabsTrigger value="screen">
              <Monitor className="h-4 w-4 mr-2" />
              Screen Sharing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="camera" className="space-y-4">
            <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              {cameraStatus === "pending" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                  <div className="text-center">
                    <Camera className="h-12 w-12 mx-auto mb-2 opacity-70" />
                    <p>Camera access required</p>
                  </div>
                </div>
              )}
              {cameraStatus === "error" && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-500/20 text-red-600">
                  <div className="text-center bg-white p-4 rounded-lg shadow-lg">
                    <AlertTriangle className="h-12 w-12 mx-auto mb-2" />
                    <p className="font-semibold">Camera Error</p>
                    <p className="text-sm">
                      Unable to access your camera. Please check permissions.
                    </p>
                  </div>
                </div>
              )}
              {isVerifying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="bg-white p-4 rounded-lg shadow-lg max-w-xs w-full">
                    <p className="text-center mb-2 font-medium">
                      Verifying Identity
                    </p>
                    <Progress value={verificationProgress} className="mb-2" />
                    <p className="text-xs text-center text-slate-500">
                      {verificationComplete
                        ? "Verification complete!"
                        : "Please look at the camera..."}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <Alert className="bg-blue-50 border-blue-200">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-600">
                Position your face clearly in the frame. Ensure good lighting
                and remove any face coverings.
              </AlertDescription>
            </Alert>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <div className="space-x-2">
                {cameraStatus === "success" &&
                  !isVerifying &&
                  !verificationComplete && (
                    <Button onClick={verifyIdentity}>Verify Identity</Button>
                  )}
                {verificationComplete && (
                  <Button
                    onClick={() => setActiveTab("microphone")}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Continue
                  </Button>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="microphone" className="space-y-4">
            <div className="bg-slate-100 p-8 rounded-lg flex flex-col items-center justify-center">
              <Mic
                className={`h-16 w-16 mb-4 ${micStatus === "success" ? "text-green-500" : micStatus === "error" ? "text-red-500" : "text-slate-400"}`}
              />
              <h3 className="text-lg font-semibold mb-2">
                {micStatus === "pending" && "Test Your Microphone"}
                {micStatus === "success" && "Microphone Working"}
                {micStatus === "error" && "Microphone Error"}
              </h3>
              <p className="text-center text-slate-500 mb-4">
                {micStatus === "pending" &&
                  "Click the button below to test your microphone."}
                {micStatus === "success" &&
                  "Your microphone is working properly."}
                {micStatus === "error" &&
                  "Unable to access your microphone. Please check permissions."}
              </p>

              {micStatus === "success" && (
                <div className="w-full max-w-md h-12 bg-slate-200 rounded-full overflow-hidden relative mb-4">
                  <div className="absolute inset-0 flex items-center justify-center space-x-1">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-green-500 w-1 rounded-full animate-pulse"
                        style={{
                          height: `${Math.random() * 40 + 10}px`,
                          animationDelay: `${i * 0.05}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Alert className="bg-blue-50 border-blue-200">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-600">
                Ensure you are in a quiet environment. Background noise may
                trigger alerts during the exam.
              </AlertDescription>
            </Alert>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("camera")}>
                Back
              </Button>
              <div className="space-x-2">
                {micStatus !== "success" && (
                  <Button onClick={testMicrophone}>Test Microphone</Button>
                )}
                {micStatus === "success" && (
                  <Button
                    onClick={() => setActiveTab("screen")}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Continue
                  </Button>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="screen" className="space-y-4">
            <div className="bg-slate-100 p-8 rounded-lg flex flex-col items-center justify-center">
              <Monitor
                className={`h-16 w-16 mb-4 ${screenStatus === "success" ? "text-green-500" : screenStatus === "error" ? "text-red-500" : "text-slate-400"}`}
              />
              <h3 className="text-lg font-semibold mb-2">
                {screenStatus === "pending" && "Test Screen Sharing"}
                {screenStatus === "success" && "Screen Sharing Working"}
                {screenStatus === "error" && "Screen Sharing Error"}
              </h3>
              <p className="text-center text-slate-500 mb-4">
                {screenStatus === "pending" &&
                  "During the exam, you'll need to share your screen. Click below to test this feature."}
                {screenStatus === "success" &&
                  "Screen sharing is working properly."}
                {screenStatus === "error" &&
                  "Unable to share your screen. Please check permissions."}
              </p>
            </div>

            <Alert className="bg-amber-50 border-amber-200">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-600">
                During the exam, navigating away from the exam window or opening
                other applications may trigger alerts.
              </AlertDescription>
            </Alert>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setActiveTab("microphone")}
              >
                Back
              </Button>
              <div className="space-x-2">
                {screenStatus !== "success" && (
                  <Button onClick={testScreenSharing}>
                    Test Screen Sharing
                  </Button>
                )}
                {screenStatus === "success" && (
                  <Button
                    onClick={handleClose}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Complete Setup
                  </Button>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SystemCheckDialog;
