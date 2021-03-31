class Api {
    static baseUrl = "http://localhost:3000"
  
    static headers = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  
    static async get(path) {
      let resp = await fetch(Api.baseUrl + path, {
        method: "GET",
        headers: Api.headers
      })
  
      let data = await resp.json();
  
      return data;
    }

    static async getUser(path, person) {
      let resp = await fetch(Api.baseUrl + path, {
        method: "GET",
        headers: Api.headers
      })
  
      const data = await resp.json();
      const user = await data.filter(({username}) => username === person);
  
      return user
    }
  
    static async post(path, params) {
      let resp = await fetch(Api.baseUrl + path, {
        method: "POST",
        headers: Api.headers,
        body: JSON.stringify(params)
      })
  
      let data = await resp.json();
  
      return data;
    }
  
    static async patch(path, params) {
      let resp = await fetch(Api.baseUrl + path, {
        method: "PATCH",
        headers: Api.headers,
        body: JSON.stringify(params)
      })
  
      let data = await resp.json();
  
      return data;
    }
  
    static async delete(path) {
      let resp = await fetch(Api.baseUrl + path, {
        method: "DELETE",
        headers: Api.headers
      })
  
      let data = await resp.json();
  
      return data;
    }

    static async deleteFav(path, params) {
      let resp = await fetch(Api.baseUrl + path, {
        method: "DELETE",
        headers: Api.headers,
        body: JSON.stringify(params)
      })
  
      let data = await resp.json();
  
      return data;
    }

    
  }
  