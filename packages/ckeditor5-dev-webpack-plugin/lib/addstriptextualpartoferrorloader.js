/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

const path = require( 'path' );

module.exports = function addStripTextualPartOfErrorLoader( compiler ) {
	compiler.plugin( 'normal-module-factory', nmf => {
		nmf.plugin( 'after-resolve', ( resolveOptions, done ) => {
			if ( resolveOptions.resource.match( /\/ckeditor5-[^/]+\/src\/.+\.js$/ ) ) {
				resolveOptions.loaders.unshift( path.join( __dirname, 'striptextualpartoferrorloader.js' ) );
			}

			done( null, resolveOptions );
		} );
	} );
};
