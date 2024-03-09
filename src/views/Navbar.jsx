import logo from '../assets/uptimer-logo.webp'

function Navbar(){
    return (<>
    
    <nav className= "border-gray-200 bg-gray-800">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src={logo} className="h-8" alt="Uptimer Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-green-200">Uptimer</span>
            </a>
            <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden  focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg bg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  bg-gray-800 md:bg-gray-800 border-gray-700">
                
           
                <li className='py-1 px-3 '>
                    <a href="#" className="block py-2 px-3  rounded md:border-0  md:p-0  text-gray-300 md:hover:text-green-200 hover:bg-gray-700 hover:text-white md:hover:bg-transparent">Pricing</a>
                </li>
                <li className='py-1 px-3 '>
                    <a href="#" className="block py-2 px-3  rounded  md:border-0  md:p-0  text-gray-300 md:hover:text-green-200 hover:bg-gray-700 hover:text-white md:hover:bg-transparent">About us</a>
                </li>

                <li className='py-1 px-3 border border-gray-200 rounded hover:border-green-200 cursor-pointer'>
                    <a onClick={()=>{window.open("https://github.com/t4zzlerdeveloper/uptimer")}} className="block py-2 px-3 rounded md:border-0 m md:p-0 text-gray-200 md:hover:text-green-200 hover:bg-gray-700 hover:text-white md:hover:bg-transparent">Star on GitHub</a>
                </li>

            </ul>
            </div>
        </div>
    </nav>
    
    </>)
}

export default Navbar;