export class FullClassDefinition {
    constructor(name: string) {
        this.name = name;
        this.defined = false;
    }

    name: string;
    baseClasses:
        | {
              ref: FullClassDefinition;
              access: 'private' | 'public' | 'protected' | 'default';
          }[] = [];
    extendedBy:
        | {
              ref: FullClassDefinition;
              access: 'private' | 'public' | 'protected' | 'default';
          }[] = [];
    members:
        | {
              member: Member;
              access: 'private' | 'public' | 'protected' | 'default';
          }[] = [];
    methods:
        | {
              method: Method;
              access: 'private' | 'public' | 'protected' | 'default';
          }[] = [];
    defined: boolean;
}

export class LogicParser {
    private get(classes: Record<string, FullClassDefinition>, clsName: string) {
        if (classes[clsName] === undefined) {
            classes[clsName] = new FullClassDefinition(clsName);
        }
        return classes[clsName];
    }

    private accPublic(acc: 'default' | 'public' | 'private' | 'protected') {
        return acc == 'default' ? 'private' : acc;
    }

    private accPrivate(acc: 'default' | 'public' | 'private' | 'protected') {
        return acc == 'default' ? 'private' : acc;
    }

    parse(classDef: ClassDefinition[]) {
        const classes: Record<string, FullClassDefinition> = {};
        for (const def of classDef) {
            //////////////////////////////////////////////////
            // Construct class
            const cls = this.get(classes, def.header.name);
            if (cls.defined != false && def.specification !== undefined) {
                throw new Error(`Class ${def.header.name} was already defined.`);
            }

            //////////////////////////////////////////////////
            // Construct baseClasses
            for (const extd of def.header.extends) {
                const ext = this.get(classes, extd.name);
                const acc = this.accPrivate(extd.access.value);
                cls.baseClasses.push({ access: acc, ref: ext });
                ext.extendedBy.push({ access: acc, ref: cls });
            }

            //////////////////////////////////////////////////
            // Construct members and methods
            let currentSpec: 'default' | 'public' | 'private' | 'protected' = 'private';
            for (const spec of def.specification) {
                if (spec.type === 'access_specifier') {
                    currentSpec = this.accPrivate(spec.value);
                } else if (spec.type === 'member') {
                    cls.members.push({
                        access: currentSpec,
                        member: spec,
                    });
                } else if (spec.type === 'method') {
                    cls.methods.push({
                        access: currentSpec,
                        method: spec,
                    });
                }
            }

            cls.defined = true;
        }

        return classes;
    }
}
