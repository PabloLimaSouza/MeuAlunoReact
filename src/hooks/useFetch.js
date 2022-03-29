import { useEffect, useState, useContext } from 'react'
import { useHistory } from "react-router-dom";


export const useFetch = (url,method, token, body) => {
    const [response,setResponse] = useState({
        data: null,
        loading: true
    })

    const history = useHistory();

    function handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    useEffect(async function(){
        await fetch(url, { 
            method: method, 
            headers: new Headers
            ({
                'Authorization': 'Bearer ' + token            
            }),
            body: body       
    })
        
        .then(resp => resp.json())
        .then(json => setResponse({
                data: json,
                loading: false
            }));
    },[url,method])
    return response
}