import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCog, Users, GraduationCap, ArrowRight } from "lucide-react";

interface LoginSelectorProps {
  onSelectRole: (role: "admin" | "proctor" | "student") => void;
}

const LoginSelector = ({ onSelectRole }: LoginSelectorProps) => {
  const currentYear = new Date().getFullYear();

  const roleCards = [
    {
      role: "admin" as const,
      icon: <UserCog className="h-10 w-10 text-blue-400" />,
      title: "Administrator",
      description: "Manage exams, proctors, and system settings.",
      buttonText: "Admin Login",
      buttonColor: "hover:bg-blue-600 border-blue-500",
    },
    {
      role: "proctor" as const,
      icon: <Users className="h-10 w-10 text-indigo-400" />,
      title: "Proctor",
      description: "Monitor exams and respond to suspicious activities.",
      buttonText: "Proctor Login",
      buttonColor: "hover:bg-indigo-600 border-indigo-500",
    },
    {
      role: "student" as const,
      icon: <GraduationCap className="h-10 w-10 text-purple-400" />,
      title: "Student",
      description: "Take exams with secure identity verification.",
      buttonText: "Student Login",
      buttonColor: "hover:bg-purple-600 border-purple-500",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 p-4 text-white">
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
            <span className="text-4xl font-bold text-blue-400">AP</span>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
            AI Proctoring Platform
          </h1>
          <p className="mt-4 text-xl text-slate-400">
            Secure, intelligent exam monitoring for the modern institution.
          </p>
        </div>

        <div className="grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          {roleCards.map((card) => (
            <Card
              key={card.role}
              className="group transform cursor-pointer overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-slate-600 hover:shadow-2xl hover:shadow-blue-900/50"
              onClick={() => onSelectRole(card.role)}
            >
              <CardHeader className="items-center text-center">
                <div className="mb-4 rounded-full bg-slate-700/50 p-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-slate-700">
                  {card.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-white">
                  {card.title}
                </CardTitle>
                <CardDescription className="text-slate-400">
                  {card.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className={`w-full rounded-lg border-2 border-slate-700 bg-transparent py-6 text-lg font-semibold text-white transition-all duration-300 group-hover:border-transparent ${card.buttonColor} group-hover:text-white`}
                >
                  {card.buttonText}
                  <ArrowRight className="ml-2 h-5 w-5 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <footer className="w-full py-4 text-center text-sm text-slate-500">
        &copy; {currentYear} AI Proctoring Platform. All rights reserved.
      </footer>
    </div>
  );
};

export default LoginSelector;
