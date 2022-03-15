let inMemoryToken;

//Supposing that this is the html form
const email = "myname";
const password = "mypassword";

fetch( "http://localhost:2000/login", {
    method: 'post',
    headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
    },
    body: JSON.stringify( {
        "name": email,
        "password": password,

    } )
}).then(response => response.text().then(tex => {

    //Save in local storage
    let token = "Bearer " + tex;
    
    fetch ("http://localhost:2000/news",{
        method: 'get',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }).then(response => response.json().then(json => console.log(json)));
}));