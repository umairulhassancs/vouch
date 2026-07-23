const React = require('react');
const ReactDOMServer = require('react-dom/server');
const sharp = require('sharp');
const Fi = require('react-icons/fi');
const fs = require('fs');

const svgStr = ReactDOMServer.renderToStaticMarkup(
  React.createElement(Fi.FiSearch, { size: 256, color: '#8B5CF6' })
);

console.log("Original SVG:", svgStr);

sharp(Buffer.from(svgStr))
  .resize(256, 256)
  .png()
  .toFile("test_direct_svg.png")
  .then(() => {
    console.log("Successfully wrote test_direct_svg.png");
  })
  .catch(err => {
    console.error("Error rendering direct SVG:", err);
  });
