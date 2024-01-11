"use client";
import { Box } from "@mui/material";
import { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CancelIcon from "@mui/icons-material/Cancel";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import poster from "@/public/poster.png";

const VideoPlayer = () => {
  const [isCentered, setIsCentered] = useState(false);
  const [isShow, setIsShow] = useState(true);
  const [isHover, setIsHover] = useState(false);

  const handleVideoClick = () => {
    // alert("hy");
    setIsCentered(!isCentered);
  };

  return (
    <Box
      className={`${
        isCentered
          ? "absolute max-w-full w-full bg-black bg-opacity-40 h-screen flex justify-center  items-center"
          : "fixed bottom-[-0.1rem] right-0 w-36 z-[2]"
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
      onTouchStart={() => setIsHover(true)}
      onTouchEnd={() => setIsHover(false)}
    >
      {!isCentered ? (
        <Box
          sx={{
            backgroundColor: "#fff",
            height: "5rem",
            boxShadow: "0 0px 5px gray",
            borderRadius: "2px 0 0 1px",
            cursor: "pointer",
          }}
          className={`items-center pl-[0.2em] ${
            !isHover && isShow ? "hidden" : "flex"
          }`}
          onClick={() => {
            setIsShow(!isShow);
          }}
        >
          {isShow ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </Box>
      ) : (
        ""
      )}
      <button
        style={{
          display: isShow ? "contents" : "none",
          position: "relative",
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
            top: isCentered ? "5px" : "",
            zIndex: "5",
          }}
          className={`${!isHover && isShow ? "hidden" : "flex"}`}
          onClick={handleVideoClick}
          // onClick={() => {
          //   setIsCentered(false);
          // }}
        >
          {isCentered ? <CancelIcon /> : <OpenInFullIcon />}
        </Box>
        <video
          controls
          poster={poster.src}
          className={`${
            isCentered ? "md:max-w-[350px] w-6/12" : ""
          } shadow-sm rounded-md`}
        >
          <source
            src="https://videos.gotolstoy.com/public/f00d787b-4ba2-43d0-a780-24ad46b005ca/98d32db0-b1fe-4938-ba9d-a36346605775/98d32db0-b1fe-4938-ba9d-a36346605775.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </button>
    </Box>
  );
};

export default VideoPlayer;
