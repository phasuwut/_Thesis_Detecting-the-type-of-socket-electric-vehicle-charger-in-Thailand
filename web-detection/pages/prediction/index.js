import React, { useState } from "react";

import Prediction from "@/components/Prediction";

export default function PredictionPage() {
  const [modelName, setModelName] = useState(null);

  function ComponentsSelectModel() {
    return (
      <div className="w-screen h-screen flex flex-col items-center place-content-center">
        <h2>Select Model </h2>
        <div className="flex gap-x-[20px] mt-[10px] ">
          <button type="button" onClick={() => setModelName("yolo_V6_EV")}>
            YOLO V6
          </button>
          <button type="button" onClick={() => setModelName("yolo_V8_EV")}>
            YOLO V8
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="prediction-ev-page">
      {modelName === null ? (
        <ComponentsSelectModel />
      ) : (
        <Prediction modelName={modelName} setModelName={setModelName} />
      )}
    </div>
  );
}
