"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import sendIcon from "/public/icons/send.svg";
import axiosInstance from "@/utils/axios";
import { IMessage } from "@/utils/types";
import Loader from "@/components/loader";

interface ChatInputPropsType {
  activeChatId: number | null;
  handlePromptResponse: (data: IMessage) => void;
}

const ChatInput = ({
  activeChatId,
  handlePromptResponse,
}: ChatInputPropsType) => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e: FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = "auto";
    target.style.height = `${Math.min(target.scrollHeight, 100)}px`;
    setPrompt(target.value);
  };

  const sendPrompt = async (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `chat/${activeChatId}/message/`,
        { prompt }
      );
      handlePromptResponse(response.data);
      setPrompt("");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={sendPrompt}
      className='w-full flex justify-center items-center py-2 px-8'
    >
      <textarea
        onChange={handleInput}
        value={prompt}
        placeholder='Type your message here...'
        className='w-full min-h-10 p-2 text-sm mr-2 border border-gray-300 rounded-md resize-none overflow-auto focus:outline-none'
        rows={1}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <button type='submit' className='bg-blue-900 h-9 p-2 rounded-md'>
          <Image className='w-5' src={sendIcon} alt='Send' />
        </button>
      )}
    </form>
  );
};

export default ChatInput;
