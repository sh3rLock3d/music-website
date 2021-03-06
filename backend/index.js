const express = require('express')
const app = express()
var cors = require('cors')
app.use(cors())
app.use(express.json());
const { body, validationResult } = require('express-validator');
var ParseServer = require('parse-server').ParseServer;
var api = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/dev',
  cloud: './cloud/main.js',
  appId: 'myAppId',
  masterKey: 'myMasterKey',
  fileKey: 'optionalFileKey',
  serverURL: 'http://localhost:1337/parse'
});

app.use('/parse', api);

app.listen(1337, function () {
  console.log('parse-server-example running on port 1337.');
});

var ParseDashboard = require('parse-dashboard');

var dashboard = new ParseDashboard({
  "apps": [
    {
      "serverURL": "http://localhost:1337/parse",
      "appId": "myAppId",
      "masterKey": "myMasterKey",
      "appName": "MyApp"
    }
  ]
});

app.use('/dashboard', dashboard);


app.get('/', function (req, res) {
  res.send({ "message": 'Hello World' })
})

app.post('/', function (req, res) {
  let body = req.body
  res.send({ message: body.message })
})

// user
app.post('/api/signup',
  body('password').isLength({ min: 5 }),
  body('email').isEmail(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    let body = req.body
    const user = new Parse.User();
    user.set("username", body.username);
    user.set("password", body.password);
    user.set("email", body.email);
    Parse.User.enableUnsafeCurrentUser()
    user.signUp().then(
      value => {
        res.send({ message: "user have been created" })
      },
      reason => {
        res.status(400).send({ error: `error in signing up, reason: ${reason}` })
      }
    )
  })

app.post('/api/signin', (req, res) => {
  let body = req.body
  Parse.User.enableUnsafeCurrentUser()
  Parse.User.logIn(body.username, body.password)
    .then(
      user => {
        res.send({ message: `${user.get("username")} logged in successfully` })
      },
      reason => {
        res.send({ error: reason })
      }
    )
})

function getCurrentUser() {
  const currentUser = Parse.User.current();
  if (currentUser) {
    return currentUser
  } else {
    return null
  }
}

app.get("/api/getcurrentuser", (req, res) => {
  const currentUser = getCurrentUser()
  if (currentUser) {
    res.send({ message: currentUser })
  } else {
    res.send({ error: "no user is logged in" })
  }
})

app.get("/api/logout", (req, res) => {
  Parse.User.logOut().then(() => {
    res.send({ message: "logged out successfully" })
  });
})
// music
app.post("/api/addnewsong", (req, res) => {
  // todo validation
  if (getCurrentUser() == null) {
    res.status(400).send({ error: "you are not login" })
  }

  let body = req.body
  const Music = Parse.Object.extend("Music")
  const music = new Music();
  music.set("title", body.title)
  music.set("album", body.album)
  music.set("artist", body.artist)
  music.set("lyric", body.lyric.split("\n"))
  music.set("createsBy", getCurrentUser())
  music.save().then(
    (musis) => {
      res.send({ message: "music created" })
    }, (error) => {
      res.status(400).send({ error })
    }
  )
})

app.get("/api/getmysongs", (req, res) => {

  res.send({ message: "kha baba" })
})

app.get("/api/search", (req, res) => {
  const Music = Parse.Object.extend("Music")
  const query = new Parse.Query(Music);
  query.matches("title", req.query.searchText)
  query.find().then((result) => {
    console.log("-------------")
    /*
    for (let i = 0; i < results.length; i++) {
      const object = results[i];
      console.log(object.id + ' - ' + object.get('title'));
    }*/
    res.send({ message: result })
  }, (erorr) => {
    res.send({ erorr })
  }
  )

})

async function findCommentsOfSong(music) {
  if (music.get("allMusicComments") == undefined) {
    return null
  }
  const map1 = music.get("allMusicComments").map(x => x.id);
  
  const GameScore = Parse.Object.extend("Comment");
  const query = new Parse.Query(GameScore);
  query.containedIn("objectId", map1);
  const results = await query.find();
  
  /*
  // Do something with the returned Parse.Object values
  for (let i = 0; i < results.length; i++) {
    const object = results[i];
    console.log(object.id + ' - ' + object.get('title'));
  }
  */
 return results
  //const map2 = results.map(x => x.get('title'));
  //return map2
}


app.get("/api/song", (req, res) => {
  const Music = Parse.Object.extend("Music");
  const query = new Parse.Query(Music);
  
  query.get(req.query.songId)
    .then((music) => {
      findCommentsOfSong(music).then(
          (val) => {
            res.send({ message: music, comments: val })
          }, (erorr)=> {
            res.send({ error })
          }
      )
      
    }, (error) => {
      res.send({ error })
    });

})

app.post("/api/addCommentAbout", (req, res) => {
  // todo validation
  if (getCurrentUser() == null) {
    res.status(401).send({ error: "you are not login" })
    return
  }
  let body = req.body

  if (body.c == undefined) {
    res.status(402).send({ error: "invalid input" })
    return
  }
  if (body.c.startsWith("<script>")) {
    res.status(403).send({ error: "invalid input" })
    return
  }

  const Music = Parse.Object.extend("Music");
  const query = new Parse.Query(Music);
  query.get(body.i)
    .then((music) => {

      const Comment = Parse.Object.extend("Comment")
      const comment = new Comment();
      comment.set("title", body.c)
      comment.set("isAboutComment", true)
      comment.set("line", -1)
      comment.set("createsBy", getCurrentUser())
      comment.save().then(
        (comment) => {
          music.add("allMusicComments", comment).save().then(
            (value) => {
              res.send({ message: "comment created" })
            }, (error) => {
              res.status(400).send({ error })
            }
          )

        }, (error) => {
          res.status(400).send({ error })
        }
      )
    }, (error) => {
      res.status(400).send({ error })
    });




})

app.post("/api/addCommentlyrics", (req, res) => {
  // todo validation
  if (getCurrentUser() == null) {
    res.status(401).send({ error: "you are not login" })
    return
  }
  let body = req.body

  if (body.c == undefined) {
    res.status(402).send({ error: "invalid input" })
    return
  }
  if (body.c.startsWith("<script>")) {
    res.status(403).send({ error: "invalid input" })
    return
  }

  const Music = Parse.Object.extend("Music");
  const query = new Parse.Query(Music);
  query.get(body.i)
    .then((music) => {

      const Comment = Parse.Object.extend("Comment")
      const comment = new Comment();
      comment.set("title", body.c)
      comment.set("isAboutComment", false)
      comment.set("line", body.n)
      comment.set("createsBy", getCurrentUser())
      comment.save().then(
        (comment) => {
          music.add("allMusicComments", comment).save().then(
            (value) => {
              res.send({ message: "comment created" })
            }, (error) => {
              res.status(400).send({ error })
            }
          )

        }, (error) => {
          res.status(400).send({ error })
        }
      )
    }, (error) => {
      res.status(400).send({ error })
    });




})

app.listen(3001)
