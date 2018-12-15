import _ from 'lodash';
import {test} from './test.js';

require('./index.scss');
const icon = require('./react.png');

// console.dir(icon);

console.log(_.join(['main', 'module', 'loaded!'], ' '));

function component() {
    var root = document.createElement('div');
    var btn = document.createElement('button');
    var text = document.createElement('div');
    var img = document.createElement('img');

    text.innerHTML = test();
    text.style.display = "none";
    btn.innerHTML = 'Click me';
    img.src = icon;

    btn.onclick = function (){
        text.style.display = "block";
    };

    
    root.appendChild(img);
    root.appendChild(btn);
    root.appendChild(text);

    return root;
}

document.body.appendChild(component());

// console.log("I love u,orange,orange");



// if (module.hot) {
//     module.hot.accept('./test.js', function() {
//       console.log('Accepting the updated test module!');
//       console.log(test());
//     })
// }

