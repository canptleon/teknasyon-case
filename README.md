# **Teknasyon Case**

*Konva Masking and Drawing Tool*
A web-based image manipulation tool built with **React** and **Konva.js**, allowing users to upload images, draw shapes (Brush, Lasso, Rectangle), and export masked images in **PNG**, **JPG**, or **JPEG** formats.

## Live Demo

Check out the live demo of the project here:

**LIVE DEMO**: [https://teknasyon-case.vercel.app/](https://teknasyon-case.vercel.app/)

## **Features**

- **Image Upload:** Add an image to the canvas for manipulation.
- **Tools:**
  - **Brush:** Draw freehand lines on the canvas.
  - **Lasso:** Create freeform closed shapes to mask parts of the image.
  - **Rectangle:** Draw rectangular areas on the canvas.
- **Reset:** Clear all drawings and restore the original image.
- **Rewind:** The most recent change is removed from the history stack.
- **Export Options:** Save the canvas as:
  - **PNG**: High-quality transparent image.
  - **JPG**: Compressed image format.
  - **JPEG**: Alternative compressed format.
- **Adjust Pencil Size:** Change the width of the Brush and Lasso tools for precise editing.

### **Prerequisites**

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Yarn](https://yarnpkg.com/) (optional but recommended)


## **Usage**

### **Tool Guide**

#### **Add Photo:**

- Click **"Add Photo"** to upload an image (**PNG**, **JPG**, or **JPEG**).
- The image will appear on the canvas.

#### **Select a Tool:**

- **Brush:** Freehand drawing.
- **Lasso:** Draw freeform closed shapes for masking.
- **Rectangle:** Select rectangular regions.

#### **Adjust Pencil Size:**

- Use the slider to increase or decrease the tool size.

#### **Reset:**

- Click **"Reset"** to clear all drawings and restore the original image.

#### **Export:**

1. Select **PNG**, **JPG**, or **JPEG** format from the dropdown.
2. Click **"Export"** to download the masked image.

## **Dependencies**

- **[React](https://reactjs.org/):** UI Library
- **[Konva.js](https://konvajs.org/):** Canvas manipulation
- **[React-Konva](https://github.com/konvajs/react-konva):** React wrapper for Konva
- **[TailwindCSS](https://tailwindcss.com/):** Utility-first CSS framework
