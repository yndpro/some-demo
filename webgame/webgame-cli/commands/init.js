const {prompt} = require('inquirer');
const {exec} = require('child_process');
const fs = require('fs');
const ora = require('ora');
const path = require('path');
const ejs = require('gulp-ejs');
const gulp = require('gulp');
const gulpCopy = require('../src/gulpCopy');
const gulpSequence = require('gulp-sequence');
const log = require('fancy-log');
const del = require('del');

const cwd = process.cwd();

const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'what\'s your webgame name?(请输入官网游戏的缩写，如ssjj)',
        validate: function(value) {
            if(!value) return 'Please enter webgame name';
            return true;
        }
    }
];

const spinner = ora('正在生成...');



module.exports = prompt(questions).then(({name}) => {

    spinner.start();

    deleteFolder(cwd + "/" + name);
    spinner.succeed("clear the dist");

    /*let src = path.resolve(__dirname,'../../webgame-tpl');
    let dist = path.resolve(__dirname,'../../' + name);*/

    gulp.task('copy-static',function(){
        return gulp.src([cwd + '/webgame-tpl/static/**'])
            .pipe(gulpCopy(cwd + "/" + name + '/static/tpl', { prefix: 3}));
    });
    gulp.task('copy-template',function(){
        return gulp.src([cwd + '/webgame-tpl/template/**'])
            .pipe(gulpCopy(cwd + "/" + name + '/template/tpl', { prefix: 3}));
    });
    gulp.task('copy-source',function(){
        return gulp.src([cwd + '/webgame-tpl/source/**'])
            .pipe(gulpCopy(cwd + "/" + name + '/source/', { prefix: 3}));
    });


    gulp.task('compile-template',['copy-template'],function(){
        return gulp.src(cwd + "/" + name + '/template/tpl/**.ejs')
            .pipe(ejs({
                name: name
            },{'delimiter':'$'}, { ext: '.php' }).on('error', log))
            .pipe(gulp.dest(cwd + "/" + name + '/template/tpl/'));
    });
    gulp.task('compile-source',['copy-source'],function(){
        return gulp.src(cwd + "/" + name + '/source/**.ejs')
            .pipe(ejs({
                name: name
            },{'delimiter':'$'}, { ext: '.php' }).on('error', log))
            .pipe(gulp.dest(cwd + "/" + name + '/source/'));
    });


    gulp.run('compile-source','compile-template','copy-static',function(err){
        del([
            cwd + "/" + name + '/source/*.ejs',
            cwd + "/" + name + '/template/tpl/*.ejs',
        ]);
        spinner.succeed("build completed");
        setTimeout(function () {
            exec('start chrome http://ued147.4399.com/webgame/' + name);
        },3000);
        console.log(err);

    });

    /*console.log("dist:",dist);*/

    /*copyDirSync(src,dist,function(err){
        if (err) throw err;
    });
    console.log(path.resolve(dist,'_index.ejs'));
    fs.readFile(path.resolve(dist,'_index.ejs'),function (err,buffer) {
        if (err) throw err;
        console.log(buffer);
        /!*ejs.render(str, {name:name}, {delimiter:'$'});*!/
    });*/

});


function deleteFolder(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolder(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

/*
 * 复制目录、子目录，及其中的文件
 * @param src {String} 要复制的目录
 * @param dist {String} 复制到目标目录
 */
function copyDirSync(src, dist, callback) {
    fs.access(dist, function(err){
        if(err){
            // 目录不存在时创建目录
            fs.mkdirSync(dist);
        }
        _copy(null, src, dist);
    });

    function _copy(err, src, dist) {
        if(err){
            callback(err);
        } else {
            fs.readdir(src, function(err, paths) {
                if(err){
                    callback(err)
                } else {
                    paths.forEach(function(path) {
                        var _src = src + '/' +path;
                        var _dist = dist + '/' +path;
                        fs.stat(_src, function(err, stat) {
                            if(err){
                                callback(err);
                            } else {
                                // 判断是文件还是目录
                                if(stat.isFile()) {
                                    fs.writeFileSync(_dist, fs.readFileSync(_src));
                                } else if(stat.isDirectory()) {
                                    // 当是目录是，递归复制
                                    copyDir(_src, _dist, callback)
                                }
                            }
                        })
                    })
                }
            })
        }
    }
}