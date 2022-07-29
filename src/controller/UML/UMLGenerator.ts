import { FullClassDefinition } from 'controller/Parser/LogicParser';
import Viz from 'viz.js';
import { Module, render } from 'viz.js/full.render.js';

export class GraphGenerator {
    static async test(str: string) {
        const viz = new Viz({ Module, render });
        return await viz.renderString(str);
    }
}

export class UMLGenerator {
    async generate(from: Record<string, FullClassDefinition>) {
        let result = 'digraph UML_Class_diagram {';

        for (const key in from) {
            if (!Object.prototype.hasOwnProperty.call(from, key)) continue;
            const element = from[key];
            result += this.generateClass(element);
        }

        for (const key in from) {
            if (!Object.prototype.hasOwnProperty.call(from, key)) continue;
            const element = from[key];
            result += this.generateLinks(from, element);
        }

        result += '}';
        console.log(result);
        return GraphGenerator.test(result);
    }

    private processSpecifiers(cls: FullClassDefinition) {
        const translate = {
            default: '-',
            private: '-',
            protected: '#',
            public: '+',
        };

        function esc(str: string) {
            return str.replaceAll('&', '&amp;');
        }

        let members = '';
        let methods = '';
        let currentAccess: string;

        cls.members.forEach((mem) => {
            const mbr = mem.member;
            let cm = '';
            if (mbr.count_modifier != undefined) {
                cm = mbr.count_modifier === '' ? '[]' : `[${mbr.count_modifier}]`;
            }

            currentAccess = translate[mem.access];
            members += `<tr><td align="left">${currentAccess} ${mbr.member_type} ${esc(mbr.owner_modifier ?? '')}${
                mbr.member_name
            }${cm}</td></tr>\n`;
        });

        cls.methods.forEach((mem) => {
            const mth = mem.method;
            currentAccess = translate[mem.access];
            methods += `<tr><td align="left">${currentAccess}${mth.return_type} ${mth.method_name}(${mth.parameters
                .flatMap((param) => {
                    `${param.type} ${param.name}`;
                })
                .join(',')})</td></tr> \n`;
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

    private generateClass(cls: FullClassDefinition) {
        return `
        "${cls.name}" [
            shape=plain
            label=<
                <table border="0" cellborder="1" cellspacing="0" cellpadding="4">
                    <tr><td><b>${cls.name}</b></td></tr>
                    ${this.processSpecifiers(cls)}
            </table>>
        ]`;
    }

    private generateLinks(classes: Record<string, FullClassDefinition>, cls: FullClassDefinition) {
        let ret = '';
        function generateInheritance(base: string, derived: string) {
            return `edge [dir=back arrowtail=odiamond style=""]
            "${base}" -> "${derived}" `;
        }
        function generateOwnership(owner: string, owned: string) {
            return `edge [dir=frpnt arrowhead=empty]
            "${owner}" -> "${owned}"  [label=owns]`;
        }
        function generateUsage(user: string, used: string) {
            return `edge [dir=front arrowhead=normal]
            "${user}" -> "${used}"  [label=uses] `;
        }

        cls.baseClasses.forEach((base) => {
            ret += generateInheritance(base.ref.name, cls.name);
        });

        cls.members.forEach((mem) => {
            const ref = classes[mem.member.member_type];
            if (ref === undefined) return;
            if (mem.member.owner_modifier == undefined) {
                ret += generateOwnership(cls.name, ref.name);
            } else {
                ret += generateUsage(cls.name, ref.name);
            }
        });

        return ret;
    }
}
