import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Loader,FlipWords} from './components';
document.getElementById('app').style['min-height'] = '100vh';
ReactDOM.render(
    <div style={{
        width: '100vh',
        height: '100vh',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'}}>
        <div>
            <div>Loader</div>
            <Loader/>
        </div>
        <div>
            <FlipWords title="FlipWords" words={["Kaizer", "En", "UI"]}/>
        </div>
    </div>, document.getElementById('app'));
