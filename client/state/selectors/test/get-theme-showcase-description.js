/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import { getThemeShowcaseDescription } from '../';
import { state } from './fixtures/theme-filters';

describe( 'getThemeShowcaseDescription()', () => {
	it( 'should return the vertical description for a known vertical', () => {
		const description = getThemeShowcaseDescription( state, { vertical: 'blog' } );
		expect( description ).to.equal( 'Whether you\'re authoring a personal blog, professional blog, or a business blog — ...' );
	} );

	it( 'should fall back to the tier description for an unknown vertical', () => {
		const description = getThemeShowcaseDescription( state, { vertical: 'blahg', tier: 'free' } );
		expect( description ).to.equal( 'Discover Free WordPress Themes on the WordPress.com Theme Showcase.' );
	} );

	it( 'should return the generic Theme Showcase description if no additional args are provided', () => {
		const description = getThemeShowcaseDescription( state );
		expect( description ).to.equal( 'Beautiful, responsive, free and premium WordPress themes ' +
			'for your photography site, portfolio, magazine, business website, or blog.' );
	} );
} );
