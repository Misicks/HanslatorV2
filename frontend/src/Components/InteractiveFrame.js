import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CVCamera from "./CVCamera.js";
import { io } from "socket.io-client";
import Box from "@mui/material/Box";

function InteractiveFrame(props) {
  const [isPaused, setPaused] = useState(false);
  const [texts, setTexts] = useState([]);

  const handlePause = () => {
    setPaused(!isPaused);
  };

  useEffect(() => {
    const socket = io("localhost:5000/", {
      transports: ["polling"],
      cors: {
        origin: "http://localhost:3000/",
      },
    });

    if (isPaused === false) {
      socket.emit("translate");

      socket.on("data", (data) => {
        let newTexts = [...texts, data.data];
        setTexts(newTexts);
      });

      return function cleanup() {
        socket.disconnect();
      };
    } else {
      socket.emit("paused");
    }
  }, [isPaused, texts]);

  return (
    <div>
      <div class="flex justify-evenly w-screen absolute right-0 top-32">
        <CVCamera isPaused={isPaused} />
        <div className="h-96 w-1/3 rounded-2xl">
          <h1 className="font-bold text-2xl font-mono">Texto Traducido</h1>
          {texts.join(" ")}
        </div>
      </div>

      <div class="absolute inset-x-0 bottom-5 h-16 flex justify-center items-center gap-5">
        <button
          className="btn btn-md btn-outline drop-shadow-md "
          onClick={props.handleClick}
        >
          Finalizar
        </button>
        <button
          className="btn btn-md btn-accent btn-outline drop-shadow-md "
          onClick={handlePause}
        >
          {isPaused ? "Continuar" : "Pausar"}
        </button>
      </div>
    </div>
  );
}

export default InteractiveFrame;
