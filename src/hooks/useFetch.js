import { useEffect, useState } from 'react'

export const useFetch = (url,method, headers, body) => {
    const [response,setResponse] = useState({
        data: null,
        loading: true
    })

    useEffect(async function(){
        await fetch(url, { method }, { headers }, { body })
            .then(resp => resp.json())
            .then(json => setResponse({
                data: json,
                loading: false
            }))
    },[url,method])
    return response
}