/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

// fetch('https://api.github.com/users/MatthewEllisTx')
//   .then(response => response.json())
//   .then( data => console.log('fetch', data))

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/
const cards = document.querySelector('.cards');

function completeCard(name){
  addCard(`https://api.github.com/users/${name}`).then( data => {
    return fetch(data.followers_url);
  })
  .then( response => response.json())
  .then( data => Promise.all(data))
  .then( data => data.forEach( follower => addCard(follower.url)))
}

function addCard(url){
  return fetch(url)
            .then(response => response.json()) //take string make json
            .then( data => {
              cards.appendChild(makeCard(data)); //does work for first card
              return data;
            })
}
completeCard('MatthewEllisTX');
completeCard('tetondan');

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

fetch('https://api.github.com/users/MatthewEllisTx')
  .then(response => response.json())
  .then( data => {
    console.log(data);
  })

const followersArray = [];

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

function makeCard(info){
  const card = document.createElement('div');
  const img = document.createElement('img');
  const cardInfoDiv = document.createElement('div');
  const nameH3 = document.createElement('h3');
  const usernameP = document.createElement('p');
  const locationP = document.createElement('p');
  const profileP = document.createElement('p');
  const profileA = document.createElement('a');
  const followersP = document.createElement('p');
  const followingP = document.createElement('p');
  const bioP = document.createElement('p');

  card.classList.add('card');
  cardInfoDiv.classList.add('card-info');
  nameH3.classList.add('name');
  usernameP.classList.add('username');

  img.src = info.avatar_url;
  nameH3.textContent = info.name;
  usernameP.textContent = info.login;
  locationP.textContent = 'Location: ' + info.location;
  profileP.textContent = 'Profile: ';
  profileA.href = info.html_url;
  profileA.textContent = info.html_url;
  followersP.textContent = 'Followers: ' + info.followers;
  followingP.textContent = 'Following: ' + info.following;
  bioP.textContent = 'Bio: ' + info.bio;

  card.appendChild(img);
  card.appendChild(cardInfoDiv);
  cardInfoDiv.appendChild(nameH3);
  cardInfoDiv.appendChild(usernameP);
  cardInfoDiv.appendChild(locationP);
  cardInfoDiv.appendChild(profileP);
  cardInfoDiv.appendChild(followersP);
  cardInfoDiv.appendChild(followingP);
  cardInfoDiv.appendChild(bioP);
  profileP.appendChild(profileA);
  console.log(profileP, profileA);

  return card;
}

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
