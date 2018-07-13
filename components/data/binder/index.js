const c = require('../../../')({});
const diffDOM = require("diff-dom");

// DATA COMPONENT EXAMPLE
module.exports = function( eventName, updateFunction ){
  const container = c('div.container-data');

  this.emitter.on(eventName, function(envelopes){

    const virtual = c('div.container-data');

    envelopes.forEach(function(envelope){
      const {identity, version, token, deleted } = envelope.meta;
      element = updateFunction(envelope);
      element.setAttribute('id',identity);
      virtual.appendChild(element);
    });

    const dd = new diffDOM({ valueDiffing: false });

    const diff = dd.diff(container, virtual);
    dd.apply(container, diff);

  }); // on

  return container;
}
