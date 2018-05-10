// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

var List                           = require("bs-platform/lib/js/list.js");
var Block                          = require("bs-platform/lib/js/block.js");
var Pervasives                     = require("bs-platform/lib/js/pervasives.js");
var LodashCamelcase                = require("lodash.camelcase");
var Layer$LonaCompilerCore         = require("../core/layer.bs.js");
var SwiftFormat$LonaCompilerCore   = require("./swiftFormat.bs.js");
var SwiftDocument$LonaCompilerCore = require("./swiftDocument.bs.js");

function toSwiftAST(options, colors, textStyles, rootLayer, logicRootNode) {
  var identifierName = function (node) {
    if (node.tag) {
      return /* SwiftIdentifier */Block.__(8, ["BadIdentifier"]);
    } else {
      var match = node[1];
      if (match) {
        var tail = match[1];
        var head = match[0];
        switch (head) {
          case "layers" : 
              if (tail) {
                var tail$1 = tail[1];
                var second = tail[0];
                if (second === rootLayer[/* name */1]) {
                  return /* SwiftIdentifier */Block.__(8, [List.fold_left((function (a, b) {
                                    return a + ("." + LodashCamelcase(b));
                                  }), List.hd(tail$1), List.tl(tail$1))]);
                } else {
                  return /* SwiftIdentifier */Block.__(8, [List.fold_left((function (a, b) {
                                    return a + ("." + LodashCamelcase(b));
                                  }), SwiftFormat$LonaCompilerCore.layerName(second), tail$1)]);
                }
              } else {
                return /* SwiftIdentifier */Block.__(8, ["BadIdentifier"]);
              }
              break;
          case "parameters" : 
              return /* SwiftIdentifier */Block.__(8, [List.hd(tail)]);
          default:
            return /* SwiftIdentifier */Block.__(8, [head]);
        }
      } else {
        return /* SwiftIdentifier */Block.__(8, ["BadIdentifier"]);
      }
    }
  };
  var logicValueToSwiftAST = function (x) {
    var initialValue;
    initialValue = x.tag ? SwiftDocument$LonaCompilerCore.lonaValue(options[/* framework */0], colors, textStyles, x[0]) : identifierName(x);
    var match = options[/* framework */0];
    if (typeof initialValue === "number") {
      return initialValue;
    } else if (initialValue.tag === 8) {
      var name = initialValue[0];
      if (name.includes("margin") || name.includes("padding")) {
        return /* LineComment */Block.__(21, ["TODO: Margin & padding"]);
      } else if (name.endsWith("height")) {
        return /* SwiftIdentifier */Block.__(8, [name.replace(".height", "HeightAnchorConstraint?.constant")]);
      } else if (name.endsWith("width")) {
        return /* SwiftIdentifier */Block.__(8, [name.replace(".width", "WidthAnchorConstraint?.constant")]);
      } else if (name.endsWith("onPress")) {
        return /* SwiftIdentifier */Block.__(8, [name.replace(".onPress", "OnPress")]);
      } else if (name.endsWith("hovered")) {
        return /* SwiftIdentifier */Block.__(8, [name.replace(".hovered", "Hovered")]);
      } else if (name.endsWith("pressed")) {
        return /* SwiftIdentifier */Block.__(8, [name.replace(".pressed", "Pressed")]);
      } else if (match !== 0) {
        var name$1 = initialValue[0];
        if (name$1.endsWith(".borderRadius") || name$1 === "borderRadius") {
          return /* SwiftIdentifier */Block.__(8, [name$1.replace("borderRadius", "cornerRadius")]);
        } else if (name$1.endsWith("backgroundColor")) {
          return /* SwiftIdentifier */Block.__(8, [name$1.replace("backgroundColor", "fillColor")]);
        } else if (name$1.endsWith("numberOfLines")) {
          return /* SwiftIdentifier */Block.__(8, [name$1.replace("numberOfLines", "maximumNumberOfLines")]);
        } else {
          return initialValue;
        }
      } else {
        var name$2 = initialValue[0];
        if (name$2.endsWith(".borderRadius") || name$2 === "borderRadius") {
          return /* SwiftIdentifier */Block.__(8, [name$2.replace("borderRadius", "layer.cornerRadius")]);
        } else if (name$2.endsWith(".borderWidth")) {
          return /* SwiftIdentifier */Block.__(8, [name$2.replace(".borderWidth", ".layer.borderWidth")]);
        } else {
          return initialValue;
        }
      }
    } else {
      return initialValue;
    }
  };
  var fromCmp = function (x) {
    switch (x) {
      case 0 : 
          return "==";
      case 1 : 
          return "!=";
      case 2 : 
          return ">";
      case 3 : 
          return ">=";
      case 4 : 
          return "<";
      case 5 : 
          return "<=";
      case 6 : 
          return "???";
      
    }
  };
  var unwrapBlock = function (node) {
    if (typeof node === "number") {
      return /* :: */[
              node,
              /* [] */0
            ];
    } else if (node.tag === 6) {
      return node[0];
    } else {
      return /* :: */[
              node,
              /* [] */0
            ];
    }
  };
  var inner = function (logicRootNode) {
    if (typeof logicRootNode === "number") {
      return /* Empty */0;
    } else {
      switch (logicRootNode.tag | 0) {
        case 0 : 
            var left = logicValueToSwiftAST(logicRootNode[0]);
            var right = logicValueToSwiftAST(logicRootNode[2]);
            var operator = fromCmp(logicRootNode[1]);
            var body = List.map(inner, unwrapBlock(logicRootNode[3]));
            var exit = 0;
            var exit$1 = 0;
            if (typeof left === "number") {
              exit$1 = 2;
            } else if (left.tag) {
              exit$1 = 2;
            } else {
              var match = left[0];
              if (typeof match === "number") {
                exit$1 = 2;
              } else if (match.tag) {
                exit$1 = 2;
              } else if (match[0] !== 0) {
                if (operator === "==") {
                  var condition = right;
                  return /* IfStatement */Block.__(15, [{
                              condition: condition,
                              block: body
                            }]);
                } else {
                  exit$1 = 2;
                }
              } else {
                exit$1 = 2;
              }
            }
            if (exit$1 === 2) {
              if (operator === "==") {
                if (typeof right === "number") {
                  exit = 1;
                } else if (right.tag) {
                  exit = 1;
                } else {
                  var match$1 = right[0];
                  if (typeof match$1 === "number") {
                    exit = 1;
                  } else if (match$1.tag) {
                    exit = 1;
                  } else if (match$1[0] !== 0) {
                    var condition$1 = left;
                    return /* IfStatement */Block.__(15, [{
                                condition: condition$1,
                                block: body
                              }]);
                  } else {
                    exit = 1;
                  }
                }
              } else {
                exit = 1;
              }
            }
            if (exit === 1) {
              return /* IfStatement */Block.__(15, [{
                          condition: /* BinaryExpression */Block.__(2, [{
                                left: left,
                                operator: operator,
                                right: right
                              }]),
                          block: body
                        }]);
            }
            break;
        case 1 : 
            return /* StatementListHelper */Block.__(25, [/* :: */[
                        /* LineComment */Block.__(21, ["TODO: IfExists"]),
                        /* :: */[
                          /* IfStatement */Block.__(15, [{
                                condition: /* LiteralExpression */Block.__(0, [/* Boolean */Block.__(0, [/* true */1])]),
                                block: List.map(inner, unwrapBlock(logicRootNode[1]))
                              }]),
                          /* [] */0
                        ]
                      ]]);
        case 2 : 
            var b = logicRootNode[1];
            var match$2 = logicValueToSwiftAST(b);
            var match$3 = logicValueToSwiftAST(logicRootNode[0]);
            var exit$2 = 0;
            var exit$3 = 0;
            var exit$4 = 0;
            if (typeof match$2 === "number") {
              exit$4 = 3;
            } else if (match$2.tag === 8) {
              var name = match$2[0];
              var exit$5 = 0;
              if (typeof match$3 === "number") {
                exit$5 = 4;
              } else if (match$3.tag === 1) {
                if (name.endsWith(".borderColor") && options[/* framework */0] === /* UIKit */0) {
                  return /* BinaryExpression */Block.__(2, [{
                              left: /* SwiftIdentifier */Block.__(8, [name.replace(".borderColor", ".layer.borderColor")]),
                              operator: "=",
                              right: /* MemberExpression */Block.__(1, [Pervasives.$at(match$3[0], /* :: */[
                                        /* SwiftIdentifier */Block.__(8, ["cgColor"]),
                                        /* [] */0
                                      ])])
                            }]);
                } else {
                  exit$5 = 4;
                }
              } else {
                exit$5 = 4;
              }
              if (exit$5 === 4) {
                if (name.endsWith("visible")) {
                  return /* BinaryExpression */Block.__(2, [{
                              left: /* SwiftIdentifier */Block.__(8, [name.replace("visible", "isHidden")]),
                              operator: "=",
                              right: /* PrefixExpression */Block.__(3, [{
                                    operator: "!",
                                    expression: match$3
                                  }])
                            }]);
                } else {
                  exit$4 = 3;
                }
              }
              
            } else {
              exit$4 = 3;
            }
            if (exit$4 === 3) {
              if (typeof match$3 === "number") {
                exit$3 = 2;
              } else if (match$3.tag === 8) {
                var name$1 = match$3[0];
                if (name$1.endsWith("visible")) {
                  return /* BinaryExpression */Block.__(2, [{
                              left: /* PrefixExpression */Block.__(3, [{
                                    operator: "!",
                                    expression: match$2
                                  }]),
                              operator: "=",
                              right: /* SwiftIdentifier */Block.__(8, [name$1.replace("visible", "isHidden")])
                            }]);
                } else {
                  exit$3 = 2;
                }
              } else {
                exit$3 = 2;
              }
            }
            if (exit$3 === 2) {
              if (typeof match$2 === "number") {
                exit$2 = 1;
              } else if (match$2.tag === 8) {
                var name$2 = match$2[0];
                if (name$2.endsWith("textStyle") || name$2.endsWith("font")) {
                  var name$3 = name$2.replace(".font", ".textStyle");
                  var right$1;
                  if (b.tag) {
                    right$1 = match$3;
                  } else {
                    var path = b[1];
                    if (List.hd(path) === "layers" && List.length(path) > 2) {
                      var layerName = List.nth(path, 1);
                      var layer = Layer$LonaCompilerCore.findByName(layerName, rootLayer);
                      if (layer) {
                        var layer$1 = layer[0];
                        var param = Layer$LonaCompilerCore.getStringParameterOpt("textAlign", layer$1);
                        right$1 = param ? /* MemberExpression */Block.__(1, [/* :: */[
                                match$3,
                                /* :: */[
                                  /* FunctionCallExpression */Block.__(19, [{
                                        name: /* SwiftIdentifier */Block.__(8, ["with"]),
                                        arguments: /* :: */[
                                          /* FunctionCallArgument */Block.__(18, [{
                                                name: /* Some */[/* SwiftIdentifier */Block.__(8, ["alignment"])],
                                                value: /* SwiftIdentifier */Block.__(8, ["." + Layer$LonaCompilerCore.getStringParameter("textAlign", layer$1)])
                                              }]),
                                          /* [] */0
                                        ]
                                      }]),
                                  /* [] */0
                                ]
                              ]]) : match$3;
                      } else {
                        right$1 = match$3;
                      }
                    } else {
                      right$1 = match$3;
                    }
                  }
                  return /* StatementListHelper */Block.__(25, [/* :: */[
                              /* BinaryExpression */Block.__(2, [{
                                    left: /* SwiftIdentifier */Block.__(8, [name$3.replace(".textStyle", "TextStyle")]),
                                    operator: "=",
                                    right: right$1
                                  }]),
                              /* [] */0
                            ]]);
                } else if (name$2.endsWith("text")) {
                  return /* BinaryExpression */Block.__(2, [{
                              left: /* SwiftIdentifier */Block.__(8, [name$2.replace(".text", "." + SwiftDocument$LonaCompilerCore.labelAttributedTextName(options[/* framework */0]))]),
                              operator: "=",
                              right: /* MemberExpression */Block.__(1, [/* :: */[
                                    /* SwiftIdentifier */Block.__(8, [name$2.replace(".text", "TextStyle")]),
                                    /* :: */[
                                      /* FunctionCallExpression */Block.__(19, [{
                                            name: /* SwiftIdentifier */Block.__(8, ["apply"]),
                                            arguments: /* :: */[
                                              /* FunctionCallArgument */Block.__(18, [{
                                                    name: /* Some */[/* SwiftIdentifier */Block.__(8, ["to"])],
                                                    value: match$3
                                                  }]),
                                              /* [] */0
                                            ]
                                          }]),
                                      /* [] */0
                                    ]
                                  ]])
                            }]);
                } else {
                  exit$2 = 1;
                }
              } else {
                exit$2 = 1;
              }
            }
            if (exit$2 === 1) {
              return /* BinaryExpression */Block.__(2, [{
                          left: match$2,
                          operator: "=",
                          right: match$3
                        }]);
            }
            break;
        case 3 : 
            return /* BinaryExpression */Block.__(2, [{
                        left: logicValueToSwiftAST(logicRootNode[2]),
                        operator: "=",
                        right: /* BinaryExpression */Block.__(2, [{
                              left: logicValueToSwiftAST(logicRootNode[0]),
                              operator: "+",
                              right: logicValueToSwiftAST(logicRootNode[1])
                            }])
                      }]);
        case 4 : 
            var value = logicRootNode[0];
            if (value.tag) {
              return /* Empty */0;
            } else {
              return /* VariableDeclaration */Block.__(10, [{
                          modifiers: /* [] */0,
                          pattern: /* IdentifierPattern */Block.__(0, [{
                                identifier: logicValueToSwiftAST(value),
                                annotation: /* Some */[SwiftDocument$LonaCompilerCore.typeAnnotationDoc(value[0])]
                              }]),
                          init: /* None */0,
                          block: /* None */0
                        }]);
            }
            break;
        case 5 : 
            var left$1 = logicRootNode[0];
            var value_001 = logicRootNode[1];
            var value$1 = /* Assign */Block.__(2, [
                left$1,
                value_001
              ]);
            var variableName = /* Let */Block.__(4, [left$1]);
            var match$4 = inner(variableName);
            var match$5 = inner(value$1);
            if (left$1.tag) {
              return /* Empty */0;
            } else if (typeof match$4 === "number") {
              return /* Empty */0;
            } else if (match$4.tag === 10) {
              if (typeof match$5 === "number") {
                return /* Empty */0;
              } else if (match$5.tag === 2) {
                var a = match$4[0];
                return /* VariableDeclaration */Block.__(10, [{
                            modifiers: a.modifiers,
                            pattern: /* IdentifierPattern */Block.__(0, [{
                                  identifier: logicValueToSwiftAST(left$1),
                                  annotation: /* None */0
                                }]),
                            init: /* Some */[match$5[0].left],
                            block: a.block
                          }]);
              } else {
                return /* Empty */0;
              }
            } else {
              return /* Empty */0;
            }
            break;
        case 6 : 
            return /* StatementListHelper */Block.__(25, [List.map(inner, logicRootNode[0])]);
        
      }
    }
  };
  return List.map(inner, unwrapBlock(logicRootNode));
}

var Ast = 0;

var Format = 0;

var Document = 0;

exports.Ast        = Ast;
exports.Format     = Format;
exports.Document   = Document;
exports.toSwiftAST = toSwiftAST;
/* lodash.camelcase Not a pure module */
