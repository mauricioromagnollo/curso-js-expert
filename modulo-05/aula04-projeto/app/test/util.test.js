const { describe, it } = require('mocha')
const { expect } = require('chai')
const { evaluateRegex, InvalidRegexError } = require('../src/util')

describe('util', () => {
  it('should throw an error when a regex is unsafe', () => {
    const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/
    expect(() => evaluateRegex(unsafeRegex)).to.throw(InvalidRegexError, `This ${unsafeRegex} is unsafe dude!`)
  })

  it('should not throw error when regex is safe', () => {
    const safeRegex = /([a-z])$/
    expect(() => evaluateRegex(safeRegex)).to.not.throw()
    expect(evaluateRegex(safeRegex)).to.be.equal(safeRegex)
  })
})