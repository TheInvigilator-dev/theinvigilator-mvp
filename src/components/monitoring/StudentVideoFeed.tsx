import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  AlertCircle,
  CheckCircle,
  Camera,
  Eye,
  EyeOff,
  AlertTriangle,
} from "lucide-react";

interface FaceDetectionPoint {
  x: number;
  y: number;
}

interface FaceTrackingData {
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  landmarks: FaceDetectionPoint[];
  verified: boolean;
  confidence: number;
}

interface StudentVideoFeedProps {
  studentId?: string;
  studentName?: string;
  examName?: string;
  videoUrl?: string;
  faceTrackingData?: FaceTrackingData;
  isVerified?: boolean;
  suspiciousMovements?: boolean;
  onToggleFullscreen?: () => void;
}

const StudentVideoFeed: React.FC<StudentVideoFeedProps> = ({
  studentId = "STU12345",
  studentName = "Jane Smith",
  examName = "Advanced Mathematics",
  videoUrl = "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&q=80",
  faceTrackingData = {
    boundingBox: { x: 120, y: 80, width: 400, height: 320 },
    landmarks: [
      { x: 220, y: 180 }, // left eye
      { x: 420, y: 180 }, // right eye
      { x: 320, y: 240 }, // nose
      { x: 320, y: 320 }, // mouth
    ],
    verified: true,
    confidence: 0.92,
  },
  isVerified = true,
  suspiciousMovements = false,
  onToggleFullscreen = () => console.log("Toggle fullscreen"),
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  // Simulate face tracking updates
  useEffect(() => {
    const interval = setInterval(() => {
      // This would normally be updated by actual face tracking AI
      // Just adding a small random movement for demo purposes
      const randomMovement = () => (Math.random() - 0.5) * 10;

      // This is just for UI demonstration purposes
      console.log("Face tracking update", randomMovement());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    onToggleFullscreen();
  };

  const handleToggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  return (
    <Card className="w-full max-w-[640px] bg-slate-900 text-white overflow-hidden">
      <CardHeader className="bg-slate-800 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{studentName}</CardTitle>
          <div className="flex space-x-2">
            {isVerified ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge
                      variant="secondary"
                      className="bg-green-600 hover:bg-green-700 flex items-center gap-1"
                    >
                      <CheckCircle size={12} />
                      <span>Verified</span>
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Face successfully verified</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge
                      variant="destructive"
                      className="flex items-center gap-1"
                    >
                      <AlertCircle size={12} />
                      <span>Not Verified</span>
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Face verification failed</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {suspiciousMovements && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge
                      variant="destructive"
                      className="flex items-center gap-1"
                    >
                      <AlertTriangle size={12} />
                      <span>Suspicious Movement</span>
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Unusual movements detected</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
        <div className="text-xs text-slate-400">
          {examName} • ID: {studentId}
        </div>
      </CardHeader>

      <CardContent className="p-0 relative">
        <div className="relative w-full h-[480px] bg-black">
          {/* Student video feed */}
          <img
            src={videoUrl}
            alt={`${studentName} video feed`}
            className="w-full h-full object-cover"
            style={{ opacity: isVideoPlaying ? 1 : 0.5 }}
          />

          {/* Face tracking overlay */}
          {faceTrackingData && isVideoPlaying && (
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {/* Bounding box */}
              <div
                className="absolute border-2 border-blue-500 rounded-md"
                style={{
                  left: `${faceTrackingData.boundingBox.x}px`,
                  top: `${faceTrackingData.boundingBox.y}px`,
                  width: `${faceTrackingData.boundingBox.width}px`,
                  height: `${faceTrackingData.boundingBox.height}px`,
                }}
              />

              {/* Facial landmarks */}
              {faceTrackingData.landmarks.map((point, index) => (
                <div
                  key={index}
                  className="absolute w-2 h-2 bg-green-500 rounded-full"
                  style={{
                    left: `${point.x}px`,
                    top: `${point.y}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}

              {/* Confidence indicator */}
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-md text-sm">
                Confidence: {(faceTrackingData.confidence * 100).toFixed(1)}%
              </div>
            </div>
          )}

          {/* Controls overlay */}
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <button
              onClick={handleToggleVideo}
              className="p-2 bg-slate-800/80 rounded-full hover:bg-slate-700/80 transition-colors"
            >
              {isVideoPlaying ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            <button
              onClick={handleToggleFullscreen}
              className="p-2 bg-slate-800/80 rounded-full hover:bg-slate-700/80 transition-colors"
            >
              <Camera size={20} />
            </button>
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-slate-800 py-2 px-4 text-xs text-slate-400">
        <div className="flex justify-between w-full items-center">
          <span>Camera: Webcam HD Pro</span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Live
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default StudentVideoFeed;
