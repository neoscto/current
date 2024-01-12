import React from "react";
import dynamic from "next/dynamic";
const DynamicReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});
interface VideoPlayerProps {
  url?: string;
  custonClass?: any;
  playerRef?:any;
  handleVideoReady?:any;
}
const VideoPreview: React.FC<VideoPlayerProps> = ({ url, custonClass,playerRef,handleVideoReady }) => {
  return (
    <div className={custonClass} id="video-main">
      <DynamicReactPlayer
        url={url}
        ref={playerRef}
        controls
        className={"customwrap"}
        onReady={handleVideoReady}
      />
    </div>
  );
};
export default VideoPreview;