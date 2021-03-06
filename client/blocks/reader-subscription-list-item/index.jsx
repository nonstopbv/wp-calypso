/**
 * External Dependencies
 */
import React from 'react';
import classnames from 'classnames';
import { trim, isEmpty, get } from 'lodash';
import { localize } from 'i18n-calypso';
import moment from 'moment';

/**
 * Internal Dependencies
 */
import ReaderAvatar from 'blocks/reader-avatar';
import FollowButton from 'reader/follow-button';
import { getStreamUrl } from 'reader/route';
import EmailSettings from './email-settings';

const stripUrl = url => url.replace( 'https://', '' ).replace( 'http://', '' ).replace( '/', '' );

function ReaderSubscriptionListItem( {
	url,
	feedId,
	feed,
	siteId,
	site,
	className = '',
	followSource,
	lastUpdated,
	translate,
} ) {
	const siteTitle = feed && feed.name;
	const siteAuthor = site && site.owner;
	const siteExcerpt = feed && feed.description;
	// prefer a users name property
	// if that doesn't exist settle for combining first and last name
	const authorName = siteAuthor && ( siteAuthor.name ||
		trim( `${ siteAuthor.first_name || '' } ${ siteAuthor.last_name || '' }` ) );
	const siteIcon = get( site, 'icon.img' );
	const feedIcon = get( feed, 'image' );
	const streamUrl = getStreamUrl( feedId, siteId );
	const siteUrl = url ||
		( feed && ( feed.feed_URL || feed.URL ) ) ||
		( site && site.URL );
	const isFollowing = ( feed && feed.is_following ) || ( site && site.is_following );

	return (
		<div className={ classnames( 'reader-subscription-list-item', className ) }>
			<div>
				<ReaderAvatar
					siteIcon={ siteIcon }
					feedIcon={ feedIcon }
					author={ siteAuthor }
					preferGravatar={ true }
					siteUrl={ streamUrl }
					isCompact={ true }
				/>
			</div>
			<div className="reader-subscription-list-item__byline">
				<span className="reader-subscription-list-item__site-title">{ <a href={ streamUrl }> { siteTitle } </a> }</span>
				{ ! isEmpty( authorName ) &&
					<span>
						<span className="reader-subscription-list-item__by-text">
							{ translate( 'by' ) }
						</span>
						<span><a href={ streamUrl }> { authorName } </a></span>
					</span>
				}
				<div>{ siteExcerpt }</div>
				<div className="reader-subscription-list-item__site-url">
					<a href={ siteUrl }> { siteUrl && stripUrl( siteUrl ) } </a>
					{ lastUpdated && moment( lastUpdated ).fromNow() }
				</div>
			</div>
			<div className="reader-subscription-list-item__options">
				<FollowButton siteUrl={ siteUrl } followSource={ followSource } />
				{ isFollowing && <EmailSettings /> }
			</div>
		</div>
	);
}

export default localize( ReaderSubscriptionListItem );
