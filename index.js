
const system = function(options){

  return system;
};

const wrap = function({system, options}){
  return system(options);
};

module.exports = function(options){
  return wrap({system, options});
}
