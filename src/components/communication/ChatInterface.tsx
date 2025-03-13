import React, { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Send, Paperclip, Mic, X } from "lucide-react";

interface Message {
  id: string;
  sender: "proctor" | "student";
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  studentId?: string;
  studentName?: string;
  examId?: string;
  onClose?: () => void;
}

const ChatInterface = ({
  studentId = "student-123",
  studentName = "Alex Johnson",
  examId = "exam-456",
  onClose = () => {},
}: ChatInterfaceProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "student",
      content: "Hello, I have a question about question #5.",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
    {
      id: "2",
      sender: "proctor",
      content: "Hi Alex, what specifically is unclear about question #5?",
      timestamp: new Date(Date.now() - 1000 * 60 * 4),
    },
    {
      id: "3",
      sender: "student",
      content: "The diagram is not loading properly on my screen.",
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
    },
    {
      id: "4",
      sender: "proctor",
      content: "I understand. Let me check that for you. Please wait a moment.",
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
    },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: "proctor",
        content: message,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-full w-full bg-white border rounded-lg shadow-md overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b bg-blue-900 text-white">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${studentId}`}
              alt={studentName}
            />
            <AvatarFallback>
              {studentName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{studentName}</h3>
            <p className="text-xs opacity-80">Exam ID: {examId}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-white hover:bg-blue-800"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "proctor" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.sender === "proctor"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <p>{msg.content}</p>
                <span className="text-xs opacity-70 block text-right mt-1">
                  {formatTime(msg.timestamp)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Chat Input */}
      <div className="border-t p-3 bg-gray-50">
        <div className="flex items-end space-x-2">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="min-h-[60px] resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <div className="flex space-x-1">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              type="button"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              type="button"
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="rounded-full bg-blue-600 hover:bg-blue-700"
              type="button"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
