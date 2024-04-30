"use client";
import axiosInstance from "@/utils/axios";
import { IChat } from "@/utils/types";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import { useRef, useState } from "react";
import ChatList from "./chatList";
import Loader from "@/components/loader";

interface SidebarPropsType {
  chats: IChat[];
  setChats: Dispatch<SetStateAction<IChat[]>>;
  activeChat: IChat;
  setActiveChat: Dispatch<SetStateAction<IChat>>;
}

const Sidebar = ({
  setChats,
  chats,
  activeChat,
  setActiveChat,
}: SidebarPropsType) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadFile = async (file: File) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("document_file", file);

      const response = await axiosInstance.post("chat/conversation/", formData);
      setChats([response.data, ...chats]);
      setActiveChat(response.data);
    } catch (error) {
      console.error("Failed to upload file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
    if (selectedFile) {
      uploadFile(selectedFile)
        .then((response) => {
          console.log("File uploaded successfully:", response);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } else {
      alert("Please select a file first.");
    }
  };

  return (
    <div className='h-full p-3 bg-blue-950 flex flex-col'>
      <input
        type='file'
        accept='.pdf, .jpeg, .jpg, .png'
        className='hidden'
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <button
        disabled={isLoading}
        onClick={() => {
          if (fileInputRef.current) {
            fileInputRef.current.click();
          }
        }}
        className=' border-[1px] p-2 text-white rounded-md bg-white/10 backdrop-blur-md border-dashed border-gray-400'
      >
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <p className=' font-light'>+ New Chat</p>
            <span className='text-sm text-gray-300 font-light'>
              Upload a new Image or PDF
            </span>
          </>
        )}
      </button>
      <div className='w-full justify-between my-2 flex'>
        <button className='w-1/2 mr-1 border-[1px] border-gray-500 border-solid p-2 rounded-md'>
          <p className='text-xs text-gray-300'>Upgrade to Plus</p>
        </button>
        <button className='w-1/2 border-[1px] border-gray-500 border-solid p-2 rounded-md'>
          <p className='text-xs text-gray-300'>New Folder</p>
        </button>
      </div>
      <ChatList
        listOfChats={chats}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
      />
    </div>
  );
};

export default Sidebar;
