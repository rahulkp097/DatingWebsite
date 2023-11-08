import React from "react";

const ChatComponent = () => {
  return (
    <div className="container mx-auto shadow-lg rounded-lg min-h-screen">
      <div className="px-5 py-5 flex justify-between items-center border-b-2">
        <div className="font-semibold text-2xl">Chat</div>
        <div className="w-1/2">
          <input
            type="text"
            name=""
            id=""
            placeholder="search IRL"
            className="rounded-2xl  py-3 px-5 w-full"
          />
        </div>
        <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full  font-semibold flex items-center justify-center">
          RA
        </div>
      </div>
      <div className="flex flex-row justify-between ">
        <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
          <div className="border-b-2 py-4 px-2">
            <input
              type="text"
              placeholder="search chatting"
              className="py-2 px-2 border-2  rounded-2xl w-full"
            />
          </div>
          <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
            <div className="w-1/4">
              <img
                src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                className="object-cover h-12 w-12 rounded-full"
                alt=""
              />
            </div>
            <div className="w-full">
              <div className="text-lg font-semibold">Luis1994</div>
              <span className="text-gray-500">Pick me at 9:00 AM</span>
            </div>
          </div>
          {/* Other user list items go here */}
        </div>
        <div className="w-full px-5 flex flex-col justify-between">
          <div className="flex flex-col mt-5">
            {/* Chat messages go here */}
          </div>
          <div className="py-5">
            <input
              className="w-full py-5 px-3 rounded-xl"
              type="text"
              placeholder="type your message here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
