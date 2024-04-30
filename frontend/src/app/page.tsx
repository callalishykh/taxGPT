"use client";

import ChatWindow from "@/components/chatWindow";
import FileViewer from "@/components/pdfViewer";
import Sidebar from "@/components/sidebar";
import axiosInstance from "@/utils/axios";
import { IChat } from "@/utils/types";
import { useEffect, useState } from "react";

const Chat = () => {
  const [activeChat, setActiveChat] = useState<IChat | null>(null);
  const [chats, setChats] = useState<IChat[]>([]);

  const getAllChats = async () => {
    try {
      const response = await axiosInstance.get("/chat/conversation");
      setChats(response.data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  useEffect(() => {
    getAllChats();
  }, []);
  return (
    <div className='flex overflow-auto w-screen h-screen'>
      <div className='w-1/5'>
        <Sidebar
          chats={chats}
          setChats={setChats}
          setActiveChat={setActiveChat}
          activeChat={activeChat}
        />
      </div>
      <div className='w-2/5'>
        <FileViewer activeFile={activeChat?.document_file} />
      </div>
      <div className='w-2/5'>
        <ChatWindow activeChatId={activeChat?.id} />
      </div>
    </div>
  );
};

export default Chat;
