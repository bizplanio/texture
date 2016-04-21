'use strict';

var forEach = require('lodash/forEach');

module.exports = {

  type: 'caption',
  tagName: 'caption',
  allowedContext: [
    'boxed-text', 'chem-struct-wrap', 'disp-formula-group', 'fig', 'fig-group', 'graphic',
    'media', 'supplementary-material', 'table-wrap', 'table-wrap-group'
  ],

  /*
    Attributes
    content-type Type of Content
    id Document Internal Identifier
    specific-use Specific Use
    style Style (NISO JATS table model; MathML Tag Set)
    xml:base Base
    xml:lang Language

    Content
    (
      (title?, (p)*)
    )
  */

  import: function(el, node, converter) {
    var childEls = el.getChildNodes();

    node.xmlAttributes = el.getAttributes();

    forEach(childEls, function(childEl) {
      var tagName = childEl.tagName;

      switch (tagName) {
        case 'title':
          node.title = converter.annotatedText(childEl, [node.id, 'title']);
          break;
        case 'p':
          node.contentNodes.push(converter.convertElement(childEl));
          break;
        default:
          console.warn('Unhandled content in <caption>. Appending to node.contentNodes.');
          node.contentNodes.push(converter.convertElement(childEl));
      }
    });

    console.log('converted caption', node);
  },

  export: function(node, el, converter) {
    // jshint unused:false
  }

};
