'use strict';

function htmlStringToNode (htmlString) {
    let tempElement = document.createElement('div');
    tempElement.innerHTML = htmlString;

    return tempElement.firstElementChild;
}

function stringHtml (strings, ...values) {
    let result = [strings[0]];

    values.forEach((value, v) => {
        result.push(value, strings[v + 1]);
    });

    return result.join('');
}

function toHtml (...args) {
    let html = stringHtml(...args);
    let htmlNode = htmlStringToNode(html);

    return htmlNode;
}

function renderLinks (bookmarks) {
    return stringHtml`<div class="links">
        ${bookmarks.map(bookmark => `<a href="${bookmark.url}"><p>${bookmark.title}</p></a>`).join('')}
    </div>`;
}

chrome.bookmarks.getSubTree('1', tree => {

    let bookmarks = tree[0].children;
    let contentElement = document.getElementById('content');

    for (let bookmark of bookmarks) {

        // don't display bookmarks that begin with a "."
        if (bookmark.title[0] === '.') {
            continue;
        }

        // all top level bookmarks should be folders
        if (Array.isArray(bookmark.children) && bookmark.children.length) {
            contentElement.appendChild(toHtml`<div class="section">
                <div class="title">${bookmark.title}</div>
                ${renderLinks(bookmark.children)}
            </div>`);
        }

    }

});

