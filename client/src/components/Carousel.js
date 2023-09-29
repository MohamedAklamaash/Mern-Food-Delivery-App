import React,{ useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "../index.css"
function ControlledCarousel() {
  const [index, setIndex] = useState(0);
  
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div id="carousel" className="d-flex" style={{ zIndex: "10" }}>

    </div>
  );
}

export default ControlledCarousel;
