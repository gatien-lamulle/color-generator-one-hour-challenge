import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ColorGenerator from './pages/ColorGenerator/ColorGenerator';
import ColorSearcher from './pages/ColorSearcher/ColorSearcher';
import Favorites from './pages/Favorites/Favorites';
import NotFound from './pages/NotFound/NotFound';
import Header from './components/Header/Header';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import ColorPalette from './pages/ColorPalette/ColorPalette';

const theme = createTheme({
    palette: {
        primary: {
            main: '#322C2B',
        },
        secondary: {
            main: '#e4c460',
        },
        error: {
            main: '#F50057',
        },
        success: {
            main: '#d3fbd8',
        },
    },
});

function App() {
    
    useEffect(() => {
        if (!localStorage.getItem('favorites-colors')) {
            localStorage.setItem('favorites-colors', JSON.stringify([]));
        }
    }, []);

    return (
        <div className='App'>
            <MuiThemeProvider theme={theme}>
                <Header />
                <Routes>
                    <Route path='*' element={<NotFound />} />
                    <Route
                        exact
                        path='/'
                        element={<Navigate to='/generate' replace />}
                    />
                    <Route path='/generate' element={<ColorGenerator />} />
                    <Route path='/search' element={<ColorSearcher />} />
                    <Route path='/palette' element={<ColorPalette />} />
                    <Route path='/favorites' element={<Favorites />} />
                </Routes>
            </MuiThemeProvider>
        </div>
    );
}

export default App;
