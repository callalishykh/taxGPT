import type { IMessage } from "@/utils/types";
import React, { useEffect, useRef } from "react";

interface MessageListPropsType {
  messages: IMessage[];
}

const MessageList = ({ messages }: MessageListPropsType) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={containerRef} className='p-4 overflow-y-auto scroll-smooth'>
      {messages.map((msg) => (
        <>
          <div key={msg.id} className={"w-fit mt-4 max-w-[60%] ml-auto"}>
            <p className={"p-2 rounded-md text-sm bg-blue-900 text-white"}>
              {msg.user_prompt}
            </p>

            <p className={"text-black w-fit text-xs ml-auto"}>
              {new Date(msg.created_at).toLocaleString()}
            </p>
          </div>
          <div key={msg.id + "ai"} className={`w-fit mt-4 max-w-[60%] `}>
            <p
              className={`p-2 rounded-md text-sm  bg-stone-300 text-black border-[1px]`}
            >
              {msg.ai_response}
            </p>

            <p className={`text-black w-fit text-xs `}>
              {new Date(msg.created_at).toLocaleString()}
            </p>
          </div>
        </>
      ))}
    </div>
  );
};

export default MessageList;
