var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// Configure the browserSync task
gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir: 'src/'
    },
  })

  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/css/style.css', browserSync.reload);
  gulp.watch('src/js/*.js', browserSync.reload);
})

// Default task
gulp.task('default', ['browserSync']);

