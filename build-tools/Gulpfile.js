var gulp = require("gulp");
var connect = require("gulp-connect");
var sass = require("gulp-sass");
var minifyHTML = require("gulp-minify-html");
var uglify = require("gulp-uglify");

gulp.task("connect", function () {
    connect.server({
        root: "dawg-coffee",
        livereload: true
    });
});

gulp.task("sass", function () {
    gulp.src("dawg-coffee/scss/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("dawg-coffee/css/"))
        .pipe(connect.reload()); // reloads browser when sass compilation is complete
});

gulp.task("uglify", function () {
    gulp.src("dawg-coffee/js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("dest/js"))
        .pipe(connect.reload());
});

gulp.task("minify", function () {
    gulp.src("dawg-coffee/*.html")
        .pipe(minifyHTML())
        .pipe(gulp.dest("dist/"))
        .pipe(connect.reload());
});

gulp.task("copy", function () {
    gulp.src("dawg-coffee/img/*")
        .pipe(gulp.dest("dist/img/"));
});

gulp.task("watch", function () { // reloads browser after file change in these directories
    gulp.watch("dawg-coffee/scss/*.scss", ["sass"]);
    gulp.watch("dawg-coffee/js/*.js", ["uglify"]);
    gulp.watch("dawg-coffee/*.html", ["minify"]);
});

gulp.task("default", ["sass", "minify", "uglify", "watch", "copy", "connect"]);