import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import defaultFavicon from '../assets/public.svg'

import { avatars,databases } from "../lib/appwrite";


function MonitorPage(){

    const [searchParams] = useSearchParams();
    const [url,setUrl] = useState(null);
    const [favicon,setFavicon] = useState(null);
    const [favLoaded,setFavLoaded] = useState(true);

    useEffect(()=>{
        setUrl(searchParams.get("url"));
    },[searchParams])

    useEffect(()=>{
        fetchHistory();
        setFavicon(avatars.getFavicon(url));
    },[url])

    function fetchHistory(){
     
    }

    return (<div className="text-white">
        <img 
        src={favicon && favLoaded ? favicon : defaultFavicon} 
        alt={url + " favicon"} 
        onError={()=>{setFavLoaded(false)}}/>

        {url}
    </div>)

}

export default MonitorPage