import React from "react";
import { Carousel } from "@material-tailwind/react";

export default function MasterCarousel() {
  return (
    <Carousel className="rounded-xl">
      <img
        src="./assets/carousel-1.png"
        alt="image1"
        className="h-full w-full "
      />
      <img
        src="./assets/carousel-2.png"
        alt="image2"
        className="h-full w-full "
      />
      <img
        src="./assets/carousel-3.png"
        alt="image3"
        className="h-full w-full "
      />
      {/* <img
        src="./assets/carousel-4.png"
        alt="image3"
        className="h-full w-full "
      />
      <img
        src="./assets/carousel-5.png"
        alt="image3"
        className="h-full w-full "
      /> */}
    </Carousel>
  );
}
