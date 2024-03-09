function Footer(){
    return (<>
    

<footer className="bg-gray-800 shadow">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center place-content-center">
      <span className=" text-sm text-gray-500 sm:text-center ">© 2024 <a href="https://uptimer.vercel.app/" className="hover:underline">Uptimer</a>. All Rights Reserved. Developed by <a className="text-purple-300 duration-200 hover:text-purple-400 cursor-pointer" onClick={()=>{window.open("https://github.com/t4zzlerdeveloper")}}>t4zzlerdeveloper</a>
    </span>
    </div>
</footer>


    </>)
}

export default Footer