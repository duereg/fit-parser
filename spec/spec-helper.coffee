require 'coffee-errors'

chai = require 'chai'
sinon = require 'sinon'
chai.use require 'sinon-chai'

module.exports = {expect: chai.expect, sinon, chai}
