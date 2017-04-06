/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import {
	WP_SUPER_CACHE_RECEIVE_SETTINGS,
} from './action-types';

const items = ( state = {}, { type, siteId, settings } ) => {
	if ( WP_SUPER_CACHE_RECEIVE_SETTINGS === type ) {
		return { ...state, [ siteId ]: settings };
	}

	return state;
};

export default combineReducers( {
	items,
} );
