import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertTriangle, Home } from "lucide-react";

interface ExamCompleteProps {
  examName?: string;
  completionTime?: string;
  totalQuestions?: number;
  answeredQuestions?: number;
  suspicionScore?: "low" | "medium" | "high";
  onReturnToDashboard?: () => void;
}

const ExamComplete = ({
  examName = "Computer Science 101",
  completionTime = "1 hour 12 minutes",
  totalQuestions = 20,
  answeredQuestions = 18,
  suspicionScore = "low",
  onReturnToDashboard = () => {},
}: ExamCompleteProps) => {
  const progressPercentage = (answeredQuestions / totalQuestions) * 100;

  const getSuspicionBadge = (score: string) => {
    if (score === "low") {
      return (
        <Badge
          variant="outline"
          className="bg-green-100 text-green-800 border-green-300"
        >
          Low Suspicion
        </Badge>
      );
    }
    if (score === "medium") {
      return (
        <Badge
          variant="outline"
          className="bg-amber-100 text-amber-800 border-amber-300"
        >
          Medium Suspicion
        </Badge>
      );
    }
    if (score === "high") {
      return (
        <Badge
          variant="outline"
          className="bg-red-100 text-red-800 border-red-300"
        >
          High Suspicion
        </Badge>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center bg-green-50 border-b border-green-100">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-800">
            Exam Submitted Successfully
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-1">{examName}</h2>
            <p className="text-slate-500">
              Your exam has been submitted and is now being processed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-md border">
              <div className="flex items-center mb-2">
                <Clock className="h-5 w-5 mr-2 text-slate-500" />
                <h3 className="font-medium">Completion Time</h3>
              </div>
              <p>{completionTime}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-md border">
              <div className="flex items-center mb-2">
                <AlertTriangle className="h-5 w-5 mr-2 text-slate-500" />
                <h3 className="font-medium">Proctoring Status</h3>
              </div>
              <div>{getSuspicionBadge(suspicionScore)}</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Questions Answered</span>
              <span>
                {answeredQuestions} of {totalQuestions}
              </span>
            </div>
            <Progress value={progressPercentage} />
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-md p-4 text-blue-800">
            <h3 className="font-medium mb-2">What happens next?</h3>
            <ul className="space-y-1 text-sm">
              <li>Your exam will be graded by your instructor.</li>
              <li>Any flagged incidents will be reviewed by a proctor.</li>
              <li>
                Results will be available on your dashboard once grading is
                complete.
              </li>
              <li>
                You will receive an email notification when your results are
                ready.
              </li>
            </ul>
          </div>

          <div className="flex justify-center pt-4">
            <Button onClick={onReturnToDashboard} className="w-full md:w-auto">
              <Home className="h-4 w-4 mr-2" />
              Return to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamComplete;
