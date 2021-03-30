const constellations = [];
const users = [];
let favorite_params = {};

function main(){
    return document.getElementById("main");
}

function nameInput(){
    return document.getElementById("name");
}

function imageURLInput(){
    return document.getElementById("image");
}

function usernameInput(){
  return document.getElementById("username")
}

function form(){
    return document.getElementById("form");
}

function formLink() {
    return document.getElementById("form-link");
}

  function constellationsLink() {
    return document.getElementById("constellations-link");
}

function resetUserFormInputs(){
  usernameInput().value = "";
}

function resetFormInputs(){
    nameInput().value = "";
    imageURLInput().value = "";
}

function resetMain(){
    main().innerHTML = "";
}

function formTemplate() {
    return `
    <h3>Create Constellation</h3>
    <form id="form">
      <div class="input-field">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" />
      </div>
      <div class="input-field">
        <label for="image">Image URL</label><br />
        <textarea name="image" id="image" cols="30" rows="10"></textarea>
      </div>
      <input type="submit" value="Create Constellation" />
    </form>
    `;
}

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

function userFormText() {
  let txt;
  let person = prompt("Please enter your username:", "Here");
  if (person == null || person == "") {
    txt = "User cancelled the prompt.";
  } else {
    txt = "Hello " + person + "!";
    usernameJSON = {"username": person};
    users.push(usernameJSON)
    Api.post('/users', usernameJSON)
    getAPI(person);
  }

  document.getElementById("intro").innerHTML = txt;
}

async function getAPI(person) {
  const postPromise = await fetch('http://localhost:3000/users');
  const data = await postPromise.json();
  // let data = Api.get('/users');
  const user = data.filter(({username}) => username === person);
  favorite_params["user_id"] = user[0].id
  // console.log(favorite_params)
  // console.log(user[0].id)


};


function constellationsTemplate() {
    return `
    <h3>List Of Constellations</h3>
    <div id="constellations"></div>
    `;
}


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


function renderForm() {
    resetMain();
    main().innerHTML = formTemplate();
    form().addEventListener("submit", submitForm);
}

function renderConstellations() {
    resetMain();
    main().innerHTML = constellationsTemplate();
  
    constellations.forEach(function (constellation) {
      renderConstellation(constellation);
    });
  }

function submitForm(e) {
    e.preventDefault();
  
    constellations.push({
      name: nameInput().value,
      image: imageURLInput().value,
    });
  
    renderConstellations();
}

function formLinkEvent() {
    formLink().addEventListener("click", function(e){
        e.preventDefault();

        renderConstellations();
    });
}
function constellationsLinkEvent() {
    constellationsLink().addEventListener("click", function (e) {
      e.preventDefault();
  
      renderConstellations();
    });
  }


  
  async function getConstellation(){
      //   debugger;
        const postPromise = await fetch('http://localhost:3000/constellations');
        const constellation = await postPromise.json();
        
        //   console.log(constellation);
        
        let testDiv = document.getElementById("constellationsDiv")
        let constellationHtml = "";
        let dropdown = document.getElementById("dropdown")
        dropdown.add(new Option("Select Constellation", ""))
        constellation.forEach( consta =>{
            // //   constellations.push(consta)
            // constellationHtml = `
            // <h3>${consta.name}</h3>
            // <img src="${consta.image}">
            // `;
            dropdown.add(new Option(consta.name, JSON.stringify(consta)))
          
        });

        // testDiv.innerHTML = constellationHtml;     
      
    //   function fndropdown(){
        //   constellation.map((key) => dropdown.add(new Option(key.name, JSON.stringify(key))));
          
        //   dropdown.addEventListener("input", () => document.getElementById("optionData").innerHTML = dropdown.value)
          dropdown.addEventListener("input", () => {
            let val = JSON.parse(dropdown.value)
            favorite_params["constellation_id"]= (val.id);
            // console.log(val)  
            let singleConstellationHtml = `
            <img src="${val.image}">
            `;
            testDiv.innerHTML = singleConstellationHtml
            console.log(favorite_params)
            displayButton()
            
            
        }
            )

          // debugger;
        //   console.log(constellation)
          // console.log(dropdown)
          
        };
    //     fndropdown();
    // }
    // console.log(constellations)

function displayButton(){
  let x = document.querySelector('button');
  if (x.style.display == "none") {
    x.style.display = "block";
    x.addEventListener('click', fav);
    
  } else {
    x.style.display = "none";
  }
};

function fav(e) {
  let x = document.querySelector('button');
  let y = document.createElement('p')
  y.innerText = "You favorited this"

  

  const tgt = e.target.firstElementChild;
  tgt.classList.toggle('fa-star');
  console.log("You favorited this.")
  
  // tgt.classList.toggle('fa-star-o');
  Api.post("/favorites", favorite_params)
  x.style.display = "none"
}

    
    document.addEventListener("DOMContentLoaded", function(){
        getConstellation();
        // renderForm();
        // formLinkEvent();
        // constellationsLinkEvent();
        userFormText();
})
 