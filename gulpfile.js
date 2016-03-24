var gulp = require('gulp'),
	less = require('gulp-less'),
	sass = require('gulp-sass'),
	//notify = require('gulp-notify'),
	jshint = require('gulp-jshint'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	minifycss = require('gulp-minify-css'),
	//imagemin = require('gulp-imagemin'),
	//cache = require('gulp-cache'),
	//clean = require('gulp-clean'),
	browserSync = require('browser-sync');
	//webserver = require('gulp-webserver');
var reload = browserSync.reload;
var config = require('./config.json');
var root = config.root;


// 合并压缩JavaScript文件
gulp.task('scripts', function() {
	return gulp.src(root + config.js.src)
			.pipe(jshint())
			//.pipe(concat('all.js'))
			.pipe(gulp.dest(root + config.js.dest))
			//.pipe(uglify())
			//.pipe(rename({suffix: '.min'}))
			//.pipe(gulp.dest('./assets/js'))
			//.pipe(gulp.dest('./_site/assets/js'))
			.pipe(reload({stream:true}))
			//.pipe(notify({message: 'scripts task complete!'}));
});
// 解析less，压缩css
gulp.task('less', function() {
	gulp.src(root + config.css.less)
		.pipe(less())
		.pipe(gulp.dest(root + config.css.dest))
		//.pipe(minifycss())
		//.pipe(rename({suffix: '.min'}))
		//.pipe(gulp.dest(config.css.dest))
		//.pipe(gulp.dest('./_site/assets/css'))
		.pipe(reload({stream:true}));
		//.pipe(notify({message: 'styles task complete!'}));
});
// 解析sass
gulp.task('sass', function() {
	gulp.src(root + config.css.sass)
		.pipe(sass())
		.pipe(gulp.dest(root + config.css.dest))
		.pipe(reload({stream: true}));
});
// // 压缩image
// gulp.task('images', function(){
//     return gulp.src('./src/img/**/*')
//         .pipe(cache(imagemin({optimizationLevel: 5,progressive: true, interlaced: true })))
//         .pipe(gulp.dest('./assets/img'))
//         .pipe(gulp.dest('./_site/assets/img'))
//         .pipe(browserSync.reload({stream:true}))
//         .pipe(notify({message: 'Images task complete'}));
// });

// gulp.task('clean', function(){
//     return gulp.src(['./assets/css', './assets/js'], {read: false})
//     	.pipe(clean());
// });

gulp.task('serve', ['sass', 'less', 'scripts'], function() {
    browserSync.init({
        server: "./"
    });
    gulp.watch(root + config.js.src, ['scripts']);
    gulp.watch(root + config.css.sass, ['sass']);
    gulp.watch(root + config.css.less, ['less']);
    gulp.watch(root + config.html).on('change', reload);
    gulp.watch("./index.html").on('change', reload);
});

gulp.task('default', ['serve']);
