import React, { Component } from 'react';

const Song = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const a =  urlParams.get("songId")
    console.log(a)

    return (
        <div class="hero d-flex flex-column justify-content-center align-items-center">
            <h2>Song</h2>
            <h2>Song</h2>
            <h2>Song</h2>
            <h2>Song</h2>
            <h2>Song</h2>
            <h2>Song</h2>
            <h2 class="navbar-brand">Home</h2>
        </div>
    );

}

export default Song;