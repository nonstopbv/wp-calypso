/**
 * External dependencies
 */
import React from 'react';
import { pick } from 'lodash';

/**
 * Internal dependencies
 */
import AcceptedFilenames from './accepted-filenames';
import Advanced from './advanced';
import CacheLocation from './cache-location';
import Caching from './caching';
import DirectlyCachedFiles from './directly-cached-files';
import ExpiryTime from './expiry-time';
import FixConfig from './fix-config';
import LockDown from './lock-down';
import Miscellaneous from './miscellaneous';
import RejectedUserAgents from './rejected-user-agents';
import WrapSettingsForm from './wrap-settings-form';

const AdvancedTab = ( {
	fields: {
		cache_enabled,
		super_cache_enabled,
	},
	siteUrl,
} ) => {
	return (
		<div>
			<Caching />
			<Miscellaneous />
			<Advanced />
			<CacheLocation />
			<ExpiryTime />
			<AcceptedFilenames />
			<RejectedUserAgents />
			<LockDown />
			{	!! cache_enabled && ( '1' === super_cache_enabled || '2' === super_cache_enabled ) &&
				<DirectlyCachedFiles siteUrl={ siteUrl } />
			}
			<FixConfig />
		</div>
	);
};

// If super cache is disabled then only legacy caching is done.
// But legacy caching is always on UNLESS, the "don't cache for known users" is enabled,
// and probably also the one about not caching urls with GET parameters.
const getFormSettings = settings => {
	return pick( settings, [
		'cache_enabled',
		'super_cache_enabled',
	] );
};

export default WrapSettingsForm( getFormSettings )( AdvancedTab );
