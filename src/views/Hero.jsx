import { useEffect, useState } from 'react'
import serversHero from '../assets/servers-hero.webp'
import { useNavigate } from 'react-router-dom';

const SH_LOCAL = "search_history";

function Hero(){

const [url,setUrl] = useState("");
const [searchHistory,setSearchHistory] = useState([]);

const navigate = useNavigate();

useEffect(()=>{
    if(!localStorage.getItem(SH_LOCAL)) localStorage.setItem(SH_LOCAL,JSON.stringify([]));
    setSearchHistory(JSON.parse(localStorage.getItem(SH_LOCAL)));
},[])

function saveUrl(url){
    let shCopy = searchHistory;
    if(!shCopy.includes(url)) shCopy.push(url);
    localStorage.setItem(SH_LOCAL,JSON.stringify(shCopy));
}

function isValidUrl(string) {
    try {
      new URL(string);
      return true || !string.includes("uptimer-live.vercel.app") || !string.includes("localhost");
    } catch (err) {
      return false;
    }
  }

function handleMonitoring(){
    if(isValidUrl(url)){
        saveUrl(url);
        navigate(`/monitor?url=${url}`);
    }
    else{
        alert("Invalid URL!")
    }
   
}


function handleUrlChange(newUrl){
    if (!url.includes(".") && 
    newUrl.includes(".") && 
    !newUrl.startsWith("https://") && 
    !newUrl.startsWith("http://")){
        newUrl = "https://" + newUrl;
    }
   
    setUrl(newUrl);
   
}

return (<>

<section className="bg-gray-900 ">
    <div className="grid max-w-screen-xl px-4 py-6 mx-auto lg:gap-8 xl:gap-0 lg:py-6 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-1xl mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-5xl text-purple-300">Monitor your services<br></br> in real-time.</h1>
            <p className="max-w-2xl mb-6 font-light text-gray-400 lg:mb-8 md:text-lg lg:text-xl ">From analysing your website status, performance, latency and detecting changes to making more complex requests to check on your services health.</p>
            
            <form className=" mx-auto">   
                <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Start Monitoring</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input value={url} onChange={(e)=>{handleUrlChange(e.target.value)}} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm border  rounded-lg    bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your website URL to get started..." required/>
                    <button type="submit" className="text-gray-800 absolute end-2.5 bottom-2.5 bg-green-200 hover:bg-green-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2" onClick={()=>{handleMonitoring()}}>Start Monitoring</button>
                </div>
            </form>

        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img className="scale-75" src={serversHero} alt="mockup"/>
        </div>      

        <div className='flex max-w-screen-xl px-4 mx-auto lg:gap-8 xl:gap-10 pb-24 '>
        {searchHistory.length > 0 ? <h4 className='text-green-200 font-bold'>Last monitored</h4>: <></>}
  {searchHistory && searchHistory.map((website)=>{

      return(<>
          <div className="p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{website}</p>
              <a onClick={()=>{ navigate(`/monitor?url=${website}`)}} href="#" className="inline-flex items-center px-2 py-2 text-xs font-medium text-center text-gray-800 rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300 bg-purple-300 hover:bg-purple-400 focus:ring-purple-500">
                  View History
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
              </a>
          </div>
          </>)
  })}
</div>     
        
    </div>
   
</section>

        </>)
    
} 

export default Hero