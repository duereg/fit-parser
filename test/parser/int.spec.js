var expect, integer;

({expect} = require("../spec-helper"));

integer = require("../../lib/parser/handlers/int");

describe("Working with the Integer Library", function() {
  return describe("Testing isNumber", function() {
    it("the string \"123\" returns true", function() {
      return expect(integer.isNumber("123")).to.eq(true);
    });
    return it("the string \"abc\" returns false", function() {
      return expect(integer.isNumber("abc")).to.eq(false);
    });
  });
});
