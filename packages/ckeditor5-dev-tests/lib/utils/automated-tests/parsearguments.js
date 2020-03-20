/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

const minimist = require( 'minimist' );

/**
 * @param {Array.<String>} args
 * @returns {Object}
 */
module.exports = function parseArguments( args ) {
	const minimistConfig = {
		string: [
			'files',
			'browsers',
			'reporter',
			'debug',
			'karma-config-overrides',
			'coverage-paths'
		],

		boolean: [
			'watch',
			'coverage',
			'source-map',
			'verbose',
			'server',
			'production'
		],

		alias: {
			w: 'watch',
			c: 'coverage',
			s: 'source-map',
			v: 'verbose',
			f: 'files',
			b: 'browsers',
			d: 'debug'
		},

		default: {
			files: [],
			browsers: 'Chrome',
			reporter: 'mocha',
			watch: false,
			coverage: false,
			'coverage-paths': '',
			verbose: false,
			'source-map': false,
			server: false,
			production: false
		}
	};

	const options = minimist( args, minimistConfig );

	options.karmaConfigOverrides = options[ 'karma-config-overrides' ];
	options.coveragePaths = options[ 'coverage-paths' ];
	options.sourceMap = options[ 'source-map' ];
	options.browsers = options.browsers.split( ',' );

	if ( typeof options.files === 'string' ) {
		options.files = options.files.split( ',' );
	}

	if ( options.debug === 'false' || options.debug === false ) {
		options.debug = [];
	} else if ( typeof options.debug === 'string' ) {
		options.debug = [
			'CK_DEBUG',
			...options.debug.split( ',' ).map( flag => 'CK_DEBUG_' + flag.toUpperCase() )
		];
	} else {
		options.debug = [ 'CK_DEBUG' ];
	}

	options.language = options.language || 'en';
	options.additionalLanguages = options.additionalLanguages ? options.additionalLanguages.split( ',' ) : null;
	options.themePath = options.themePath ? options.themePath : null;

	// Delete all aliases because we don't want to use them in the code.
	// They are useful when calling a command but useless after that.
	for ( const alias of Object.keys( minimistConfig.alias ) ) {
		delete options[ alias ];
	}

	return options;
};
