import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";

interface ScreenRecordingProps {
  studentName?: string;
  examName?: string;
  isFullScreen?: boolean;
  isPlaying?: boolean;
  hasTabSwitched?: boolean;
  recordingUrl?: string;
  onFullScreenToggle?: () => void;
  onPlayPauseToggle?: () => void;
  onRestart?: () => void;
}

const ScreenRecording = ({
  studentName = "John Doe",
  examName = "Advanced Mathematics",
  isFullScreen = false,
  isPlaying = true,
  hasTabSwitched = false,
  recordingUrl = "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&q=80",
  onFullScreenToggle = () => {},
  onPlayPauseToggle = () => {},
  onRestart = () => {},
}: ScreenRecordingProps) => {
  const [localIsPlaying, setLocalIsPlaying] = useState(isPlaying);
  const [localIsFullScreen, setLocalIsFullScreen] = useState(isFullScreen);

  const handlePlayPause = () => {
    setLocalIsPlaying(!localIsPlaying);
    onPlayPauseToggle();
  };

  const handleFullScreenToggle = () => {
    setLocalIsFullScreen(!localIsFullScreen);
    onFullScreenToggle();
  };

  const handleRestart = () => {
    setLocalIsPlaying(true);
    onRestart();
  };

  return (
    <Card className="w-full h-full bg-slate-100 overflow-hidden flex flex-col">
      <CardHeader className="p-4 bg-slate-200">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">
            Screen Recording: {studentName}
          </CardTitle>
          {hasTabSwitched && (
            <div className="flex items-center text-amber-600">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Tab Switch Detected</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-grow relative">
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          {/* This would be a video player in a real implementation */}
          <img
            src={recordingUrl}
            alt="Student screen recording"
            className="w-full h-full object-contain"
          />
          {hasTabSwitched && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-red-600 text-white px-4 py-2 rounded-md font-bold">
                STUDENT NAVIGATED AWAY FROM TEST
              </div>
            </div>
          )}
          {!localIsPlaying && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <Play className="h-16 w-16 text-white opacity-70" />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-2 bg-slate-800 text-white flex justify-between items-center">
        <div className="text-sm">
          <span className="font-medium">{examName}</span>
          <span className="mx-2">•</span>
          <span>Live</span>
        </div>
        <div className="flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-slate-700"
                  onClick={handleRestart}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Restart recording</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-slate-700"
                  onClick={handlePlayPause}
                >
                  {localIsPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{localIsPlaying ? "Pause" : "Play"} recording</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-slate-700"
                  onClick={handleFullScreenToggle}
                >
                  {localIsFullScreen ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{localIsFullScreen ? "Exit" : "Enter"} fullscreen</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ScreenRecording;
