import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";
import {FIREBASE_CONFIG} from "./utils/config";
import { getFirestore } from "firebase/firestore";


const app = initializeApp(FIREBASE_CONFIG);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

export const firestore = getFirestore(app);
