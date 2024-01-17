"use client";
import { Box } from "@mui/material";
import { useRef, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FeaturedVideoIcon from "@mui/icons-material/FeaturedVideo";
import VideoPreview from "./preview";
import VideoLogo from "@/public/video-icon.svg";
import React from "react";
import Image from "next/image";
const VideoPlayer = () => {
  const [isCentered, setIsCentered] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const playerRef = useRef<any>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const videoUrl =
    "https://videos.gotolstoy.com/public/f00d787b-4ba2-43d0-a780-24ad46b005ca/98d32db0-b1fe-4938-ba9d-a36346605775/98d32db0-b1fe-4938-ba9d-a36346605775.mp4";
  const handleVideoClick = () => {
    // alert("hy");
    setIsCentered(!isCentered);
  };
  const handleVideoReady = () => {
    setIsVideoLoaded(true);
  };
  return (
    <Box
      className={`${
        isCentered
          ? "absolute max-w-full md:w-full bg-black bg-opacity-40 h-screen flex justify-center  items-center"
          : "fixed flex px-2 flex-col bottom-[0.5rem] md:bottom-[2rem] right-1 md:right-3 w-36 z-[2]"
      }`}
      sx={{
        // display: "none",
        display: "flex",
        justifyContent: isCentered ? "" : "flex-end",
        height: isCentered ? "90%" : "13.1rem",
        width: isCentered ? "100%" : "9.5rem",
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onTouchStart={() => {
        setIsHover(true);
      }}
    >
      <button
        style={{
          display: isShow ? "contents" : "none",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              backgroundColor: isCentered ? "" : "#fff",
              // height: "5rem",
              boxShadow: "0 0px 5px gray",
              borderRadius: "2px 0 0 1px",
              cursor: "pointer",
              position: "absolute",
              top: isCentered ? "15px" : "",
              right: isCentered ? "" : "8px",
              zIndex: "5",
            }}
            className={`${!isHover && isShow ? "none" : "flex"}`}
            onClick={handleVideoClick}
            // onClick={() => {
            //   setIsCentered(false);
            // }}
          >
            {isCentered ? (
              <CancelIcon />
            ) : isVideoLoaded ? (
              <OpenInFullIcon className="min-h-[29px]" />
            ) : (
              ""
            )}
          </Box>
          <VideoPreview
            custonClass={`${isCentered ? "video-expand" : ""} video-player`}
            url={videoUrl}
            playerRef={playerRef}
            handleVideoReady={handleVideoReady}
          />
        </Box>
      </button>
      {!isCentered ? (
        <Box
          sx={{
            height: "5rem",
            margin: "2px",
            borderRadius: "2px 0 0 1px",
            width: "auto",
          }}
          className={`items-center ${
            isShow ? "pb-4" : ""
          } pt-1 px-1 flex justify-end`}
        >
          {isShow ? (
            <div
              className="w-12 h-12 flex items-center justify-center rounded-full bg-[#ED817D] text-white text-xl shadow-sm rounded-md`"
              onClick={() => {
                setIsShow(!isShow);
              }}
            >
              <KeyboardArrowDownIcon
                sx={{ fontSize: 30 }}
                className="cursor-pointer"
              />
            </div>
          ) : (
            <div
              className="w-12 h-12 flex items-center justify-center rounded-full bg-[#ED817D] text-white text-xl shadow-sm rounded-md`"
              onClick={() => {
                setIsShow(!isShow);
              }}
            >
              {/* <FeaturedVideoIcon
                sx={{ fontSize: 20 }}
                className="cursor-pointer"
              /> */}
              <Image
                src={VideoLogo}
                alt="video-logo"
                width={20}
                height={20}
                className="cursor-pointer text-white"
              />
            </div>
          )}
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};
export default VideoPlayer;
