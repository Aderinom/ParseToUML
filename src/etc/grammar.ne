@{%
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

# class header { members }
class -> 
	class_header _ lparen _ class_specification rparen 
		{% function([header,,,,specification,]) {return {type:"class", header: header, specification: specification};} %}
			
# "class" _ "name" _ (extends? private? name?)
class_header -> 
	%class_specifier __ %literal class_extention_specializer
		{% function([,,name,extentions]) {return {type:"class_header", name: name.value, extends: extentions};} %}

# makes the class extension optional
class_extention_specializer ->  
	# extends (private a ...)
	__ %extend_keyword class_extention_definition  
		{% function([ws,kw,definitions]) {return [...definitions]} %}
	# not extending
	| null 
		{% function() {return []} %}

class_extention_definition -> 
	# private <name> $end
	__ access_specifier __ %literal
		{% function([ws0, access_spec, ws1,name,ws2]) {return [{access: access_spec, name:name.value}]} %}
		
	# <name> $end
	| __ %literal
		{% function([ws0,name,ws1]) {return [{access: "default", name:name.value}]} %} 
		
	# private <name> $recurse
	| __ access_specifier __ %literal _ class_extention_definition 
		{% function([ws0,access_spec,ws1,name, ws, recurse]) {return [{access: access_spec, name:name.value}, ...recurse]} %}

	# private <name> $recurse
	| __ %literal _ class_extention_definition
		{% function([ws0,name,ws1, recurse]) {return [{access: "default", name:name.value},...recurse]} %}
							

class_specification -> 
	# Either a member or method, then recurse
	inside_class_declaration _ class_specification  
		{% function([member, ws, recurse]) {return [member, ...recurse]} %}
	
	# AccessSpec: then recurse
	| access_specifier _ %colon _ class_specification
		{% function([access_spec, ws1, col, ws2, recurse]) {return [access_spec, ...recurse]} %}
	
	# Nothing left to read
	| null
		{% function() {return []} %}
		
		
inside_class_declaration -> 
	member_declaration   
		{% function([member]){return member} %}
	| method_declaration 
		{% function([method]){return method} %}
 
member_declaration -> 
	%literal ownership_modifier %literal count_modifier %semi 
		{% 
			function([type, owner_modifier, name, count_modifier, s]){
				return {type:"member", 
						member_type:type.value, 
						member_name:name.value, 
						owner_modifier: owner_modifier, 
						count_modifier: count_modifier 
			   }
			}
		%}
		
method_declaration -> 
	%literal __ %literal _ %lbrack _ function_parameters %rbrack _  %semi 
		{% function([return_type,ws0, name, ws1, b, ws2, parameters ,b2,]){
			return {type:"method", return_type:return_type.value, method_name:name.value, parameters: parameters }
		}%}
		
# First function parameter, doesn't require a comma
function_parameters ->
	# type
	%literal __ %literal _ 
		{% function([type,ws1,name,ws2]) {return [{type:type.value, name:name.value}]} %}
	# private <name> $end
	| %literal __ %literal _ function_parameter_ 
		{% function([type,ws1,name,ws2, recurse]) {return [{type:type.value, name:name.value}, ...recurse]} %}
	| null
	
# Following function parameters, require a comma
function_parameter_ -> %com _ %literal __ %literal _
		{% function([c,w,type,w1,name,w2]) {return [{type:type.value, name:name.value}]} %}
	| %com _ %literal __ %literal _ function_parameter_
		{% function([c,w,type,w1,name,w2,recurse]) {return [{type:type.value, name:name.value}, ...recurse]} %}


ownership_modifier -> 
	_ %ownership_modifier __
		{% function([w,owner,w1]) {return owner.value} %}
	| __ %ownership_modifier
		{% function([w,owner,w1]) {return owner.value} %}
	| _
		{% function([w]) {return undefined;} %}
	
count_modifier -> 
	_ %count_modifier _ 
		{% function([w,count,w1]) {return count.value;} %}
	| _
		{% function([w]) {return undefined;} %}

access_specifier -> 
	%access_specifier
		{% function([spec]) {return {type:"access_specifier", value:spec.value}} %}
	

_  -> %ws:* {% function(d) {return {type:"ws"};} %}
	
__ -> %ws   {% function(d) {return {type:"ws"};} %}

lparen -> %lparent {% function(d) {return {type:"lparent"};} %}
rparen -> %rparent {% function(d) {return {type:"rparent"};} %}
