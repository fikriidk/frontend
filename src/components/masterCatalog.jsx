import React from "react";
import {
  Typography,
} from "@material-tailwind/react";
import MasterButtonWa from "./masterButtonWa";

export default function MasterCatalog({
  imageUrl,
  productName,
  priceRange,
  wa_link,
  brand,
  id,
  description,
}) {
  return (
    <div className="lg:max-w-[250px] w-full rounded-lg shadow-lg">
      <div
        floated={false}
        shadow={false}
        color="transparent"
        className="object-cover transform scale-100 hover:scale-110 transition-transform duration-300 ease-in-out"
      >
        <a href={`/detail-produk/${id}`}>
          <img className="rounded-md" src={imageUrl} alt={productName} />
        </a>
      </div>
      <div className="">
        <div className="flex flex-col">
          <div className="flex justify-start items-center h-[50px] px-2">
            <Typography
              variant="h4"
              color="blue-gray"
              className="text-xl font-semibold"
              style={{
                fontFamily: "'M PLUS Rounded 1c', sans-serif",
                fontWeight: 800,
                fontSize: "20px",
              }}
            >
              {brand}
            </Typography>
          </div>
          <div className="px-2 h-[100px] overflow-hidden text-justify">
            <Typography
              variant="h4"
              color="blue-gray"
              className="text-sm whitespace"
              style={{
                fontFamily: "'M PLUS Rounded 1c', sans-serif",
                fontWeight: 200,
                fontSize: "14px",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {description}
            </Typography>
          </div>
          <div className="px-2">
            <Typography
              variant="lead"
              color="black"
              className="font-bold whitespace-nowrap"
              style={{
                fontFamily: "'M PLUS Rounded 1c', sans-serif",
                fontWeight: 600,
                fontSize: "0.950rem",
              }}
            >
              {priceRange}
            </Typography>
          </div>
        </div>
        <div className="flex items-end justify-center mb-2 pt-4 px-2">
          <MasterButtonWa wa_link={wa_link} />
        </div>
      </div>
    </div>
  );
}
