import React from "react";
import EmblaCarousel from "../components/CarousalAutoScroll.jsx";

function Carousal() {
  const OPTIONS = { loop: true };
  const SLIDE_COUNT = 12;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  return (
    <div className="w-">
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />;
    </div>
  );
}

export default Carousal;
