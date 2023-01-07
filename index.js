// selecting required properties
const imageOutput = document.querySelector('.image');
const nameOutput = document.querySelector('.name');
const linkOutput = document.querySelector('.link');
const locOutput = document.querySelector('.loc');
const bioOutput = document.querySelector('.bio');
const userInput = document.querySelector('#user');
const searchInput = document.querySelector('.search_button');
const errorOutput = document.querySelector('.error');
const langOutput = document.querySelector('.lang')
// main function to get username from textbox and send a get request to github to get repos and user info, handled some errors aswell
async function searchGit(e){
    e.preventDefault();
    let username = userInput.value;
    errorOutput.innerHTML="";
    try {
        let saved = JSON.parse(window.localStorage.getItem(username));
        let response;
        let obj;
        let repos;
        if (saved == null || saved.login != username){
            response = await fetch(`https://api.github.com/users/${username}`);
            obj = await response.json();
            if (response.status != 200){
                errorOutput.innerHTML="USER NOT FOUND!";
                errorOutput.classList.remove('error');
                return;
            }
            repos = await fetch(obj.repos_url);
            repos = await repos.json();
            console.log(repos)
        }
        else{
            obj = saved;
        } 
        setUser(obj);
        saveUser(obj);
        setlang(repos);
    } catch (error) {
        errorOutput.innerHTML="NETWORK ERROR!";
        errorOutput.classList.remove('error');
        return;
    }
}
// setting the various properties
function setUser(obj){
    if (obj.name == null){
        obj.name = ""
    }
    if (obj.blog == null){
        obj.blog = ""
    }
    if (obj.bio == null){
        obj.bio = ""
    }
    if (obj.location == null){
        obj.location = ""
    }
    if (obj.avatar_url == null){
        obj.avatar_url = "./style/default_profile.png"
    }
    nameOutput.innerHTML=obj.name;
    linkOutput.innerHTML=obj.blog;
    locOutput.innerHTML=obj.location;
    let bio = obj.bio.split('\n').join('<br>')
    bioOutput.innerHTML=bio;
    imageOutput.setAttribute("src", obj.avatar_url);
}
// saving required properties on local storage
function saveUser(obj){
    const userObj = {
        login: obj.login,
        name: obj.name,
        blog: obj.blog,
        location: obj.location,
        bio: obj.bio,
        avatar_url: obj.avatar_url
    }
    window.localStorage.setItem(obj.login, JSON.stringify(userObj));
}
// splitting the newest 5 repos from all and ranking used languages, setting the favourite language at the end
function setlang(obj){
    langs = []
    let len = Object.keys(obj).length;
    if (len > 5){
        len = 5;
    }
    for(i = 0; i < len; i++){
        langs.push(obj[i].language)
    }
    
    console.log(langs);
    let fav = "None";
    let top_point = 0;
    for(i = 0; i < 5; i++){
        if (langs[i] == null){
            continue;
        }
        let point = 0;
        for(j = 0; j < 5; j++){
            if (langs[j] == langs[i]){
                point += 1;
            }
        }
        if (point > top_point){
            top_point = point;
            fav = langs[i];
        }
    }
    langOutput.innerHTML="Favourite language = " + fav;
}
// added event listener to button on click and cleared local storage for later use
searchInput.addEventListener('click', searchGit);
window.localStorage.clear();