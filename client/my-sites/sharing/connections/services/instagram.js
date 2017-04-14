/**
 * External dependencies
 */
import { PropTypes } from 'react';
import { last } from 'lodash';

/**
 * Internal dependencies
 */
import { deleteStoredKeyringConnection } from 'state/sharing/keyring/actions';
import { SharingService, connectFor } from '../service';

export class Instagram extends SharingService {
	static propTypes = {
		...SharingService.propTypes,
		deleteStoredKeyringConnection: PropTypes.func,
	};

	static defaultProps = {
		...SharingService.defaultProps,
		deleteStoredKeyringConnection: () => {},
	};

	createOrUpdateConnection = () => { };

	/**
	 * Fetch connections
	 */
	fetchConnection = () => {
		this.props.requestKeyringConnections();
	};

	/**
	 * Checks whether any connection can be removed.
	 *
	 * @return {boolean} true if there's any removable; otherwise, false.
	 */
	canRemoveConnection = () => {
		return this.props.keyringConnections.length > 0;
	};

	/**
	 * Deletes the passed connections.
	 *
	 * @param {Array} connections Optional. Connections to be deleted.
	 *                            Default: All connections for this service.
	 */
	removeConnection = () => {
		this.setState( { isDisconnecting: true } );
		this.props.deleteStoredKeyringConnection( last( this.props.keyringConnections ) );
	};

	componentWillReceiveProps( { availableExternalAccounts } ) {
		if ( this.props.availableExternalAccounts.length !== availableExternalAccounts.length ) {
			this.setState( {
				isConnecting: false,
				isDisconnecting: false,
			} );
		}

		if ( this.state.isAwaitingConnections ) {
			this.setState( {
				isAwaitingConnections: false,
				isRefreshing: false,
			} );

			if ( this.didKeyringConnectionSucceed( availableExternalAccounts ) ) {
				this.setState( { isConnecting: false } );
				this.props.successNotice( this.props.translate( 'The %(service)s account was successfully connected.', {
					args: { service: this.props.service.label },
					context: 'Sharing: Publicize connection confirmation',
				} ), { id: 'publicize' } );
			}
		}
	}

	/**
	 * Get connections to render
	 *
	 * @return {array} connections.
	 */
	getConnections() {
		return this.props.keyringConnections.map( connection => {
			return { ...connection, keyring_connection_ID: connection.ID };
		} );
	}
}

export default connectFor(
	Instagram,
	null,
	{ deleteStoredKeyringConnection }
);
