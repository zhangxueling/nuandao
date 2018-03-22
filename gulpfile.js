//引入gulp
var gulp = require("gulp");
//引入sass
var sass = require("gulp-ruby-sass");
var cleanCss = require('gulp-clean-css');
var uglify   = require('gulp-uglify');
var concat   = require('gulp-concat');
var connect  = require('gulp-connect');

gulp.task('sass', function () {
	sass('sass/*.scss', {
		style: 'expanded'
	}).pipe(gulp.dest('css'))
});

// 压缩JS
gulp.task('minifyJs', function () {
	gulp.src('js/*.js').pipe(uglify()).pipe(gulp.dest('D:/phpStudy/WWW/handu/js'));
});

//添加copyHtml任务,保存到指定目录
gulp.task("copyHtml",function(){
	gulp.src("*.html").pipe(gulp.dest("D:/phpStudy/WWW/handu"));

});
//添加copyImg任务，保存到指定目录
gulp.task("copyImg",function(){
	gulp.src("images/**/*").pipe(gulp.dest("D:/phpStudy/WWW/handu/images"));

});

//将转换成的css文件放到指定目录下
gulp.task("moveCss",function(){
	gulp.src("css/*.css").pipe(gulp.dest("D:/phpStudy/WWW/handu/css"));
});

// 新建刷新任务
gulp.task('reload', ['sass', 'minifyJs'], function () {
	return gulp.src('*.html').pipe(connect.reload());
});

//添加自动监听任务功能
gulp.task("watch",function(){
	gulp.watch("*.html",["copyHtml"]);
	gulp.watch("images/**/*",["copyImg"]);
	gulp.watch("sass/*.scss",["sass"]);
	gulp.watch("css/*.css",["moveCss"]);
	gulp.watch("js/*.js",["minifyJs"]);
	gulp.watch("*.html",['reload', ['sass', 'minifyJs']]);
});