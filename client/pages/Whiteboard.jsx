import React, { useRef, useEffect, useState } from "react";

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

  const startDraw = (e) => setDrawing(true);
  const endDraw = () => setDrawing(false);

  const draw = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(e.clientX - rect.left, e.clientY - rect.top, 3, 0, Math.PI * 2);
    ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }, []);

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-2xl font-bold mb-2">Whiteboard</h1>
      <canvas
        ref={canvasRef}
        className="flex-1 border rounded-lg bg-white shadow"
        onMouseDown={startDraw}
        onMouseUp={endDraw}
        onMouseMove={draw}
      />
    </div>
  );
};

export default Whiteboard;
