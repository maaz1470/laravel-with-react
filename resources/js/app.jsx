import React from "react";
import ReactDOM from 'react-dom/client';
import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom'

if(document.getElementById('root')){
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <Main />
            </BrowserRouter>
        </React.StrictMode>
    )
}