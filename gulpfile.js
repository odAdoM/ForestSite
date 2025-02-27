// !! notice !!
// ACCESS URLs:
// run with "dist" at the end of local path: http://localhost:3000/dist

// const { src, dest, series, parallel, watch } = require('gulp');
// const sass = require('gulp-sass')(require('sass'));
// const autoprefixer = require('gulp-autoprefixer');
// const cssnano = require('gulp-cssnano');
// const rename = require('gulp-rename');
// const babel = require('gulp-babel');
// const uglify = require('gulp-uglify');
// const imagemin = require('gulp-imagemin');
// const sourcemaps = require('gulp-sourcemaps');
// const clean = require('gulp-clean');
// const kit = require('gulp-kit');
// const browserSync = require('browser-sync').create();
// const reload = browserSync.reload;

import pkg from 'gulp';
const { src, dest, series, parallel, watch } = pkg;
import autoprefixer from 'gulp-autoprefixer';
import cssnano from 'gulp-cssnano';
import rename from 'gulp-rename';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
import sourcemaps from 'gulp-sourcemaps';
import clean from 'gulp-clean';
import kit from 'gulp-kit';
import browserSyncPkg from 'browser-sync';

const browserSync = browserSyncPkg.create();
const reload = browserSync.reload;

import gulpSass from 'gulp-sass';
import * as sass from 'sass';
const sassProcessor = gulpSass(sass);

const paths = {
	html: './src/html/**/*.kit',
	sass: './src/sass/**/*.scss',
	js: './src/js/**/*.js',
	img: './src/img/**/*',
	font: './src/fonts/**/*',

	dist: './dist/',
	htmlDest: './dist/',
	sassDest: './dist/css',
	jsDest: './dist/js',
	imgDest: './dist/img',
	fontDest: './dist/fonts',
};

function sassCompiler(done) {
	src(paths.sass)
		.pipe(sourcemaps.init())
		.pipe(sassProcessor().on('error', sassProcessor.logError))
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.sassDest));
	done();
}

function javaScript(done) {
	src(paths.js)
		.pipe(sourcemaps.init())
		//.pipe(babel({ presets: ['@babel/env'] }))
		// .pipe(babel({ presets: ['@babel/preset-env'] }))
		.pipe(babel({ presets: [['@babel/preset-env', { modules: false }]] }))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.jsDest));
	done();
}

function convertImages(done) {
	src(paths.img).pipe(imagemin()).pipe(dest(paths.imgDest));
	done();
}

function handleKits(done) {
	src(paths.html).pipe(kit()).pipe(dest(paths.htmlDest));
	done();
}

function copyFonts(done) {
	src(paths.font).pipe(dest(paths.fontDest));
	done();
}

//-----------------------------------------------------
/*  !! WYŁĄCZNIE DO WYWOŁANIA RĘCZNIE !! */

function clearStuff(done) {
	src(paths.dist, { read: false }).pipe(clean());
	done();
}
//-----------------------------------------------------

function startBrowserSync(done) {
	browserSync.init({
		server: {
			baseDir: './',
		},
	});
	done();
}

function watchForChanges(done) {
	watch('./*html').on('change', reload);
	watch([paths.html, paths.sass, paths.js], parallel(handleKits, sassCompiler, javaScript)).on('change', reload);
	watch(paths.img, convertImages).on('change', reload);
	watch(paths.font, copyFonts).on('change', reload);
	done();
}

const mainFunctions = parallel(handleKits, sassCompiler, javaScript, convertImages, copyFonts);
//exports.clearStuff = clearStuff;
//exports.default = series(mainFunctions, startBrowserSync, watchForChanges);
export { clearStuff };
export default series(mainFunctions, startBrowserSync, watchForChanges);
