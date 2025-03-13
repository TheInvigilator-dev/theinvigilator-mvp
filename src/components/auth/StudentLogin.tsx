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
import { AlertCircle, Camera, Check, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StudentLoginProps {
  onLogin?: (studentId: string, examCode: string) => void;
}

const StudentLogin = ({ onLogin = () => {} }: StudentLoginProps) => {
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
      setError("Please enter both student ID and exam code");
      return;
    }

    // For demo purposes, skip verification requirement
    // if (!isVerified) {
    //   setError("Please complete identity verification");
    //   setActiveTab("verify");
    //   return;
    // }

    try {
      setIsLoading(true);
      // In a real app, this would call an authentication service
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      // Accept any credentials for demo purposes
      onLogin(studentId, examCode);
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Could not access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  const verifyIdentity = () => {
    // In a real app, this would perform facial recognition
    // For demo purposes, we'll just simulate verification
    setIsLoading(true);
    setTimeout(() => {
      setIsVerified(true);
      setIsLoading(false);
      stopCamera();
      setActiveTab("login");
    }, 2000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
            <span className="text-2xl font-bold text-white">AP</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">
            The Invigilator{" "}
          </h1>
          <p className="mt-2 text-slate-600">Student Exam Portal</p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle>Student Login</CardTitle>
            <CardDescription>
              Enter your details to access your exam
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login Details</TabsTrigger>
                <TabsTrigger value="verify">Identity Verification</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleSubmit}>
                  {error && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="studentId">Student ID</Label>
                      <Input
                        id="studentId"
                        placeholder="Enter your student ID"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="examCode">Exam Code</Label>
                      <Input
                        id="examCode"
                        placeholder="Enter the exam code"
                        value={examCode}
                        onChange={(e) => setExamCode(e.target.value)}
                        required
                      />
                    </div>

                    {isVerified ? (
                      <Alert className="bg-green-50 border-green-200">
                        <Check className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-600">
                          Identity verified successfully
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <Alert className="bg-blue-50 border-blue-200">
                        <Info className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-blue-600">
                          Identity verification required before starting the
                          exam
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="mt-6 flex gap-2">
                    {!isVerified && (
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setActiveTab("verify")}
                      >
                        Verify Identity
                      </Button>
                    )}
                    <Button
                      type="submit"
                      className={`${isVerified ? "w-full" : "flex-1"} bg-blue-600 hover:bg-blue-700`}
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Start Exam"}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="verify">
                <div className="space-y-4">
                  <div className="rounded-md border bg-slate-50 p-2">
                    <div className="aspect-video relative overflow-hidden rounded-md bg-black">
                      {!isCameraActive ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                          <Camera className="mb-2 h-12 w-12 opacity-50" />
                          <p className="text-center text-sm opacity-70">
                            Camera access required for identity verification
                          </p>
                        </div>
                      ) : null}
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className={`h-full w-full object-cover ${!isCameraActive ? "hidden" : ""}`}
                      />
                    </div>
                  </div>

                  <Alert className="bg-blue-50 border-blue-200">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-600">
                      Please ensure your face is clearly visible and well-lit
                    </AlertDescription>
                  </Alert>

                  <div className="flex gap-2">
                    {!isCameraActive ? (
                      <Button
                        type="button"
                        onClick={startCamera}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        <Camera className="mr-2 h-4 w-4" /> Enable Camera
                      </Button>
                    ) : (
                      <>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={stopCamera}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          onClick={verifyIdentity}
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
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
          <CardFooter className="flex justify-center border-t p-4">
            <p className="text-center text-sm text-muted-foreground">
              Having trouble?{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                Contact your instructor
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default StudentLogin;
