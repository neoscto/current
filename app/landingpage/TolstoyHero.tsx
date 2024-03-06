'use client';

const TolstoyHero = () => {
  return (
    <div className="rounded-2xl overflow-hidden">
      <iframe
        id="tolstoy"
        src="https://player.gotolstoy.com/k71mlzqzwrqzo?host"
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
