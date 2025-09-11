import React, { useEffect, useRef, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import { IoSearchCircle } from 'react-icons/io5'
import { SEARCH_SUGGESTIONS } from '../utils/suggestions';
import { CiSearch } from 'react-icons/ci';

const Navbar = ({setHomePageText}) => {
    const SEARCH_CATEGORIES = ['Shorts', 'Designers', 'Services'];
    const [searchCategory, setSearchCategory] = useState(SEARCH_CATEGORIES[0]);
    const [isCategoryDropDownOpen, setIsCategoryDropDownOpen] = useState(false);
    const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
    const dropDownRef = useRef();
    const searchRef = useRef();
    const [searchText, setSearchText] = useState("");

    let filteredSearchSuggestions = SEARCH_SUGGESTIONS.slice(0, 5);
    if (searchText.trim() !== "") {
        const query = searchText.trim().toLowerCase();
        filteredSearchSuggestions = SEARCH_SUGGESTIONS.filter((item) => item.toLowerCase().includes(query)).slice(0, 5);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
                setIsCategoryDropDownOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearchSuggestions(false)
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className='py-3 px-6 justify-between flex items-center gap-4 border-b-gray-100 border-b-2 text-nowrap'>
            <div className='flex items-center gap-4 flex-wrap justify-between w-full'>
                <div className='italic text-2xl' style={{ fontFamily: "Helvetica" }}>Searchbar</div>
                <div className='flex gap-4 items-center  lg:order-last'>
                    <button className='hover:cursor-pointer font-bold'>Sign Up</button>
                    <button className='hover:cursor-pointer hover:bg-gray-600 bg-gray-800 text-white py-3 px-5 rounded-3xl'>Log In</button>
                </div>
                <div className='flex items-center gap-4'>
                    <form onSubmit={(e)=>{e.preventDefault();setHomePageText(searchText);}} className='flex items-center flex-1'>

                        <div ref={searchRef} className='relative'>
                            <input value={searchText} onChange={(e) => { setSearchText(e.target.value) }} onClick={() => { setShowSearchSuggestions(true) }} className='bg-gray-100 focus:outline-none rounded-s-3xl p-4 ps-6 w-96' type='text' placeholder='What are you looking for?' />
                            {showSearchSuggestions && <div className='absolute top-12 shadow-xl w-96 bg-white p-5 rounded-lg'>
                                {filteredSearchSuggestions.length===0 && <p className='text-sm'>No Suggestions found</p>}
                                {filteredSearchSuggestions.map(item => <div onClick={() => { setSearchText(item); setShowSearchSuggestions(false) }} key={item} className='hover:cursor-pointer flex px-2 py-1 items-center gap-2'><CiSearch />{item}</div>)}
                            </div>}
                        </div>
                        <div ref={dropDownRef} className='relative'>
                            <button type='button' onClick={() => { setIsCategoryDropDownOpen((prev) => !prev) }} className='bg-gray-100 w-24 justify-center hover:cursor-pointer flex items-center gap-2 py-4'>{searchCategory} <FaAngleDown style={{ fontSize: "12px" }} /> </button>
                            {isCategoryDropDownOpen && <div className='bg-white shadow-lg border-2 border-gray-100 absolute top-12 start-15 p-4 pe-10 rounded-lg'>
                                {SEARCH_CATEGORIES.map(cat => <div onClick={() => { setSearchCategory(cat); setIsCategoryDropDownOpen(false) }} className={`pt-1 hover:cursor-pointer text-sm ${(searchCategory === cat) ? 'font-bold' : ''}`} key={cat}>{cat}</div>)}
                            </div>}
                        </div>
                        <button type='submit' onClick={()=>{setHomePageText(searchText)}} className='bg-gray-100 hover:cursor-pointer px-2  rounded-e-3xl'><span><IoSearchCircle className='text-pink-500' style={{ fontSize: "56px", display: "inline" }} /></span></button>

                    </form>
                    <div className='hidden xl:flex gap-4 font-bold'>
                        <div className='flex text-sm items-center gap-1'>Explore <FaAngleDown style={{ fontSize: "12px" }} /> </div>
                        <div className='flex text-sm items-center gap-1'>Find Talent <FaAngleDown style={{ fontSize: "12px" }} /> </div>
                        <div className='flex text-sm items-center gap-1'>Get Hired <FaAngleDown style={{ fontSize: "12px" }} /> </div>
                        <div className='flex text-sm items-center gap-1'>Blog</div>
                    </div>
                </div>


            </div>

        </nav>
    )
}

export default Navbar