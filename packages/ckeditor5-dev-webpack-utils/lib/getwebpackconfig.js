/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

const BabiliPlugin = require( 'babili-webpack-plugin' );
const webpack = require( 'webpack' );
const getLicenseBanner = require( './getlicensebanner' );

/**
 * Returns an configuration for Webpack which will use features introduced in ES6.
 *
 * @param options
 * @param {String} options.entryPoint An entry point which will be compiled.
 * @param {String} options.destinationPath A path where compiled file will be saved.
 * @returns {Object}
 */
module.exports = function getWebpackConfig( options ) {
	return {
		devtool: 'cheap-source-map',

		entry: options.entryPoint,

		output: {
			path: options.destinationPath,
			filename: 'ckeditor.js',
			libraryTarget: 'umd'
		},

		plugins: [
			new BabiliPlugin( null, {
				comments: false
			} ),
			new webpack.BannerPlugin( {
				banner: getLicenseBanner(),
				raw: true
			} )
		],

		module: {
			rules: [
				{
					// test: **/ckeditor5-*/theme/icons/*.svg
					test: /ckeditor5-[^/]+\/theme\/icons\/[^/]+\.svg$/,
					use: [ 'raw-loader' ]
				},
				{
					// test: **/ckeditor5-*/theme/**/*.scss
					test: /\.scss$/,
					use: [ 'style-loader', 'css-loader', 'sass-loader' ]
				}
			]
		}
	};
};