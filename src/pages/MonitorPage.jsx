import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import defaultFavicon from '../assets/public.svg'

import { avatars,databases,functions } from "../lib/appwrite";
import Navbar from "../views/Navbar";


function MonitorPage(){

    const [searchParams] = useSearchParams();
    const [url,setUrl] = useState(null);
    const [favicon,setFavicon] = useState(null);
    const [favLoaded,setFavLoaded] = useState(true);
    
    const [history, setHistory] = useState([]);

    useEffect(()=>{
        const urlParam = searchParams.get("url");
        setUrl(urlParam);
        if(urlParam) fetchHistory(urlParam);
        if(urlParam) setFavicon(avatars.getFavicon(url));
    },[searchParams])

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

    return (<div className="text-white bg-gray-900 min-h-screen">
       
        <Navbar/>
        

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg rounded m-10">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                    <div className="flex gap-3">
                        <img 
                        src={favicon && favLoaded ? favicon : defaultFavicon} 
                        alt={url + " favicon"} 
                        onError={()=>{setFavLoaded(false)}}/>
                        {url}
                    </div>
                  
                    <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Down bellow you can see the monitoring history of this website, including status, code, latency and when the check was performed.</p>
                </caption>
            </table>
        </div>

<div className="relative overflow-x-auto shadow-md sm:rounded-lg rounded m-10">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Time
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
                <th scope="col" className="px-6 py-3">
                    Response Code
                </th>
                <th scope="col" className="px-6 py-3">
                    Latency
                </th>
            </tr>
        </thead>
        <tbody>
        {history.map((data)=>{
            return <tr key={data.time} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {new Date(data.time).toLocaleString()}
                </th>
                <td className="px-6 py-4">
                    {data.online ? <p className="text-green-400">Online</p> : <p className="text-red-400">Offline</p>}
                </td>
                <td className="px-6 py-4">
                    {data.code}
                </td>
                <td className="px-6 py-4">
                    {data.latency ? (data.latency + " ms") : "--"}
                </td>
            </tr>
        })}
        </tbody>
    </table>
</div>

    </div>)

}

export default MonitorPage