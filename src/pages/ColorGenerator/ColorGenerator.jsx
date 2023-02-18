import React, { useState, useEffect } from 'react';
import './ColorGenerator.css';
import Button from '@material-ui/core/Button';
import AutorenewSharpIcon from '@material-ui/icons/AutorenewSharp';
import ColorsPrinter from '../../components/ColorsPrinter/ColorsPrinter';

function ColorGenerator() {
    const colorsNumber = 40;

    // const [rgbMode, switchMode] = useState(false)
    const [colors, setColors] = useState([]);

    useEffect(() => {
        randomColors();
    }, []);

    const generateColor = () => {
        return (
            '#' +
            ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')
        );
    };

    const randomColors = () => {
        let newColors = [];
        for (let k = 0; k < colorsNumber; k++) {
            let randomColor;
            do {
                randomColor = generateColor();
            } while (newColors.includes(randomColor));
            newColors.push(randomColor);
        }
        setColors(newColors);
    };

    return (
        <div className='color-generator'>
            <Button
                onClick={randomColors}
                size='large'
                variant='contained'
                startIcon={<AutorenewSharpIcon />}
            >
                Generate Random Colors
            </Button>

            <ColorsPrinter colors={colors} />
        </div>
    );
}

export default ColorGenerator;
