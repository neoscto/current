"use client";
import { Box } from "@mui/material";
import { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import poster from "@/public/poster.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FeaturedVideoIcon from "@mui/icons-material/FeaturedVideo";

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
          : "fixed flex px-2 flex-col bottom-[0.5rem] md:bottom-[3rem] right-0 md:right-3 w-36 z-[2]"
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
            {isCentered ? <CancelIcon /> : <OpenInFullIcon />}
          </Box>
          <video
            controls
            // poster={poster.src}
            className={`${
              isCentered ? "md:max-w-[350px] w-6/12" : ""
            } rounded-md`}
          >
            <source
              src="https://videos.gotolstoy.com/public/f00d787b-4ba2-43d0-a780-24ad46b005ca/98d32db0-b1fe-4938-ba9d-a36346605775/98d32db0-b1fe-4938-ba9d-a36346605775.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </Box>
      </button>
      {!isCentered ? (
        <Box
          sx={{
            height: "5rem",
            margin: "2px",
            borderRadius: "2px 0 0 1px",
          }}
          className={`items-center ${
            isShow ? "pb-4" : ""
          } pt-1 px-1 flex justify-end`}
          onClick={() => {
            setIsShow(!isShow);
          }}
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
              <FeaturedVideoIcon
                sx={{ fontSize: 20 }}
                className="cursor-pointer"
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
