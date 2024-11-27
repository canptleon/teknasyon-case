import React, { useRef, useState } from "react";
import { Stage, Layer, Line, Rect, Image } from "react-konva";
import Loader from "../Loading";
 
function KonvaCanvas() {

  const stageRef = useRef<any>(null);
  const [tool, setTool] = useState<string>("select");
  const [lines, setLines] = useState<any[]>([]);
  const [rectangles, setRectangles] = useState<any[]>([]);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [exportFormat, setExportFormat] = useState<"png" | "jpg" | "jpeg">("png");
  const [loading, setLoading] = useState(false);

  const handleMouseDown = () => {
    const stage = stageRef.current.getStage();
    const pointer = stage.getPointerPosition();

    if (tool === "lasso") {
      setLines([...lines, { points: [pointer.x, pointer.y], closed: false, color: "green" }]);
    } else if (tool === "rectangle") {
      setRectangles([...rectangles, { x: pointer.x, y: pointer.y, width: 0, height: 0 }]);
    } else if (tool === "draw") {
      setLines([...lines, { points: [pointer.x, pointer.y], closed: false, color: "blue" }]);
    }

    setIsDrawing(true);
  };

  const handleMouseMove = () => {
    if (!isDrawing) return;

    const stage = stageRef.current.getStage();
    const pointer = stage.getPointerPosition();

    if (tool === "lasso" || tool === "draw") {
      const lastLine = lines[lines.length - 1];
      lastLine.points = lastLine.points.concat([pointer.x, pointer.y]);
      setLines([...lines.slice(0, -1), lastLine]);
    } else if (tool === "rectangle") {
      const lastRect = rectangles[rectangles.length - 1];
      lastRect.width = pointer.x - lastRect.x;
      lastRect.height = pointer.y - lastRect.y;
      setRectangles([...rectangles.slice(0, -1), lastRect]);
    }
  };

  const handleMouseUp = () => {
    if (tool === "lasso") {
      const lastLine = lines[lines.length - 1];
      lastLine.closed = true;
      setLines([...lines.slice(0, -1), lastLine]);
    }
    setIsDrawing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setLoading(true);

    const file = e.target.files?.[0];
    if (file) {
      const img = new window.Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => setImage(img);
      setLoading(false);
    }
  };

  const resetCanvas = () => {
    setLines([]);
    setRectangles([]);
  };

  const exportCanvas = () => {
    if (!stageRef.current) return;

    const stage = stageRef.current.getStage();
    const exportCanvas = document.createElement("canvas");
    const context = exportCanvas.getContext("2d");

    exportCanvas.width = stage.width();
    exportCanvas.height = stage.height();

    if (context) {
      context.fillStyle = "black";
      context.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

    lines.forEach((line) => {
      context.beginPath();
      context.moveTo(line.points[0], line.points[1]);
      for (let i = 2; i < line.points.length; i += 2) {
        context.lineTo(line.points[i], line.points[i + 1]);
      }
      if (line.closed) {
        context.closePath();
        context.fillStyle = "white";
        context.fill();
      } else {
        context.strokeStyle = "white";
        context.lineWidth = 2;
        context.stroke();
      }
    });

      rectangles.forEach((rect) => {
        context.fillStyle = "white";
        context.fillRect(rect.x, rect.y, rect.width, rect.height);
      });

      const dataURL = exportCanvas.toDataURL(`image/${exportFormat}`);
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = `export-mask.${exportFormat}`;
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {loading && (
        <Loader/>
      )}
      {image ? (
        <>
          <Stage
            width={800}
            height={600}
            ref={stageRef}
            className="border"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <Layer>
              <Image
                image={image}
                x={0}
                y={0}
                width={800}
                height={600}
                draggable={false}
              />
              {lines.map((line, i) => (
                <Line
                  key={i}
                  points={line.points}
                  stroke={line.color}
                  strokeWidth={2}
                  lineCap="round"
                  tension={0.5}
                  closed={line.closed}
                  fill={line.closed ? line.color : "transparent"}
                  globalCompositeOperation="source-over"
                />
              ))}
              {rectangles.map((rect, i) => (
                <Rect
                  key={i}
                  x={rect.x}
                  y={rect.y}
                  width={rect.width}
                  height={rect.height}
                  stroke="red"
                  strokeWidth={2}
                  fill="rgba(255, 0, 0, 0.3)"
                />
              ))}
            </Layer>
          </Stage>
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setTool("draw")}
              className={`px-4 py-2 text-white ${
                tool === "draw" ? "bg-green-600" : "bg-black"
              }`}
            >
              Brush
            </button>
            <button
              onClick={() => setTool("lasso")}
              className={`px-4 py-2 text-white ${
                tool === "lasso" ? "bg-green-600" : "bg-black"
              }`}
            >
              Lasso
            </button>
            <button
              onClick={() => setTool("rectangle")}
              className={`px-4 py-2 text-white ${
                tool === "rectangle" ? "bg-green-600" : "bg-black"
              }`}
            >
              Rectangle
            </button>
            <button onClick={resetCanvas} className="px-4 py-2 text-white bg-red-600">
              Reset
            </button>
           <div className="flex items-center gap-4 mt-4">
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value as "png" | "jpg" | "jpeg")}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="png">PNG</option>
              <option value="jpg">JPG</option>
              <option value="jpeg">JPEG</option>
            </select>
            <button
              onClick={exportCanvas}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Export
            </button>
          </div>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <label
            htmlFor="file-upload"
            className="cursor-pointer px-6 py-3 bg-black text-white shadow-md hover:scale-95 rounded-md"
          >
            Add Photo
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}

export default KonvaCanvas;