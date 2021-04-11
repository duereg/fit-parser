var expect;

({expect} = require("../spec-helper"));

require("../../lib/parser/string");

describe("string:: extensions", function() {
  describe("trim", function() {
    it("removes whitespace from the ends of a string", function() {
      return expect(" this string ".trim()).to.eq("this string");
    });
    return it("does nothing is no leading or trailing whitespace is present", function() {
      return expect("this string".trim()).to.eq("this string");
    });
  });
  return describe("isEmpty", function() {
    it("returns true for an empty string", function() {
      return expect("".isEmpty()).to.be.true;
    });
    return it("returns false for a string of whitespace", function() {
      return expect(" ".isEmpty()).to.be.false;
    });
  });
});
