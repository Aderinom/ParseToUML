import nearley from 'nearley';
import grammar from './grammar.js';

export class Parser {
    public async parse(text: string) {
        const parser = new nearley.Parser(grammar);
        parser.feed(text);
        return parser.results[0];
    }
}
