/**
 * Created by caiqu on 10/01/2018.
 */
import React, {Component,Fragment} from 'react';
import './main.scss';
class FlipWords extends Component {
    render(){
        return (
        <div id="container">
            <div>{this.props.title}</div>
            <div id="flip">
                {this.props.words.map(word =>
                        <Fragment>
                <div><div>{word}</div></div>
                    </Fragment>
                )}
            </div>
        </div>
        )
    }
}

export default FlipWords;