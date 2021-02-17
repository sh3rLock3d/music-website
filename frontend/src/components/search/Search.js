import React, { Component } from 'react';
import { gethttp, posthttp, URL } from '../requests/Requests'
import { useState } from "react";
import './Search.css'

const SearchElement = ({ songInfo }) => {
  console.log(songInfo) // {songInfo.title}
  return (
    <div class="card element container">
      <h5 class="card-header">{songInfo.title}</h5>
      <div class="card-body">
        <h5> <i class="fa fa-music"></i> {songInfo.artist} </h5>
        <h5> <i class="fa fa-play"></i> {songInfo.album} </h5>
        <h5> <i class="fa fa-pencil"></i> {songInfo.album}  {songInfo.lyric[0]} ... </h5>

        <a href={"/song?songId=" + songInfo.objectId} class="btn btn-primary">visit song</a>
      </div>
    </div>
  )
}



const SearchResults = ({ result }) => {
  const searchBar = result.map(
    (searchElement) =>
      <SearchElement songInfo={searchElement} />

  )
  return (
    <div>

      {searchBar}

    </div>
  )
}




function Search() {
  const [counter, updateCounter] = useState({ searchIsFound: false })
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const searchReqParam = URL + "/api/search?searchText=" + urlParams.get("searchText")
  gethttp(searchReqParam).then((res) => {
    let remoteIsSearchFound = true
    let localIsSearchFound = counter.searchIsFound
    if (remoteIsSearchFound != localIsSearchFound) {
      updateCounter({ searchIsFound: remoteIsSearchFound, result: res.body.message })
    }

  })

  return (
    <>
      <div class="d-flex flex-column justify-content-center align-items-center mt-2">
        <h2 class="mb-3" data-aos="fade-up">result for {urlParams.get("searchText")}</h2>
      </div>

      {
        counter.searchIsFound ?
          <SearchResults result={counter.result} /> :
          <p>loading...</p>
      }
    </>
  );

}

export default Search;