import React, { Component } from 'react';

function Search() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  console.log(urlParams.get("searchText"))
    return (
        <div class="hero d-flex flex-column justify-content-center align-items-center">
          <h2>search</h2>
          <h2>search</h2>
          <h2>search</h2>
          <h2>search</h2>
          <h2>search</h2>
          <h2>search</h2>
        </div>
    );
  
}

export default Search;