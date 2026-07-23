const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Fi = require('react-icons/fi');

const svgStr = ReactDOMServer.renderToStaticMarkup(
  React.createElement(Fi.FiSearch, { size: 256, color: '#8B5CF6' })
);

console.log("SVG String:", svgStr);
const full = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">${svgStr.replace(/<svg[^>]*>/, '').replace('</svg>','')}</svg>`;
console.log("Full SVG Wrapper:", full);
