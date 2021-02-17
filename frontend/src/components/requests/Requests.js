const URL = "http://localhost:3001"

async function gethttp(url) {
    let response = await fetch(url);
    let responsemessage = await response.text();
    return { body: JSON.parse(responsemessage), status: response.status };
}

async function posthttp(url, data) {
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    let responsemessage = await response.text();

    return { body: JSON.parse(responsemessage), status: response.status };
}
/*
  gethttp(URL + "/api/getcurrentuser").then(
    (res) => {
      let isLoggedInRemote = res.body.message ? true : false
      let isLoggedInLocal = counter.isLoggedIn
      if (isLoggedInRemote != isLoggedInLocal) {
        updateCounter({ isLoggedIn: isLoggedInRemote , currentUser: res.body.message})
      }
    }
  )

    posthttp(URL + "/api/signup", data)
      .then((value) => {
        let status = value.status
        let message = value.body.message
        if (status == 200) {
          window.open("/profile", "_self");
        } else {
          alert("error in sign in:\n" + value.body.error)
        }
      })
*/



export {gethttp, posthttp, URL}