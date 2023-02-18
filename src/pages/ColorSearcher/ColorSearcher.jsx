import { TextField, IconButton, CircularProgress } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { useState, useEffect } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@material-ui/core';
import Vibrant from 'node-vibrant/dist/vibrant';
import ColorsPrinter from '../../components/ColorsPrinter/ColorsPrinter';
import './ColorSearcher.css';

function ColorSearcher() {
    const [query, setQuery] = useState('');
    const [colors, setColors] = useState([]);
    const [unspashThanks, setUnspashThanks] = useState([]);
    const [loading, setLoading] = useState(false);

    const extractImagesInformation = async (data) => {
        if (data.status === 200 && data.type === 'success') {
            const photos = data.response.results;
            let colorsVibrant = [];
            let thanks = [];
            for (let photo of photos) {
                const url = photo.urls.regular;
                const owner_name = photo.user.name;
                const owner_url = photo.user.links.html;
                const owner_photo = photo.links.html;
                const palette = await Vibrant.from(url).getPalette();
                colorsVibrant = colorsVibrant.concat(
                    Object.values(palette).map((e) => ({
                        hex: e.hex,
                        pop: e.population,
                    }))
                );
                thanks.push({
                    name: owner_name,
                    url: owner_url,
                    image: owner_photo,
                });
            }
            colorsVibrant.sort((a, b) => b.pop - a.pop);
            console.log(colorsVibrant.length);
            colorsVibrant = Array.from(
                new Set(colorsVibrant.map((e) => e.hex))
            ); //remove duplicates
            console.log(colorsVibrant);
            console.log(colorsVibrant.length);
            console.log(thanks);
            setColors(colorsVibrant);
            setUnspashThanks(thanks);
        }
    };

    const search = () => {
        if (!query) return;
        setLoading(true);
        console.log(query);
        fetch(`/.netlify/functions/unsplash?search=${query}`)
            .then((r) => r.json())
            .then((result) => {
                console.log(result);
                extractImagesInformation(result).then(() => setLoading(false));
            });
    };

    return (
        <div className='color-searcher'>
            <p className='explication'>
                Search for a color by a word, it will return the colors most
                present in what the word represents. <br />
                Please enter a tangible word, an object for example.
            </p>
            {unspashThanks.length > 0 && (
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        All colors are taken from images provided by&nbsp;
                        <a
                            className='custom-link'
                            href="https://unsplash.com?utm_source=ColorSearcher&utm_medium=referral"
                            target='_blank'
                        >
                            Unsplash
                        </a> &nbsp;<i>(Click to see all the creators and the link of the associated images)</i>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ul>
                            {unspashThanks.map((item) => (
                                <li key={item.image}>
                                    <a
                                        className='custom-link'
                                        href={item.image}
                                        target='_blank'
                                    >
                                        Image
                                    </a>{' '}
                                    created by{' '}
                                    <a
                                        className='custom-link'
                                        href={item.url + '?utm_source=ColorSearcher&utm_medium=referral'}
                                        target='_blank'
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </AccordionDetails>
                </Accordion>
            )}
            <TextField
                className='searcher'
                fullWidth
                label='Search for a color'
                variant='outlined'
                value={query}
                disabled={loading}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        search();
                    }
                }}
                InputProps={{
                    endAdornment: (
                        <IconButton
                            onClick={search}
                            color='primary'
                            aria-label='search'
                        >
                            <SearchIcon />
                        </IconButton>
                    ),
                }}
            />
            {loading && (
                <CircularProgress
                    className='loading'
                    size={70}
                    color='secondary'
                />
            )}
            {colors.length > 0 && !loading && <ColorsPrinter colors={colors} />}
        </div>
    );
}

export default ColorSearcher;
