declare type NumberRange<Start extends number, End extends number> = Exclude<Enumerate<End>, Enumerate<Start>>
