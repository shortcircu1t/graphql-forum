import React, { ReactElement, useState } from "react";
import InputWithIcon from "../InputWithIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar(): ReactElement {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (window) {
          window.location.replace(`/search/${searchQuery}`);
        }
      }}
      className="w-3/4 bg-black-light sm:m-6 md:m-16 lg:w-auto lg:m-0"
    >
      <InputWithIcon tailwindString="focus-within:text-white text-secondary w-auto">
        <button
          type="submit"
          className="block p-1"
          aria-label="search posts"
          role="button"
        >
          <FontAwesomeIcon
            icon={faSearch}
            size="lg"
            className="mr-2 transition-colors duration-200"
          />
        </button>
        <label htmlFor="search" className="hidden">
          Search posts:
        </label>
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          name="search"
          className="w-full bg-transparent lg:w-auto focus:outline-none placeholder-secondary"
          placeholder="Type to search posts"
        />
      </InputWithIcon>
    </form>
  );
}
