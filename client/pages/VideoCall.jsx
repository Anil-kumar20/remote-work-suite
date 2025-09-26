import React from "react";

const VideoCall = () => {
  return (
    <div className="flex flex-col h-full space-y-4">
      <h1 className="text-2xl font-bold">Video Call</h1>
      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Placeholder for participants */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 flex items-center justify-center rounded-lg shadow"
          >
            Participant {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoCall;
