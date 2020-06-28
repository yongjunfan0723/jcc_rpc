const ConfigFactory = require("../lib").ConfigFactory;
const chai = require("chai");
const expect = chai.expect;

describe("test Factory", function() {
  describe("test constructor", () => {
    it("if arguments length is 1", () => {
      ConfigFactory.init(["http://localhost"]);
      expect(ConfigFactory.get()).to.not.null;
      ConfigFactory.destroy();
      expect(ConfigFactory.get()).to.null;
    });

    it("if arguments length is 3", () => {
      ConfigFactory.init(["localhost"], 8080, false);
      expect(ConfigFactory.get()).to.not.null;
      ConfigFactory.destroy();
      expect(ConfigFactory.get()).to.null;
    });
  });
});