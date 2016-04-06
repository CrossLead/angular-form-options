var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var grename = require('gulp-rename');
var KarmaServer = require('karma').Server;

gulp.task('jshint', function(){
  gulp.src('./src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function(){
  gulp.src(['./src/app.js', './src/**/*.js'])
    .pipe(concat('angular-form-options.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(grename('angular-form-options.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function(){
  gulp.watch('./src/*.js', ['jshint', 'scripts']);
});

gulp.task('test', function (done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('build', ['jshint', 'scripts']);

gulp.task('default', ['build']);
