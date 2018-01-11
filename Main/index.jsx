import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Loader} from './components';
document.getElementById('app').style['min-height'] = '100vh';
ReactDOM.render(<div style={{width: '100vh', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Loader/> </div>, document.getElementById('app'));
