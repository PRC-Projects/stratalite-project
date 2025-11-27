"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Send, Video, MoreVertical, Paperclip } from "lucide-react"
import MessagesList from "@/components/layout/messagesList"
import ChatWindow from "@/components/layout/chatWindow" 
import { Globe, MessageSquare, Folder, Calendar, Pin, Settings, LogOut, Music } from "lucide-react";

export default function WorkstreamsPage() {
  const icons = [
    { icon: Globe },
    { icon: MessageSquare },
    { icon: Folder },
    { icon: Calendar },
    { icon: Music },
    { icon: Settings },
    { icon: LogOut}
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#f7f8fa]">
    <div className="w-[60px] bg-white border-r flex flex-col items-center py-6 gap-8">
      {icons.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className="p-2 rounded-xl cursor-pointer hover:bg-blue-50 text-gray-600"
          >
            <Icon size={22} />
          </div>
        );
      })}
    </div>
    <div className="flex w-full">
        <MessagesList />
        <ChatWindow />
      </div>
    </div>
    
  )
}
