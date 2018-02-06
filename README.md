# babel-plugin-add-react-static-displayname

This babel 7 plugin simply add the static displayName class property to your react component (class with a render method).

## Exemple

```js
@decorator
class Component {
  render() {
    return <div />
  }
}
```

-> (this plugin) ->

```js
@decorator
class Component {
  static displayName = 'Component'
  render() {
    return <div />
  }
}
```

-> (full babel configuration) ->

```js
var _class, _class2, _temp

let Component =
  decorator(
    (_class = ((_temp = _class2 = class Component {
      render() {
        return React.createElement('div', null)
      }
    }),
    (_class2.displayName = 'Component'),
    _temp))
  ) || _class
```

_As you can see the attribute is set before decorator is called useful for decorator that use the displayName property like [bemboo](https://github.com/paradoxxxzero/bemboo)_

## Installation

```bash
yarn add --dev babel-plugin-add-react-static-displayname
```

## Configuration

In your `.babelrc` a full configuration with decorator and class property support should look like this:

```json
{
  "presets": ["@babel/preset-react", "@babel/preset-env"],
  "plugins": [
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-decorators",
    "add-react-static-displayname",
    ["@babel/plugin-proposal-class-properties", { "loose": true }]
  ]
}
```

# The plugin order matters: `decorators` -> `add-react-static-displayname` -> `class-properties`
