%%%%%%%%%%%%%%%%%%%%%% GENERATOR %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


generator( JSFilename, StatementList) :- 
	open(JSFilename, write, Stream),
	generate_comment(Stream, 'Codigo generado por OFS TRANSPILER'),
	forall(member(Statement, StatementList), 
	generate_statement(Stream,Statement)),
	close(Stream)
.

generate_statement( Stream, const(id(I), id(R))) :- 
	format(Stream, 'const ~s = ~s;\n', [I,R])
.

generate_statement( Stream, const(id(I), num(N))) :- 
	format(Stream, 'const ~c = ~d;\n', [I,N])
.

generate_statement( Stream, const(id(I), undefined)) :- 
	format(Stream, 'const ~c = undefined;\n', [I])
.


generate_statement( Stream,S) :- 
	format(Stream, '//No se pudo generar ~n', [S])
.


generate_comment(Stream, Comment) :- 
	format(Stream, '// ~s ~n', [Comment])
.
