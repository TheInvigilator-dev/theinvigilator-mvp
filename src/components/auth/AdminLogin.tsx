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
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AdminLoginProps {
  onLogin?: (email: string, password: string) => void;
  onBackToSelector?: () => void;
}

const AdminLogin = ({
  onLogin = () => { },
  onBackToSelector = () => { },
}: AdminLoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
            <span className="text-2xl font-bold text-blue-400">AP</span>
          </div>
          <h1 className="text-4xl font-bold text-white">AI Proctoring</h1>
          <p className="mt-2 text-slate-400">Administrator Portal</p>
        </div>

        <Card className="rounded-xl border-slate-700 bg-slate-800/50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Admin Login</CardTitle>
            <CardDescription className="text-slate-400">
              Enter your credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {error && (
                <Alert variant="destructive" className="mb-4 bg-red-900/20 border-red-500/30 text-red-400">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-slate-600 bg-slate-900/50 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-slate-300">Password</Label>
                    <a
                      href="#"
                      className="text-sm text-blue-400 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-slate-600 bg-slate-900/50 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                    className="border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm font-normal text-slate-400"
                  >
                    Remember me
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                className="mt-6 w-full bg-blue-600 py-3 text-base font-semibold hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-slate-700 p-4">
            <Button variant="link" onClick={onBackToSelector} className="text-sm text-slate-400 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to role selection
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
