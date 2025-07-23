import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCog, Users, GraduationCap, ArrowRight, Shield, Monitor, BookOpen } from "lucide-react";

interface LoginSelectorProps {
  onSelectRole: (role: "admin" | "proctor" | "student") => void;
}

const LoginSelector = ({ onSelectRole }: LoginSelectorProps) => {
  const currentYear = new Date().getFullYear();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const roleCards = [
    {
      role: "admin" as const,
      icon: <UserCog className="h-12 w-12 text-blue-500" />,
      title: "Administrator",
      description: "Complete system control and management capabilities",
      features: ["Manage all users", "System configuration", "Analytics & reports"],
      buttonText: "Admin Portal",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
      borderGradient: "from-blue-500/50 to-cyan-500/50",
    },
    {
      role: "proctor" as const,
      icon: <Monitor className="h-12 w-12 text-indigo-500" />,
      title: "Proctor",
      description: "Real-time monitoring and incident response",
      features: ["Live exam monitoring", "AI-assisted detection", "Communication tools"],
      buttonText: "Proctor Dashboard",
      gradient: "from-indigo-500 to-purple-500",
      bgGradient: "from-indigo-500/10 to-purple-500/10",
      borderGradient: "from-indigo-500/50 to-purple-500/50",
    },
    {
      role: "student" as const,
      icon: <BookOpen className="h-12 w-12 text-teal-500" />,
      title: "Student",
      description: "Secure examination environment with identity verification",
      features: ["Identity verification", "Secure exam taking", "Real-time support"],
      buttonText: "Student Portal",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-500/10 to-teal-500/10",
      borderGradient: "from-emerald-500/50 to-teal-500/50",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.1),transparent_50%)]" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute top-60 right-32 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl animate-pulse delay-500" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4 text-white">
        <div className="flex flex-1 flex-col items-center justify-center max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-16 text-center">
            <div className="relative mb-8">
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10 shadow-2xl">
                <Shield className="h-16 w-16 text-white drop-shadow-lg" />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl -z-10" />
            </div>

            <h1 className="text-6xl font-black tracking-tight text-white sm:text-7xl mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              The Invigilator
            </h1>
            <p className="text-2xl text-slate-300 font-light mb-4 max-w-3xl mx-auto leading-relaxed">
              Next-generation AI-powered exam monitoring platform
            </p>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Ensuring academic integrity through intelligent surveillance and real-time analysis
            </p>
          </div>

          {/* Role Cards */}
          <div className="grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
            {roleCards.map((card, index) => (
              <Card
                key={card.role}
                className={`group relative cursor-pointer overflow-hidden rounded-3xl border-0 bg-white/5 backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-2xl ${hoveredCard === card.role ? 'scale-105' : ''
                  }`}
                style={{
                  animationDelay: `${index * 150}ms`,
                  background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`,
                  backdropFilter: 'blur(20px)',
                  boxShadow: hoveredCard === card.role
                    ? `0 25px 50px -12px rgba(0,0,0,0.25), 0 0 50px rgba(59,130,246,0.3)`
                    : '0 25px 50px -12px rgba(0,0,0,0.25)',
                }}
                onClick={() => onSelectRole(card.role)}
                onMouseEnter={() => setHoveredCard(card.role)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Gradient Border */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${card.borderGradient} p-px`}>
                  <div className="h-full w-full rounded-3xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-8">
                  <CardHeader className="items-center text-center p-0 mb-6">
                    <div className={`mb-6 rounded-2xl bg-gradient-to-br ${card.bgGradient} p-6 transition-all duration-300 group-hover:scale-110 backdrop-blur-sm border border-white/10`}>
                      <div className={`text-transparent bg-gradient-to-r ${card.gradient} bg-clip-text`}>
                        {card.icon}
                      </div>
                    </div>
                    <CardTitle className="text-3xl font-bold text-white mb-3">
                      {card.title}
                    </CardTitle>
                    <CardDescription className="text-slate-300 text-lg leading-relaxed">
                      {card.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-0">
                    {/* Features List */}
                    <div className="mb-8 space-y-3">
                      {card.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-slate-300">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${card.gradient} mr-3 flex-shrink-0`} />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Button
                      className={`w-full rounded-2xl bg-gradient-to-r ${card.gradient} hover:shadow-lg hover:shadow-blue-500/25 py-6 text-lg font-semibold text-white transition-all duration-300 border-0 group-hover:scale-105`}
                    >
                      <span>{card.buttonText}</span>
                      <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </div>

                {/* Hover Effect Overlay */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${card.bgGradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
              </Card>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-slate-400 text-sm">Uptime Reliability</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">500K+</div>
              <div className="text-slate-400 text-sm">Exams Monitored</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">ISO 27001</div>
              <div className="text-slate-400 text-sm">Security Certified</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full py-8 text-center">
          <div className="text-slate-500 text-sm">
            &copy; {currentYear} SecureProctor. All rights reserved.
            <span className="mx-2">•</span>
            <span className="text-slate-400">Powered by Advanced AI Technology</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LoginSelector;
