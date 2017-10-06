# aws4-crypto

crypto drop in replacement for aws4 module based on [sjcl](https://github.com/bitwiseshiftleft/sjcl).
the goal is to reduce the bundle size of [aws4](https://github.com/mhart/aws4) package while used in browser.

# install

```sh
npm install aws4-crypto --save
```

# binary

when passing binary body, make sure its of type [Int8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int8Array)

# webpack usage

```js
module.exports = {
  ...
  resolve: {
    ...
    alias: {
      ...
      crypto: 'aws4-crypto',
      ...
    }
    ...
  },
  ...
}
```

Due to internal usage of [sjcl](https://github.com/bitwiseshiftleft/sjcl), in order not to bundle [crypto-browserify](https://github.com/crypto-browserify/crypto-browserify), add to config:
```js
module.exports = {
  ...
  module: {
    noParse: /sjcl-aws/, // it requires crypto so webpack will bundle the browserified version. if the require fails it fallback to the browser api.
  ...
  }
  ...
}
```

# additional steps can be taken in order to reduce the aws4 package bundle size in browser

```sh
npm install url-lite --save
npm install null-loader --save-dev
```
add to webpack config:

```js
module.exports = {
  ...
  resolve: {
    ...
    alias: {
      ...
        url: 'url-lite' // aws4 uses url
      ...
    }
    ...
  },
  module: {
    ...
    rules: [
      {
        test: path.resolve(process.cwd(), 'node_modules/buffer/index.js'), // aws4 uses querystring-browser which requires it but it has no usage
        use: [{
          loader: 'null-loader'
        }]
      },
      ...
    ]
    ...
  }
  ...
}
```

# license

MIT
