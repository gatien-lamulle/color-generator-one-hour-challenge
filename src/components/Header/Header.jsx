import React from 'react'
import { useEffect } from 'react'
import {Link, useLocation} from 'react-router-dom'
import './Header.css'


function Header() {

    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/') {
            document.getElementById('generate').classList.add('selected')
            return;
        }
        const tab = document.getElementById(location.pathname.substring(1))
        if (tab) {
            tab.classList.add('selected')
        }
    }, [])


    function selectTab(e) {
        const tab = e.target
        console.log('selectTab', tab);
        Array.from(document.getElementsByClassName('selected')).forEach(item => {
            item.classList.remove('selected')
        });
        tab.classList.add('selected');
    }

    return (
        <nav className='header'>
            <Link onClick={selectTab} className='header-item' id='generate' to="/generate">Generator</Link>
            <Link onClick={selectTab} className='header-item' id='search' to="/search">Searcher</Link>
            <Link onClick={selectTab} className='header-item' id='palette' to="/palette">Palette</Link>
            <Link onClick={selectTab} className='header-item' id='favorites' to="/favorites">Favorites</Link>
        </nav>
    )
}


export default Header