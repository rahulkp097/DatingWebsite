import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSendMessageMutation } from "../../../slices/userApiSlice";

function VideoChatRoom() {
  const [messageSendApi] = useSendMessageMutation();
  const { roomId } = useParams();

  const myMeeting = async (element) => {
    console.log("Element:", element);
    const appID = 864718259;
    const serverSecret = "354ecaf3a25969360a6f3cae17d1557f";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      "Rahul"
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy Link",
          url: `http://localhost:3000/videocall/${roomId}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
    });
  };

  return (
    <div>
      <div ref={myMeeting} />
    </div>
  );
}

export default VideoChatRoom;
