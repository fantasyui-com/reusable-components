
const c = require('../../../')({});

module.exports = function(attributes, childList){

  return
  c('div.card.card-primary', Object.assign({}, attributes),
    c('div.card-header'),
    c('div.card-block',
      childList
    ),
    c('div.card-footer'),
  );

}
