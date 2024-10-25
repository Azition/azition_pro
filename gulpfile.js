const { src, dest, series, task, parallel, watch } = require('gulp');
const clean         = require('gulp-clean');
const concat        = require('gulp-concat');
const cleanCss      = require('gulp-clean-css');
const mergeStream   = require('merge-stream');
const htmlmin       = require('gulp-htmlmin');
const cheerio       = require('gulp-cheerio');
const util          = require('gulp-util');
const fs            = require('fs');
const path          = require('node:path');
const through2      = require('through2');

const DEST_DIR = 'dist/';
const TMP_DIR = 'tmp';
const CSS_TMP_DIR = `${TMP_DIR}/css`;
const FONTS = 'src/fonts/**/*.{otf,ttf,woff,woff2}';
const CSS_LIST = ['src/css/_normalize.css', 'src/css/main.css'];
const INDEX_FILE = 'src/index.html';

const addCssLink = ($, file, done) => {
  const head = $('head')[0];
  fs.readdirSync(CSS_TMP_DIR).map(fname => {
    const data = fs.readFileSync(path.join(CSS_TMP_DIR, fname));
    const encodedContents = new Buffer.from(data).toString('base64');
    $(head).append(`<link rel="stylesheet" href="data:text/css;base64,${encodedContents}">`);
    // $(head).append(`<link rel="stylesheet" href="/css/${fname}">`);
  });
  done();
};
const cleanDir = () => src(`${DEST_DIR}*`, { allowEmpty: true, read: false }).pipe(clean());
const cleanTmpDir = () => src(`${TMP_DIR}`, { allowEmpty: true, read: false }).pipe(clean());
const fonts2ss = () => src(FONTS).pipe(through2.obj((file, _, cb) => {
  if (file.isBuffer()) {
    const data = fs.readFileSync(file.path);
    const encodedContents = new Buffer.from(data).toString('base64');

    const attributes = [
      `font-family:${path.basename(file.path, path.extname(file.path))};`,
      `src:url(data:application/x-font-ttf;base64,${encodedContents});`
    ];
    file.contents = new Buffer.from(`@font-face{${attributes.join('')}}`);
    file.path = util.replaceExtension(file.path, '.css');
  }
  cb(null, file);
}));
const cssmin = () => src(CSS_LIST).pipe(cleanCss());
const concatAllCss = () => mergeStream(fonts2ss(), cssmin())
  .pipe(dest(CSS_TMP_DIR));
const indexHtml = () => src(INDEX_FILE)
  .pipe(cheerio(addCssLink))
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(dest(DEST_DIR));

task('cleanDir', () => cleanDir());
task('concatAllCss', () => concatAllCss());
task('indexHtml', () => indexHtml());
task('cleanTmpDir', () => cleanTmpDir());
task('watch:files', () => {
  watch('src/**/*.*', series(parallel('cleanDir', 'cleanTmpDir'), 'concatAllCss', 'indexHtml', 'cleanTmpDir'));
});

task('default', series(parallel('cleanDir', 'cleanTmpDir'), 'concatAllCss', 'indexHtml', 'cleanTmpDir'));