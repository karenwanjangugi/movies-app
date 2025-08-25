"use client"

import  Button  from '../../../Shared/Button/index';
import Input from '../../../Shared/Input/index';
import { Search } from 'lucide-react';
import Link from 'next/link';



export default function NavBar(){


    return(
        <header className="relative z-50 flex items-center justify-between px-8 py-4 bg-black/80 backdrop-blur-sm ">
        <div className="flex items-center gap-8">
          <div className="text-2xl text-[#FEAF23] font-bold">Moovie</div>
          <nav className="flex items-center gap-6">
            <a href="#" className="text-white hover:text-[#FEAF23] transition-colors">Movies</a>
            <a href="#" className="text-gray-400 hover:text-[#FEAF23] transition-colors">Series</a>
            <a href="#" className="text-gray-400 hover:text-[#FEAF23] transition-colors">Documentary</a>
          </nav>
        </div>
        
        <div className="flex items-center gap-4 flex-1 max-w-md mx-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Search movies, series, etc..."
              className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
        <a href="#" className="text-gray-400 hover:text-[#FEAF23] transition-colors">My List</a>
          <Link href="/signUp"><Button 
            className="bg-[#FEAF23] hover:bg-[#FEAF23]/80 text-white px-6"
          >
            Sign Up
          </Button></Link>
        </div>
      </header>
    )
}