'use client';

const TolstoyWidget = ({ src }: { src: string }) => {
  return (
    <div className="absolute right-5 bottom-2">
      <iframe
        src={src}
        className="hidden md:block md:w-[125px] md:h-[125px] xl:w-[150px] xl:h-[150px] rounded-full"
        scrolling="no"
        frameBorder="0"
        allow="autoplay *; clipboard-write *;camera *; microphone *; encrypted-media *; fullscreen *; display-capture *;"
      ></iframe>
    </div>
  );
};

export default TolstoyWidget;
