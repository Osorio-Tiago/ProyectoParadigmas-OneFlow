%%%%%%%%%%%%%%%%%%%%% UTILS %%%%%%%%%%%%%%%%%%%

eliminate_null(prog(LS), LSsinNull) :-
	eliminateNullFromList(LS, LSsinNull)
.
	
eliminateNullFromList([], []).
eliminateNullFromList([null | RS], RSsinNull) :- !,
	eliminateNullFromList(RS, RSsinNull)
.

eliminateNullFromList([S | RS],[S | RSsinNull ]) :- 
	eliminateNullFromList(RS, RSsinNull)
.