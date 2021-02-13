import React from "react";

function Search({bakerSearch, setBakerSearch}) {

    return (
        <div className="searchbar">
          <label htmlFor="search">Search By Name:</label>
          <input
            type="text"
            id="search"
            placeholder="Type a name to search..."
            value={bakerSearch}
            onChange={(e) => setBakerSearch(e.target.value)}
          />
        </div>
      );

}

export default Search