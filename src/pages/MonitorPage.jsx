import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import defaultFavicon from '../assets/public.svg'

import { avatars,databases,functions } from "../lib/appwrite";
import Navbar from "../views/Navbar";
import Loader from "../views/Loader";
import ChartVisualizer from "../views/ChartVisualizer";
import Footer from "../views/Footer";


import errors from '../errors.json'

function MonitorPage(){

    const [searchParams] = useSearchParams();
    const [url,setUrl] = useState(null);
    const [favicon,setFavicon] = useState(null);
    const [favLoaded,setFavLoaded] = useState(true);
    
    const [history, setHistory] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const urlParam = searchParams.get("url");
        setUrl(urlParam);
        if(urlParam) fetchHistory(urlParam);
        if(urlParam) setFavicon(avatars.getFavicon(url));
    },[searchParams])

    function fetchHistory(urlParam){

        setLoading(true);

        const query = `?url=${urlParam}`

        functions.createExecution(
          '65ec83d83d09d8d34a50',
          '',
          false,
          '/'+query,
          'GET'
          ).then((res)=>{
            const body = JSON.parse(res.responseBody);
            if(body && body.history){
                const history = JSON.parse(body.history);
                if(history.length == 0){
                    setTimeout(()=>{
                        fetchHistory(urlParam);
                    },1250)
                }
                else{
                    setLoading(false);
                }
            setHistory(history);
        }
          })
          .catch(()=>{
            setHistory(null);
            setTimeout(()=>{
                fetchHistory(urlParam);
            },500)
          })

    }


    function getLatencyColor(latency) {
        const colorThresholds = [
            { color: "text-green-300", threshold: 100 }, 
            { color: "text-yellow-300", threshold: 100 },
            { color: "text-orange-300", threshold: 500 }, 
            { color: "text-red-300", threshold: Infinity } 
        ];
    
        for (const threshold of colorThresholds) {
            if (latency < threshold.threshold) {
                return threshold.color;
            }
        }

        return "text-red-300";
    }


    function parseLeadingZeros(number){
        const n = number.toString();
        return n.length == 1 ? "0" + n : n
      }
    
      function parseDateTime(datetime){
        const d = new Date(datetime);
        const n = new Date();
        const y = new Date();
        y.setDate(y.getDate() -1);
        
        let dateString = d.getDate()  + "/" + (d.getMonth()+1) + "/" + d.getFullYear(); 
        if (d.toDateString() == n.toDateString()) {
          dateString = "Today at ";
           
        } else if(y.toDateString() == d.toDateString() ){
          dateString = "Yesterday at ";
        }
    
        return dateString + " " +
          parseLeadingZeros(d.getHours()) + ":" + parseLeadingZeros(d.getMinutes());
       
      }
      

    return (<div className="text-white bg-gray-900 min-h-screen">
       
        <Navbar/>
        
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg rounded m-10">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 grid grid-cols-1 gap-5 ">
                <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800 rounded-lg">
                    <div className="flex gap-3">
                        <img 
                        className="w-6"
                        src={favicon && favLoaded ? favicon : defaultFavicon} 
                        alt={url + " favicon"} 
                        onError={()=>{setFavLoaded(false)}}/>
                        
                        <p className="text-purple-300">{url}</p>

                        {!loading && <button onClick={()=>{fetchHistory(url)}} className=" cursor-pointer text-xs flex items-center px-2 py-0.5 font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform opacity-75 bg-gray-200 rounded-lg hover:bg-green-200 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80">
                        <svg className="w-3 h-3 mx-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                        </svg>

                        <span className="mx-0.5">Refresh</span>
                    </button>}
                    </div>
                  
                    <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Down bellow you can see the monitoring history of this website, including status, code, latency and when the check was performed.</p>
                </caption>
                {!loading && <caption>
                <ChartVisualizer data={history}/>
                </caption>}
            </table>
        </div>
        

{loading ? <div className="flex place-content-center min-h-screen">
    <Loader/>
    </div> : 
    history && history.length == 0 ?
    <div className="flex place-content-center">
    <p>No history found, we will start monitoring this website from now on!</p>
    </div> 
     :
<>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg rounded m-10">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs  uppercase  bg-gray-800 text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Checked at
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
        {history && history.map((data)=>{
            return <tr key={data.time} className="odd:opacity-75 border-b bg-gray-800 border-gray-700">
                <th scope="row" className="px-6 py-4">
                    {parseDateTime(data.time)}
                </th>
                <td className="px-6 py-4 font-medium whitespace-nowra">
                    {data.online ? <p className="text-green-400">Online</p> : <p className="text-red-400">Offline</p>}
                </td>
                <td className="px-6 py-4">
                    <b className="text-purple-200">{data.code}</b>{" (" + errors[data.code] + ")"}
                </td>
                <td className="px-6 py-4">
                    {data.latency ? <span className={getLatencyColor(data.latency)}>{data.latency} ms</span> : "--"}
                </td>
               
            </tr>
        })}
        </tbody>
    </table>
</div></>}

<Footer/>

    </div>)

}

export default MonitorPage