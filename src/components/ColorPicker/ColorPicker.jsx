import React, {useState, useEffect} from "react";
import { ChromePicker } from 'react-color';
import { TextField } from "@material-ui/core";
import './ColorPicker.css'

function ColorPicker(props) {
    const [color, setColor] = useState('');
    const [displayColor, setDisplayColor] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const regexRGB = /^(?:(?!\d).)*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])(?:(?!\d).)*$/;
    const regexHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

    const rgbToHex = (rgb) => {
        let hex = '#';
        console.log(rgb);
        for (let i = 0; i < rgb.length; i++) {
            let hexValue = Number(rgb[i]).toString(16);
            console.log(hexValue);
            if (hexValue.length === 1) {
                hexValue = `0${hexValue}`;
            }
            hex += hexValue;
        }
        return hex;
    }

    const handleChange = (color) => {
        setColor(color.hex);
        setDisplayColor(color.hex);
        props.onChange(color.hex);
    }

    const handleInputChange = (e) => {
        let inputValue = e.target.value;
        if (regexHex.test(inputValue)) {
            setDisplayColor(inputValue);
            props.onChange(inputValue);
        } else if (regexRGB.test(inputValue)) {
            let match = inputValue.match(regexRGB);
            let rgbArr = match.slice(1, 4);
            let hex = rgbToHex(rgbArr);
            setDisplayColor(hex);
            props.onChange(hex);
        }
        setColor(inputValue);
        
    }

    const handleClick = () => {
        setShowPicker(!showPicker);
    }

    return (
        <div className="color-picker">
            <div className="color-picker-input" style={{ backgroundColor: displayColor, width: props.width || 250 }} onClick={handleClick}>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Pick a color"
                    variant="standard"
                    value={color}
                    onChange={handleInputChange}
                />
            </div>
            {showPicker && <div className="popover">
                <div className="cover" onClick={() => setShowPicker(false)}/>
                <ChromePicker
                    color={displayColor}
                    onChange={handleChange}
                />
            </div>}
        </div>
    )
}


export default ColorPicker;