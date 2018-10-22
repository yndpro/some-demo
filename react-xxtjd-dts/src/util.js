import axios from 'axios';
import qs from 'qs';

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
       
        return axios({
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url,
        })
        .then(response => response.data); // parses response to JSON
    }
}