/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

/**
 * @param {String} source Source code.
 * @returns {String}
 */
module.exports = function stripTextualPartOfError( source ) {
	return source.replace( /throw new CKEditorError\( ('[^:]+):([^']+)'/g, ( ...args ) => {
		console.log( JSON.stringify( args, null, 4 ) );
		process.exit();
	} );
};
