import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertCircle, Eye, MessageCircle, MoreVertical } from "lucide-react";

interface TestTaker {
  id: string;
  name: string;
  examName: string;
  progress: number;
  status: "normal" | "warning" | "flagged";
  imageUrl: string;
  timeRemaining: string;
  alerts?: number;
}

interface LiveTestTakerGridProps {
  testTakers?: TestTaker[];
  onViewDetails?: (testTakerId: string) => void;
  onSendMessage?: (testTakerId: string) => void;
  onViewAlerts?: (testTakerId: string) => void;
}

const LiveTestTakerGrid = ({
  testTakers = [
    {
      id: "1",
      name: "Emily Johnson",
      examName: "Advanced Mathematics",
      progress: 45,
      status: "normal",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      timeRemaining: "32:15",
      alerts: 0,
    },
    {
      id: "2",
      name: "Michael Chen",
      examName: "Computer Science 101",
      progress: 78,
      status: "warning",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      timeRemaining: "45:22",
      alerts: 1,
    },
    {
      id: "3",
      name: "Sarah Williams",
      examName: "Biology Final",
      progress: 62,
      status: "normal",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      timeRemaining: "28:40",
      alerts: 0,
    },
    {
      id: "4",
      name: "David Rodriguez",
      examName: "History Midterm",
      progress: 33,
      status: "flagged",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      timeRemaining: "51:10",
      alerts: 3,
    },
    {
      id: "5",
      name: "Jessica Lee",
      examName: "English Literature",
      progress: 90,
      status: "normal",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
      timeRemaining: "12:05",
      alerts: 0,
    },
    {
      id: "6",
      name: "James Wilson",
      examName: "Physics 202",
      progress: 55,
      status: "warning",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      timeRemaining: "38:45",
      alerts: 2,
    },
    {
      id: "7",
      name: "Olivia Martinez",
      examName: "Calculus II",
      progress: 70,
      status: "normal",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
      timeRemaining: "25:30",
      alerts: 0,
    },
    {
      id: "8",
      name: "Daniel Kim",
      examName: "Chemistry Lab",
      progress: 85,
      status: "normal",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel",
      timeRemaining: "18:20",
      alerts: 0,
    },
    {
      id: "9",
      name: "Sophia Garcia",
      examName: "Psychology 101",
      progress: 40,
      status: "flagged",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
      timeRemaining: "42:15",
      alerts: 4,
    },
  ],
  onViewDetails = () => {},
  onSendMessage = () => {},
  onViewAlerts = () => {},
}: LiveTestTakerGridProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getStatusColor = (status: TestTaker["status"]) => {
    switch (status) {
      case "warning":
        return "bg-yellow-500";
      case "flagged":
        return "bg-red-500";
      default:
        return "bg-green-500";
    }
  };

  const getStatusVariant = (status: TestTaker["status"]) => {
    switch (status) {
      case "warning":
        return "secondary";
      case "flagged":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Live Test Takers</h2>
        <div className="flex gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>Normal</span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <span>Warning</span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span>Flagged</span>
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testTakers.map((testTaker) => (
          <Card
            key={testTaker.id}
            className={`overflow-hidden relative ${testTaker.status === "flagged" ? "border-red-500 border-2" : testTaker.status === "warning" ? "border-yellow-500 border-2" : ""}`}
            onMouseEnter={() => setHoveredId(testTaker.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="absolute top-2 right-2 flex gap-1">
              <div
                className={`w-3 h-3 rounded-full ${getStatusColor(testTaker.status)}`}
              ></div>
              {testTaker.alerts && testTaker.alerts > 0 && (
                <Badge variant="destructive" className="ml-1">
                  {testTaker.alerts}
                </Badge>
              )}
            </div>

            <CardHeader className="p-4 pb-0">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{testTaker.name}</CardTitle>
              </div>
              <p className="text-sm text-gray-500 mt-1">{testTaker.examName}</p>
            </CardHeader>

            <CardContent className="p-4">
              <div className="relative w-full h-32 mb-3 bg-gray-100 rounded-md overflow-hidden">
                <img
                  src={testTaker.imageUrl}
                  alt={`${testTaker.name} video feed`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                  {testTaker.timeRemaining}
                </div>
              </div>

              <div className="mt-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{testTaker.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${testTaker.status === "flagged" ? "bg-red-500" : testTaker.status === "warning" ? "bg-yellow-500" : "bg-blue-600"}`}
                    style={{ width: `${testTaker.progress}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <div className="flex justify-between w-full">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewDetails(testTaker.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View Details</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onSendMessage(testTaker.id)}
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Send Message</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {testTaker.alerts && testTaker.alerts > 0 && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={getStatusVariant(testTaker.status)}
                          size="sm"
                          onClick={() => onViewAlerts(testTaker.id)}
                        >
                          <AlertCircle className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Alerts</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LiveTestTakerGrid;
