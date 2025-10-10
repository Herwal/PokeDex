import React, { useState } from "react";
import Image from "next/image";
import { typeRanking, typeColors } from "../utils/types";

interface FilterMenuProps {
  selectedTypes: string[];
  onTypesChange: (types: string[]) => void;
}

export default function FilterMenu({
  selectedTypes,
  onTypesChange,
}: FilterMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleType = (type: string) => {
    onTypesChange(
      selectedTypes.includes(type)
        ? selectedTypes.filter((t) => t !== type)
        : [...selectedTypes, type]
    );
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 text-white rounded-md hover:border-gray-400 border"
        title="Filter by type"
      >
        <Image
          src="/assets/fire-type.png"
          alt="sort by type"
          width="30"
          height="30"
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10 min-w-[200px]">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-black">Select Types</h3>
            <button
              onClick={() => onTypesChange([])}
              className="text-xs text-gray-600 hover:text-gray-800 underline cursor-pointer"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {Object.keys(typeRanking).map((type) => (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className={`px-3 py-2 rounded text-sm capitalize ${
                  typeColors[type]
                } cursor-pointer hover:underline ${
                  selectedTypes.includes(type)
                    ? "ring-2 ring-blue-500 ring-offset-1"
                    : ""
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
