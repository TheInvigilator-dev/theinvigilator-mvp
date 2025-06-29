import React, { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircle, Camera, Check, Info, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StudentLoginProps {
  onLogin?: (studentId: string, examCode: string) => void;
  onBack?: () => void;
}

const StudentLogin = ({
  onLogin = () => { },
  onBack = () => { },
}: StudentLoginProps) => {
  const [studentId, setStudentId] = useState("");
  const [examCode, setExamCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!studentId || !examCode) {
      setError("Please enter both student ID and exam code.");
      return;
    }

    if (!isVerified) {
      setActiveTab("verify");
      return;
    }

    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Student Logged In:", { studentId, examCode });
      onLogin(studentId, examCode);
    } catch (err) {
      setError("Invalid credentials or exam code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
      setError("");
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Could not access camera. Please check browser permissions.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const verifyIdentity = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsVerified(true);
      setIsLoading(false);
      stopCamera();
      setActiveTab("login");
      setError("");
    }, 2000);
  };

  const handleTabChange = (value: string) => {
    setError("");
    setActiveTab(value);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4 text-white">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
            <span className="text-3xl font-bold text-purple-400">AP</span>
          </div>
          <h1 className="text-4xl font-bold text-white">Student Exam Portal</h1>
          <p className="mt-2 text-slate-400">
            Your secure gateway to academic assessment.
          </p>
        </div>

        <Card className="rounded-xl border border-slate-700 bg-slate-800/50 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Student Login</CardTitle>
            <CardDescription className="text-slate-400">
              Enter your details and verify your identity to begin.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 rounded-lg bg-slate-700/50 p-1">
                <TabsTrigger value="login" className="rounded-md data-[state=active]:bg-purple-600 data-[state=active]:text-white">Login Details</TabsTrigger>
                <TabsTrigger value="verify" className="rounded-md data-[state=active]:bg-purple-600 data-[state=active]:text-white">Identity Verification</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="mt-4">
                <form onSubmit={handleSubmit}>
                  {error && (
                    <Alert variant="destructive" className="mb-4 border-red-500/50 bg-red-500/10 text-red-400">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="studentId" className="text-slate-400">Student ID</Label>
                      <Input
                        id="studentId"
                        placeholder="Enter your student ID"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        required
                        className="border-slate-600 bg-slate-700/50 text-white placeholder:text-slate-400 focus:ring-purple-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="examCode" className="text-slate-400">Exam Code</Label>
                      <Input
                        id="examCode"
                        placeholder="Enter the exam code"
                        value={examCode}
                        onChange={(e) => setExamCode(e.target.value)}
                        required
                        className="border-slate-600 bg-slate-700/50 text-white placeholder:text-slate-400 focus:ring-purple-500"
                      />
                    </div>

                    {isVerified ? (
                      <Alert className="border-green-500/50 bg-green-500/10 text-green-400">
                        <Check className="h-4 w-4" />
                        <AlertDescription>
                          Identity verified successfully. You can now start the exam.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <Alert className="border-purple-500/50 bg-purple-500/10 text-purple-400">
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          Verification is required before starting the exam.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="mt-6 flex gap-4">
                    {!isVerified && (
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 border-purple-600 bg-transparent hover:bg-slate-700 hover:text-purple-300 text-purple-400"
                        onClick={() => setActiveTab("verify")}
                      >
                        Verify Identity
                      </Button>
                    )}
                    <Button
                      type="submit"
                      className={`${isVerified ? "w-full" : "flex-1"} bg-purple-600 py-6 text-lg font-semibold text-white transition-all hover:bg-purple-700 disabled:opacity-50`}
                      disabled={isLoading || !isVerified}
                    >
                      {isLoading ? "Starting..." : "Start Exam"}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="verify" className="mt-4">
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-lg border border-slate-700">
                    <div className="relative aspect-video bg-slate-900">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className={`h-full w-full object-cover transition-opacity duration-300 ${isCameraActive ? "opacity-100" : "opacity-0"}`}
                      />
                      {!isCameraActive && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                          <Camera className="mb-4 h-16 w-16 text-slate-500" />
                          <h3 className="text-lg font-semibold">Enable Camera</h3>
                          <p className="text-slate-400">
                            We need to see you to verify your identity.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {error && (
                    <Alert variant="destructive" className="border-red-500/50 bg-red-500/10 text-red-400">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Alert className="border-purple-500/50 bg-purple-500/10 text-purple-400">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Position your face in the center of the frame, ensuring good lighting.
                    </AlertDescription>
                  </Alert>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    {!isCameraActive ? (
                      <Button
                        type="button"
                        onClick={startCamera}
                        className="w-full bg-purple-600 py-6 text-lg font-semibold hover:bg-purple-700"
                      >
                        <Camera className="mr-2 h-5 w-5" /> Enable Camera
                      </Button>
                    ) : (
                      <>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            stopCamera();
                            setActiveTab("login");
                          }}
                          className="flex-1 border-purple-600 bg-transparent hover:bg-slate-700 hover:text-purple-300 text-purple-400"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          onClick={verifyIdentity}
                          className="flex-1 bg-purple-600 py-6 text-lg font-semibold hover:bg-purple-700 disabled:opacity-50"
                          disabled={isLoading}
                        >
                          {isLoading ? "Verifying..." : "Verify Identity"}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-slate-700 p-4">
            <Button
              variant="link"
              className="text-slate-400 hover:text-white"
              onClick={onBack}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to role selection
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default StudentLogin;
