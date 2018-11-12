#!/usr/bin/env node

const { resolve } = require('path');
const program = require('commander');
const log = require('tracer').colorConsole();
const res = command => resolve(__dirname, '../commands/', command);   


program
    .version('1.0.0')
    .description('welcome to webgame');
program
    .command('init')
    .description('init a new webgame project')
    .alias('i')
    .action(() => {
        require(res('init'));
    });
/*program
    .command('new')
    .description('new a webgame project')
    .alias('n')
    .action(() => {
        require(res('new'));
    });*/


program.parse(process.argv);

if(!program.args.length){
    program.help()
};


