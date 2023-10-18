import nearley from "nearley";
import { grammar } from "../../gen/grammar.cjs";

export class Parser {
  public async parse(text: string): Promise<ClassDefinition[]> {
    const parser = new nearley.Parser(grammar);
    parser.feed(text);
    return parser.results[0];
  }
}
