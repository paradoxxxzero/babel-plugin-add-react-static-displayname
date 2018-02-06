// src/__tests__/index-test.js
const babel = require('@babel/core')
const plugin = require('..')

describe('sets displayName on simple class', () => {
  const clsSimple = `
class Simple {
  render() {
    return null
  }
}
`

  it('sets it', () => {
    const { code } = babel.transform(clsSimple, {
      plugins: ['@babel/plugin-syntax-class-properties', plugin],
    })
    expect(code).toMatchSnapshot()
  })

  it('is transformed with class-properties plugin', () => {
    const { code } = babel.transform(clsSimple, {
      plugins: [plugin, '@babel/plugin-proposal-class-properties'],
    })
    expect(code).toMatchSnapshot()
  })
})

describe('sets displayName on class with static members', () => {
  const clsWithStatic = `
class WithStatic {
  static attr = 2

  render() {
    return null
  }
}
`

  it('is added along with the other static', () => {
    const { code } = babel.transform(clsWithStatic, {
      plugins: ['@babel/plugin-syntax-class-properties', plugin],
    })
    expect(code).toMatchSnapshot()
  })

  it('is transformed with the other static', () => {
    const { code } = babel.transform(clsWithStatic, {
      plugins: [plugin, '@babel/plugin-proposal-class-properties'],
    })
    expect(code).toMatchSnapshot()
  })
})

describe('sets displayName on class with decorators', () => {
  const clsWithDecorator = `
@decorator
class WithDecorator {
  static attr = 2

  render() {
    return null
  }
}
`

  it('works with decorators', () => {
    const { code } = babel.transform(clsWithDecorator, {
      plugins: [
        '@babel/plugin-syntax-class-properties',
        plugin,
        '@babel/plugin-proposal-decorators',
      ],
    })
    expect(code).toMatchSnapshot()
  })

  it('works with decorators and class-properties', () => {
    const { code } = babel.transform(clsWithDecorator, {
      plugins: [
        '@babel/plugin-proposal-decorators',
        plugin,
        ['@babel/plugin-proposal-class-properties', { loose: true }],
      ],
    })
    expect(code).toMatchSnapshot()
  })
})

describe("does not set displayName if it's already set", () => {
  const clsWithAlreadyDisplayName = `
class WithAlreadyDisplayName {
  static displayName = 'Component'

  render() {
    return null
  }
}
`

  it('does not overide displayName', () => {
    const { code } = babel.transform(clsWithAlreadyDisplayName, {
      plugins: ['@babel/plugin-syntax-class-properties', plugin],
    })
    expect(code).toMatchSnapshot()
  })
})

describe("does not set displayName if there's no render method", () => {
  const clsNoRender = `
class NoRender {
  render_it() {
    return null
  }
}
`

  it('does not overide displayName', () => {
    const { code } = babel.transform(clsNoRender, {
      plugins: ['@babel/plugin-syntax-class-properties', plugin],
    })
    expect(code).toMatchSnapshot()
  })
})
