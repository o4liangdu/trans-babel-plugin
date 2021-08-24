module.exports = function({ types: t}) {
    return {
        // 访问者
        visitor: {
            // 该路径对应的节点
            VariableDeclaration(path) {
                const node = path.node;
                // 判断节点kind属性是let或者const，转为var
                [ 'let' , 'const' ].includes(node.kind) && (node.kind = "var")
            },
            ArrowFunctionExpression(path) {
                // 该路径对应的节点信息
                let {id,params,body,generator,async} = path.node;
                if(!t.isBlockStatement(body)) {
                    const node = t.returnStatement([node])
                    body = t.blockStatement([node])
                }
                // 进行节点替换
                path.replaceWith(t.functionExpression(id,params,body,generator,async))
            }
        }
    }
}