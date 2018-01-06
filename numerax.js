var numeraX;!function(e){var r;!function(e){function r(r){switch(r.type){case"Literal":return e.generators.compileLiteralNode(r);case"Identifier":return e.generators.compileIdentifierNode(r);case"BinaryExpression":return e.generators.compileBinaryExpressionNode(r);case"UnaryExpression":return e.generators.compileUnaryExpressionNode(r);case"CallExpression":return e.generators.compileCallExpressionNode(r)}}e.generate=r}(r=e.compiler||(e.compiler={}))}(numeraX||(numeraX={}));var numeraX;!function(e){var r;!function(e){var r;!function(r){function n(r){var n=e.generate(r.left),a=e.generate(r.right);switch(r.operator){case"/":return"\\frac{"+n+"}{"+a+"}";case"*":return n+"\\times"+a;case"^":return"{"+n+"}^{"+a+"}";case"==":return"{"+n+"}={"+a+"}";case"->":return"{"+n+"}\\rightarrow{"+a+"}";case"=>":return"{"+n+"}\\Rightarrow{"+a+"}";case"<-":return"{"+n+"}\\leftarrow{"+a+"}";case"<=":return"{"+n+"}\\Leftarrow{"+a+"}";case"in":return"{"+n+"}\\in{"+a+"}";default:return""+n+r.operator+a}}r.compileBinaryExpressionNode=n}(r=e.generators||(e.generators={}))}(r=e.compiler||(e.compiler={}))}(numeraX||(numeraX={}));var numeraX;!function(e){var r;!function(e){var r;!function(r){function n(e){switch(e.callee.name){case"sum":return t(3,e,o.sum);case"sqrt":return t(1,e,o.sqrt);case"limit":case"lim":return t(2,e,o.limit);case"integral":case"int":return t(3,e,o.integral);default:return a(e)}}function a(r){return"{"+r.callee.name+"}("+r.arguments.map(function(r){return e.generate(r)}).join(", ")+"\n            )"}function t(e,r,n){return r.arguments.length===e?n(r.arguments):a(r)}function i(r,n){return"\\"+r+"_{"+e.generate(n[0])+"}^{"+e.generate(n[1])+"}{"+e.generate(n[2])+"}"}r.compileCallExpressionNode=n;var o;!function(r){function n(e){return i("sum",e)}function a(e){return i("int",e)}function t(r){return"\\sqrt{"+e.generate(r[0])+"}"}function o(r){return"\\lim_{"+e.generate(r[0])+"}{"+e.generate(r[1])+"}"}r.sum=n,r.integral=a,r.sqrt=t,r.limit=o}(o||(o={}))}(r=e.generators||(e.generators={}))}(r=e.compiler||(e.compiler={}))}(numeraX||(numeraX={}));var numeraX;!function(e){var r;!function(e){var r;!function(e){function r(e){return void 0===n[e.name]?"\\text{"+e.name+"}":n[e.name]}e.compileIdentifierNode=r;var n={pi:"\\pi",Pi:"\\Pi",alpha:"\\alpha",beta:"\\beta"}}(r=e.generators||(e.generators={}))}(r=e.compiler||(e.compiler={}))}(numeraX||(numeraX={}));var numeraX;!function(e){var r;!function(e){var r;!function(e){function r(e){return/^\d+(?:\.\d+)?$/.test(e.raw)?e.value:"\\text{"+e.value+"}"}e.compileLiteralNode=r}(r=e.generators||(e.generators={}))}(r=e.compiler||(e.compiler={}))}(numeraX||(numeraX={}));var numeraX;!function(e){var r;!function(e){var r;!function(r){function n(r){return r.prefix?r.operator+"{"+e.generate(r.argument)+"}":void 0}r.compileUnaryExpressionNode=n}(r=e.generators||(e.generators={}))}(r=e.compiler||(e.compiler={}))}(numeraX||(numeraX={}));var numeraX;!function(e){var r;!function(e){function r(){jsep.addBinaryOp("^",10),jsep.addBinaryOp("->",10),jsep.addBinaryOp("<-",10),jsep.addBinaryOp("=>",10),jsep.addBinaryOp("<=",10),jsep.addBinaryOp("in",10)}e.setupJSEP=r}(r=e.parser||(e.parser={}))}(numeraX||(numeraX={}));var numeraX;!function(e){function r(r){e.parser.setupJSEP();try{var n=r.replace(/=(?!=)|\n/g,function(e){return"="===e?"==":"\n"===e?" ":void 0}),a=jsep(n);return e.compiler.generate(a)}catch(t){return""}}e.compile=r}(numeraX||(numeraX={}));