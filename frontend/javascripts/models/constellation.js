class Constellation {
    static all = []
    constructor(attr){
        this.id = attr.id;
        this.name = attr.name;
        this.image = attr.image;
    }

    render() {
        let div = document.createElement("div");
        let h4 = document.createElement("h4");
        let img = document.createElement("img");
        let constellationsDiv = document.getElementById("constellationsDiv");

        h4.innerText = this.name;
        img.innerText = this.img;

        div.appendChild(h4);
        div.appendChild(img);

        constellationsDiv.appendChild(div);
    }

    save() {
        Constellation.all.push(this)
    }

    static create(attr) {
        let constellation = new Constellation(attr);
        constellation.save();
        return constellation;
    }

    static createFromCollection(collection) {
        collection.forEach(data => Constellation.create(data))
    }

    static formTemplate(){
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
        `
    }

    static renderForm() {
        resetMain();
        main().innerHTML = Constellation.formTemplate();
        form().addEventListener("submit", Constellation.submitForm);
    }


  static renderConstellations() {
    resetMain();
    main().innerHTML = Constellation.constellationsTemplate();
  
    Constellation.all.forEach(constellation => constellation.render());
  }

    static submitForm(e) {
        e.preventDefault();

        let strongparams = {
            constellation: {
                name = nameInput().value,
                image = imageURLInput().value
            }
        }
        Api.post('/constellations', strongParams)
        .then(function(data) {
          Constellation.create(data);
          Constellation.renderConstellations();
        })  
    }

    static async getConstellations() {
        const data = await Api.get("/constellations")
        Constellation.createFromCollection(data)
        Constellation.renderConstellations();
    }

}