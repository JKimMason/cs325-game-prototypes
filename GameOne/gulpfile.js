var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ['main', 'js', 'css']
    },
  })
  gulp.watch('main/*.html', browserSync.reload);
  gulp.watch('css/style.css', browserSync.reload);
  gulp.watch('js/*.js', browserSync.reload);
})

// Default task
gulp.task('default', ['browserSync']);

