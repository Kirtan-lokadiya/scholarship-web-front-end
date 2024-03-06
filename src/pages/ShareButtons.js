import React, { useState, useRef, useEffect } from 'react';
import { WhatsappIcon, LinkedinIcon, TwitterIcon } from 'react-share';

import './ShareButtons.css';

const ShareButtons = () => {
  const [showIcons, setShowIcons] = useState(false);
  const shareButtonRef = useRef();

  useEffect(() => {
    const handleClickOutside = event => {
      if (shareButtonRef.current && !shareButtonRef.current.contains(event.target)) {
        setShowIcons(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const shareOnWhatsApp = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://api.whatsapp.com/send?text=${url}`);
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`);
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?url=${url}`);
  };

  return (
    <div className="share-container" ref={shareButtonRef}>
      <button className="share-button" onClick={() => setShowIcons(!showIcons)}>Share</button>
      {showIcons && (
        <div className="icon-container">
          <WhatsappIcon size={32} round={true} onClick={shareOnWhatsApp} />
          <LinkedinIcon size={32} round={true} onClick={shareOnLinkedIn} />
          <TwitterIcon size={32} round={true} onClick={shareOnTwitter} />
        </div>
      )}
    </div>
  );
};

export default ShareButtons;
