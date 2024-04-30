"use client";

import ChatHeader from "./chatHeader";
import ChatInput from "./chatInput";
import MessageList from "./messageList";
import type { IMessage } from "@/utils/types";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";

interface ChatWindowPropsType {
  activeChatId: number | null;
}
const ChatWindow = ({ activeChatId }: ChatWindowPropsType) => {
  const [conversation, setConversation] = useState<IMessage[]>([]);

  const getAllConversation = async () => {
    try {
      const response = await axiosInstance.get(`chat/${activeChatId}/message/`);
      setConversation(response.data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  const handlePromptResponse = (data: IMessage) => {
    setConversation([...conversation, data]);
  };
  useEffect(() => {
    if (activeChatId) getAllConversation();
  }, [activeChatId]);
  return (
    <div className='bg-gray-200 h-full w-full flex flex-col'>
      <ChatHeader />
      <MessageList messages={conversation} />
      <ChatInput
        handlePromptResponse={handlePromptResponse}
        activeChatId={activeChatId}
      />
    </div>
  );
};

export default ChatWindow;
