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
class Parser_ {
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

export class Parser {
    constructor() {
        this.lexer = Lexer.create();
    }

    private lexer: moo.Lexer;

    public async parse(text: string): Promise<string> {
        this.lexer.reset(text);
        const results: string[] = [];
        let res: moo.Token | undefined;

        while ((res = this.lexer.next())) {
            results.push(res.toString());
        }

        return results.join('\n');
    }
}
