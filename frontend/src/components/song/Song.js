import { title } from 'process';
import React, { Component } from 'react';
import { useState } from "react";
import { gethttp, posthttp, URL } from '../requests/Requests'
import './Song.css';


const CommentLyrics = ({ line, comments, song }) => {
    const onAddAboutClicked = () => {
        let c = document.getElementById("addlyricComment").value
        let i = song
        let n = parseInt(line.lineNumber)
        let data = { c, i, n }
        posthttp(URL + "/api/addCommentlyrics", data).then(
            (value) => {
                if (value.status == 200) {
                    //window.open("/song?songId="+i+"#About","_self");
                    window.location.reload(false);
                } else if (value.status == 401) {
                    alert(" you are not logg in ");
                } else if (value.status == 402) {
                    alert(" write something ");
                } else {
                    alert("invalid input");
                }
            }
        )
    }

    const thisLineComments = new Array()

    for (let cc in comments) {
        if (comments[cc].line == line.lineNumber) {
            thisLineComments.push(comments[cc].title)
        }
    }

    debugger

    return (
        <>
            <h2 class="mb-4 text-white" data-aos="fade-up" data-aos-delay="500">{line.text}</h2>

            {
                thisLineComments.map(
                    c => <p data-aos="fade-up" data-aos-delay="200">{c}</p>
                )
            }

            <div>

                <h3 class="mb-4 text-white" data-aos="fade-up" data-aos-delay="500">add a comment</h3>

                <div data-aos="fade-up" data-aos-delay="200" class="input-group mb-3">
                    <textarea class="form-control" id="addlyricComment" rows="10" placeholder="enter your comment" aria-label="enter your comment"></textarea>
                </div>

                <a href="#" class="btn custom-btn bg-color mt-3" data-aos="fade-up" data-aos-delay="300" data-toggle="modal" onClick={onAddAboutClicked} >Add This Comment</a>
            </div>
        </>
    )
}


const Lyrics = ({ song, comment }) => {
    const formattedLyrics = song.lyric.map(x => { return { text: x, lineComment: new Array() } })
    for (let cc in formattedLyrics) {
        formattedLyrics[cc].lineNumber = cc
    }
    for (let cc in comment) {
        if (!comment[cc].isAboutComment) {
            formattedLyrics[comment[cc].line].lineComment.push(comment)
        }
    }

    const [counter, updateCounter] = useState({ line: undefined })

    console.log(formattedLyrics)
    return (
        <>
            <section class="Lyrics" id="Lyrics">
                <div class="container">
                    <div class="row">

                        <div class="d-flex flex-column justify-content-center ml-lg-auto mr-lg-5 col-lg-5 col-md-6 col-12">
                            <h2 class="mb-3 text-white" data-aos="fade-up">Lyrics</h2>

                            {
                                formattedLyrics.map((line) => {
                                    const onLineClicked = () => {
                                        updateCounter({ line: line })
                                    }
                                    return <p data-aos="fade-up" data-aos-delay="200" onClick={onLineClicked}>{line.text}</p>
                                }

                                )
                            }


                        </div>

                        <div class="mr-lg-auto mt-3 col-lg-4 col-md-6 col-12">

                            <div>

                                {counter.line == undefined ?
                                    <h2 class="mb-4 text-white" data-aos="fade-up" data-aos-delay="500">choose a line</h2>
                                    :
                                    <CommentLyrics line={counter.line} comments={comment} song={song.objectId} />
                                }

                            </div>

                        </div>
                    </div>
                </div>
            </section >

        </>
    )
}



const Description = ({ song, comment }) => {

    let firsDes = <p data-aos="fade-up" data-aos-delay="800">this song doesn't have any explenation. add one</p>

    for (let cc in comment) {
        if (comment[cc].isAboutComment) {
            firsDes = <p data-aos="fade-up" data-aos-delay="800">{comment[cc].title}</p>
        }
    }
    return (
        <>
            <section class="Description" id="Description">
                <div class="container">
                    <div class="row">

                        <div class="d-flex flex-column justify-content-center ml-lg-auto mr-lg-5 col-lg-5 col-md-6 col-12">
                            <h2 class="mb-3 text-white" data-aos="fade-up">{song.title}</h2>
                            <h2> <i class="fa fa-music"></i> {song.artist} </h2>
                            <h2> <i class="fa fa-play"></i> {song.album} </h2>
                            {
                                firsDes
                            }
                        </div>

                        <div class="mr-lg-auto mt-3 col-lg-4 col-md-6 col-12">
                            <div class="about-working-hours">
                                <div>

                                    <h2 class="mb-4 text-white" data-aos="fade-up" data-aos-delay="500">Music World</h2>

                                    <p data-aos="fade-up" data-aos-delay="800">free lyrics</p>

                                    <p data-aos="fade-up" data-aos-delay="800">findig meaning easily</p>

                                    <p data-aos="fade-up" data-aos-delay="800">talk about songs</p>

                                    <p data-aos="fade-up" data-aos-delay="800">find your favoraye songs</p>

                                    <p data-aos="fade-up" data-aos-delay="800">find new friends</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

        </>
    )
}

const AboutComment = ({ comment }) => {
    return <p data-aos="fade-up" data-aos-delay="200">{comment.title}</p>
}

