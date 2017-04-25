chrome.bookmarks.getSubTree('1', tree => {

    let folders = tree[0].children;
    let contentElement = document.getElementById('content');

    for (let folder of folders) {

        // don't display folders that begin with a "."
        if (folder.title.length && folder.title[0] === '.') {
            continue;
        }

        // all top level folders should be folders w/ items
        if (Array.isArray(folder.children) && folder.children.length) {

            let bookmarks = folder.children;
            let sectionElement = contentElement.appendChild(document.createElement('div'));
            sectionElement.className = 'section';

            let sectionTitleElement = sectionElement.appendChild(document.createElement('div'));
            sectionTitleElement.className = 'title';
            sectionTitleElement.textContent = folder.title;

            let sectionLinksElement = sectionElement.appendChild(document.createElement('div'));
            sectionLinksElement.className = 'links';

            for (let bookmark of bookmarks) {
                let bookmarkLinkElement = sectionLinksElement.appendChild(document.createElement('a'));
                bookmarkLinkElement.href = bookmark.url;
                let bookmarkElement = bookmarkLinkElement.appendChild(document.createElement('p'));
                bookmarkElement.textContent = bookmark.title;
            }

        } else {
            console.log('found folder that either wasn\'t folder or was empty folders');
        }

    }

});
