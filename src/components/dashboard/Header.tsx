import React from "react";
import { Bell, Settings, HelpCircle, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";

interface HeaderProps {
  adminName?: string;
  adminEmail?: string;
  notificationCount?: number;
  onNotificationsClick?: () => void;
  onSettingsClick?: () => void;
  onHelpClick?: () => void;
  onLogoutClick?: () => void;
}

const Header = ({
  adminName = "Admin User",
  adminEmail = "admin@example.com",
  notificationCount = 3,
  onNotificationsClick = () => {},
  onSettingsClick = () => {},
  onHelpClick = () => {},
  onLogoutClick = () => {},
}: HeaderProps) => {
  return (
    <header className="bg-slate-900 text-white w-full h-20 px-6 flex items-center justify-between border-b border-slate-800">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center">
          <span className="text-xl font-bold">AP</span>
        </div>
        <h1 className="text-xl font-bold">AI Proctoring Dashboard</h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={onNotificationsClick}
            className="relative"
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {notificationCount}
              </Badge>
            )}
          </Button>
        </div>

        <Button variant="ghost" size="icon" onClick={onHelpClick}>
          <HelpCircle className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" onClick={onSettingsClick}>
          <Settings className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar>
                <AvatarImage
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                  alt={adminName}
                />
                <AvatarFallback>
                  {adminName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="font-medium">{adminName}</p>
                <p className="text-xs text-muted-foreground">{adminEmail}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onSettingsClick}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onHelpClick}>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help & Documentation</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogoutClick} className="text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
