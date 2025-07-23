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
import { AlertCircle, Check, Info, ArrowLeft, Camera, Scan, Shield, User, BookOpen, Loader2, Eye, CheckCircle2, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

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
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [verificationStep, setVerificationStep] = useState<'camera' | 'scanning' | 'complete'>('camera');
  const [focusedField, setFocusedField] = useState<string | null>(null);
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
      await new Promise((resolve) => setTimeout(resolve, 1500));
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
    setVerificationStep('scanning');
    setVerificationProgress(0);

    const interval = setInterval(() => {
      setVerificationProgress((prev) => {
        const newProgress = prev + 8;
        if (newProgress >= 100) {
          clearInterval(interval);
          setVerificationStep('complete');
          setTimeout(() => {
            setIsVerified(true);
            setIsLoading(false);
            stopCamera();
            setActiveTab("login");
            setError("");
          }, 1000);
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

  const handleTabChange = (value: string) => {
    setError("");
    setActiveTab(value);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-32 left-32 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 right-10 w-16 h-16 bg-teal-500/5 rounded-full blur-xl animate-pulse delay-500" />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {/* Back Button */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200 group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to role selection
            </Button>
          </div>

          {/* Logo Section */}
          <div className="mb-8 text-center">
            <div className="relative mb-6">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-xl border border-white/10 shadow-2xl">
                <BookOpen className="h-10 w-10 text-emerald-400" />
              </div>
              <div className="absolute -inset-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-xl -z-10" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Student Portal</h1>
            <p className="text-slate-400">Secure examination environment</p>
          </div>

          {/* Login Card */}
          <Card className="border-0 bg-white/5 backdrop-blur-2xl shadow-2xl">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-px">
              <div className="h-full w-full rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl" />
            </div>

            <div className="relative z-10">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl text-white font-semibold">Student Access</CardTitle>
                <CardDescription className="text-slate-400">
                  Enter your details and verify your identity
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Tabs
                  value={activeTab}
                  onValueChange={handleTabChange}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 rounded-lg bg-white/5 p-1 border border-white/10">
                    <TabsTrigger
                      value="login"
                      className="rounded-md data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all duration-200"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Login Details
                    </TabsTrigger>
                    <TabsTrigger
                      value="verify"
                      className="rounded-md data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all duration-200"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Verification
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="login" className="mt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {error && (
                        <Alert className="bg-red-500/10 border-red-500/20 backdrop-blur-sm">
                          <AlertCircle className="h-4 w-4 text-red-400" />
                          <AlertDescription className="text-red-400">{error}</AlertDescription>
                        </Alert>
                      )}

                      {/* Student ID Field */}
                      <div className="space-y-2">
                        <Label htmlFor="studentId" className="text-slate-300 font-medium">
                          Student ID
                        </Label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                            <User className="h-5 w-5 text-slate-400" />
                          </div>
                          <Input
                            id="studentId"
                            placeholder="Enter your student ID"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            onFocus={() => setFocusedField('studentId')}
                            onBlur={() => setFocusedField(null)}
                            required
                            className={`pl-12 h-12 border-0 bg-white/5 backdrop-blur-sm text-white placeholder:text-slate-500 transition-all duration-200 ${focusedField === 'studentId'
                                ? 'ring-2 ring-emerald-500/50 bg-white/10'
                                : 'ring-1 ring-white/10 hover:ring-white/20'
                              }`}
                          />
                        </div>
                      </div>

                      {/* Exam Code Field */}
                      <div className="space-y-2">
                        <Label htmlFor="examCode" className="text-slate-300 font-medium">
                          Exam Code
                        </Label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                            <BookOpen className="h-5 w-5 text-slate-400" />
                          </div>
                          <Input
                            id="examCode"
                            placeholder="Enter the exam code"
                            value={examCode}
                            onChange={(e) => setExamCode(e.target.value)}
                            onFocus={() => setFocusedField('examCode')}
                            onBlur={() => setFocusedField(null)}
                            required
                            className={`pl-12 h-12 border-0 bg-white/5 backdrop-blur-sm text-white placeholder:text-slate-500 transition-all duration-200 ${focusedField === 'examCode'
                                ? 'ring-2 ring-emerald-500/50 bg-white/10'
                                : 'ring-1 ring-white/10 hover:ring-white/20'
                              }`}
                          />
                        </div>
                      </div>

                      {/* Verification Status */}
                      {isVerified ? (
                        <Alert className="bg-emerald-500/10 border-emerald-500/20 backdrop-blur-sm">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          <AlertDescription className="text-emerald-400">
                            Identity verified successfully. You can now start the exam.
                          </AlertDescription>
                        </Alert>
                      ) : (
                        <Alert className="bg-amber-500/10 border-amber-500/20 backdrop-blur-sm">
                          <AlertTriangle className="h-4 w-4 text-amber-400" />
                          <AlertDescription className="text-amber-400">
                            Identity verification is required before starting the exam.
                          </AlertDescription>
                        </Alert>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        {!isVerified && (
                          <Button
                            type="button"
                            variant="outline"
                            className="flex-1 border-emerald-600/50 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-300 hover:text-emerald-200 transition-all duration-200"
                            onClick={() => setActiveTab("verify")}
                          >
                            <Shield className="mr-2 h-4 w-4" />
                            Verify Identity
                          </Button>
                        )}
                        <Button
                          type="submit"
                          disabled={isLoading || !isVerified}
                          className={`${isVerified ? "w-full" : "flex-1"
                            } h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Starting...
                            </>
                          ) : (
                            <>
                              <BookOpen className="mr-2 h-5 w-5" />
                              Start Exam
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </TabsContent>

                  <TabsContent value="verify" className="mt-6">
                    <div className="space-y-6">
                      {/* Camera View */}
                      <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-slate-900">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className={`w-full h-full object-cover transition-opacity duration-300 ${isCameraActive ? "opacity-100" : "opacity-0"
                            }`}
                        />

                        {!isCameraActive && verificationStep === 'camera' && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                              <Camera className="h-8 w-8 text-emerald-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Enable Camera</h3>
                            <p className="text-slate-400 text-sm">
                              We need to verify your identity before starting the exam
                            </p>
                          </div>
                        )}

                        {verificationStep === 'scanning' && (
                          <div className="absolute inset-0 bg-emerald-900/20 flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-24 h-24 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                              <h3 className="text-lg font-semibold text-white mb-2">Verifying Identity</h3>
                              <p className="text-emerald-300 text-sm mb-4">Please look directly at the camera</p>
                              <Progress value={verificationProgress} className="w-48 mx-auto" />
                              <p className="text-xs text-slate-400 mt-2">{verificationProgress}% complete</p>
                            </div>
                          </div>
                        )}

                        {verificationStep === 'complete' && (
                          <div className="absolute inset-0 bg-emerald-900/30 flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <Check className="h-8 w-8 text-white" />
                              </div>
                              <h3 className="text-lg font-semibold text-white mb-2">Verification Complete!</h3>
                              <p className="text-emerald-300 text-sm">Identity successfully verified</p>
                            </div>
                          </div>
                        )}

                        {/* Face Detection Overlay */}
                        {isCameraActive && verificationStep === 'camera' && (
                          <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-80 border-2 border-emerald-400 rounded-xl">
                              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-400 rounded-tl-xl"></div>
                              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-400 rounded-tr-xl"></div>
                              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-400 rounded-bl-xl"></div>
                              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-400 rounded-br-xl"></div>
                            </div>
                          </div>
                        )}
                      </div>

                      {error && (
                        <Alert className="bg-red-500/10 border-red-500/20 backdrop-blur-sm">
                          <AlertCircle className="h-4 w-4 text-red-400" />
                          <AlertDescription className="text-red-400">{error}</AlertDescription>
                        </Alert>
                      )}

                      {/* Instructions */}
                      <Alert className="bg-emerald-500/10 border-emerald-500/20 backdrop-blur-sm">
                        <Info className="h-4 w-4 text-emerald-400" />
                        <AlertDescription className="text-emerald-400">
                          Position your face within the frame and ensure good lighting for best results.
                        </AlertDescription>
                      </Alert>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-3">
                        {!isCameraActive && verificationStep === 'camera' ? (
                          <Button
                            type="button"
                            onClick={startCamera}
                            className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl transition-all duration-200"
                          >
                            <Camera className="mr-2 h-5 w-5" />
                            Enable Camera
                          </Button>
                        ) : isCameraActive && verificationStep === 'camera' ? (
                          <div className="flex gap-3">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                stopCamera();
                                setActiveTab("login");
                              }}
                              className="flex-1 border-slate-600 bg-slate-600/10 hover:bg-slate-600/20 text-slate-300 hover:text-slate-200"
                            >
                              Cancel
                            </Button>
                            <Button
                              type="button"
                              onClick={verifyIdentity}
                              disabled={isLoading}
                              className="flex-1 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50"
                            >
                              {isLoading ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Verifying...
                                </>
                              ) : (
                                <>
                                  <Scan className="mr-2 h-4 w-4" />
                                  Verify Identity
                                </>
                              )}
                            </Button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>

              <CardFooter className="pt-6">
                <div className="w-full">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-center mb-3">
                      <Eye className="h-4 w-4 text-emerald-400 mr-2" />
                      <span className="text-sm text-slate-300 font-medium">Secure Exam Environment</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                      <div className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2" />
                        Identity verification
                      </div>
                      <div className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-2" />
                        Secure monitoring
                      </div>
                      <div className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                        Real-time support
                      </div>
                      <div className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2" />
                        Data protection
                      </div>
                    </div>
                  </div>
                </div>
              </CardFooter>
            </div>
          </Card>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500">
              By proceeding, you agree to our{" "}
              <span className="text-emerald-400 hover:underline cursor-pointer">Exam Code of Conduct</span>
              {" "}and{" "}
              <span className="text-emerald-400 hover:underline cursor-pointer">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
