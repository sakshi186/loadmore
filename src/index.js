import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import InfiniteScroll1 from './InfiniteScroll1';
//import App from './App';
//import LoadMore from './LoadMore';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <InfiniteScroll1/>
  </React.StrictMode>
);