const About = ({ song, comment }) => {
    const aboutComments = new Array()
    for (let cc in comment) {
        if (comment[cc].isAboutComment) {
            aboutComments.push(comment[cc])
        }
    }
    const onAddAboutClicked = () => {
        let c = document.getElementById("addAboutComment").value
        let i = song.objectId
        let data = { c, i }
        posthttp(URL + "/api/addCommentAbout", data).then(
            (value) => {
                console.log(value.status)
                debugger
                console.log(value.body.message)
                if (value.status == 200) {
                    //window.open("/song?songId="+i+"#About","_self");
                    window.location.reload(false);
                } else if (value.status == 401) {
                    alert(" you are not logg in ");
                } else if (value.status == 402) {
                    alert(" write something ");
                } else {
                    alert("invalid input");
                }
            }
        )
    }


    return (
        <>
            <section class="About" id="About">
                <div class="container">
                    <div class="row">

                        <div class="d-flex flex-column justify-content-center ml-lg-auto mr-lg-5 col-lg-5 col-md-6 col-12">
                            <h2 class="mb-3 text-white" data-aos="fade-up">About this Song</h2>


                            {aboutComments.map(x =>
                                <AboutComment comment={x} />

                            )}


                        </div>

                        <div class="mr-lg-auto mt-3 col-lg-4 col-md-6 col-12">
                            <div class="about-working-hours">
                                <div>

                                    <h2 class="mb-4 text-white" data-aos="fade-up" data-aos-delay="500">Add About Song</h2>

                                    <div data-aos="fade-up" data-aos-delay="200" class="input-group mb-3">
                                        <textarea class="form-control" id="addAboutComment" rows="10" placeholder="enter your comment" aria-label="enter your comment"></textarea>
                                    </div>

                                    <a href="#" class="btn custom-btn bg-color mt-3" data-aos="fade-up" data-aos-delay="300" data-toggle="modal" onClick={onAddAboutClicked} >Add This Comment</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

        </>
    )
}


const Comments = ({ song, comment }) => {
    if (comment == null) {
        comment = new Array()
    }
    return (
        <>
            <section class="Comments" id="Comments">
                <div class="container">
                    <div class="row">

                        <div class="d-flex flex-column justify-content-center ml-lg-auto mr-lg-5 col-lg-12 col-md-12 col-12">
                            <h2 class="mb-3 text-white" data-aos="fade-up">comments</h2>
                            {
                                comment.map(
                                    x => <p data-aos="fade-up" data-aos-delay="200"> <i class="fa fa-user"></i> {x.title}</p>
                                )
                            }
                            

                        </div>
                    </div>
                </div>
            </section >

        </>
    )
}

const Album = ({ song }) => {
    return (
        <>
            <section class="Album" id="Album">
                <div class="container">
                    <div class="row">

       

                        <div class="mr-lg-auto mt-3 col-lg-4 col-md-6 col-12">
                            <div class="about-working-hours">
                                <div>

                                    <h2 class="mb-4 text-white" data-aos="fade-up" data-aos-delay="500">More From This Album</h2>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

        </>
    )
}

const ContactUs = ({ song }) => {
    return (
        <>
            <section class="ContactUs" id="ContactUs">
                <div class="container">
                    <div class="row">


                        <div class="mr-lg-auto mt-3 col-lg-4 col-md-6 col-12">
                            <div class="about-working-hours">
                                <div>

                                    <h2 class="mb-4 text-white" data-aos="fade-up" data-aos-delay="500">Feel Free to ask us any thing</h2>

                                    <p data-aos="fade-up" data-aos-delay="200"> <i class="fa fa-email"></i> alipourghasmi78@gmail.com</p>
                                    <p data-aos="fade-up" data-aos-delay="200"> this is an open source project and needs your help. it makes us happy if you contribute in this project</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

        </>
    )
}

const SongComponents = ({ song, comments }) => {
    console.log(song)
    return (
        <>
            <div class="sidebar-navigation hidde-sm hidden-xs fixed-top">
                <div class="logo">
                    <a href="#">{song.title}</a>
                </div>
                <nav>
                    <ul>
                        <li>
                            <a href="#Description">
                                <span class="rect"></span>
                                <span class="circle"></span>
                        Description
                    </a>
                        </li>
                        <li>
                            <a href="#Lyrics">
                                <span class="rect"></span>
                                <span class="circle"></span>
                        Lyrics
                    </a>
                        </li>
                        <li>
                            <a href="#About">
                                <span class="rect"></span>
                                <span class="circle"></span>
                        About
                    </a>
                        </li>
                        <li>
                            <a href="#Comments">
                                <span class="rect"></span>
                                <span class="circle"></span>
                        Comments
                    </a>
                        </li>
                        <li>
                            <a href="#Album">
                                <span class="rect"></span>
                                <span class="circle"></span>
                        More From This Album
                    </a>
                        </li>
                        <li>
                            <a href="#contact">
                                <span class="rect"></span>
                                <span class="circle"></span>
                        Contact Us
                    </a>
                        </li>
                    </ul>
                </nav>

            </div>
            <div class="page-content">
                <Description song={song} comment={comments} />
                <Lyrics song={song} comment={comments} />
                <About song={song} comment={comments} />
                <Comments song={song} comment={comments} />
                <Album song={song} />
                <ContactUs song={song} />
            </div>

        </>
    )
}


const Song = () => {
    const [counter, updateCounter] = useState({ searchIsFound: false })
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchReqParam = URL + "/api/song?songId=" + urlParams.get("songId")
    gethttp(searchReqParam).then((res) => {
        let remoteIsSearchFound = true
        let localIsSearchFound = counter.searchIsFound
        if (remoteIsSearchFound != localIsSearchFound) {
            updateCounter({ searchIsFound: remoteIsSearchFound, result: res.body.message, comments: res.body.comments })
        }

    })
    return (
        <>
            {
                counter.searchIsFound ?
                    <SongComponents song={counter.result} comments={counter.comments} /> :
                    <p>loading...</p>
            }
        </>
    );

}

export default Song;