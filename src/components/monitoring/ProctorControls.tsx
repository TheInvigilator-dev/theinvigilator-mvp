import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  MessageCircle,
  AlertTriangle,
  Pause,
  X,
  Video,
  Mic,
  MicOff,
  VideoOff,
  MessageSquare,
} from "lucide-react";

interface ProctorControlsProps {
  studentName?: string;
  examName?: string;
  onSendWarning?: () => void;
  onPauseExam?: () => void;
  onTerminateExam?: () => void;
  onStartChat?: () => void;
  onToggleVideo?: (enabled: boolean) => void;
  onToggleAudio?: (enabled: boolean) => void;
}

const ProctorControls = ({
  studentName = "John Doe",
  examName = "Advanced Mathematics",
  onSendWarning = () => console.log("Warning sent"),
  onPauseExam = () => console.log("Exam paused"),
  onTerminateExam = () => console.log("Exam terminated"),
  onStartChat = () => console.log("Chat started"),
  onToggleVideo = (enabled) =>
    console.log(`Video ${enabled ? "enabled" : "disabled"}`),
  onToggleAudio = (enabled) =>
    console.log(`Audio ${enabled ? "enabled" : "disabled"}`),
}: ProctorControlsProps) => {
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isTerminateDialogOpen, setIsTerminateDialogOpen] = useState(false);

  const handleToggleVideo = () => {
    const newState = !isVideoEnabled;
    setIsVideoEnabled(newState);
    onToggleVideo(newState);
  };

  const handleToggleAudio = () => {
    const newState = !isAudioEnabled;
    setIsAudioEnabled(newState);
    onToggleAudio(newState);
  };

  return (
    <div className="w-full bg-slate-900 p-4 rounded-md shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <h3 className="text-white font-medium">
            Monitoring: <span className="font-bold">{studentName}</span> -{" "}
            {examName}
          </h3>
        </div>

        <div className="flex flex-wrap justify-center md:justify-end gap-2">
          {/* Media Controls */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleToggleVideo}
                  className={
                    isVideoEnabled
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-slate-700 hover:bg-slate-800"
                  }
                >
                  {isVideoEnabled ? (
                    <Video className="h-4 w-4 text-white" />
                  ) : (
                    <VideoOff className="h-4 w-4 text-white" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isVideoEnabled ? "Disable" : "Enable"} student video</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleToggleAudio}
                  className={
                    isAudioEnabled
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-slate-700 hover:bg-slate-800"
                  }
                >
                  {isAudioEnabled ? (
                    <Mic className="h-4 w-4 text-white" />
                  ) : (
                    <MicOff className="h-4 w-4 text-white" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isAudioEnabled ? "Disable" : "Enable"} student audio</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Action Controls */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onStartChat}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <MessageSquare className="h-4 w-4 text-white" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Chat with student</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onSendWarning}
                  className="bg-amber-500 hover:bg-amber-600"
                >
                  <AlertTriangle className="h-4 w-4 text-white" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Send warning</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onPauseExam}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  <Pause className="h-4 w-4 text-white" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Pause exam</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Dialog
            open={isTerminateDialogOpen}
            onOpenChange={setIsTerminateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="bg-red-600 hover:bg-red-700"
              >
                <X className="h-4 w-4 text-white" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Terminate Exam</DialogTitle>
                <DialogDescription>
                  Are you sure you want to terminate the exam for {studentName}?
                  This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsTerminateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    onTerminateExam();
                    setIsTerminateDialogOpen(false);
                  }}
                >
                  Terminate Exam
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ProctorControls;
