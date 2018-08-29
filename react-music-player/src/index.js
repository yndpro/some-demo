

const test = require('./test.js');
require('./index.scss');
// const icon = require('./react.png');
//
// console.dir(icon);

function component() {
    var root = document.createElement('div');
    var btn = document.createElement('button');
    var text = document.createElement('div');

    text.innerHTML = test();
    text.style.display = "none";
    btn.innerHTML = 'Click me';

    btn.onclick = function (){
        text.style.display = "block";
    };

    root.appendChild(btn);
    root.appendChild(text);

    return root;
}

document.body.appendChild(component());

console.log("I love u,orange");



if (module.hot) {
    module.hot.accept('./test.js', function() {
      console.log('Accepting the updated test module!');
      console.log(test());
    })
}

