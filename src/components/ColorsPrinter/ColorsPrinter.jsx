import React from 'react';
import { useState, useEffect } from 'react';
import Switch from '@material-ui/core/Switch';
import './ColorsPrinter.css';
import ColorComponent from '../ColorComponent/ColorComponent';

function ColorsPrinter(props) {
    const [rgbMode, switchMode] = useState(false);

    return (
        <div className='colors'>
            <div className='switch'>
                <span className={!rgbMode && 'selected-mode'}>HEX</span>
                <Switch
                    className='switch'
                    checked={rgbMode}
                    onChange={(_) => switchMode(!rgbMode)}
                />
                <span  className={rgbMode ? 'selected-mode' : ''}>RGB</span>
            </div>
            {props.colors &&
                props.colors.map((item) => {
                    return (
                        <ColorComponent key={item} color={item} rgb={rgbMode} />
                    );
                })}
        </div>
    );
}

export default ColorsPrinter;
