import { get } from 'https'
import { gethttp, posthttp, URL } from '../requests/Requests'

const ProfileInfo = ({ user }) => {
    const onLogOutClickButton = () => {
        gethttp(URL + "/api/logout").then(
            (res) => {
                window.open("/profile", "_self");
            }
        )
    }


    return (
        <section class="profileinfo" id="profileinfo">
            <div class="container">
                <div class="row">

                    <div class="d-flex flex-column justify-content-center ml-lg-auto mr-lg-5 col-lg-5 col-md-6 col-12">
                        <h2 class="mb-3 text-white" data-aos="fade-up">{user.username}</h2>

                        <p data-aos="fade-up" data-aos-delay="200"> {user.email}.</p>

                        <a href="#" class="btn custom-btn bg-color mt-3" data-aos="fade-up" data-aos-delay="300" data-toggle="modal" onClick={onLogOutClickButton}>Log Out</a>
                    </div>

                    <div class="mr-lg-auto mt-3 col-lg-4 col-md-6 col-12">
                        <div>
                            <div>

                                <h2 class="mb-4 text-white" data-aos="fade-up" data-aos-delay="500">welcome Back</h2>

                                <p data-aos="fade-up" data-aos-delay="800">try to contribute in our commiunity</p>

                                <p data-aos="fade-up" data-aos-delay="800">to help other people find their favorate song</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >

    )
}


const AddNewSong = () => {
    const createSong = () => {
        let title = document.getElementById("createmusictitle").value
        let album = document.getElementById("createmusicalbum").value
        let artist = document.getElementById("createmusicalbum").value
        let lyric = document.getElementById("createmusiclyric").value
        let data = { title, album, artist, lyric }

        posthttp(URL + "/api/addnewsong", data).then(
            (value) => {
                console.log(value.status)
                console.log(value.body.message)
                if (value.status == 200) {
                    alert("created successfully")
                } else {
                    alert("error in creating: " + value.body.error);
                }
            }
        )
    }

    return (
        <section class="profileinfo" id="profileinfo">
            <div class="container">
                <div class="row">
                    <h2 class="text-white" data-aos="fade-up">Add New Song</h2>
                    <div data-aos="fade-up" data-aos-delay="200" class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">title</span>
                        </div>
                        <input data-aos-delay="200" type="text" id="createmusictitle" class="form-control" placeholder="name of song" aria-label="name of song" aria-describedby="basic-addon1"></input>
                    </div>

                    <div data-aos="fade-up" data-aos-delay="200" class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Album</span>
                        </div>
                        <input data-aos-delay="200" type="text" id="createmusicalbum" class="form-control" placeholder="name of song's album" aria-label="name of song's album" aria-describedby="basic-addon1"></input>
                    </div>

                    <div data-aos="fade-up" data-aos-delay="200" class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Artist</span>
                        </div>
                        <input data-aos-delay="200" type="text" id="createmusicartist" class="form-control" placeholder="name of artist" aria-label="name of artist" aria-describedby="basic-addon1"></input>
                    </div>

                    <div data-aos="fade-up" data-aos-delay="200" class="input-group mb-3">
                        <textarea class="form-control" id="createmusiclyric" rows="10" placeholder="enter lyric of song" aria-label="enter lyric of song"></textarea>
                    </div>

                    <a href="#" class="btn custom-btn bg-color mt-3" data-aos="fade-up" data-aos-delay="300" data-toggle="modal" onClick={createSong}>Create Song</a>

                </div>
            </div>
        </section >
    )
}

const GetMySongs = () => {
    /*
    gethttp(URL + "/api/getmysongs").then((res) => {
        alert(res.body.message)
    })
    */
    return (
        <section class="profilemysongs" id="profilemysongs">
            <p>salam</p>
        </section>
    )
}

export { ProfileInfo, AddNewSong, GetMySongs }