import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import defaultFavicon from '../assets/public.svg'

import { avatars,databases,functions } from "../lib/appwrite";


function MonitorPage(){

    const [searchParams] = useSearchParams();
    const [url,setUrl] = useState(null);
    const [favicon,setFavicon] = useState(null);
    const [favLoaded,setFavLoaded] = useState(true);
    
    const [history, setHistory] = useState([]);

    useEffect(()=>{
        const urlParam = searchParams.get("url");
        setUrl(urlParam);
        fetchHistory(urlParam);
    },[searchParams])

    useEffect(()=>{
        fetchHistory();
        setFavicon(avatars.getFavicon(url));
    },[url])

    function fetchHistory(urlParam){

        const query = `?url=${urlParam}`

        functions.createExecution(
          '65ec83d83d09d8d34a50',
          '',
          false,
          '/'+query,
          'GET'
          ).then((res)=>{
            const body = JSON.parse(res.responseBody);
            setHistory(JSON.parse(body.history));
          })
          .catch(()=>{
            setHistory([]);
          })

    }

    return (<div className="text-white">
        <img 
        src={favicon && favLoaded ? favicon : defaultFavicon} 
        alt={url + " favicon"} 
        onError={()=>{setFavLoaded(false)}}/>

        {url}

        {history.map((data)=>{
            return <div>
                <li>Time: {new Date(data.time).toLocaleDateString()}</li>
                <li>Code: {data.code}</li>
                <li>Status: {data.online ? "Online" : "Offline"}</li>
                <li>Latency: {data.latency}</li>
            </div>
        })}
    </div>)

}

export default MonitorPage