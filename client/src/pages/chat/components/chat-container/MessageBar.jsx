import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { Paperclip, Smile, Send } from "lucide-react";

const MessageBar = () => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const onEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleSendMessage = async ()=>{
    console.log("sent");
  }
  return (
    <div className="w-full relative px-4 pb-4">
      <div className="flex justify-center">
        <div className="relative w-3/4 flex gap-3">

        {showEmojiPicker && (
            <div className="absolute bottom-14 right-0 z-50">
              <EmojiPicker onEmojiClick={onEmojiClick} theme="dark"/>
            </div>
          )}
          {/* Input Bar */}
          <div className="flex items-center bg-[#1a1c23] text-gray-300 rounded-lg p-4 gap-3 w-full shadow-md">
            <input
              type="text"
              placeholder="Enter Message"
              className="flex-1 bg-transparent outline-none placeholder-gray-500 text-2xl px-2 "
              value={message}
              onChange={(e)=>{setMessage(e.target.value)}}
            />

            <button className="hover:text-purple-400 transition">
              <Paperclip size={22} />
            </button>
            <button className="hover:text-purple-400 transition" onClick={() => setShowEmojiPicker((prev) => !prev)}>
              <Smile size={22} />
            </button>
          </div>

          {/* Send Button */}
          <button onClick={handleSendMessage} className=" bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-xl shadow-lg transition duration-200">
            <Send size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageBar;
