// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

	const moo = require("moo")
	const lexer = moo.compile({
	  ws:    { match: /[ \t\n\v\f]+/, lineBreaks: true },
	  ownership_modifier: ['*','&'],
	  count_modifier: /\[\d*\]/,
	  class_specifier: ['class'],
	  access_specifier: ['private','protected','public'],
	  extend_keyword:['extends',':'],
	  literal: /[a-zA-Z0-9_\-:]*[a-zA-Z0-9_\-]/,
	  lbrack: "(",
	  rbrack: ")",
	  lparent: "{",
	  rparent: "}",
	  semi: ";",
	  colon: ":",
	  com: ",",
	});


var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "MAIN$ebnf$1", "symbols": []},
    {"name": "MAIN$ebnf$1", "symbols": ["MAIN$ebnf$1", "class"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "MAIN", "symbols": ["MAIN$ebnf$1", "_"], "postprocess": function([cls,]) {return cls}},
    {"name": "class", "symbols": ["_", "class_header", "_", "lparen", "_", "class_specification", "rparen"], "postprocess": function([,header,,,,specification,]) {return {type:"class", header: header, specification: specification};}},
    {"name": "class_header", "symbols": [(lexer.has("class_specifier") ? {type: "class_specifier"} : class_specifier), "__", (lexer.has("literal") ? {type: "literal"} : literal), "class_extention_specializer"], "postprocess": function([,,name,extentions]) {return {type:"class_header", name: name.value, extends: extentions};}},
    {"name": "class_extention_specializer", "symbols": ["_", (lexer.has("extend_keyword") ? {type: "extend_keyword"} : extend_keyword), "class_extention_definition"], "postprocess": function([ws,kw,definitions]) {return [...definitions]}},
    {"name": "class_extention_specializer", "symbols": [], "postprocess": function() {return []}},
    {"name": "class_extention_definition", "symbols": ["__", "access_specifier", "__", (lexer.has("literal") ? {type: "literal"} : literal)], "postprocess": function([ws0, access_spec, ws1,name,ws2]) {return [{access: access_spec, name:name.value}]}},
    {"name": "class_extention_definition", "symbols": ["__", (lexer.has("literal") ? {type: "literal"} : literal)], "postprocess": function([ws0,name,ws1]) {return [{access: "default", name:name.value}]}},
    {"name": "class_extention_definition$ebnf$1", "symbols": []},
    {"name": "class_extention_definition$ebnf$1", "symbols": ["class_extention_definition$ebnf$1", (lexer.has("com") ? {type: "com"} : com)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "class_extention_definition", "symbols": ["__", "access_specifier", "__", (lexer.has("literal") ? {type: "literal"} : literal), "_", "class_extention_definition$ebnf$1", "_", "class_extention_definition"], "postprocess": function([ws0,access_spec,ws1,name,ws2,com,ws3,recurse]) {return [{access: access_spec, name:name.value}, ...recurse]}},
    {"name": "class_extention_definition$ebnf$2", "symbols": []},
    {"name": "class_extention_definition$ebnf$2", "symbols": ["class_extention_definition$ebnf$2", (lexer.has("com") ? {type: "com"} : com)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "class_extention_definition", "symbols": ["__", (lexer.has("literal") ? {type: "literal"} : literal), "_", "class_extention_definition$ebnf$2", "_", "class_extention_definition"], "postprocess": function([ws0,name,ws1,com,ws2, recurse]) {return [{access: "default", name:name.value},...recurse]}},
    {"name": "class_specification", "symbols": ["inside_class_declaration", "_", "class_specification"], "postprocess": function([member, ws, recurse]) {return [member, ...recurse]}},
    {"name": "class_specification", "symbols": ["access_specifier", "_", (lexer.has("colon") ? {type: "colon"} : colon), "_", "class_specification"], "postprocess": function([access_spec, ws1, col, ws2, recurse]) {return [access_spec, ...recurse]}},
    {"name": "class_specification", "symbols": [], "postprocess": function() {return []}},
    {"name": "inside_class_declaration", "symbols": ["member_declaration"], "postprocess": function([member]){return member}},
    {"name": "inside_class_declaration", "symbols": ["method_declaration"], "postprocess": function([method]){return method}},
    {"name": "member_declaration", "symbols": [(lexer.has("literal") ? {type: "literal"} : literal), "ownership_modifier", (lexer.has("literal") ? {type: "literal"} : literal), "count_modifier", (lexer.has("semi") ? {type: "semi"} : semi)], "postprocess":  
        function([type, owner_modifier, name, count_modifier, s]){
        	return {type:"member", 
        			member_type:type.value, 
        			member_name:name.value, 
        			owner_modifier: owner_modifier, 
        			count_modifier: count_modifier 
           }
        }
        		},
    {"name": "method_declaration", "symbols": [(lexer.has("literal") ? {type: "literal"} : literal), "__", (lexer.has("literal") ? {type: "literal"} : literal), "_", (lexer.has("lbrack") ? {type: "lbrack"} : lbrack), "_", "function_parameters", (lexer.has("rbrack") ? {type: "rbrack"} : rbrack), "_", (lexer.has("semi") ? {type: "semi"} : semi)], "postprocess":  function([return_type,ws0, name, ws1, b, ws2, parameters ,b2,]){
        	return {type:"method", return_type:return_type.value, method_name:name.value, parameters: parameters }
        }},
    {"name": "function_parameters", "symbols": [(lexer.has("literal") ? {type: "literal"} : literal), "__", (lexer.has("literal") ? {type: "literal"} : literal), "_"], "postprocess": function([type,ws1,name,ws2]) {return [{type:type.value, name:name.value}]}},
    {"name": "function_parameters", "symbols": [(lexer.has("literal") ? {type: "literal"} : literal), "__", (lexer.has("literal") ? {type: "literal"} : literal), "_", "function_parameter_"], "postprocess": function([type,ws1,name,ws2, recurse]) {return [{type:type.value, name:name.value}, ...recurse]}},
    {"name": "function_parameters", "symbols": []},
    {"name": "function_parameter_", "symbols": [(lexer.has("com") ? {type: "com"} : com), "_", (lexer.has("literal") ? {type: "literal"} : literal), "__", (lexer.has("literal") ? {type: "literal"} : literal), "_"], "postprocess": function([c,w,type,w1,name,w2]) {return [{type:type.value, name:name.value}]}},
    {"name": "function_parameter_", "symbols": [(lexer.has("com") ? {type: "com"} : com), "_", (lexer.has("literal") ? {type: "literal"} : literal), "__", (lexer.has("literal") ? {type: "literal"} : literal), "_", "function_parameter_"], "postprocess": function([c,w,type,w1,name,w2,recurse]) {return [{type:type.value, name:name.value}, ...recurse]}},
    {"name": "ownership_modifier", "symbols": ["_", (lexer.has("ownership_modifier") ? {type: "ownership_modifier"} : ownership_modifier), "__"], "postprocess": function([w,owner,w1]) {return owner.value}},
    {"name": "ownership_modifier", "symbols": ["__", (lexer.has("ownership_modifier") ? {type: "ownership_modifier"} : ownership_modifier)], "postprocess": function([w,owner,w1]) {return owner.value}},
    {"name": "ownership_modifier", "symbols": ["_"], "postprocess": function([w]) {return undefined;}},
    {"name": "count_modifier", "symbols": ["_", (lexer.has("count_modifier") ? {type: "count_modifier"} : count_modifier), "_"], "postprocess": function([w,count,w1]) {return count.value.match(/\[(\d*)\]/)[1]}},
    {"name": "count_modifier", "symbols": ["_"], "postprocess": function([w]) {return undefined;}},
    {"name": "access_specifier", "symbols": [(lexer.has("access_specifier") ? {type: "access_specifier"} : access_specifier)], "postprocess": function([spec]) {return {type:"access_specifier", value:spec.value}}},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return {type:"ws"};}},
    {"name": "__", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": function(d) {return {type:"ws"};}},
    {"name": "lparen", "symbols": [(lexer.has("lparent") ? {type: "lparent"} : lparent)], "postprocess": function(d) {return {type:"lparent"};}},
    {"name": "rparen", "symbols": [(lexer.has("rparent") ? {type: "rparent"} : rparent)], "postprocess": function(d) {return {type:"rparent"};}}
]
  , ParserStart: "MAIN"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
