var kebabCase = require('lodash/kebabcase');

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

    const attributes = new Map();
    const classes = new Set();
    const elements = [];

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

    // Extract Object Based Attributes
    data.filter(o=>isAttributes(o)).forEach(function(objectAttributes){

      Object.keys(objectAttributes).forEach(function(attribute){

        // if value is an object then this is attributes.style = ...
        if(typeof objectAttributes[attribute] === 'object'){
          // it is an attribute object
          const attributeName = attribute;
          let attributeValue = '';
          Object.keys(objectAttributes[attribute]).forEach(function(subAttribute){
            const key = subAttribute;
            const val = objectAttributes[attribute][subAttribute];
            attributeValue = attributeValue + `${kebabCase(key)}: ${val}; `
          })
          attributeValue = attributeValue.trim();
          attributes.set(attributeName, attributeValue)

        // if value is a string
        }else if(attribute === 'class'){

          const attributeName = attribute;
          const attributeValue = objectAttributes[attribute];
          attributeValue.split(" ").forEach(function(className){
            classes.add(className)
          })

        } else {
          const attributeName = attribute;
          const attributeValue = objectAttributes[attribute];
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

    //DONE
    const element = document.createElement(nodeName);


    for (var [attributeName, attributeValue] of attributes) {
      element.setAttribute(attributeName, attributeValue);
    }

    classes.forEach(function(e){
      const list = (element.getAttribute('class')||'').split(" ").filter(i=>i.trim());
      list.push(e);
      element.setAttribute('class', list.join(" "))
    })

    elements.forEach(function(e){
      element.appendChild(e)
    })

    return element;
  };

  return c;
}
