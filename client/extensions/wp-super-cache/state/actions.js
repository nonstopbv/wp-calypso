/**
 * Internal dependencies
 */
import wp from 'lib/wp';
import {
	WP_SUPER_CACHE_RECEIVE_SETTINGS,
	WP_SUPER_CACHE_REQUEST_SETTINGS,
	WP_SUPER_CACHE_REQUEST_SETTINGS_FAILURE,
	WP_SUPER_CACHE_REQUEST_SETTINGS_SUCCESS,
} from './action-types';

/**
 * Returns an action object to be used in signalling that settings have been received.
 *
 * @param  {Number} siteId Site ID
 * @param  {Object} settings The site settings object
 * @return {Object}        Action object
 */
export const receiveSettings = ( siteId, settings ) => ( { type: WP_SUPER_CACHE_RECEIVE_SETTINGS, siteId, settings } );

/*
 * Retrieve all options from the /options endpoint offered
 * by a third party plugin
 *
 * @param {int} [siteId]
 * @param {Function} fn
 * @api public
 */
export const requestSettings = ( siteId ) => {
	return ( dispatch ) => {
		dispatch( {
			type: WP_SUPER_CACHE_REQUEST_SETTINGS,
			siteId,
		} );

		return wp.req.get( { path: `/jetpack-blogs/${ siteId }/rest-api/` }, { path: '/wp-super-cache/v1/settings' } )
			.then( ( { data } ) => {
				dispatch( receiveSettings( siteId, data ) );
				dispatch( {
					type: WP_SUPER_CACHE_REQUEST_SETTINGS_SUCCESS,
					siteId,
				} );
			} )
			.catch( error => {
				dispatch( {
					type: WP_SUPER_CACHE_REQUEST_SETTINGS_FAILURE,
					siteId,
					error,
				} );
			} );
	};
};

export const requestStats = ( siteId ) => {
	return ( dispatch ) => {
		dispatch( {
			type: WP_SUPER_CACHE_REQUEST_SETTINGS,
			siteId,
		} );

		return wp.req.get( { path: `/jetpack-blogs/${ siteId }/rest-api/` }, { path: '/wp-super-cache/v1/stats' } )
			.then( ( { data } ) => {
				dispatch( receiveSettings( siteId, data ) );
				dispatch( {
					type: WP_SUPER_CACHE_REQUEST_SETTINGS_SUCCESS,
					siteId,
				} );
			} )
			.catch( error => {
				dispatch( {
					type: WP_SUPER_CACHE_REQUEST_SETTINGS_FAILURE,
					siteId,
					error,
				} );
			} );
	};
};
