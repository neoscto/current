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
  autoPlay?: boolean;
  muted?: boolean;
}
const VideoPreview: React.FC<VideoPlayerProps> = ({ url, custonClass,playerRef,handleVideoReady, autoPlay, muted }) => {
  return (
    <div className={custonClass} id="video-main">
      <DynamicReactPlayer
        url={url}
        ref={playerRef}
        controls
        className={"customwrap"}
        onReady={handleVideoReady}
        playing={(autoPlay) ? autoPlay : false}
        muted={(muted) ? muted : false}
      />
    </div>
  );
};
export default VideoPreview;