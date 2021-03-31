class User {
    static all = [];
    constructor(attr){
        this.id = attr.id;
        this.username = attr.username;
    }

    save() {
        User.all.push(this)
    }

    static create(attr) {
        let user = new User(attr);
        user.save();
        return user;
    }

    static userFormText() {
        let txt;
        let person = prompt("Please enter your username:", "Here");
        if (person == null || person == "") {
            txt = "User cancelled the prompt.";
        } else {
            txt = "Hello " + person + "!";
            let usernameJSON = {"username": person};
            User.create(usernameJSON)
            Api.post('/users', usernameJSON)
            this.getAPI(person);
            currentUser = person
        }

        document.getElementById("intro").innerHTML = txt;
    }
    

    
    static async getAPI(person) {
        Api.getUser('/users', person)
            .then( data => favorite_params["user_id"] = data[0].id)
            // console.log(user)
    }
    
}

