/* @flow */
import React, { useState } from "react";
import { ImageInfo } from "./MainPage";
import Sketch from "react-p5";

const styles = {
  sketch: {
    justifyContent: "center",
  },
};

type Props = { imageInfo: ImageInfo; detections: Array<any> };

const CanvasWrapper = ({ imageInfo, detections }: Props) => {
  const { src, height, width } = imageInfo;
  const [image, setImage] = useState();
  const setup = (p5, canvasParentRef) => {
    if (width && height && src) {
      p5.createCanvas(width, height).parent(canvasParentRef);
      p5.color(0, 0, 0);
      p5.fill(0, 0, 0);
      setImage(p5.loadImage(src));
    }
  };

  const draw = (p5) => {
    p5.background(0);
    if (image) {
      p5.image(image, 0, 0);
    }
    if (detections) {
      for (const detection of detections) {
        let height = detection.box.height;
        let width = detection.box.width;
        let x = detection.box._x;
        let y = detection.box._y;
        p5.rect(x, y, width, height);
      }
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default CanvasWrapper;