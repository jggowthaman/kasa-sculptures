import { useState } from "react";

import Gallery1 from "./Gallery1";
import Gallery2 from "./Gallery2";
import Gallery3 from "./Gallery3";
import Gallery4 from "./Gallery4";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All Sculptures");

  return (
    <>
      <Gallery1 />

      <Gallery2
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <Gallery3
        activeCategory={activeCategory}
      />

      <Gallery4 />
    </>
  );
}