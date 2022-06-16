@{%
	// Moo lexer documention is here:
	// https://github.com/no-context/moo

	const moo = require("moo")
	const lexer = moo.compile({
	  ws:    { match: /[ \t\n\v\f]+/, lineBreaks: true },
	  ownership_modifier: ['*','&'],
	  count_modifier: /\[\d+\]/,
	  class_specifier: ['class'],
	  access_specifier: ['private','protected','public'],
	  extend_keyword:['extends'],
	  literal: /[a-zA-Z]+/,
	  lbrack: "(",
	  rbrack: ")",
	  lparent: "{",
	  rparent: "}",
	  semi: ";",
	  colon: ":",
	  com: ",",
	});
%}

# Pass your lexer with @lexer:
@lexer lexer

MAIN -> class



class_header -> %class_specifier __ %literal class_extention_specializer _  {% function(d) {return {type:"class_header", load:[d[0],d[2],d[3]]};} %}

class -> class_header _ lparen _ class_specification rparen
class_extention_specializer ->  __ %extend_keyword class_extention_definition 
								| null
class_extention_definition -> __ %access_specifier __ %literal _ 
							| __ %literal _ 
							| __ %access_specifier __ %literal _ class_extention_definition
							| __ %literal _ class_extention_definition
							

class_specification -> inside_class_declaration _ class_specification  
						| access_specifier _ %colon _ class_specification
						| null

inside_class_declaration -> member_declaration | method_declaration

member_declaration -> %literal ownership_modifier %literal count_modifier %semi 
						
method_declaration -> %literal __ %literal _ %lbrack _ function_variables %rbrack _  %semi 

function_variables -> %literal __ %literal _
					 | %literal __ %literal _ function_variable_
function_variable_ -> %com _ %literal __ %literal _
					|%com _ %literal __ %literal _ function_variable_


ownership_modifier -> _ %ownership_modifier _ | _
count_modifier -> _ %count_modifier _ | _

access_specifier -> %access_specifier

_  -> %ws {% function(d) {return {type:"ws"};} %}
	| null 	{% function(d) {return {type:"ws"};} %}
	
__ -> %ws			{% function(d) {return {type:"ws"};} %}

lparen -> %lparent {% function(d) {return {type:"lparent"};} %}
rparen -> %rparent {% function(d) {return {type:"rparent"};} %}
