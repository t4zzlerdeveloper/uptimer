import { useEffect, useState } from 'react'
import serversHero from '../assets/servers-hero.webp'
import { useNavigate } from 'react-router-dom';

function Hero(){

const [url,setUrl] = useState("");

const navigate = useNavigate();


function handleMonitoring(){
    navigate(`/monitor?url=${url}`);
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

<section className="bg-gray-900">
    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
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
            <img src={serversHero} alt="mockup"/>
        </div>                
    </div>
</section>

        </>)
    
} 

export default Hero