var count = 1;

function inc(){
    count += 1;
}
console.log('test:' + count);

module.exports = {
    count : count,
    inc : inc
};