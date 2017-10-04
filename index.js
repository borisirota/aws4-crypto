var sjcl = require('sjcl-aws')

module.exports.createHmac = function (algorithm, key) {
  if (typeof key === 'string') key = sjcl.codec.utf8String.toBits(key)
  var mac = new sjcl.misc.hmac(key)
  return {
    update: function (data) {
      mac.update(data)
      return {
        digest: function (encoding) {
          var result = mac.digest()
          result = encoding === 'hex' ? sjcl.codec.hex.fromBits(result) : result
          return result
        }
      }
    }
  }
}

module.exports.createHash = function (algorithm) {
  var hash = new sjcl.hash.sha256()
  return {
    update: function (data) {
      data = data instanceof Int8Array ? sjcl.codec.arrayBuffer.toBits(data.buffer) : data
      hash.update(data)
      return {
        digest: function () {
          return sjcl.codec.hex.fromBits(hash.finalize())
        }
      }
    }
  }
}

module.exports.randomBytes = function (length) {
  return new Uint8Array(sjcl.codec.arrayBuffer.fromBits(sjcl.random.randomWords(length / 4)))
}
