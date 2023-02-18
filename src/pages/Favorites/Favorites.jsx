import React from 'react';
import { useState, useEffect } from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import './Favorites.css';
import ColorsPrinter from '../../components/ColorsPrinter/ColorsPrinter';

function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        getFavorites();
    }, []);

    const getFavorites = () => {
        let favorites = JSON.parse(localStorage.getItem('favorites-colors'));
        setFavorites(favorites);
    };

    return (
        <div className='favorites'>
            {favorites.length > 0 ? (
                <ColorsPrinter colors={favorites} refresh={setFavorites} />
            ) : (
                <div className='no-favorites'>
                    No favorites selected yet
                    <div className='no-favorites-explain'>
                        Click on the &nbsp;<FavoriteBorderIcon className='heart'/>&nbsp; below a color to add it to your
                        favorites
                    </div>
                </div>
            )}
        </div>
    );
}

export default Favorites;
