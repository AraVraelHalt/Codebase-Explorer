import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import * as t from '@babel/types';

export type FileNode = {
  name: string;
  functions: string[];
  imports: string[];
};

export function parseCode(fileName: string, code: string): FileNode {
  // Abstract Syntax Tree
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx'],
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
    VariableDeclarator({ node }) {
      if (t.isIdentifier(node.id) && t.isArrowFunctionExpression(node.init)) {
        functions.push(node.id.name);
      }
    },
    ExportNamedDeclaration({ node }) {
      if (t.isVariableDeclaration(node.declaration)) {
        node.declaration.declarations.forEach((decl) => {
          if (
            t.isVariableDeclarator(decl) &&
            t.isIdentifier(decl.id) &&
            t.isArrowFunctionExpression(decl.init)
          ) {
            functions.push(decl.id.name);
          }
        });
      }
    },
  });

  return { name: fileName, functions, imports };
}
