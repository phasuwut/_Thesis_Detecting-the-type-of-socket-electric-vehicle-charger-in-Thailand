import "@tensorflow/tfjs-backend-webgl"; // set backend to webgl

import * as tf from "@tensorflow/tfjs";

import React, { useEffect, useRef, useState } from "react";
import { detect, detectVideo } from "@/utils/prediction/detect";

import ButtonHandler from "./components/btn-handler";
import CustomLoading from "./components/CustomLoading";
import LoadingOverlay from "react-loading-overlay";

const Prediction = ({ modelName, setModelName }) => {
  const [loading, setLoading] = useState({ loading: true, progress: 0 }); // loading state
  const [model, setModel] = useState({
    net: null,
    inputShape: [1, 0, 0, 3],
  }); // init model & input shape

  // references
  const imageRef = useRef(null);
  const cameraRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (modelName === null) {
      setLoading({ loading: true, progress: 0 });
      setModel({
        net: null,
        inputShape: [1, 0, 0, 3],
      });
    } else {
      tf.ready().then(async () => {
        const yolo = await tf.loadGraphModel(
          `${window.location.origin}/model-yolo/${modelName}_web_model/model.json`,
          {
            onProgress: (fractions) => {
              setLoading({ loading: true, progress: fractions }); // set loading fractions
            },
          }
        ); // load model

        // warming up model
        const dummyInput = tf.ones(yolo.inputs[0].shape);

        const warmupResults = yolo.execute(dummyInput);

        setLoading({ loading: false, progress: 1 });
        setModel({
          net: yolo,
          inputShape: yolo.inputs[0].shape,
        }); // set model & input shape

        tf.dispose([warmupResults, dummyInput]); // cleanup memory
      });
    }
  }, [modelName]);

  return (
    <div>
      <LoadingOverlay
        active={loading.progress * 100 < 100}
        spinner={<CustomLoading progress={loading.progress * 100} />}
        classNamePrefix="MyLoader_"
        className={loading.progress * 100 < 100 && "w-screen h-screen"}
      >
        <div className="wapprer w-screen h-screen flex flex-col items-center ">
          <div className="header">
            <h1>📷 {modelName} Live Detection App</h1>
            <p>
              {modelName} live detection application on browser powered by{" "}
              <code>tensorflow.js</code>
            </p>
            <p>
              Serving : <code className="code">{modelName}</code>
            </p>
          </div>

          <div className="content">
            <img
              src="#"
              ref={imageRef}
              onLoad={() => detect(imageRef.current, model, canvasRef.current)}
            />
            <video
              autoPlay
              muted
              ref={cameraRef}
              onPlay={() =>
                detectVideo(cameraRef.current, model, canvasRef.current)
              }
            />
            <video
              autoPlay
              muted
              ref={videoRef}
              onPlay={() =>
                detectVideo(videoRef.current, model, canvasRef.current)
              }
            />
            <canvas
              width={model.inputShape[1]}
              height={model.inputShape[2]}
              ref={canvasRef}
            />
          </div>

          <button type="button" onClick={() => setModelName(null)}>
            Change Model
          </button>

          <ButtonHandler
            imageRef={imageRef}
            cameraRef={cameraRef}
            videoRef={videoRef}
          />
        </div>
      </LoadingOverlay>
    </div>
  );
};

export default Prediction;
