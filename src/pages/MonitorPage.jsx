import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";



function MonitorPage(){

    const [searchParams] = useSearchParams();
    const [url,setUrl] = useState(null);

    useEffect(()=>{
        setUrl(searchParams.get("url"));
    },[searchParams])

    return (<div className="text-white">
        {url}
    </div>)

}

export default MonitorPage