
  async function getConstellation(){
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
          let singleConstellationHtml = `
          <img src="${constellationVal.image}">
          `;
          imgDiv.innerHTML = singleConstellationHtml

          favorite_params["constellation_id"]= (constellationVal.id);
          renderUsers(constellationVal.id);

          displayButton()  
            
        })
        
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

    const tgt = e.target.firstElementChild;
    if (currentConstellationUniqueUsernames.includes(currentUser)) {
      // console.log('includes')
      tgt.classList.toggle('fa-star');
      tgt.classList.toggle('fa-star-o');
    } else {
      // console.log('not-includes')
      Api.post("/favorites", favorite_params)
      tgt.classList.toggle('fa-star');
      tgt.classList.toggle('fa-star-o');
      renderUsers(favorite_params.constellation_id);
    }

  }
    
      document.addEventListener("DOMContentLoaded", function(){
          getConstellation();
          User.userFormText();
  })
  
