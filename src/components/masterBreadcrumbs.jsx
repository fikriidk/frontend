import React from "react";

export default function MasterBreadcrumbs() {
  return (
    <div className="flex gap-2">
      <a
        href="/blog"
        className="text-wpigreen-50 hover:text-green-900 opacity-60"
      >
        News
      </a>
      <div>/</div>
      <a href="#" className="text-wpigreen-50 hover:text-green-900 font-bold">
        *Nama beritanya*
      </a>
    </div>
  );
}
