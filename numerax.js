var numeraX;
(function (numeraX) {
    var compiler;
    (function (compiler) {
        function generate(node) {
            switch (node.type) {
                case 'Literal':
                    return compiler.generators.compileLiteralNode(node);
                case 'Identifier':
                    return compiler.generators.compileIdentifierNode(node);
                case 'BinaryExpression':
                    return compiler.generators.compileBinaryExpressionNode(node);
                case 'UnaryExpression':
                    return compiler.generators.compileUnaryExpressionNode(node);
                case 'CallExpression':
                    return compiler.generators.compileCallExpressionNode(node);
                case 'ArrayExpression':
                    return compiler.generators.compileArrayExpressionNode(node);
            }
            return '';
        }
        compiler.generate = generate;
    })(compiler = numeraX.compiler || (numeraX.compiler = {}));
})(numeraX || (numeraX = {}));
var numeraX;
(function (numeraX) {
    var compiler;
    (function (compiler) {
        var generators;
        (function (generators) {
            function compileArrayExpressionNode(node) {
                return "\\left\\{" + node.elements.map(function (x) { return compiler.generate(x); }).join(', ') + "\\right\\}";
            }
            generators.compileArrayExpressionNode = compileArrayExpressionNode;
        })(generators = compiler.generators || (compiler.generators = {}));
    })(compiler = numeraX.compiler || (numeraX.compiler = {}));
})(numeraX || (numeraX = {}));
var numeraX;
(function (numeraX) {
    var compiler;
    (function (compiler) {
        var generators;
        (function (generators) {
            function compileBinaryExpressionNode(node) {
                var left = compiler.generate(node.left);
                var right = compiler.generate(node.right);
                switch (node.operator) {
                    case '/':
                        return "\\frac{" + left + "}{" + right + "}";
                    case '*':
                        return left + "\\times" + right;
                    case '^':
                        return "{" + left + "}^{" + right + "}";
                    case '==':
                        return "{" + left + "}={" + right + "}";
                    case '->':
                        return "{" + left + "}\\rightarrow{" + right + "}";
                    case '=>':
                        return "{" + left + "}\\Rightarrow{" + right + "}";
                    case '<-':
                        return "{" + left + "}\\leftarrow{" + right + "}";
                    case '<=':
                        return "{" + left + "}\\Leftarrow{" + right + "}";
                    case 'in':
                        return "{" + left + "}\\in{" + right + "}";
                    default:
                        return "" + left + node.operator + right;
                }
            }
            generators.compileBinaryExpressionNode = compileBinaryExpressionNode;
        })(generators = compiler.generators || (compiler.generators = {}));
    })(compiler = numeraX.compiler || (numeraX.compiler = {}));
})(numeraX || (numeraX = {}));
var numeraX;
(function (numeraX) {
    var compiler;
    (function (compiler) {
        var generators;
        (function (generators) {
            function compileCallExpressionNode(node) {
                switch (node.callee.name) {
                    case 'sum':
                        return safeGen(3, node, stdlib.sum);
                    case 'sqrt':
                        return safeGen(1, node, stdlib.sqrt);
                    case 'limit':
                    case 'lim':
                        return safeGen(2, node, stdlib.limit);
                    case 'integral':
                    case 'int':
                        return stdlib.integral(node);
                    case 'abs':
                        return safeGen(1, node, stdlib.abs);
                    default:
                        return generateUnknownFunction(node);
                }
            }
            generators.compileCallExpressionNode = compileCallExpressionNode;
            function generateUnknownFunction(node) {
                return "{" + node.callee.name + "}(" + node.arguments.map(function (n) { return compiler.generate(n); }).join(', ') + "\n            )";
            }
            function safeGen(argc, node, func) {
                if (node.arguments.length === argc)
                    return func(node.arguments);
                else
                    return generateUnknownFunction(node);
            }
            function generate3PartFunctions(name, args) {
                return "\\" + name + "_{" + compiler.generate(args[0]) + "}^{" + compiler.generate(args[1]) + "}{" + compiler.generate(args[2]) + "}";
            }
            var stdlib;
            (function (stdlib) {
                function sum(args) {
                    return generate3PartFunctions('sum', args);
                }
                stdlib.sum = sum;
                function integral(node) {
                    if (node.arguments.length > 3)
                        return generateUnknownFunction(node);
                    if (node.arguments.length === 2) {
                        if (node.arguments[1].type !== 'Identifier')
                            return generateUnknownFunction(node);
                        return "\\int " + compiler.generate(node.arguments[0]) + "\\ " + compiler.generate(node.arguments[1]);
                    }
                    if (node.arguments[1].type !== 'Identifier' ||
                        node.arguments[2].elements.length !== 2)
                        return generateUnknownFunction(node);
                    return "\\int_{" + compiler.generate(node.arguments[2].elements[0]) + "}^{" + compiler.generate(node.arguments[2].elements[1]) + "}" + compiler.generate(node.arguments[0]) + "\\ " + compiler.generate(node.arguments[1]);
                }
                stdlib.integral = integral;
                function sqrt(args) {
                    return "\\sqrt{" + compiler.generate(args[0]) + "}";
                }
                stdlib.sqrt = sqrt;
                function limit(args) {
                    return "\\lim_{" + compiler.generate(args[0]) + "}{" + compiler.generate(args[1]) + "}";
                }
                stdlib.limit = limit;
                function abs(args) {
                    return "\\left|" + compiler.generate(args[0]) + "\\right|";
                }
                stdlib.abs = abs;
            })(stdlib || (stdlib = {}));
        })(generators = compiler.generators || (compiler.generators = {}));
    })(compiler = numeraX.compiler || (numeraX.compiler = {}));
})(numeraX || (numeraX = {}));
var numeraX;
(function (numeraX) {
    var compiler;
    (function (compiler) {
        var generators;
        (function (generators) {
            function compileIdentifierNode(node) {
                if (symbols[node.name] === undefined)
                    return "\\text{" + node.name + "}";
                else
                    return symbols[node.name];
            }
            generators.compileIdentifierNode = compileIdentifierNode;
            var symbols = {
                pi: '\\pi',
                Pi: '\\Pi',
                alpha: '\\alpha',
                beta: '\\beta',
            };
        })(generators = compiler.generators || (compiler.generators = {}));
    })(compiler = numeraX.compiler || (numeraX.compiler = {}));
})(numeraX || (numeraX = {}));
var numeraX;
(function (numeraX) {
    var compiler;
    (function (compiler) {
        var generators;
        (function (generators) {
            function compileLiteralNode(node) {
                if (/^\d+(?:\.\d+)?$/.test(node.raw))
                    return node.value;
                else
                    return "\\text{" + node.value + "}";
            }
            generators.compileLiteralNode = compileLiteralNode;
        })(generators = compiler.generators || (compiler.generators = {}));
    })(compiler = numeraX.compiler || (numeraX.compiler = {}));
})(numeraX || (numeraX = {}));
var numeraX;
(function (numeraX) {
    var compiler;
    (function (compiler) {
        var generators;
        (function (generators) {
            function compileUnaryExpressionNode(node) {
                if (node.prefix)
                    return node.operator + "{" + compiler.generate(node.argument) + "}";
                else
                    return compiler.generate(node.argument);
            }
            generators.compileUnaryExpressionNode = compileUnaryExpressionNode;
        })(generators = compiler.generators || (compiler.generators = {}));
    })(compiler = numeraX.compiler || (numeraX.compiler = {}));
})(numeraX || (numeraX = {}));
var numeraX;
(function (numeraX) {
    var parser;
    (function (parser) {
        function setupJSEP() {
            jsep.addBinaryOp("^", 10);
            jsep.addBinaryOp("->", 10);
            jsep.addBinaryOp("<-", 10);
            jsep.addBinaryOp("=>", 10);
            jsep.addBinaryOp("<=", 10);
            jsep.addBinaryOp("in", 10);
            jsep.removeBinaryOp('|');
        }
        parser.setupJSEP = setupJSEP;
    })(parser = numeraX.parser || (numeraX.parser = {}));
})(numeraX || (numeraX = {}));
var numeraX;
(function (numeraX) {
    function compile(code) {
        numeraX.parser.setupJSEP();
        try {
            var normalizedCode = code.replace(/=(?!=)|\n/g, function (match) {
                if (match === '=')
                    return '==';
                if (match === '\n')
                    return ' ';
                return '';
            });
            normalizedCode = normalizedCode.replace(/--+/g, '/');
            var ast = jsep(normalizedCode);
            return numeraX.compiler.generate(ast);
        }
        catch (error) {
            return '';
        }
    }
    numeraX.compile = compile;
})(numeraX || (numeraX = {}));
