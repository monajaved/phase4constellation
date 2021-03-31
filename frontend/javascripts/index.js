const constellations = [];



function main(){
    return document.getElementById("main");
}

// function nameInput(){
//     return document.getElementById("name");
// }

// function imageURLInput(){
//     return document.getElementById("image");
// }


// function form(){
//     return document.getElementById("form");
// }

// function formLink() {
//     return document.getElementById("form-link");
// }

//   function constellationsLink() {
//     return document.getElementById("constellations-link");
// }


// function resetFormInputs(){
//     nameInput().value = "";
//     imageURLInput().value = "";
// }

function resetMain(){
    main().innerHTML = "";
}

// function render(){
//   // fetch favorites table and show if constellation has been favorited by user
// }

// function formTemplate() {
//     return `
//     <h3>Create Constellation</h3>
//     <form id="form">
//       <div class="input-field">
//         <label for="name">Name</label>
//         <input type="text" name="name" id="name" />
//       </div>
//       <div class="input-field">
//         <label for="image">Image URL</label><br />
//         <textarea name="image" id="image" cols="30" rows="10"></textarea>
//       </div>
//       <input type="submit" value="Create Constellation" />
//     </form>
//     `;
// }

// function userFormTemplate() {
//   return `
//   <h3>Welcome</h3>
//   <form id="userform">
//       <div class="input-field">
//         <label for="username">Enter Username</label>
//         <input type="text" name="username" id="username" />
//       </div>
//       <input type="submit" value="Create User" />
//   </form>
//   `;
// }

// function userFormText() {
//   let txt;
//   let person = prompt("Please enter your username:", "Here");
//   if (person == null || person == "") {
//     txt = "User cancelled the prompt.";
//   } else {
//     txt = "Hello " + person + "!";
//     usernameJSON = {"username": person};
//     users.push(usernameJSON)
//     Api.post('/users', usernameJSON)
//     getAPI(person);
//   }

//   document.getElementById("intro").innerHTML = txt;
// }

// async function getAPI(person) {
//   const postPromise = await fetch('http://localhost:3000/users');
//   const data = await postPromise.json();
//   // let data = Api.get('/users');
//   const user = data.filter(({username}) => username === person);
//   favorite_params["user_id"] = user[0].id
//   // console.log(favorite_params)
//   // console.log(user[0].id)


// };


// function constellationsTemplate() {
//     return `
//     <h3>List Of Constellations</h3>
//     <div id="constellations"></div>
//     `;
// }


// function renderConstellation(constellation) {
//     let div = document.createElement("div");
//     let h4 = document.createElement("h4");
//     let img = document.createElement("img");
//     let constellationsDiv = document.getElementById("constellations");

//     h4.innerText = constellation.name;
//     img.src = constellation.image;

//     div.appendChild(h4);
//     div.appendChild(p);

//     constellationsDiv.appendChild(div);
// }


// function renderForm() {
//     resetMain();
//     main().innerHTML = formTemplate();
//     form().addEventListener("submit", submitForm);
// }

// function renderConstellations() {
//     resetMain();
//     main().innerHTML = constellationsTemplate();
  
//     constellations.forEach(function (constellation) {
//       renderConstellation(constellation);
//     });
//   }

// function submitForm(e) {
//     e.preventDefault();
  
//     constellations.push({
//       name: nameInput().value,
//       image: imageURLInput().value,
//     });
  
//     renderConstellations();
// }

// function formLinkEvent() {
//     formLink().addEventListener("click", function(e){
//         e.preventDefault();

//         renderConstellations();
//     });
// }
// function constellationsLinkEvent() {
//     constellationsLink().addEventListener("click", function (e) {
//       e.preventDefault();
  
//       renderConstellations();
//     });
//   }


  
  async function getConstellation(){
      //   debugger;
        const postPromise = await fetch('http://localhost:3000/constellations');
        const constellation = await postPromise.json();
        
        //   console.log(constellation);
        
        let imgDiv = document.getElementById("constellationsDiv")

        let dropdown = document.getElementById("dropdown")
        dropdown.add(new Option("Select Constellation", ""))
        constellation.forEach( consta =>{
            dropdown.add(new Option(consta.name, JSON.stringify(consta)))
          
        });

        dropdown.addEventListener("input", () => {
          let constellationVal = JSON.parse(dropdown.value)
          
          favorite_params["constellation_id"]= (constellationVal.id);

          let singleConstellationHtml = `
          <img src="${constellationVal.image}">
          `;
          imgDiv.innerHTML = singleConstellationHtml
          renderUsers(constellationVal.id);


          displayButton()
            
            
        }
            )
          
        };

    function renderUsers(id) {
      Api.get(`/constellations/${id}`)
      .then(usersList => { displayUsers(usersList.users)})

    }

    function displayUsers(array){

        let usersFav = document.getElementById("usersFav")
        let usernamesArray = []
        array.map( item =>{
          usernamesArray.push(item.username)
        })

        let uniqueUsernamesArray = [...new Set(usernamesArray)];
        
        // console.log(uniqueUsernamesArray)
        currentConstellationUniqueUsernames = uniqueUsernamesArray
        // console.log(globalUniqueUsernames)

        usersFav.innerHTML = '<p>This constellation is favorited by:</p>' +
        '<ul style="list-style-type: none;">' + uniqueUsernamesArray.map(item => {
          return '<li>' + item + '</li>';
        }).join('') + '</ul>';


    }


  function displayButton(){
    let x = document.getElementById('fav')
    x.addEventListener('click', fav);
      
    }


  function fav(e) {
    // let x = document.getElementById('fav')

    const tgt = e.target.firstElementChild;
    if (currentConstellationUniqueUsernames.includes(currentUser)) {
      console.log('includes')
      // Api.deleteFav('/favorites', favorite_params)
      tgt.classList.toggle('fa-star');
      tgt.classList.toggle('fa-star-o');
    } else {
      console.log('not-includes')
      Api.post("/favorites", favorite_params)
      tgt.classList.toggle('fa-star');
      tgt.classList.toggle('fa-star-o');
      renderUsers(favorite_params.constellation_id);
    }

  }




      
      document.addEventListener("DOMContentLoaded", function(){
          getConstellation();
          // renderForm();
          // formLinkEvent();
          // constellationsLinkEvent();
          User.userFormText();
  })
  
