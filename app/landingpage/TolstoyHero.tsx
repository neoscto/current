'use client';

const TolstoyHero = ({ src }: { src?: string }) => {
  return (
    <div className="rounded-2xl overflow-hidden z-10 relative">
      <iframe
        id="tolstoy"
        src={src || 'https://player.gotolstoy.com/k71mlzqzwrqzo?host'}
        style={{ width: '100%', height: '540px', maxWidth: '960px' }}
        scrolling="no"
        frameBorder="0"
        allow="autoplay *; clipboard-write *;camera *; microphone *; encrypted-media *; fullscreen *; display-capture *;"
      ></iframe>
      <script src="https://widget.gotolstoy.com/script.js" defer></script>
    </div>
  );
};

export default TolstoyHero;
