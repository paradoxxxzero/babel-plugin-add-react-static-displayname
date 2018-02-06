const babel = require('@babel/core')
const t = babel.types

module.exports = () => ({
  visitor: {
    Program(path) {
      path.traverse({
        Class(path) {
          const name = path.node.id.name || 'Anonymous'
          const body = path.get('body')
          // If there is no render method, assuming not a component, return
          if (
            !body.node.body.find(
              node =>
                t.isClassMethod(node) &&
                t.isIdentifier(node.key, { name: 'render' })
            )
          ) {
            return
          }

          // If there is already a displayName, return
          if (
            body.node.body.find(
              node =>
                t.isClassProperty(node) &&
                t.isIdentifier(node.key, { name: 'displayName' })
            )
          ) {
            return
          }
          // Creating the class property
          const classProperty = t.classProperty(
            t.identifier('displayName'),
            t.stringLiteral(name)
          )
          // Don't know if possible to set this with constructor
          classProperty.static = true
          // Inserting at start of class body
          body.unshiftContainer('body', classProperty)
        },
      })
    },
  },
})
