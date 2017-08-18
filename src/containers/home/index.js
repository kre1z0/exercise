import React, { Component } from 'react';

import cloneDeep from 'lodash/cloneDeep';
import ReactPhoneInput from 'react-phone-input';

import './home.scss';

class Home extends Component {
    handleOnChange = value => {
        console.log('--> value', value);
    };
    focus = value => {
        console.log('--> value', value);
    };
    render() {
        return (
            <div>
                <div className="lol" onFocus={this.focus}>4</div>
                <div className="lol" onFocus={this.focus}>3</div>
                <div className="lol" onFocus={this.focus}>2</div>
                <div className="lol" onFocus={this.focus}>1</div>
                <p><a href="1.html" tabindex="1">Ссылка 1</a></p>
                <p><a href="3.html" tabindex="3">Ссылка 3</a></p>
                <p><a href="2.html" tabindex="2">Ссылка 2</a></p>
                <p><a href="4.html" tabindex="4">Ссылка 4</a></p>
            </div>
        );
    }
}

var objects = [{ 'a': 1 }, { 'b': 2 }];

var deep = cloneDeep(objects);

console.log(deep[0] === objects[0]);
console.log('--> deep[0]', deep[0]);
console.log('--> objects[0]', objects[0]);
export default Home;
