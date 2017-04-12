/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import { getThemeFilterTerm } from './';

export default function getThemeShowcaseDescription( state, { tier, vertical } = {} ) {
	const description = get( getThemeFilterTerm( state, 'subject', vertical ), 'description' );
	if ( description ) {
		return description;
	}

	if ( tier === 'free' ) {
		return 'Discover Free WordPress Themes on the WordPress.com Theme Showcase.';
	} else if ( tier === 'premium' ) {
		return 'Discover Premium WordPress Themes on the WordPress.com Theme Showcase.';
	}

	return 'Beautiful, responsive, free and premium WordPress themes ' +
    'for your photography site, portfolio, magazine, business website, or blog.';
}
