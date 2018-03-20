var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss')
 .pipe(sass())
 .pipe(gulp.dest('css'))
 .pipe(browserSync.reload({
 stream: true
 }))
});

gulp.task('browserSync', function() {
  	browserSync({
 		server: {
 			baseDir: './'
 		},
  	})
});

gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('src/scss/**/*.scss', ['sass']); 
  // другие ресурсы
});