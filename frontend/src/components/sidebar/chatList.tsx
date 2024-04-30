import { Dispatch, SetStateAction } from "react";
import { IChat } from "@/utils/types";
import chatIcon from "../../../public/icons/chat.svg";
import Image from "next/image";

interface ChatListPropsType {
  listOfChats: IChat[];
  activeChat: IChat;
  setActiveChat: Dispatch<SetStateAction<string>>;
}

const ChatList = ({
  listOfChats,
  activeChat,
  setActiveChat,
}: ChatListPropsType) => {
  return (
    <div className='w-full overflow-auto'>
      {listOfChats.map((chatInstance: IChat) => {
        return (
          <div
            key={chatInstance.id}
            onClick={() => {
              setActiveChat(chatInstance);
            }}
            className={`my-2 flex  items-center p-2 rounded-md text-white font-light hover:cursor-pointer ${
              chatInstance.id === activeChat?.id && "bg-blue-600"
            }`}
          >
            {chatInstance.id === activeChat?.id ? (
              <Image src={chatIcon} alt='' className='w-4 mr-2' />
            ) : (
              <></>
            )}
            <p className='overflow-hidden text-ellipsis whitespace-nowrap'>
              {chatInstance.document_file?.replace(
                process.env.API_BASE_URL + "documents/W-2/",
                ""
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
