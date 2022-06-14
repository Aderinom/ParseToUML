import moo from 'moo';
import { MemoExoticComponent } from 'react';

class Lexer {
    static create() {
        return moo.compile({
            WS: /[ \t]+/,
            comment: /\/\/.*?$/,
            number: /0|[1-9][0-9]*/,
            string: /"(?:\\["\\]|[^\n"\\])*"/,
            lparen: '(',
            rparen: ')',
            keyword: ['while', 'if', 'else', 'moo', 'cows'],
            NL: { match: /\n/, lineBreaks: true },
        });
    }
}

class parser {
    constructor() {
        this.lexer = Lexer.create();
    }

    private lexer: moo.Lexer;

    public parse(text: string): void {
        this.lexer.reset(text);
    }
}
