javascript:(function()%7Bvar quickDiff %3D %7Bstylesheet%3A %7Bstyle%3A '.quickdiff-message %7B position%3A fixed%3B border-radius%3A 3px%3B padding%3A 0.3em 0.7em%3B background%3A green%3B color%3A white%3B top%3A 1em%3B left%3A 50%25%3B transform%3A translateX(-50%25)%3B z-index%3A 32000%3B %7D .quickdiff-selected %7B outline%3A 1px solid green !important%3B %7D %5Bdata-quick-diff-commit%5D%3Ahover %7B outline%3A 1px dotted green !important%3B cursor%3A pointer%3B %7D'%2Cel%3A null%7D%2CselectedCommits%3A %5B%5D%2Ccommits%3A %5B%5D%2Clistener%3A function( e ) %7Be.preventDefault()%3Bthis.classList.add( 'quickdiff-selected' )%3BquickDiff.selectCommit( this.dataset%5B'quickDiffCommit'%5D )%3B%7D%2Cinit%3A function () %7Bthis.commits %3D Array.from( document.querySelectorAll( '.commit' ) )%3Bthis.commits %3D this.commits.filter( function ( commit ) %7Bif ( ! commit.dataset.url ) %7Breturn false%3B%7Dconst commitId %3D commit.dataset.url.match( %2Fcommit%5C%2F(%5B0-9a-f%5D%7B40%7D)%2Fi )%3Bif ( 2 !%3D%3D commitId.length ) %7Breturn false%3B%7Dcommit.dataset%5B'quickDiffCommit'%5D %3D commitId%5B1%5D%3Breturn true%3B%7D )%3Bif ( 0 %3D%3D%3D this.commits.length ) %7Breturn%3B%7Dthis.initStylesheet()%3Bthis.initListeners()%3Bthis.displayMessage()%3B%7D%2CdisplayMessage%3A function() %7Bvar message %3D document.createElement( 'div' )%3Bmessage.innerHTML %3D 'QuickDiff%3A Select 2 commits'%3Bmessage.classList.add( 'quickdiff-message' )%3Bdocument.body.insertBefore( message%2C document.body.childNodes%5B0%5D )%3B%7D%2CinitStylesheet%3A function () %7Bthis.stylesheet.el %3D document.createElement( 'style' )%3Bthis.stylesheet.el.appendChild( document.createTextNode( this.stylesheet.style ) )%3Bdocument.head.appendChild( this.stylesheet.el )%3B%7D%2CinitListeners%3A function() %7Bfor ( var index in this.commits ) %7Bif ( this.commits.hasOwnProperty( index ) ) %7Bthis.commits%5B index %5D.addEventListener( 'click'%2C this.listener )%3B%7D%7Ddocument.addEventListener( 'keyup'%2C function( e ) %7Bif ( 27 %3D%3D%3D e.keyCode ) %7Bwindow.location.reload()%3B%7D%7D )%3B%7D%2CselectCommit%3A function( commitId ) %7Bthis.selectedCommits.push( commitId )%3Bif ( 2 %3D%3D%3D this.selectedCommits.length ) %7Bvar currentUrl %3D window.location.href%3Bvar parsedPath %3D currentUrl.match( %2Fgithub%5C.com%5C%2F(%5B%5E%5C%2F%5D%2B)%5C%2F(%5B%5E%5C%2F%5D%2B)%2Fi )%3Bif ( parsedPath %26%26 3 %3D%3D%3D parsedPath.length ) %7Bwindow.location.href %3D 'https%3A%2F%2Fgithub.com%2F' %2B parsedPath%5B1%5D %2B '%2F' %2B parsedPath%5B2%5D %2B '%2Fcompare%2F' %2B this.selectedCommits%5B0%5D %2B '%5E1...' %2B this.selectedCommits%5B1%5D%3B%7D else %7Bconsole.error( '%5BGithub Quick Diff%5D Unable to parse the current Github URL' )%3B%7Dfor ( var index in this.commits ) %7Bif ( this.commits.hasOwnProperty( index ) ) %7Bthis.commits%5B index %5D.removeEventListener( 'click'%2C this.listener )%3B%7D%7Ddocument.head.removeChild( this.stylesheet.el )%3B%7D%7D%7D%3BquickDiff.init()%7D)()
