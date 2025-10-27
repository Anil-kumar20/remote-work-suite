import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import io from "socket.io-client";

// Replace this with your backend URL if needed
const socket = io("http://localhost:5000");

export default function Whiteboard({ roomId, user }) {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [tool, setTool] = useState("pen");
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(3);

  // Initialize Fabric.js Canvas
  useEffect(() => {
    const fabricCanvas = new fabric.Canvas("whiteboard-canvas", {
      isDrawingMode: true,
      backgroundColor: "#ffffff",
    });

    fabricCanvas.freeDrawingBrush.color = color;
    fabricCanvas.freeDrawingBrush.width = brushSize;

    setCanvas(fabricCanvas);
    canvasRef.current = fabricCanvas;

    // Cleanup on unmount
    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  // Update brush color/size
  useEffect(() => {
    if (canvas) {
      canvas.freeDrawingBrush.color = color;
      canvas.freeDrawingBrush.width = brushSize;
    }
  }, [color, brushSize, canvas]);

  // Sync drawings with socket.io
  useEffect(() => {
    if (!canvas) return;

    const handlePath = (event) => {
      const pathData = event.path.toObject();
      socket.emit("draw", { roomId, pathData });
    };

    canvas.on("path:created", handlePath);

    socket.on("draw", ({ pathData }) => {
      fabric.util.enlivenObjects([pathData], (objects) => {
        objects.forEach((obj) => {
          canvas.add(obj);
        });
        canvas.renderAll();
      });
    });

    // Join the room
    socket.emit("join-room", roomId);

    return () => {
      socket.off("draw");
      canvas.off("path:created", handlePath);
    };
  }, [canvas]);

  // Tool change handler
  const handleToolChange = (selectedTool) => {
    setTool(selectedTool);
    if (!canvas) return;

    if (selectedTool === "pen") {
      canvas.isDrawingMode = true;
    } else {
      canvas.isDrawingMode = false;
    }
  };

  // Add text
  const addText = () => {
    const text = new fabric.IText("Edit me", {
      left : 100,
      top : 100,
      fontSize: 20,
      fill: color,
    });
    canvas.add(text);
  };

  // Add shape
  const addShape = (shape) => {
    let shapeObj;
    if (shape === "rect") {
      shapeObj = new fabric.Rect({
        left : 150,
        top : 100,
        fill: color,
        width : 100,
        height : 70,
      });
    } else if (shape === "circle") {
      shapeObj = new fabric.Circle({
        left : 200,
        top : 100,
        radius: 50,
        fill: color,
      });
    }
    canvas.add(shapeObj);
  };

  // Clear canvas
  const clearCanvas = () => {
    canvas.clear();
    canvas.backgroundColor = "#ffffff";
    canvas.renderAll();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Toolbar */}
      <div className="flex items-center gap-4 bg-white shadow p-3">
        <button
          onClick={() => handleToolChange("pen")}
          className={`px-3 py-1 rounded ${
            tool === "pen" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Pen
        </button>

        <button
          onClick={() => addShape("rect")}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Rectangle
        </button>

        <button
          onClick={() => addShape("circle")}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Circle
        </button>

        <button onClick={addText} className="px-3 py-1 bg-gray-200 rounded">
          Text
        </button>

        <button onClick={clearCanvas} className="px-3 py-1 bg-red-500 text-white rounded">
          Clear
        </button>

        <label className="ml-4">
          Color:
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="ml-2"
          />
        </label>

        <label className="ml-4">
          Size:
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="ml-2"
          />
        </label>
      </div>

      {/* Canvas */}
      <div className="flex-1 flex justify-center items-center bg-gray-50">
        <canvas
          id="whiteboard-canvas"
          width={1000}
          height={600}
          className="border border-gray-300 rounded-lg shadow"
        ></canvas>
      </div>
    </div>
  );
}
