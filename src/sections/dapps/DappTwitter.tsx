import React, { useEffect } from 'react';

const TwitterTimeline = ({ username="seamMoney", width = 300, height = 400 }) => {
  const timelineUrl = `https://twitter.com/${username}`;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <a
        className="twitter-timeline"
        data-lang="en"
        data-theme="light"
        data-link-color="#2B7BB9"
        href={timelineUrl}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        Tweets by @{username}
      </a>
    </div>
  );
};

export default TwitterTimeline;
