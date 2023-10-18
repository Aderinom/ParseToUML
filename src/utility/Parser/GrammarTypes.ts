interface AccessSpecifier {
  type: "access_specifier";
  value: "default" | "public" | "private" | "protected";
}

interface Member {
  type: "member";
  member_type: string;
  member_name: string;
  owner_modifier: "&" | "*" | undefined;
  count_modifier: string;
}

interface Method {
  type: "method";
  return_type: string;
  method_name: string;
  parameters: { type: string; name: string }[];
}

interface ClassDefinition {
  type: "class";
  header: {
    name: string;
    extends: {
      access: AccessSpecifier;
      name: string;
    }[];
  };
  specification: (Member | Method | AccessSpecifier)[];
}
