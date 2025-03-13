import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Clock,
  AlertTriangle,
  HelpCircle,
  Send,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ExamInProgressProps {
  examName?: string;
  examDuration?: number; // in minutes
  totalQuestions?: number;
  onSubmit?: () => void;
}

const ExamInProgress = ({
  examName = "Computer Science 101",
  examDuration = 90,
  totalQuestions = 20,
  onSubmit = () => {},
}: ExamInProgressProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(examDuration * 60); // in seconds
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Format time remaining as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate random warnings
  useEffect(() => {
    const warningInterval = setInterval(() => {
      // 10% chance of showing a warning
      if (Math.random() < 0.1) {
        const warnings = [
          "Please keep your face clearly visible in the camera.",
          "Unusual background noise detected.",
          "Please focus on the exam window.",
        ];
        const randomWarning =
          warnings[Math.floor(Math.random() * warnings.length)];
        setWarningMessage(randomWarning);
        setShowWarning(true);

        // Hide warning after 5 seconds
        setTimeout(() => {
          setShowWarning(false);
        }, 5000);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(warningInterval);
  }, []);

  // Handle answer selection
  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  // Handle navigation between questions
  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1] || "");
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || "");
    }
  };

  // Handle exam submission
  const handleSubmitExam = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit();
      window.location.href = "/exam-complete";
    }, 2000);
  };

  // Calculate progress percentage
  const answeredQuestions = Object.keys(answers).length;
  const progressPercentage = (answeredQuestions / totalQuestions) * 100;

  // Mock question data
  const getQuestionData = (questionNumber: number) => {
    const questions = [
      {
        id: 1,
        text: "What is the time complexity of a binary search algorithm?",
        options: [
          { id: "a", text: "O(1)" },
          { id: "b", text: "O(log n)" },
          { id: "c", text: "O(n)" },
          { id: "d", text: "O(n²)" },
        ],
      },
      {
        id: 2,
        text: "Which of the following is NOT a primitive data type in JavaScript?",
        options: [
          { id: "a", text: "String" },
          { id: "b", text: "Number" },
          { id: "c", text: "Object" },
          { id: "d", text: "Boolean" },
        ],
      },
      {
        id: 3,
        text: "What does CSS stand for?",
        options: [
          { id: "a", text: "Computer Style Sheets" },
          { id: "b", text: "Creative Style Sheets" },
          { id: "c", text: "Cascading Style Sheets" },
          { id: "d", text: "Colorful Style Sheets" },
        ],
      },
      {
        id: 4,
        text: "Explain the concept of recursion in programming and provide a simple example.",
        isEssay: true,
      },
      {
        id: 5,
        text: "Which sorting algorithm has the best average-case performance?",
        options: [
          { id: "a", text: "Bubble Sort" },
          { id: "b", text: "Insertion Sort" },
          { id: "c", text: "Quick Sort" },
          { id: "d", text: "Selection Sort" },
        ],
      },
    ];

    // Return a question based on the number, or cycle through the available ones
    return questions[(questionNumber - 1) % questions.length];
  };

  const currentQuestionData = getQuestionData(currentQuestion);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header with exam info and timer */}
      <header className="bg-slate-900 text-white p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">{examName}</h1>
            <p className="text-sm text-slate-300">
              Question {currentQuestion} of {totalQuestions}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-amber-400" />
              <span
                className={`font-mono text-lg ${timeRemaining < 300 ? "text-red-400 animate-pulse" : ""}`}
              >
                {formatTime(timeRemaining)}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHelpDialog(true)}
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Help
            </Button>
          </div>
        </div>
      </header>

      {/* Warning alert */}
      {showWarning && (
        <div className="bg-amber-500 text-white p-2 text-center animate-pulse">
          <div className="container mx-auto flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <span>{warningMessage}</span>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-grow container mx-auto py-8 px-4 flex flex-col md:flex-row gap-6">
        {/* Question panel */}
        <div className="flex-grow space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">
              Question {currentQuestion}
            </h2>
            <p className="mb-6">{currentQuestionData.text}</p>

            {currentQuestionData.isEssay ? (
              <div className="space-y-2">
                <Label htmlFor="essay-answer">Your Answer:</Label>
                <Textarea
                  id="essay-answer"
                  placeholder="Type your answer here..."
                  value={answers[currentQuestion] || ""}
                  onChange={(e) => handleAnswerSelect(e.target.value)}
                  className="min-h-[200px]"
                />
              </div>
            ) : (
              <RadioGroup
                value={selectedAnswer}
                onValueChange={handleAnswerSelect}
              >
                <div className="space-y-3">
                  {currentQuestionData.options?.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center space-x-2 border p-3 rounded-md hover:bg-slate-50"
                    >
                      <RadioGroupItem
                        value={option.id}
                        id={`option-${option.id}`}
                      />
                      <Label
                        htmlFor={`option-${option.id}`}
                        className="flex-grow cursor-pointer"
                      >
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            )}
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button variant="outline" onClick={() => setShowSubmitDialog(true)}>
              Submit Exam
            </Button>
            <Button
              onClick={handleNextQuestion}
              disabled={currentQuestion === totalQuestions}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Question navigator sidebar */}
        <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow-sm border h-fit sticky top-24">
          <h3 className="font-semibold mb-2">Progress</h3>
          <Progress value={progressPercentage} className="mb-4" />
          <p className="text-sm text-slate-500 mb-4">
            {answeredQuestions} of {totalQuestions} questions answered
          </p>

          <Separator className="my-4" />

          <h3 className="font-semibold mb-2">Questions</h3>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: totalQuestions }, (_, i) => i + 1).map(
              (num) => (
                <Button
                  key={num}
                  variant={
                    num === currentQuestion
                      ? "default"
                      : answers[num]
                        ? "outline"
                        : "ghost"
                  }
                  className={`h-10 w-10 p-0 ${answers[num] ? "border-green-500" : ""}`}
                  onClick={() => {
                    setCurrentQuestion(num);
                    setSelectedAnswer(answers[num] || "");
                  }}
                >
                  {num}
                </Button>
              ),
            )}
          </div>
        </div>
      </main>

      {/* Help Dialog */}
      <Dialog open={showHelpDialog} onOpenChange={setShowHelpDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Need Help?</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              If you're experiencing technical issues or have a question about
              the exam, please describe your problem below:
            </p>
            <Textarea
              placeholder="Describe your issue..."
              className="min-h-[100px]"
            />
            <Alert className="bg-blue-50 border-blue-200">
              <AlertDescription className="text-blue-800">
                Note: Requesting help will notify a proctor. They may contact
                you via chat.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowHelpDialog(false)}>
              Cancel
            </Button>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              Send Help Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Submit Confirmation Dialog */}
      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Exam?</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              Are you sure you want to submit your exam? You still have{" "}
              {formatTime(timeRemaining)} remaining.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
              <p className="font-medium text-amber-800 mb-2">
                Submission Summary:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Total Questions:</span>
                  <span>{totalQuestions}</span>
                </li>
                <li className="flex justify-between">
                  <span>Answered Questions:</span>
                  <span>{answeredQuestions}</span>
                </li>
                <li className="flex justify-between">
                  <span>Unanswered Questions:</span>
                  <span>{totalQuestions - answeredQuestions}</span>
                </li>
              </ul>
            </div>

            {totalQuestions - answeredQuestions > 0 && (
              <Alert className="bg-red-50 border-red-200">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  Warning: You have {totalQuestions - answeredQuestions}{" "}
                  unanswered questions.
                </AlertDescription>
              </Alert>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowSubmitDialog(false)}
            >
              Continue Exam
            </Button>
            <Button
              onClick={handleSubmitExam}
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirm Submission
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExamInProgress;
