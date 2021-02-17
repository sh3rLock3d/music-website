import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Home from './components/home/Home';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Search from './components/search/Search';
import Profile from './components/profile/Profile';
import Song from './components/song/Song'
import './App.css';

function App() {
  const onSearchIconClick = () => {
    let searchText = document.getElementById("searchInput").value
    window.open("/search?searchText=" + searchText,"_self");
  }
  return (
    <Router>
      <div>
        <nav class="navbar navbar-expand-lg">
          <div class="container">

            <a class="navbar-brand" href="/">Music World</a>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
              aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ml-lg-auto">

                <li class="nav-item">
                  {/*https://bootsnipp.com/snippets/GaeQR*/}
                  <div class="searchbar">
                    <input class="search_input" type="text" name="" id="searchInput" placeholder="Search..."></input>
                    <a href="#" class="search_icon" onClick={onSearchIconClick}><i class="fa fa-search"></i></a>

                  </div>
                </li>

                <li class="nav-item">
                  <a href="/" class="nav-link smoothScroll">Home</a>
                </li>

                <li class="nav-item">
                  <a href='/about' class="nav-link smoothScroll">About Us</a>
                </li>

                <li class="nav-item">
                  <a href='/contact' class="nav-link smoothScroll">Contact</a>
                </li>

                <li class="nav-item">
                  <a href='/profile' class="nav-link smoothScroll">Profile</a>
                </li>

              </ul>

              <ul class="social-icon ml-lg-3">
                <li><a href="#" class="fa fa-telegram"></a></li>
                <li><a href="#" class="fa fa-twitter"></a></li>
                <li><a href="#" class="fa fa-instagram"></a></li>
              </ul>
            </div>

          </div>
        </nav>

        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/search' component={Search} />
          <Route path='/contact' component={Contact} />
          <Route path='/about' component={About} />
          <Route path='/profile' component={Profile} />
          <Route path='/song' component={Song} />
        </Switch>
      </div>
    </Router>
  );
}


export default App;