import { titleFont } from "@/config/fonts"
import Link from "next/link"
import { IoSearchOutline, IoCartOutline} from 'react-icons/io5'

export const TopMenu = () => {
  return (
    <nav className="flex px-5 justify-between items-center w-full">

        {/* Logo */}
        <div>
            <Link
                href="/">
                <span className={`${ titleFont.className } antialiased font-bold`}>Teslo</span>    
                <span> | Shop</span>     
            </Link> 
            
        </div>

        {/** Center Menu*/}
        <div className="hidden sm:block">
            <link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/category/men">Hombres</link>
            <link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/category/woman">Mujeres</link>
            <link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/category/kids">Niños</link>
        </div>

        {/** Search, Cart, Menu */}
        <div className="flex items-center">
            <link href="/search" className="mx-2">
                <IoSearchOutline className="w-5 h-5"/>
            </link>
            <link href="/cart" className="mx-2">
                <span className="absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
                    3
                </span>
                <div className="relative">
                    <IoCartOutline className="w-5 h-5"/>
                </div>
            </link>

            <button className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
                Menu
            </button>

        </div>


    </nav>
  )
}
