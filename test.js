const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}

const configuration = { emitter: new MyEmitter() };
const binder = require('./components/data/binder').bind(configuration); // bind this to setup object
const c = component = require('.')(configuration); // initialize with setup object

const BootstrapCard = require('./components/bootstrap/card');
const StandardApplication = require('./components/bootstrap/card');

  document.body.appendChild(

    StandardApplication(
      Connection('/applications/todo/control'),
      Style({ float: 'left', width: '200px' }),
      Classes("red zone"),
      Region('menu', Connection('/applications/todo/menu')),
      Region('sidebar', BootstrapSidebar()),
      Region('status', BootstrapStatus()),
      Region('main', [
        Branch('h1.classy', 'Hello!'),
        Branch('h1.classy', 'Bueno!'),
      ]),

    })

  )

//
// document.body.appendChild(
//
//   c('div#container',
//
// 		c('div#header',
//       c('h1.classy', 'h')
// 		),
//
//     c('div#menu', { style: { float: 'left', width: '200px' } },
//
// 		// BEGIN COMPONENT USAGE EXAMPLE (named content areas)
// 			cBootstrapCard( { class:"bork", style: { float: 'left', width: '200px' }}, {
// 				header: c('div.card-title', 'Mios Dios!'),
// 				body: c('ul',
// 					c('li', 'one'),
// 	        c('li', 'two'),
// 	        c('li', 'three'),
// 					['four','five','six'].map(i=>c('li',i)),
// 				),
// 				footer: c('div.card-text', 'Status: Nominal!')
// 			}),
// 			// END COMPONENT USAGE EXAMPLE
//
//
//       // BEGIN BOUND COMPONENT USAGE EXAMPLE (named content areas)
//       binder( '/hello/abc', (envelope)=>cBootstrapCard(
//           { class:"bork", style: { float: 'left', width: '200px' }}, {
//   				header: c('div.card-title', envelope.data.value),
//   				body: c('ul',
//   					c('li', 'one'),
//   	        c('li', 'two'),
//   	        c('li', 'three'),
//   					envelope.data.values.map(i=>c('li',i)),
//   				),
//   				footer: c('div.card-text', 'Status: Nominal!')
//   			})),
//   			// END BOUND COMPONENT USAGE EXAMPLE
//
//       // c('ul#data11.code-red',
//       //   b( '/hello/abc', (element, envelope) => element.text(envelope.data.value).attribute('data', foo).onClick() ),
// 			// ),
//       c('ul#data11.code-red',
//         binder( '/hello/abc', (envelope)=>c('div.card.card-primary',
//             envelope.data.value,
//             c('input', {type:'text'}),
//             'hello',
//           )
//         ),
// 			),
//
//
//       c('ul#data11.code-red',
//         c('li', 'one'),
//         c('li', 'two'),
//         c('li', 'three')
// 			),
//
//       c('ul',
//         c('li', 'one'),
//         c('li', 'two'),
//         c('li', 'three')
// 			)
// 		 ),
//
//     c('div#content', {style: {float: 'left'} },
//       c('h2', 'content title'),
//       c('p',
//         "so it's just like a templating engine,\n",
//         "but easy to use inline with javascript\n"),
//       c('p',
//         "the intension is for this to be used to create\n",
//         "reusable, interactive html widgets. ")))
// )
//
//




//
// let counter = 1;
// const fun = function(){
//   counter++
// 	configuration.emitter.emit('/hello/abc', [
// 		{meta:{ identity:'idc219000b8e8f4ea7a125ae1023cc821d', version:'3453,5756a44f3b0141d3aa5627f506181c2f',    token:'b5115bc0961247eaa6eb1dba54b204ed', deleted:false}, data:{value:'a'+counter, values:['four','five','six','x'+counter]}},
// 		{meta:{ identity:'id8849201d21cb44dda43f012d89a2a101', version:'3458535,efc6d0f6f9d243539efc6c8cf63120c2', token:'699a268232dc4f139cbc3c34906dcd79', deleted:true}, data:{value:'b'+counter, values:['four','five','six','x'+counter]}},
// 		{meta:{ identity:'ide4c6dc676f744fdbbd8560f0768cdb5e', version:'6458736,ef8442e28a0a473bb90a586b70557513', token:'c7df13597f4a4479befeb211fb857beb', deleted:false}, data:{value:'c'+counter, values:['four','five','six','x'+counter]}},
// 	])
//
// };
// $('#go').on('click', fun)
// setInterval(fun,100);
