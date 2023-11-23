/*
Service for OFS-JS transpiler
URI: /transpile
       
author: loriacarlos@gmail.com + some changes from group 04:03pm
since: 2022
*/
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_log)).

:- use_module(library(http/http_cors)).

:- use_module(library(http/html_write)).
:- use_module(library(readutil)).

:-['/transpiler/parser.pl'].
:-['/transpiler/utils.pl'].
:-['/transpiler/generator.pl'].

% URL handlers.
:- http_handler('/transpile', handle_request, [method(post)]).
:- http_handler('/', home, []).



handle_request(Request) :-
    http_read_json_dict(Request, Query),
    transpile(Query, Solution),
    reply_json_dict(Solution).

server(Port) :-
    http_server(http_dispatch, [port(Port)]).

set_setting(http:logfile, 'service_log_file.log').

%%%%%%%%%%%%%%%%%%%%%%%%%% BUSINESS LOGIC %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

leer_archivo(FilePath, Content) :-
    read_file_to_codes(FilePath, Codes, []),
    string_codes(Content, Codes)
.

transpile(_{text: X}, Contenido) :-
    string_codes(X, Codes),
    (   ofs_program(Ast, Codes, [])
    ->  eliminate_null(Ast, AstSinNull),
        atomic_list_concat(['retornar', js], '.', JSFilename),
        generator(JSFilename, AstSinNull),
        leer_archivo('retornar.js', Contenido)
    ;   % Caso de error
        Contenido = 'Error al transpilar.'
    ).


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

home(_Request) :-
        reply_html_page(title('Transpiler OFS-JS server'),
                        [ h1('To use it:'),
                          p([h4('Send a post messsage'),
                             h4('URI:/transpile'),
                             h4('body: JSON data of the form {"code":your_code}'),
                             h4('Service Responds with same code + comment:')
                            ])
                        ]).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% MAIN %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
:- initialization
    format('*** Starting Server ***~n', []),
    (current_prolog_flag(argv, [SPort | _]) -> true ; SPort='8000'),
    atom_number(SPort, Port),
    format('*** Serving on port ~d *** ~n', [Port]),
    set_setting_default(http:cors, [*]), % Allows cors for every
    server(Port).
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%