"use client";
import { useRef, useState } from "react";
import ChatList from "./chatList";

const chatArray = [
  { id: "1", filename: "chat1.pdf" },
  {
    id: "2",
    filename: "chat2222222222222222222222222222222222222222222222222.pdf",
  },
  { id: "3", filename: "chat3.pdf" },
  { id: "4", filename: "chat4.pdf" },
];

async function uploadFile(url, file) {
  try {
    const formData = new FormData();
    formData.append("document_file", file); // 'file' is the key expected by the server for the file

    const response = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        // Include the authorization header with the token
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0Mzc4NDIzLCJpYXQiOjE3MTQzNzgxMjMsImp0aSI6IjkxOGVmYmJhOWU4YjQ0MDc5NzcyZGM2M2Q5MDFkODk1IiwidXNlcl9pZCI6MX0.rXrEkGOT1Uk-0ThafxZt60Jc9AMeQ_ZHFEHfyXVodEc"}`,
      },
      // Don't set 'Content-Type': 'multipart/form-data' here. The browser will set it correctly, including the boundary parameter.
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); // Assuming the server responds with JSON
  } catch (error) {
    console.error("Failed to upload file:", error);
  }
}

const Sidebar = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [activeChatID, setActiveChatID] = useState(chatArray[0].id);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
    if (selectedFile) {
      uploadFile("http://127.0.0.1:8000/chat/conversation/", selectedFile)
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
        accept='.pdf'
        className='hidden'
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <button
        onClick={() => {
          if (fileInputRef.current) {
            fileInputRef.current.click();
          }
        }}
        className=' border-[1px] p-2 text-white rounded-md bg-white/10 backdrop-blur-md border-dashed border-gray-400'
      >
        <p className=' font-light'>+ New Chat</p>
        <span className='text-sm text-gray-300 font-light'>
          Upload a new PDF
        </span>
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
        listOfChats={chatArray}
        activeChatID={activeChatID}
        setActiveChatID={setActiveChatID}
      />
    </div>
  );
};

export default Sidebar;
