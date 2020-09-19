


const request = {


  get(url){
    const init = {
      credentials: 'same-origin', // include, same-origin, *omit
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
    };
    return fetch(url,init)
      .then(response => response.json())
      .then(data => data)
      .catch(e => console.log('There has been a problem with your fetch operation: ',e.message))
  },

  post(url,data){
    const init = {
      body: JSON.stringify(data), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // *client, no-referrer
    };
    return fetch(url,init)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(e => console.log('There has been a problem with your fetch operation: ',e.message))
  }
}

export default request;

