import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCog, Users, GraduationCap } from "lucide-react";

interface LoginSelectorProps {
  onSelectRole: (role: "admin" | "proctor" | "student") => void;
}

const LoginSelector = ({ onSelectRole }: LoginSelectorProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900 p-4">
      <div className="w-full max-w-4xl">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600">
            <span className="text-3xl font-bold text-white">AP</span>
          </div>
          <h1 className="text-4xl font-bold text-white">
            AI Proctoring Platform
          </h1>
          <p className="mt-3 text-xl text-slate-300">
            Secure, intelligent exam monitoring for educational institutions
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="overflow-hidden border-0 shadow-xl transition-all duration-200 hover:shadow-blue-900/20 hover:shadow-2xl">
            <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-4">
              <UserCog className="h-8 w-8 text-white" />
            </div>
            <CardHeader>
              <CardTitle>Administrator</CardTitle>
              <CardDescription>
                Manage exams, proctors, and system settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="mb-6 space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span> Create and
                  schedule exams
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span> Assign proctors
                  to sessions
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span> View
                  comprehensive reports
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span> Configure
                  system settings
                </li>
              </ul>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => onSelectRole("admin")}
              >
                Admin Login
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-0 shadow-xl transition-all duration-200 hover:shadow-blue-900/20 hover:shadow-2xl">
            <div className="bg-gradient-to-r from-indigo-700 to-indigo-900 p-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <CardHeader>
              <CardTitle>Proctor</CardTitle>
              <CardDescription>
                Monitor exams and respond to suspicious activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="mb-6 space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span> Live monitoring
                  of test-takers
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span> Review
                  AI-flagged incidents
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span> Communicate
                  with students
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span> Pause or
                  terminate exams
                </li>
              </ul>
              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                onClick={() => onSelectRole("proctor")}
              >
                Proctor Login
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-0 shadow-xl transition-all duration-200 hover:shadow-blue-900/20 hover:shadow-2xl">
            <div className="bg-gradient-to-r from-purple-700 to-purple-900 p-4">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <CardHeader>
              <CardTitle>Student</CardTitle>
              <CardDescription>
                Take exams with secure identity verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="mb-6 space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span> Access
                  scheduled exams
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span> Secure identity
                  verification
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>{" "}
                  Distraction-free test environment
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span> Get help from
                  proctors
                </li>
              </ul>
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={() => onSelectRole("student")}
              >
                Student Login
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center text-sm text-slate-400">
          © 2023 AI Proctoring Platform. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default LoginSelector;
