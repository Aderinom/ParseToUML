import Viz from 'viz.js';
import { Module, render } from 'viz.js/full.render.js';

export class GraphGenerator {
    static async test(str: string) {
        const viz = new Viz({ Module, render });
        return await viz.renderString(str);
    }
}

export class UMLGenerator {
    async generate(from: ClassDefinition[]) {
        let result = 'digraph UML_Class_diagram {';
        for (const iterator of from) {
            result += this.generateClass(iterator);
        }
        result += '}';
        console.log(result);
        return GraphGenerator.test(result);
    }

    processSpecifiers(classDefinition: ClassDefinition) {
        const translate = {
            default: '-',
            private: '-',
            protected: '#',
            public: '+',
        };

        let members = '';
        let methods = '';
        let currentAccess: string;
        classDefinition.specification.forEach((ele) => {
            if (ele.type == 'access_specifier') {
                currentAccess = translate[ele.value];
            } else if (ele.type == 'member') {
                members += `<tr><td align="left">${currentAccess}${ele.member_type} ${ele.member_name}</td></tr>\n`;
            } else if (ele.type == 'method') {
                methods += `<tr><td align="left">${currentAccess}${ele.return_type} ${ele.method_name}(${ele.parameters
                    .flatMap((ele) => {
                        `${ele.type} ${ele.name}`;
                    })
                    .join(',')})</td></tr> \n`;
            }
        });

        let result = '';
        if (members != '') {
            result += `<tr><td><table align="left" border="0" cellborder="0" cellspacing="0"> ${members} </table></td></tr>`;
        }
        if (methods != '') {
            result += `<tr><td><table align="left" border="0" cellborder="0" cellspacing="0"> ${methods} </table></td></tr>`;
        }

        return result;
    }

    generateClass(classDefinition: ClassDefinition) {
        return `
        ${classDefinition.header.name} [
            shape=plain
            label=<
                <table border="0" cellborder="1" cellspacing="0" cellpadding="4">
                    <tr><td><b>${classDefinition.header.name}</b></td></tr>
                    ${this.processSpecifiers(classDefinition)}
            </table>>
        ]`;
    }
}
