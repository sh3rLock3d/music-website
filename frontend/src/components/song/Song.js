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
    
    for (let cc of comments) {
        if (cc.line == line.lineNumber) {
            thisLineComments.push(cc.title)
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



const Description = () => {
    return (
        <>
            <section class="Description" id="Description">
                <div class="container">
                    <div class="row">

                        <div class="d-flex flex-column justify-content-center ml-lg-auto mr-lg-5 col-lg-5 col-md-6 col-12">
                            <h2 class="mb-3 text-white" data-aos="fade-up">sign up</h2>



                            <p data-aos="fade-up" data-aos-delay="200">Music World is a free webste to find lyrics of your favorate music. if you sign in to our website we promise to respect to your <a rel="nofollow" href="#" target="_parent">privacy</a> .</p>

                            <a href="#" class="btn custom-btn bg-color mt-3" data-aos="fade-up" data-aos-delay="300" data-toggle="modal">Become a member</a>
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


const Comments = ({ song }) => {
    return (
        <>
            <section class="Comments" id="Comments">
                <div class="container">
                    <div class="row">

                        <div class="d-flex flex-column justify-content-center ml-lg-auto mr-lg-5 col-lg-5 col-md-6 col-12">
                            <h2 class="mb-3 text-white" data-aos="fade-up">sign up</h2>



                            <p data-aos="fade-up" data-aos-delay="200">Music World is a free webste to find lyrics of your favorate music. if you sign in to our website we promise to respect to your <a rel="nofollow" href="#" target="_parent">privacy</a> .</p>

                            <a href="#" class="btn custom-btn bg-color mt-3" data-aos="fade-up" data-aos-delay="300" data-toggle="modal">Become a member</a>
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

const Album = ({ song }) => {
    return (
        <>
            <section class="Album" id="Album">
                <div class="container">
                    <div class="row">

                        <div class="d-flex flex-column justify-content-center ml-lg-auto mr-lg-5 col-lg-5 col-md-6 col-12">
                            <h2 class="mb-3 text-white" data-aos="fade-up">sign up</h2>



                            <p data-aos="fade-up" data-aos-delay="200">Music World is a free webste to find lyrics of your favorate music. if you sign in to our website we promise to respect to your <a rel="nofollow" href="#" target="_parent">privacy</a> .</p>

                            <a href="#" class="btn custom-btn bg-color mt-3" data-aos="fade-up" data-aos-delay="300" data-toggle="modal">Become a member</a>
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

const ContactUs = ({ song }) => {
    return (
        <>
            <section class="ContactUs" id="ContactUs">
                <div class="container">
                    <div class="row">

                        <div class="d-flex flex-column justify-content-center ml-lg-auto mr-lg-5 col-lg-5 col-md-6 col-12">
                            <h2 class="mb-3 text-white" data-aos="fade-up">sign up</h2>



                            <p data-aos="fade-up" data-aos-delay="200">Music World is a free webste to find lyrics of your favorate music. if you sign in to our website we promise to respect to your <a rel="nofollow" href="#" target="_parent">privacy</a> .</p>

                            <a href="#" class="btn custom-btn bg-color mt-3" data-aos="fade-up" data-aos-delay="300" data-toggle="modal">Become a member</a>
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
                <Description />
                <Lyrics song={song} comment={comments} />
                <About song={song} comment={comments} />
                <Comments song={song} />
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