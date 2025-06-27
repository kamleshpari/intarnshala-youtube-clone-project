import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const categories = [
  "All",
  "Music",
  "Coding",
  "Education",
  "Sports",
  "Comedy",
  "Gaming",
  "News",
];

function FilterBar() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const active = searchParams.get("category") || "All";

  const handleClick = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat === "All") {
      params.delete("category");
    } else {
      params.set("category", cat);
    }
    navigate(`/?${params.toString()}`);
  };

  return (
    <div className="flex gap-3 overflow-x-auto py-2 px-1 mb-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleClick(cat)}
          className={`px-4 py-1 text-sm rounded-full border ${
            active === cat
              ? "bg-red-600 text-white border-red-600"
              : "border-gray-300"
          } whitespace-nowrap`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;

