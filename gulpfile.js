require('json5/lib/register');

let _ = require('underscore');
let browserSync = require('browser-sync').create();
let config = require('./gulp.config');
let gulp = require('gulp');
let gulpChanged = require('gulp-changed');
let gulpCleanCSS = require('gulp-clean-css');
let gulpConcat = require('gulp-concat');
let gulpEjs = require('gulp-ejs');
let gulpHtmlmin = require('gulp-htmlmin');
let gulpJsonminify = require('gulp-jsonminify');
let gulpPlumber = require('gulp-plumber');
let gulpPug = require('gulp-pug');
let gulpRename = require('gulp-rename');
let gulpSass = require('gulp-sass');
let gulpSourcemaps = require('gulp-sourcemaps');
// let gulpSvgmin = require('gulp-svgmin');
let gulpUglify = require('gulp-uglify');
let gulpUtil = require('gulp-util');
let pump = require('pump');
let gulpCheerio = require('gulp-cheerio');

let data = require('./src/data.json5');
let gconfig = {
  assetsDir: 'src',
  dist: './',
  distAssets: 'assets/',
  distCss: '**/*.css',
  distJS: '**/*.js',
  distJson: '**/*.json',
  distSvg: '**/*.svg',
  production: !!gulpUtil.env.prod,
  pugPattern: 'index.pug',
  sassPattern: 'scss/**/*.scss',
  src: '../src'
};

let filters = _.mapObject(config.pugJs.filters, f =>
  _.reduce(
    _.map(f, (v, k) => k + '=' + JSON.stringify(v)),
    (o, n) => o + ' ' + n,
    ''
  )
);

gulp.task('pug', callBack => {
  gulp
    .src(gconfig.assetsDir + '/' + gconfig.pugPattern)
    .pipe(gulpChanged(gconfig.src))
    .pipe(gulpEjs(filters).on('error', e => gulpUtil.log(e.message)))
    .pipe(
      gulpPug({
        pretty: gconfig.production ? false : ' ',
        data
      }).on('error', e => gulpUtil.log(callBack.type))
    )
    .pipe(gulpPlumber(e => gulpUtil.log(e.message)))
    .pipe(
      gulpRename({
        extname: '.html'
      })
    )
    .pipe(gulp.dest(gconfig.dist));
  browserSync.reload();
  callBack();
});

gulp.task('sass', () => {
  gulp
    .src(config.assetsDir + '/' + config.sassPattern)
    .pipe(gulpSourcemaps.init())
    .pipe(gulpSass())
    .pipe(gulpConcat('main.css'))
    .pipe(config.production ? gulpCleanCSS() : util.noop())
    .pipe(gulpSourcemaps.write('.'))
    .pipe(gulp.dest('web/css'));
});

gulp.task('optcss', () =>
  gulp
    .src('./icons/icomoon/style.css', {
      // base: './'
    })
    .pipe(gulpCleanCSS())
    .pipe(gulp.dest('../src/assets/icons/icomoon/'))
);

gulp.task('optjson', () =>
  gulp
    .src(gconfig.dist + gconfig.distAssets + gconfig.distJson, {
      base: './'
    })
    .pipe(gulpJsonminify())
    .pipe(gulp.dest('./'))
);

gulp.task('optsvg', () =>
  gulp
    .src('./icons/icomoon/symbol-defs.svg', {
      // base: './'
    })
    // .pipe(gulpSvgmin())
    .pipe(gulp.dest('../src/assets/icons/icomoon/'))
);

gulp.task('optjs', callBack => {
  pump(
    [
      gulp.src('./icons/icomoon/svgxuse.js', {
        // base: './'
      }),
      gulpUglify(),
      gulp.dest('../src/assets/icons/icomoon/')
    ],
    callBack
  );
});

let htmlMinOpt = {
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  html5: true,
  minifyCSS: true,
  minifyJS: true,
  // preserveLineBreaks: true,
  // processConditionalComments: true,
  removeAttributeQuotes: true,
  removeComments: true,
  removeEmptyAttributes: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true
};
gulp.task('opthtml', () =>
  gulp
    .src('./index.html', {
      // base: './'
    })
    .pipe(gulpHtmlmin(htmlMinOpt))
    .pipe(gulp.dest('./'))
);

gulp.task('optdisthtml', ['cheerio'], () =>
  gulp
    .src('../dist/index.html', {
      base: './'
    })
    .pipe(gulpHtmlmin(htmlMinOpt))
    .pipe(gulp.dest('./'))
);

gulp.task('browser-sync', () => {
  browserSync.init({
    // proxy: "localhost:4200",
    server: {
      baseDir: '../src'
    }
  });
});

gulp.task('cheerio', () => {
  return gulp
    .src('../dist/index.html', {
      base: './'
    })
    .pipe(
      gulpCheerio({
        run: ($, file) => {
          let scripts = ['runtime', 'polyfills', 'main']
            .map(v => `[src^=${v}]`)
            .map(v => {
              let src = $(v).attr('src');
              $(v).remove();
              return src;
            });
          let s = $('[href^=styles]');
          style = s.attr('href');
          s.remove();
          let a = `<script>
document.addEventListener("DOMContentLoaded", function (event) {
  ${JSON.stringify(scripts)}.forEach(function (script) {
    var tag = document.createElement('script');
    tag.src = script;
    document.body.appendChild(tag);
  });
  document.head.innerHTML += '<link rel="stylesheet" href="${style}">';
});</script>`;
          $('body').append(a);
        }
      })
    )
    .pipe(gulp.dest('./'));
});

gulp.task('watch', () => {
  gulp.watch('resources/index.pug', ['pug']);
});

gulp.task('default', ['pug', 'watch']);

gulp.task('dist', ['optcss', 'opthtml', 'optjs', 'optjson']);

gulp.task('serve', ['browser-sync', 'pug', 'watch']);

gulp.task('doit', ['opthtml', 'pug']);

gulp.task('prod', ['optdisthtml']);
