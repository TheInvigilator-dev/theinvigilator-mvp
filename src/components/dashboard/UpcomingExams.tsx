import React from "react";
import { format, addDays } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Users, Clock } from "lucide-react";

interface Exam {
  id: string;
  name: string;
  date: Date;
  duration: string;
  registeredStudents: number;
}

interface UpcomingExamsProps {
  exams?: Exam[];
}

const UpcomingExams = ({ exams = [] }: UpcomingExamsProps) => {
  // Default exams if none are provided
  const defaultExams: Exam[] = [
    {
      id: "1",
      name: "Advanced Mathematics",
      date: addDays(new Date(), 1),
      duration: "3 hours",
      registeredStudents: 42,
    },
    {
      id: "2",
      name: "Computer Science Fundamentals",
      date: addDays(new Date(), 2),
      duration: "2 hours",
      registeredStudents: 38,
    },
    {
      id: "3",
      name: "Introduction to Psychology",
      date: addDays(new Date(), 3),
      duration: "1.5 hours",
      registeredStudents: 56,
    },
    {
      id: "4",
      name: "Business Ethics",
      date: addDays(new Date(), 5),
      duration: "2 hours",
      registeredStudents: 29,
    },
  ];

  const displayExams = exams.length > 0 ? exams : defaultExams;
  const today = new Date();
  const selectedDates = displayExams.map((exam) => exam.date);

  return (
    <Card className="w-full h-full bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <CalendarIcon className="mr-2 h-5 w-5 text-blue-600" />
          Upcoming Exams
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="hidden md:block">
            <Calendar
              mode="multiple"
              selected={selectedDates}
              className="rounded-md border max-w-full"
            />
          </div>

          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {displayExams.map((exam) => (
              <div
                key={exam.id}
                className="flex items-center justify-between p-2 rounded-md border hover:bg-slate-50"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{exam.name}</span>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>
                      {format(exam.date, "MMM dd, yyyy - h:mm a")} (
                      {exam.duration})
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center text-xs text-gray-500 mr-3">
                    <Users className="h-3 w-3 mr-1" />
                    <span>{exam.registeredStudents}</span>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full mt-2">
            View All Scheduled Exams
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingExams;
