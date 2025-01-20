import React from "react";

export default function MasterProductImage({image_url}) {
  return (
    <div className="overflow-hidden">
      <img
        src={image_url}
        alt=""
        className="w-full rounded-md"
      />
    </div>
  );
}
