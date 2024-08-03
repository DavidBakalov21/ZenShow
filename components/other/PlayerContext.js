import React, { createContext, useState, useRef } from "react";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [triggerApear, setTriggerAppear] = useState(false);
  const soundRef = useRef(null);
  const trackNameRef = useRef(null);
  const trackListRef = useRef(null);
  const albumRef = useRef(null);
  const repeatRef = useRef(false);
  const selectedChoice = useRef(null);
  const [position, setPosition] = useState(0);
  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        soundRef,
        triggerApear,
        trackListRef,
        trackNameRef,
        albumRef,
        position,
        repeatRef,
        selectedChoice,
        setPosition,
        setTriggerAppear,
        setIsPlaying,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
