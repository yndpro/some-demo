define([
    'module4',
    'module5'
], function(module4,module5) {
    console.log("module2")
    return function(){
        return (2 + module4() + module5())
    }
});