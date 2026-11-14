"use client";

import GalleryCard from "./GalleryCard";
import imgFio4D from "../../../imgs/imgFio4D.jpeg";
import imgFioBrasileiro from "../../../imgs/imgFioBrasileiro.jpeg";
import imgSPALabial from "../../../imgs/imgSPALabial.jpeg";
import ImgCilios from "../../../imgs/cilios.jpeg";
import ImgGaleria from "../../../imgs/img_galeria.jpeg";
import ImgSombrancelha from "../../../imgs/sombrancelha.jpg";

const images = [
  imgFio4D,
  imgFioBrasileiro,
  imgSPALabial,
  ImgCilios,
  ImgGaleria,
  ImgSombrancelha,
];

export default function GalleryGrid() {
  return (
    <div
      className="
        mt-20
        grid
        gap-6
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {images.map((image) => (
        <GalleryCard
          key={image.src}
          image={image.src}
        />
      ))}
    </div>
  );
}