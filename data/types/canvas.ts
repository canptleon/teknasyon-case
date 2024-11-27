export type LineType = {
  points: number[];
  closed: boolean;
  color: string;
  width?: number;
};

export type RectangleType = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ImageDataType = {
  image: HTMLImageElement | null;
  scaledWidth: number;
  scaledHeight: number;
  offsetX: number;
  offsetY: number;
};
