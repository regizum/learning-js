var gulp = require("gulp"),
  connect = require("gulp-connect"),
  include = require("gulp-html-tag-include"),
  del = require("del"),
  series = require("gulp");

//# Connect

gulp.task("connect", function (done) {
  connect.server({
    port: 8080,
    root: "./",
    livereload: true,
  });
  done();
});

//# Clean

gulp.task("clean", function (done) {
  del.sync("dist/");
  done();
});

//# Html

gulp.task("html", function () {
  return gulp
    .src("src/html/compile/*.html")
    .pipe(include())
    .pipe(gulp.dest("dist/"))
    .pipe(connect.reload());
});
gulp.task("html-index", function () {
  return gulp
    .src("src/html/index.html")
    .pipe(include())
    .pipe(gulp.dest("./"))
    .pipe(connect.reload());
});

//# Assets

gulp.task("assets", function () {
  return gulp
    .src("src/assets/**/**.*")
    .pipe(gulp.dest("dist/assets"))
    .pipe(connect.reload());
});

//# Homeworks

gulp.task("homeworks", function () {
  return gulp
    .src("src/homeworks/**/**")
    .pipe(include())
    .pipe(gulp.dest("dist/homeworks"))
    .pipe(connect.reload());
});

//# Js

// Main
gulp.task("js", function () {
  return gulp
    .src("src/js/main.js")
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
});

gulp.task("build", gulp.series("homeworks", "assets", "html", "html-index", "js"), function () {});

//# Watch

gulp.task("watch", function () {
  gulp.watch("src/html/**/**/**/**", gulp.series("html"));
  gulp.watch("src/assets/**/*", gulp.series("assets"));
  gulp.watch("src/homeworks/**/**", gulp.series("homeworks"));
  gulp.watch("src/js/**/**", gulp.series("js"));
});

gulp.task(
  "default",
  gulp.series("clean", "connect", "build", "watch"),
  function (done) {
    done();
  }
);
