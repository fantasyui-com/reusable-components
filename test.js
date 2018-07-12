const c = require('.')({});
const assert = require('assert');

require('undom/register');

function serialize(el) {
	if (el.nodeType===3) return el.textContent;
	var name = String(el.nodeName).toLowerCase(),
		str = '<'+name,
		c, i;
	for (i=0; i<el.attributes.length; i++) {
		str += ' '+el.attributes[i].name+'="'+el.attributes[i].value+'"';
	}
	str += '>';
	for (i=0; i<el.childNodes.length; i++) {
		c = serialize(el.childNodes[i]);
		if (c) str += '\n  '+c.replace(/\n/g,'\n  ');
	}
	return str + (c?'\n':'') + '</'+name+'>';
}

function enc(s) {
	return s.replace(/[&'"<>]/g, function(a){ return `&#${a};` });
}

// document.body.appendChild(
//   c( 'p.bbb', {id:'foo', class:"ggg aaa", style:{float: 'left', width: '200px', backgroundColor: 'red'}},
//     'XXX',
//     c('x#moo.foo.ggg')
//   )
// )


document.body.appendChild(
  c('div#page',
    c('div#header',
      c('h1.classy', 'h')),
    c('div#menu', { style: { float: 'left', width: '200px' } },
      c('ul',
        c('li', 'one'),
        c('li', 'two'),
        c('li', 'three'))),
    c('div#content', {style: {float: 'left'} },
      c('h2', 'content title'),
      c('p',
        "so it's just like a templating engine,\n",
        "but easy to use inline with javascript\n"),
      c('p',
        "the intension is for this to be used to create\n",
        "reusable, interactive html widgets. ")))
)

console.log( serialize(document) )
