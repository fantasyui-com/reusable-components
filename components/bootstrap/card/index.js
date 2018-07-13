
const c = require('../../../')({});

// NAMED CONTENT EXAMPLE
module.exports = function( attributes={}, content={header:[c('div.card-title', 'Hello!')], body:[], footer:[]} ){

  const response =
   c('div.card.card-primary', Object.assign({}, attributes),
    c('div.card-header', content.header),
    c('div.card-block', content.body ),
    c('div.card-footer', content.footer),
  );

  return response;
}
