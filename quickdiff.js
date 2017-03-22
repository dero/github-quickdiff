var quickDiff = {
	stylesheet: {
		style: '.quickdiff-message { position: fixed; border-radius: 3px; padding: 0.3em 0.7em; background: green; color: white; top: 1em; left: 50%; transform: translateX(-50%); z-index: 32000; } .quickdiff-selected { outline: 1px solid green !important; } [data-quick-diff-commit]:hover { outline: 1px dotted green !important; cursor: pointer; }',
		el: null
	},
	selectedCommits: [],
	commits: [],

	listener: function( e ) {
		e.preventDefault();

		this.classList.add( 'quickdiff-selected' );
		quickDiff.selectCommit( this.dataset['quickDiffCommit'] );
	},

	init: function () {
		this.commits = Array.from( document.querySelectorAll( '.commit' ) );

		this.commits = this.commits.filter( function ( commit ) {
			if ( ! commit.dataset.url ) {
				return false;
			}
			const commitId = commit.dataset.url.match( /commit\/([0-9a-f]{40})/i );

			if ( 2 !== commitId.length ) {
				return false;
			}
			commit.dataset['quickDiffCommit'] = commitId[1];

			return true;
		} );

		if ( 0 === this.commits.length ) {
			return;
		}

		this.initStylesheet();
		this.initListeners();
		this.displayMessage();
	},

	displayMessage: function() {
		var message = document.createElement( 'div' );

		message.innerHTML = 'QuickDiff: Select 2 commits';
		message.classList.add( 'quickdiff-message' );

		document.body.insertBefore( message, document.body.childNodes[0] );
	},

	initStylesheet: function () {
		this.stylesheet.el = document.createElement( 'style' );
		this.stylesheet.el.appendChild( document.createTextNode( this.stylesheet.style ) );

		document.head.appendChild( this.stylesheet.el );
	},

	initListeners: function() {
		for ( var index in this.commits ) {
			if ( this.commits.hasOwnProperty( index ) ) {
				this.commits[ index ].addEventListener( 'click', this.listener );
			}
		}

		document.addEventListener( 'keyup', function( e ) {
			if ( 27 === e.keyCode ) {
				window.location.reload();
			}
		} );
	},

	selectCommit: function( commitId ) {
		this.selectedCommits.push( commitId );

		if ( 2 === this.selectedCommits.length ) {
			var currentUrl = window.location.href;
			var parsedPath = currentUrl.match( /github\.com\/([^\/]+)\/([^\/]+)/i );

			if ( parsedPath && 3 === parsedPath.length ) {
				window.location.href = 'https://github.com/' + parsedPath[1] + '/' + parsedPath[2] + '/compare/' + this.selectedCommits[0] + '^1...' + this.selectedCommits[1];
			} else {
				console.error( '[Github Quick Diff] Unable to parse the current Github URL' );
			}

			for ( var index in this.commits ) {
				if ( this.commits.hasOwnProperty( index ) ) {
					this.commits[ index ].removeEventListener( 'click', this.listener );
				}
			}
			document.head.removeChild( this.stylesheet.el );
		}
	}
};
quickDiff.init();
