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
import { AlertCircle, ArrowLeft, Eye, EyeOff } from "lucide-react";
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Proctor Logged In:", { email, rememberMe });
      onLogin(email, password);
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4 text-white">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
            <span className="text-3xl font-bold text-indigo-400">AP</span>
          </div>
          <h1 className="text-4xl font-bold text-white">Proctor Portal</h1>
          <p className="mt-2 text-slate-400">
            Monitor exams and ensure academic integrity.
          </p>
        </div>

        <Card className="rounded-xl border border-slate-700 bg-slate-800/50 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Proctor Login</CardTitle>
            <CardDescription className="text-slate-400">
              Enter your credentials to monitor exams.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {error && (
                <Alert variant="destructive" className="mb-4 border-red-500/50 bg-red-500/10 text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="proctor@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-slate-600 bg-slate-700/50 text-white placeholder:text-slate-400 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-slate-300">Password</Label>
                    <a
                      href="#"
                      className="text-sm text-indigo-400 hover:text-indigo-300 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-slate-600 bg-slate-700/50 text-white placeholder:text-slate-400 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
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

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                    className="border-slate-600 data-[state=checked]:bg-indigo-600 data-[state=checked]:text-white"
                  />
                  <Label
                    htmlFor="remember"
                    className="cursor-pointer text-sm font-normal text-slate-300"
                  >
                    Remember me
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                className="mt-6 w-full bg-indigo-600 py-6 text-lg font-semibold text-white transition-all hover:bg-indigo-700 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
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

export default ProctorLogin;
