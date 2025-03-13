import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Volume2, VolumeX, AlertTriangle, Mic } from "lucide-react";

interface AudioVisualizerProps {
  audioStream?: MediaStream;
  isActive?: boolean;
  onAnomalyDetected?: (type: string, level: number) => void;
  studentName?: string;
}

const AudioVisualizer = ({
  audioStream = null,
  isActive = true,
  onAnomalyDetected = () => {},
  studentName = "Student",
}: AudioVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasAnomaly, setHasAnomaly] = useState<boolean>(false);
  const [anomalyType, setAnomalyType] = useState<string>("");
  const animationRef = useRef<number>();

  // Mock data for visualization
  const generateMockAudioData = () => {
    const dataPoints = 50;
    const mockData = [];

    // Generate a sine wave with some random noise
    for (let i = 0; i < dataPoints; i++) {
      // Base sine wave
      const base = Math.sin(i / 5) * 0.5 + 0.5;

      // Add random noise
      const noise = Math.random() * 0.3;

      // Combine with occasional spikes
      let value = base + noise;

      // Simulate occasional audio spikes
      if (Math.random() > 0.95) {
        value = Math.min(value * 2, 1);
      }

      mockData.push(value);
    }

    return mockData;
  };

  // Simulate random anomalies
  useEffect(() => {
    if (!isActive) return;

    const anomalyInterval = setInterval(() => {
      const shouldTriggerAnomaly = Math.random() > 0.85;

      if (shouldTriggerAnomaly) {
        const anomalyTypes = [
          "background_noise",
          "voice_detected",
          "multiple_voices",
        ];
        const randomType =
          anomalyTypes[Math.floor(Math.random() * anomalyTypes.length)];
        const anomalyLevel = 0.7 + Math.random() * 0.3; // Between 0.7 and 1.0

        setHasAnomaly(true);
        setAnomalyType(randomType);
        onAnomalyDetected(randomType, anomalyLevel);

        // Clear anomaly after a few seconds
        setTimeout(() => {
          setHasAnomaly(false);
          setAnomalyType("");
        }, 3000);
      }
    }, 5000);

    return () => clearInterval(anomalyInterval);
  }, [isActive, onAnomalyDetected]);

  // Draw audio waveform
  useEffect(() => {
    if (!canvasRef.current || !isActive) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawWaveform = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Get mock audio data
      const audioData = generateMockAudioData();

      // Calculate average audio level for the indicator
      const avgLevel =
        audioData.reduce((sum, val) => sum + val, 0) / audioData.length;
      setAudioLevel(isMuted ? 0 : avgLevel);

      // Set styles
      ctx.lineWidth = 2;

      // Draw waveform
      const sliceWidth = canvas.width / audioData.length;
      let x = 0;

      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);

      for (let i = 0; i < audioData.length; i++) {
        const y = isMuted
          ? canvas.height / 2
          : (1 - audioData[i]) * canvas.height;

        // Change color based on anomaly state
        if (hasAnomaly) {
          ctx.strokeStyle = "#f43f5e"; // Red for anomaly
        } else {
          ctx.strokeStyle = "#3b82f6"; // Blue for normal
        }

        ctx.lineTo(x, y);
        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Continue animation
      animationRef.current = requestAnimationFrame(drawWaveform);
    };

    drawWaveform();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, isMuted, hasAnomaly]);

  // Get anomaly message based on type
  const getAnomalyMessage = () => {
    switch (anomalyType) {
      case "background_noise":
        return "High background noise detected";
      case "voice_detected":
        return "Voice detected during silent period";
      case "multiple_voices":
        return "Multiple voices detected";
      default:
        return "Audio anomaly detected";
    }
  };

  return (
    <Card className="w-full h-full bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium">
            Audio Monitoring
          </CardTitle>
          <div className="flex space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800"
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isMuted ? "Unmute" : "Mute"} audio</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {hasAnomaly && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="text-red-500 animate-pulse">
                      <AlertTriangle size={16} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{getAnomalyMessage()}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="relative w-full h-[150px] bg-slate-100 dark:bg-slate-800 rounded-md overflow-hidden">
          <canvas
            ref={canvasRef}
            width={300}
            height={150}
            className="w-full h-full"
          />

          {/* Audio level indicator */}
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-slate-900/60 text-white text-xs px-2 py-1 rounded-full">
            <Mic size={12} />
            <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full ${hasAnomaly ? "bg-red-500" : "bg-green-500"}`}
                style={{ width: `${audioLevel * 100}%` }}
              />
            </div>
          </div>

          {/* Student name */}
          <div className="absolute top-2 left-2 bg-slate-900/60 text-white text-xs px-2 py-1 rounded-full">
            {studentName}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioVisualizer;
