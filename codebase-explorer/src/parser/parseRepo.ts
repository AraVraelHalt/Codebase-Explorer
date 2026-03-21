import * as parser from "@babel/parser";
import traverse from "@babel/traverse";

export type FileNode = {
  name: string;
  functions: string[];
  imports: string[];
};

export function parseCode(fileName: string, code: string): FileNode {
  // Abstract Syntax Tree
  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: ["typescript", "jsx"],
  });

  const functions: string[] = [];
  const imports: string[] = [];

  traverse(ast as any, {
    ImportDeclaration({ node }) {
      imports.push(node.source.value);
    },
    FunctionDeclaration({ node }) {
      if (node.id) functions.push(node.id.name);
    },
  });

  return { name: fileName, functions, imports };
}
