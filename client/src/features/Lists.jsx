import React, { useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { properties, popularproperties } from "../properties.js";
import { Link, Video, Image, Bed, Bath } from "lucide-react";
import LocateIcon from "../assets/icon (5).png";
import SwitchIcon from "../assets/icon (3).png";
import ShareIcon from "../assets/icon (4).png";
import HeartIcon from "../assets/Link.png";

const Lists = () => {
  const sortOptions = [
    "Default",
    "Most Recent",
    "Highest Price",
    "Lowest Price",
    "Verified Status",
  ];

  const propertyFilters = [
    "Land",
    "Commercial Properties",
    "Event Centers",
    "Houses",
    "Flat",
  ];

  const [selectedSort, setSelectedSort] = useState("Default");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const toggleFilter = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((item) => item !== filter)
        : [...prev, filter]
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    // optionally collapse filters:
    // setIsFilterOpen(false);
  };

  const handleSortChange = (option) => {
    setSelectedSort(option);
    setIsSortDropdownOpen(false);
    console.log("Sort by:", option);
  };

  return (
    <>
      <main className="wrapper">
        {/* section for filter and sort */}
        <section>
          <div className="relative w-full  border-gray-200 bg-white px-4 py-3">
            {/* Top Row */}
            <div className="flex justify-between items-center">
              {/* Left */}
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-black"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  More Filter
                </button>

                <span className="text-sm hidden md:block text-gray-600">
                  Showing 1 – 10 of 15 results
                </span>
              </div>

              {/* Right (Sort) */}
              <div className="relative text-sm text-gray-700">
                <button
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  className="flex items-center gap-1 font-medium hover:text-black"
                >
                  Sort by: <span className="text-black">{selectedSort}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isSortDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 shadow-lg rounded-md z-10">
                    {sortOptions.map((option) => (
                      <div
                        key={option}
                        onClick={() => handleSortChange(option)}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Filter Panel */}
            {isFilterOpen && (
              <div className="mt-4 flex flex-col gap-3">
                {/* Filters */}
                <div className="flex flex-wrap gap-4">
                  {propertyFilters.map((filter) => (
                    <label
                      key={filter}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFilters.includes(filter)}
                        onChange={() => toggleFilter(filter)}
                        className="accent-[#3D9970]"
                      />
                      {filter}
                    </label>
                  ))}
                </div>

                {/* Clear Button */}
                {selectedFilters.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-red-600 underline self-start hover:text-red-800"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
        {/* section for listed properties */}
        <section>
          <div className="">
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[54px]">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md "
                >
                  <div className="relative">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-48 object-cover text-[#444444]"
                    />
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex">
                      {property.featured && (
                        <span className="bg-[#3D9970] text-white text-xs px-2 py-1 rounded">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="bg-[#9e9999b2] text-white  px-2 py-1 rounded">
                        For {property.for}
                      </span>
                    </div>

                    {/* Action Icons */}
                    <div className="absolute bottom-2 right-2 flex gap-2 text-white text-lg">
                      <div className="bg-[#878787B2]/70 p-1 rounded">
                        <Link />
                      </div>
                      <div className="bg-[#878787B2]/70 p-1 rounded">
                        <Video />
                      </div>
                      <div className="bg-[#878787B2]/70 p-1 rounded">
                        <Image />
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-[#444444] text-[20.68px] leading-[24.81px] tracking-[0%] ">{property.title}</h3>
                    <figure className="flex items-center">
                      <img
                        className="p-2 text-[#666666]"
                        src={LocateIcon}
                        alt=""
                      />
                      <figcaption className="text-[#373737] ">{property.location}</figcaption>
                    </figure>
                    <div className="flex items-center text-sm text-gray-700 gap-4 my-2">
                      <span className="flex items-center gap-1">
                        <Bed /> {property.bedrooms}Bedrooms
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath /> {property.bathrooms}Bathrooms
                      </span>
                    </div>

                    <div className="font-semibold text-[#373737] text-base pt-2 flex justify-between border-t-[1.15px] border-t-[#E8E8E8]">
                      {property.price}
                      <figure className="flex gap-2 pr-5">
                        <img src={SwitchIcon} alt="" />
                        <img src={ShareIcon} alt="" />
                        <img src={HeartIcon} alt="" />
                      </figure>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <div className="flex justify-center ">
          <nav className="flex items-center space-x-2 text-sm  ">
            <button className="px-3 py-1 rounded border">&#8592;</button>
            <button className="px-3 py-1 bg-[#3D9970] text-white rounded">1</button>
            <button className="px-3 py-1 rounded border">2</button>
            <button className="px-3 py-1 rounded border">3</button>
            <button className="px-3 py-1 rounded border">4</button>
            <button className="px-3 py-1 rounded border">&#8594;</button>
          </nav>
        </div> */}
        </section>
      </main>
    </>
  );
};

export default Lists;
