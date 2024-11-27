import React, { useCallback, useMemo, useRef, useState } from "react";
import { Stage, Layer, Line, Rect, Image } from "react-konva";
import { LineType, RectangleType, ImageDataType } from "../../data/types/canvas";
import Loader from "../Loading";

function KonvaCanvas() {

  const stageRef = useRef<any>(null);
  const [tool, setTool] = useState<string>("select");
  const [lines, setLines] = useState<LineType[]>([]);
  const [rectangles, setRectangles] = useState<RectangleType[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [exportFormat, setExportFormat] = useState<"png" | "jpg" | "jpeg">("png");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [brushWidth, setBrushWidth] = useState<number>(5);
  const [imageData, setImageData] = useState<ImageDataType>({
    image: null,
    scaledWidth: 800,
    scaledHeight: 600,
    offsetX: 0,
    offsetY: 0,
  });

  const saveToHistory = useCallback(() => {
    setHistory(prevHistory => [
      ...prevHistory,
      {
        lines: [...lines],
        rectangles: [...rectangles],
      },
    ]);
  }, [lines, rectangles]);

  const handleMouseDown = useCallback(() => {
    saveToHistory();
    const stage = stageRef.current.getStage();
    const pointer = stage.getPointerPosition();
  
    if (tool === "lasso") {
      setLines([...lines, { points: [pointer.x, pointer.y], closed: false, color: "green" }]);
    } else if (tool === "rectangle") {
      setRectangles([...rectangles, { x: pointer.x, y: pointer.y, width: 0, height: 0 }]);
    } else if (tool === "draw") {
      setLines([
        ...lines,
        { points: [pointer.x, pointer.y], closed: false, color: "blue", width: brushWidth },
      ]);
    }
  
    setIsDrawing(true);
  }, [lines, rectangles, tool, brushWidth, saveToHistory]);

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
      img.crossOrigin = "anonymous";
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const canvasWidth = 400;
        const canvasHeight = 300;
        const imgAspectRatio = img.width / img.height;
        const canvasAspectRatio = canvasWidth / canvasHeight;

        let scaledWidth, scaledHeight;

        if (imgAspectRatio > canvasAspectRatio) {
          scaledWidth = canvasWidth;
          scaledHeight = canvasWidth / imgAspectRatio;
        } else {
          scaledHeight = canvasHeight;
          scaledWidth = canvasHeight * imgAspectRatio;
        }

        const offsetX = (canvasWidth - scaledWidth) / 2;
        const offsetY = (canvasHeight - scaledHeight) / 2;

        setImageData({
          image: img,
          scaledWidth,
          scaledHeight,
          offsetX,
          offsetY,
        });

        setLoading(false);
      };
    }
  };

  const resetCanvas = () => {
    saveToHistory();
    setLines([]);
    setRectangles([]);
    setTool("select");
  };

  const rewindCanvas = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setLines(lastState.lines);
      setRectangles(lastState.rectangles);
      setHistory(history.slice(0, -1));
    }
  };

  const exportCanvas = () => {
    if (!stageRef.current || !imageData.image) {
      alert("Canvas or image not available for export.");
      return;
    }

    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = imageData.image.naturalWidth;
    exportCanvas.height = imageData.image.naturalHeight;

    const context = exportCanvas.getContext("2d");
    if (!context) {
      alert("Failed to get export canvas context.");
      return;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

    const scaleX = imageData.image.naturalWidth / imageData.scaledWidth;
    const scaleY = imageData.image.naturalHeight / imageData.scaledHeight;

    const offsetX = -imageData.offsetX * scaleX;
    const offsetY = -imageData.offsetY * scaleY;

    lines.forEach(line => {
      context.beginPath();
      context.moveTo(line.points[0] * scaleX + offsetX, line.points[1] * scaleY + offsetY);
      for (let i = 2; i < line.points.length; i += 2) {
        context.lineTo(line.points[i] * scaleX + offsetX, line.points[i + 1] * scaleY + offsetY);
      }
      if (line.closed) {
        context.closePath();
        context.fillStyle = "white";
        context.fill();
      } else {
        context.strokeStyle = "white";
        context.lineWidth = (line.width || 1) * Math.max(scaleX, scaleY);
        context.stroke();
      }
    });

    rectangles.forEach(rect => {
      context.fillStyle = "white";
      context.fillRect(
        rect.x * scaleX + offsetX,
        rect.y * scaleY + offsetY,
        rect.width * scaleX,
        rect.height * scaleY
      );
    });

    const dataURL = exportCanvas.toDataURL(`image/${exportFormat}`);
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `export-mask.${exportFormat}`;
    link.click();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[77vh]">
      {loading && <Loader />}
      {imageData.image ? (
        <>
          <div className="relative">
            <Stage
              width={400}
              height={300}
              ref={stageRef}
              className="border"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}>
              <Layer>
                <Image
                  image={imageData.image}
                  x={imageData.offsetX}
                  y={imageData.offsetY}
                  width={imageData.scaledWidth}
                  height={imageData.scaledHeight}
                  draggable={false}
                />
                {lines.map((line, i) => (
                  <Line
                    key={i}
                    points={line.points}
                    stroke={line.color}
                    strokeWidth={line.width}
                    lineCap="round"
                    tension={0.5}
                    closed={line.closed}
                    fill={line.closed ? line.color : "transparent"}
                    globalCompositeOperation="source-over"
                  />
                ))}
                {lines.map((line, i) => (
                  <Line
                    key={i}
                    points={line.points}
                    stroke={line.color}
                    strokeWidth={line.width}
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
            <div className="absolute inset-0 justify-center items-center text-center flex gap-2 z-10 bg-[#ffffffba]">
              <p className="m-auto text-[red] font-semibold [filter:drop-shadow(2px_6px_6px_white)]">
                Mobile version not allowed.
                <br />
                Please use desktop or tablet version.
              </p>
            </div>
            <div className="absolute bottom-[102%] right-3 flex flex-row gap-2">
              <div className="flex flex-row items-center gap-2">
                <select
                  value={exportFormat}
                  onChange={e => setExportFormat(e.target.value as "png" | "jpg" | "jpeg")}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500">
                  <option value="png">PNG</option>
                  <option value="jpg">JPG</option>
                  <option value="jpeg">JPEG</option>
                </select>
                <button className="button max-w-[60px] max-h-[60px]" onClick={exportCanvas}>
                  <div className="button__content">
                    <div className="button__icon">
                      <img src="/icons/export.png" alt="Export" title="Export Masked Image" />
                    </div>
                  </div>
                </button>
              </div>
              <button className={`button max-w-[60px] max-h-[60px]`} onClick={resetCanvas}>
                <div className="button__content">
                  <div className="button__icon">
                    <img src="/icons/reset.png" alt="Reset" title="Reset Changes" />
                  </div>
                </div>
              </button>
              <button className={`button max-w-[60px] max-h-[60px]`} onClick={rewindCanvas}>
                <div className="button__content">
                  <div className="button__icon">
                    <img src="/icons/back.png" alt="Rewind" title="Rewind Changes" />
                  </div>
                </div>
              </button>
              <label className={`button max-w-[60px] max-h-[60px]`} htmlFor="file-upload">
                <div className="button__content">
                  <div className="button__icon">
                    <img src="/icons/plus.png" alt="Add Image" title="Add New Image" />
                  </div>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              className={`button ${tool === "lasso" && "active z-5"}`}
              onClick={() => setTool("lasso")}>
              <div className="button__content">
                <div className="button__icon">
                  <img src="/icons/lasso.png" alt="Lasso" />
                </div>
                <p className="button__text">Lasso</p>
              </div>
            </button>
            <div className="flex flex-col items-center gap-2">
              <button
                className={`button ${tool === "draw" && "active z-5"}`}
                onClick={() => setTool("draw")}>
                <div className="button__content">
                  <div className="button__icon">
                    <img src="/icons/brush.png" alt="Brush" />
                  </div>
                  <p className="button__text">Brush</p>
                </div>
              </button>
              <div className="flex flex-col items-center mt-4 gap-2">
                <label htmlFor="brush-width" className="text-gray-700">
                  Adjust Brush Width
                </label>
                <input
                  id="brush-width"
                  type="range"
                  min="1"
                  max="50"
                  value={brushWidth}
                  onChange={e => setBrushWidth(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-sm text-gray-500">Width: {brushWidth}px</p>
              </div>
            </div>
            <button
              className={`button ${tool === "rectangle" && "active z-5"}`}
              onClick={() => setTool("rectangle")}>
              <div className="button__content">
                <div className="button__icon">
                  <img src="/icons/rectangle.png" alt="Rectangle" />
                </div>
                <p className="button__text">Rectangle</p>
              </div>
            </button>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <label className="button !w-[170px] !h-[142px]" htmlFor="file-upload">
            <div className="button__content">
              <div className="button__icon">
                <img src="/icons/plus.png" alt="Lasso" />
              </div>
              <p className="button__text">Add Photo</p>
            </div>
            <input
              id="file-upload"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  );
}

export default KonvaCanvas;
