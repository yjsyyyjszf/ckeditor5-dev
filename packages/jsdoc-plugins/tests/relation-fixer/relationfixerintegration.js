/**
 * @license Copyright (c) 2016-2017, CKSource - Frederico Knabben. All rights reserved.
 * Licensed under the terms of the MIT License (see LICENSE.md).
 */

'use strict';

const chai = require( 'chai' );
const expect = chai.expect;
const buildRelations = require( '../../lib/relation-fixer/buildrelations' );
const addMissingDoclets = require( '../../lib/relation-fixer/addmissingdoclets' );

describe( 'JSDoc relation-fixer plugin', () => {
	let testDoclets;

	beforeEach( () => {
		testDoclets = [
			{
				name: 'interfaceB',
				longname: 'interfaceB',
				kind: 'interface'
			},
			{
				name: 'interfaceBProp',
				longname: 'interfaceB.prop',
				kind: 'member',
				scope: 'static',
				memberof: 'interfaceB',
				description: 'Interface B prop description'
			},
			{
				name: 'mixinA',
				longname: 'mixinA',
				kind: 'mixin',
				implements: [
					'interfaceB'
				]
			},
			{
				name: 'classA',
				longname: 'classA',
				kind: 'class',
				mixes: [ 'mixinA' ]
			},
			{
				name: 'interfaceBProp',
				longname: 'classA.prop',
				kind: 'member',
				scope: 'static',
				memberof: 'classA',
				inheritdoc: ''
			},
			{
				name: 'eventD',
				longname: 'classA.eventD',
				kind: 'event',
				memberof: 'classA'
			},
			{
				name: 'classB',
				longname: 'classB',
				kind: 'class',
				augments: [
					'classA'
				],
				augmentsNested: [
					'classA'
				]
			},
			{
				name: 'interfaceBProp',
				longname: 'classB.prop',
				kind: 'member',
				scope: 'static',
				memberof: 'classB',
				inheritdoc: ''
			}
		];
	} );

	it( 'should add missing doclet through relation chain', () => {
		const newDoclets = addMissingDoclets( buildRelations( testDoclets ) );
		const expectedDoclet = {
			name: 'interfaceBProp',
			longname: 'classB.prop',
			kind: 'member',
			scope: 'static',
			memberof: 'classB',
			description: 'Interface B prop description',
			inherited: true
		};

		expect( newDoclets ).to.deep.include( expectedDoclet );
	} );

	it( 'should add missing doclet to other links of relation chain', () => {
		const newDoclets = addMissingDoclets( buildRelations( testDoclets ) );
		const expectedDoclet = {
			name: 'interfaceBProp',
			longname: 'classA.prop',
			kind: 'member',
			scope: 'static',
			memberof: 'classA',
			description: 'Interface B prop description'
		};

		expect( newDoclets ).to.deep.include( expectedDoclet );
	} );

	it( 'should add missing events', () => {
		const newDoclets = addMissingDoclets( buildRelations( testDoclets ) );
		const expectedDoclet = {
			name: 'eventD',
			longname: 'classB.eventD',
			kind: 'event',
			memberof: 'classB',
			inherited: true
		};

		expect( newDoclets ).to.deep.include( expectedDoclet );
	} );
} );