import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  AlertTriangle,
  CheckCircle,
  X,
  Eye,
  Camera,
  Mic,
  Monitor,
} from "lucide-react";

interface ExamRulesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ExamRulesDialog = ({ open, onOpenChange }: ExamRulesDialogProps) => {
  const [agreedToRules, setAgreedToRules] = React.useState(false);

  const handleClose = () => {
    setAgreedToRules(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Exam Rules & Guidelines</DialogTitle>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-y-auto pr-2">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <Camera className="h-5 w-5 mr-2 text-blue-600" />
                Camera & Video Monitoring
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                  <span>
                    Your webcam must remain on and unobstructed throughout the
                    entire exam.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                  <span>
                    Your face must be clearly visible and well-lit at all times.
                  </span>
                </li>
                <li className="flex items-start">
                  <X className="h-4 w-4 mr-2 text-red-600 mt-0.5" />
                  <span>
                    Wearing hats, sunglasses, or masks that obscure your face is
                    not permitted.
                  </span>
                </li>
                <li className="flex items-start">
                  <X className="h-4 w-4 mr-2 text-red-600 mt-0.5" />
                  <span>
                    Multiple people in the camera view will trigger an alert and
                    may result in exam termination.
                  </span>
                </li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <Mic className="h-5 w-5 mr-2 text-blue-600" />
                Audio Monitoring
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                  <span>
                    Your microphone must remain on throughout the exam.
                  </span>
                </li>
                <li className="flex items-start">
                  <X className="h-4 w-4 mr-2 text-red-600 mt-0.5" />
                  <span>
                    Speaking aloud, unless specifically permitted, is not
                    allowed.
                  </span>
                </li>
                <li className="flex items-start">
                  <X className="h-4 w-4 mr-2 text-red-600 mt-0.5" />
                  <span>
                    Background conversations or noise may trigger an alert.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                  <span>
                    If you need to communicate with a proctor, use the "Raise
                    Hand" feature.
                  </span>
                </li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <Monitor className="h-5 w-5 mr-2 text-blue-600" />
                Screen Monitoring & Browser Behavior
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <X className="h-4 w-4 mr-2 text-red-600 mt-0.5" />
                  <span>
                    Navigating away from the exam tab or opening other
                    applications is strictly prohibited.
                  </span>
                </li>
                <li className="flex items-start">
                  <X className="h-4 w-4 mr-2 text-red-600 mt-0.5" />
                  <span>
                    Using additional monitors or displays is not permitted.
                  </span>
                </li>
                <li className="flex items-start">
                  <X className="h-4 w-4 mr-2 text-red-600 mt-0.5" />
                  <span>
                    Taking screenshots or recording the exam content is
                    prohibited.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                  <span>
                    Screen sharing must remain active throughout the exam.
                  </span>
                </li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <Eye className="h-5 w-5 mr-2 text-blue-600" />
                AI Proctoring & Monitoring
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                  <span>
                    AI systems will monitor your eye movements, facial
                    expressions, and audio.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                  <span>
                    Suspicious behavior will be flagged for review by human
                    proctors.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                  <span>
                    All exam sessions are recorded for security and review
                    purposes.
                  </span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="h-4 w-4 mr-2 text-amber-600 mt-0.5" />
                  <span>
                    Multiple violations may result in exam termination or
                    invalidation.
                  </span>
                </li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-amber-600" />
                Violations & Consequences
              </h3>
              <p className="text-sm mb-2">
                The following actions may result in warnings, exam termination,
                or academic penalties:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <X className="h-4 w-4 mr-2 text-red-600 mt-0.5" />
                  <span>Using unauthorized resources or materials</span>
                </li>
                <li className="flex items-start">
                  <X className="h-4 w-4 mr-2 text-red-600 mt-0.5" />
                  <span>Communicating with others during the exam</span>
                </li>
                <li className="flex items-start">
                  <X className="h-4 w-4 mr-2 text-red-600 mt-0.5" />
                  <span>Leaving the exam area without permission</span>
                </li>
                <li className="flex items-start">
                  <X className="h-4 w-4 mr-2 text-red-600 mt-0.5" />
                  <span>
                    Attempting to copy, share, or distribute exam content
                  </span>
                </li>
                <li className="flex items-start">
                  <X className="h-4 w-4 mr-2 text-red-600 mt-0.5" />
                  <span>Disabling or tampering with proctoring features</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-4">
          <Checkbox
            id="agree-rules"
            checked={agreedToRules}
            onCheckedChange={(checked) => setAgreedToRules(checked as boolean)}
          />
          <Label htmlFor="agree-rules" className="text-sm">
            I have read, understood, and agree to follow all exam rules and
            guidelines
          </Label>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
          <Button disabled={!agreedToRules}>Accept & Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExamRulesDialog;
