import React from "react";

const CustomLoading = ({ progress }) => {
  return (
    <div>
      <p>Loadding Model {progress.toFixed(2)}%</p>
      <div className="flex justify-center items-center">
        <div className="lg:mt-[calc(31*100vw/1366)] ">
          <progress id="file" value={progress} max="100"></progress>
        </div>
      </div>
    </div>
  );
};

export default CustomLoading;
