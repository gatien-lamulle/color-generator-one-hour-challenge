import React, { useState, useEffect } from 'react'
import "./ColorComponent.css"
import Tooltip from '@material-ui/core/Tooltip';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Zoom from '@material-ui/core/Zoom';

function ColorComponent(props) {

    const [open, setOpen] = useState(false)
    const [isFavorite, setFavorite] = useState(false)

    useEffect(() => {
        let favoritesColors = JSON.parse(localStorage.getItem('favorites-colors'));
        if (favoritesColors.includes(props.color)) {
            setFavorite(true);
        }
    }, [])

    const closeHandle = () => {
        setOpen(false);
    }

    const openHandle = () => {
        setOpen(true);
        setTimeout(closeHandle, 1200)
    }

    const addToClipboard = () => {
        let value = props.color;
        if (props.rgb) {
            value = `rgb(${hexToRGB(value)})`;
        }
        navigator.clipboard.writeText(value).then(_ => openHandle());
    }

    const hexToRGB = (hex) => {
        hex = hex.slice(1);
        if (hex.length != 6) {
            throw "Only six-digit hex colors are allowed.";
        }
        let aRgbHex = hex.match(/.{1,2}/g);
        let aRgb = [
            parseInt(aRgbHex[0], 16),
            parseInt(aRgbHex[1], 16),
            parseInt(aRgbHex[2], 16)
        ];
        return aRgb;
    }

    const addFavorite = () => {
        setFavorite(true)
        let favoriteColors = JSON.parse(localStorage.getItem('favorites-colors'));
        favoriteColors.push(props.color);
        localStorage.setItem('favorites-colors', JSON.stringify(favoriteColors));
    }

    const removeFavorite = () => {
        setFavorite(false);
        let favoriteColors = JSON.parse(localStorage.getItem('favorites-colors'));
        favoriteColors.splice(favoriteColors.indexOf(props.color), 1);
        localStorage.setItem('favorites-colors', JSON.stringify(favoriteColors));
    }

    return (
        <div className="color-wrapper">
            <Tooltip
                className='tooltip'
                arrow
                TransitionComponent={Zoom}
                placement="top"
                title={open ? "Colors has been copied"  : (props.rgb ? `rgb(${hexToRGB(props.color)})` : props.color)}
            >
                <div onClick={addToClipboard} className="color" style={{ backgroundColor: props.color }} />
            </Tooltip>
            <span className="color-footer">
                {isFavorite ? 
                <FavoriteIcon className="favorite-icon" color="error" fontSize="large" onClick={removeFavorite} /> : 
                <FavoriteBorderIcon className="favorite-icon" color="error" fontSize="large" onClick={addFavorite} />}
            </span>
        </div>

    )

}


export default ColorComponent;