%%%%%%%%%%%%%%%%%%%%%% TOKENIZER = LEXER %%%%%%%%%%%%%%%%%%
space --> " " ; "\n"; "\r" ;"\t".

spaces --> space, spaces.
spaces --> [].

const --> spaces, "const", space, spaces.

ident(id(X)) --> spaces, [X], spaces, {member(X, [120,121])}.

number(num(1)) --> spaces, "1", spaces.

%semicolon --> [].
semicolon --> spaces, ";", spaces.


assignment --> spaces, "=", spaces.