export const Ajax = {

    get : function(url = ``, data,userInfo){
        
        if(userInfo.scookie){
            typeof data === "string" ? data = data + "&scookie=" + userInfo.scookie : data.scookie = userInfo.scookie;
        }else{
            typeof data === "string" ? data = data + "&_AJAX_=1" : data['_AJAX_'] = 1;
        }
        return fetch(url)  //TODO
            .then(response => response.json());
    },

    post : function(url = ``, data,userInfo){
        
        if(userInfo.scookie){
            typeof data === "string" ? data = data + "&scookie=" + userInfo.scookie : data.scookie = userInfo.scookie;
        }else{
            typeof data === "string" ? data = data + "&_AJAX_=1" : data['_AJAX_'] = 1;
        }
        // Default options are marked with *
        return fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, same-origin, *omit
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
        .then(response => response.json()); // parses response to JSON
    }
}