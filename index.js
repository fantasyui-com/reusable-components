var kebabCase = require('lodash/kebabcase');
var flatten = require('lodash/flatten');
var compact = require('lodash/compact');

module.exports = function(options){
  const isAttributes = function(o){
    if(typeof o === 'object'){
      if(o.nodeType) {
        return false;
      }else{
        return true;
      }
    }
  }
  const isElements = function(o){
    if(o.nodeType || typeof o === 'string') {
      return true;
    }else{
      return false;
    }
  }
  const isText = function(o){
    if(typeof o === 'string') {
      return true;
    }else{
      return false;
    }
  }

  const c = function(nodeName='div', ...data){

    data = flatten(data);
    data = compact(data);
    //console.log(data)

    const attributes = new Map();
    const classes = new Set();
    const elements = [];

    //
    // REGEXP SECTION
    //

    // Extract String Based Attributes (shorthands)
    function idReplacer(match, capture, offset, string) {
      attributes.set('id', capture)
      return '';
    }
    var nodeName = nodeName.replace(/\#([a-z0-9_-]+)/i, idReplacer);
    function classReplacer(match, capture, offset, string) {
      classes.add(capture)
      return '';
    }
    var nodeName = nodeName.replace(/\.([a-z0-9_-]+)/ig, classReplacer);

    //
    // ATTRIBUTES
    //

    //Note in some cases attribute value is yet another object (styles)

    // Extract Object Based Attributes
    data.filter(o=>isAttributes(o)).forEach(function(objectAttributes){
      Object.keys(objectAttributes).forEach(function(attribute){

        // if value is an object then this is attributes.style = ...
        if(typeof objectAttributes[attribute] === 'object'){
          // it is an attribute with an object based value style = {color: 'red'}
          const attributeName = attribute;
          let attributeValue = ''; // prepare the string to be built
          // Build the string....
          Object.keys(objectAttributes[attribute]).forEach(function(subAttribute){
            const key = subAttribute;
            const val = objectAttributes[attribute][subAttribute];
            attributeValue = attributeValue + `${kebabCase(key)}: ${val}; `
          })
          // clean it
          attributeValue = attributeValue.trim();
          // store it for latr use
          attributes.set(attributeName, attributeValue)

        }else if(attribute === 'class'){

          // Attribute is a class, we use a Set here as multiple sources of class are present, set will dedupe
          const attributeName = attribute;
          const attributeValue = objectAttributes[attribute];
          // store it for latr use
          attributeValue.split(" ").forEach(function(className){
            classes.add(className)
          });

        } else {

          // not a value object (styles)
          // not a class (dedupe)
          // just a plain text property
          const attributeName = attribute;
          const attributeValue = objectAttributes[attribute];
          // store it for latr use
          attributes.set(attributeName, attributeValue)

        }
      })
    })

    // Extract Child Nodes
    data.filter(o=>isElements(o)).forEach(function(e){
      if(isText(e)){
        elements.push(document.createTextNode(e))
      }else{
        elements.push(e)
      }
    })

    //
    // DATA PREPARATIONS COMPLETE, apply readied data to element.
    //

    // Finally, create the new element.
    const element = document.createElement(nodeName);

    // attributes, all values here are strings prepped up above
    for (var [attributeName, attributeValue] of attributes) {
      element.setAttribute(attributeName, attributeValue);
    }

    // Take care of class="" ensure no dupes, etc...
    // note this behaves as if element already had some classes, future proof...
    (element.getAttribute('class')||'').split(" ").filter(i=>i.trim()).forEach(function(c){classes.add(c)})
    element.setAttribute('class', Array.from(classes).join(" "))

    // add children, these already ran...
    elements.forEach(function(e){
      element.appendChild(e)
    })

    return element;
  };

  return c;
}
