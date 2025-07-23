import React, { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, ArrowLeft, Eye, EyeOff, Monitor, Lock, Mail, Loader2, Shield } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ProctorLoginProps {
  onLogin?: (email: string, password: string) => void;
  onBack?: () => void;
}

const ProctorLogin = ({
  onLogin = () => { },
  onBack = () => { },
}: ProctorLoginProps) => {
  const [email, setEmail] = useState("proctor@example.com");
  const [password, setPassword] = useState("password123");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Proctor Logged In:", { email, rememberMe });
      onLogin(email, password);
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-32 left-32 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-10 w-16 h-16 bg-blue-500/5 rounded-full blur-xl animate-pulse delay-500" />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
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
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10 shadow-2xl">
                <Monitor className="h-10 w-10 text-indigo-400" />
              </div>
              <div className="absolute -inset-3 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-xl -z-10" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Proctor Portal</h1>
            <p className="text-slate-400">Monitor exams and ensure academic integrity</p>
          </div>

          {/* Login Card */}
          <Card className="border-0 bg-white/5 backdrop-blur-2xl shadow-2xl">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-px">
              <div className="h-full w-full rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl" />
            </div>

            <div className="relative z-10">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl text-white font-semibold">Welcome Back</CardTitle>
                <CardDescription className="text-slate-400">
                  Access your proctoring dashboard
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <Alert className="bg-red-500/10 border-red-500/20 backdrop-blur-sm">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <AlertDescription className="text-red-400">{error}</AlertDescription>
                    </Alert>
                  )}

                  {/* Demo Credentials Notice */}
                  <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center mb-2">
                      <Shield className="h-4 w-4 text-indigo-400 mr-2" />
                      <span className="text-sm text-indigo-300 font-medium">Demo Credentials</span>
                    </div>
                    <p className="text-xs text-indigo-200/80">
                      Demo credentials are pre-filled for testing purposes
                    </p>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-300 font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                        <Mail className="h-5 w-5 text-slate-400" />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        placeholder="proctor@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`pl-12 h-12 border-0 bg-white/5 backdrop-blur-sm text-white placeholder:text-slate-500 transition-all duration-200 ${focusedField === 'email'
                          ? 'ring-2 ring-indigo-500/50 bg-white/10'
                          : 'ring-1 ring-white/10 hover:ring-white/20'
                          }`}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-slate-300 font-medium">
                        Password
                      </Label>
                      <button
                        type="button"
                        className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                        <Lock className="h-5 w-5 text-slate-400" />
                      </div>
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`pl-12 pr-12 h-12 border-0 bg-white/5 backdrop-blur-sm text-white placeholder:text-slate-500 transition-all duration-200 ${focusedField === 'password'
                          ? 'ring-2 ring-indigo-500/50 bg-white/10'
                          : 'ring-1 ring-white/10 hover:ring-white/20'
                          }`}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(!!checked)}
                      className="border-white/20 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                    />
                    <Label
                      htmlFor="remember"
                      className="text-sm font-normal text-slate-300 cursor-pointer"
                    >
                      Keep me signed in for 30 days
                    </Label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      <>
                        <Monitor className="mr-2 h-5 w-5" />
                        Access Dashboard
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>

              <CardFooter className="pt-6">
                <div className="w-full">
                  {/* Quick Access Features */}
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10 mb-4">
                    <div className="flex items-center justify-center mb-3">
                      <Monitor className="h-4 w-4 text-indigo-400 mr-2" />
                      <span className="text-sm text-slate-300 font-medium">Proctoring Features</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                      <div className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-2" />
                        Live monitoring
                      </div>
                      <div className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2" />
                        AI detection
                      </div>
                      <div className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                        Real-time alerts
                      </div>
                      <div className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2" />
                        Incident reports
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
              By signing in, you agree to our{" "}
              <span className="text-indigo-400 hover:underline cursor-pointer">Terms of Service</span>
              {" "}and{" "}
              <span className="text-indigo-400 hover:underline cursor-pointer">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProctorLogin;
