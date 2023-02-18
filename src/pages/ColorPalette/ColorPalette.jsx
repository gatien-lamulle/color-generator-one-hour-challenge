import React, { useState, useEffect } from 'react';
import ColorsPrinter from '../../components/ColorsPrinter/ColorsPrinter';
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import './ColorPalette.css';

function ColorPalette() {
    const [colors, setColors] = useState([]);

    const hexToHsl = (hex) => {
        let r = parseInt(hex.substring(1, 3), 16);
        let g = parseInt(hex.substring(3, 5), 16);
        let b = parseInt(hex.substring(5, 7), 16);
        (r /= 255), (g /= 255), (b /= 255);
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h,s,l = (max + min) / 2;
        if (max === min) {
            h = s = 0; // achromatic
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return [h*360, s*100, l*100];
    };

    const hslToHex = (h, s, l) => {
        h /= 360;
        s /= 100;
        l /= 100;
        let r, g, b;
        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            let hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            let p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        let toHex = x => {
            let hex = Math.round(x * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    const setPrimaryColor = (color) => {
        const hsl = hexToHsl(color);
        const shades = Array.from(Array(10).keys(), e => [hsl[0], hsl[1], e*10 + hsl[2]/10]);
        const secondaryPossibilities = [0, 30, 120, 150, 180, 210, 240, 300];
        let secondaryColors = [];
        secondaryPossibilities.forEach(add => {
            secondaryColors = secondaryColors.concat(shades.map(shade => hslToHex((shade[0] + add) % 360, shade[1], shade[2])));
        });
        secondaryColors =  [...new Set(secondaryColors)];
        setColors(secondaryColors);

    };

    return (
        <div className='color-palette'>
            <ColorPicker width={"90%"} onChange={setPrimaryColor} />
            {colors.length > 0 && <ColorsPrinter colors={colors} />}
        </div>
    );
}

export default ColorPalette;
