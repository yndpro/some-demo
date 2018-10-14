'use strict';

const gulp = require('gulp');
const argv = require('yargs').argv;

const spritesmith = require('gulp.spritesmith');
const imagemin = require('gulp-imagemin');
const compass = require('gulp-compass');

const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const es2015Preset = require('babel-preset-es2015');
const babelify = require('babelify');

/*browserify*/
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const standalonify = require('standalonify');

function getJsLibName() {
    var libName = 'bundle.js';
    if (argv.min) {  //按命令参数"--min"判断是否为压缩版
        libName = 'bundle.min.js';
    }

    return libName;
}

gulp.task('build-js', function () {
    return browserify({
        entries: 'dev/js/index.js'  //指定打包入口文件
    })
    /*.plugin(standalonify, {  //使打包后的js文件符合UMD规范并指定外部依赖包
        name: 'FlareJ',
        deps: {
            'nornj': 'nj',
            'react': 'React',
            'react-dom': 'ReactDOM'
        }
    })*/
        .transform(babelify, {  //此处babel的各配置项格式与.babelrc文件相同
            presets: [
                'es2015'  //转换es6代码
            ],
            plugins: [
                'transform-object-assign',  //转换es6 Object.assign插件
                /*'external-helpers',*/  //将es6代码转换后使用的公用函数单独抽出来保存为babelHelpers
                ['transform-es2015-classes', { "loose": false }],  //转换es6 class插件
                ['transform-es2015-modules-commonjs', { "loose": false }]  //转换es6 module插件
            ]
        })  //使用babel转换es6代码
        .bundle()  //合并打包
        .pipe(source(getJsLibName()))  //将常规流转换为包含Stream的vinyl对象，并且重命名
        .pipe(buffer())  //将vinyl对象内容中的Stream转换为Buffer
        .pipe(gulp.dest('dev/js'));  //输出打包后的文件
});

gulp.task('release-js', ()=> {
    return gulp.src([
        'dev/js/bundle.js',
        'dev/js/mBoxDownload.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(babel({presets: ['es2015']}))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('release/js'))
});

gulp.task('css', () => {
    gulp.src('dev/scss/style.scss')
        .pipe(compass({
            css: 'release/css',
            sass: 'dev/scss',
            style : 'compact'
        }))
        .pipe(gulp.dest('release/css'));
});


gulp.task('cssSprite', () => {
    let prefixs = ['share','btn','lottery','other','niudan'];

    for(let prefix of prefixs){
        gulp.src('dev/images/sprite_' + prefix + '/*.png')
            .pipe(spritesmith({
                imgName: './images/sprite_' + prefix + '.png',
                cssName: './scss/sprite_' + prefix + '.scss',
                cssFormat: 'scss',
                cssTemplate: 'scss.handlebars',
                cssOpts:prefix,
                padding:4
            }))
            .pipe(gulp.dest('dev/'));
    }
});
gulp.task('image', () => {
    gulp.src('dev/images/*.{png,jpg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('release/images'));
});


//watch
gulp.task('watch', () => {
    gulp.watch('dev/scss/*.scss', ['css']);
    gulp.watch('dev/js/*.js', ['build-js']);
});

//default
gulp.task('default',['css','image']);