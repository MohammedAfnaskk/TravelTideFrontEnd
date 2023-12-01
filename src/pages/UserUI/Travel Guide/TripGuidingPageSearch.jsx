import React, { useState } from "react";
import _ from "lodash";
import {GuidingTripList} from "../../../services/userApi";
import TripGuidingList from "./travelGuideList";

export default function PackagePlaceSearch() {
  const [search, setSearch] = useState("");
  const [filteredUserList, setFilteredUserList] = useState([]);

  const handleSearch = async (searchTerm) => {
    setSearch(searchTerm);

    try {
      const res = await GuidingTripList(searchTerm.toString());

      if (res.data && res.data.length > 0) {
        setFilteredUserList(res.data);
      } else {
        setFilteredUserList([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedSearch = _.debounce(handleSearch, 300);

  return (
    <>
      <header className="text-center text-2xl md:text-2xl lg:text-3xl xl:text-3xl mt-20 font-bold ">
        Explore travel guides and itineraries
      </header>

      <div className="flex items-center justify-center mt-6">
        <div className="lg:w-[38rem] w-96">
          {/* Place Input */}
          <div className="mb-4">
            <div className="max-w-xl mx-auto">
              <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg overflow-hidden border border-black">
                <div className="grid place-items-center h-full w-12 text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                <input
                  className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                  type="text"
                  id="search"
                  placeholder="Search for a destination"
                  value={search}
                  onChange={(e) => debouncedSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <TripGuidingList props={filteredUserList} />

    </>
  );
};

