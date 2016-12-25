'use strict';

const htmlEscape = text => {

    // TODO: implement or use library
    return text;
};
const htmlToNode = html => {
    let e = document.createElement('div');
    e.innerHTML = html;
    return e.firstElementChild;
};
const shtml = (strings, ...values) => {
    let result = [strings[0]];

    values.forEach((value, i) => {
        let escaped = htmlEscape(value || '');
        result.push(escaped, strings[i + 1]);
    });

    let html = result.join('');

    return html;
};
const html = (...args) => {
    let html = shtml(...args);
    let node = htmlToNode(html);

    return node;
};

const render = {};

render.links = nodes => {
    return shtml`<ul class="links">
        ${nodes.map(n => n.url ? `
            <a href="${n.url}"><li class="link">${n.title || n.url}</li></a>
        ` : `
            <li class="folder">
                <div class="folder-title">${n.title}</div>
                ${render.links(n.children)}
            </li>
        `).join('')}
    </ul>`;
};

chrome.bookmarks.getSubTree('1', tree => {

    let nodes = tree[0].children;
    let content = document.getElementById('content');

    for (let node of nodes) {
        content.appendChild(html`
            <section>
                <div class="title">${node.children && node.title}</div>
                ${render.links(node.children || [node])}
            </section>
        `);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', event => {
        let target = event.target;

        while (target) {
            if (target && target.classList && target.classList.contains('folder')) {
                target.classList.toggle('open');
                break;
            } else {
                target = target.parentNode;
            }
        }
    });
});