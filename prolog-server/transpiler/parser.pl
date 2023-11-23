%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% PARSER %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
:-[tokenizer].

ofs_program( prog(StatementList) ) --> statements(StatementList).


statements([S | RS]) --> statement(S), statements(RS).
statements([]) --> [].

statement(const(I, RS)) --> const, ident(I), right_side(RS).
statement(null) --> semicolon.

right_side(E) --> assignment, expr(E).
right_side(undefined) --> [].

expr(I) --> ident(I).
expr(N) --> number(N).