
const c = require('../../../')({});

module.exports = function(attributes={}, childList=[], headerList=[c('div.card-title', 'Hello!')], footerList=[]){

  const response =
   c('div.card.card-primary', Object.assign({}, attributes),
    c('div.card-header', headerList),
    c('div.card-block', childList ),
    c('div.card-footer', footerList),
  );

  return response;
}
