// const NodeRpcFactory = require("../lib").NodeRpcFactory;
const JcNodeRpc = require("../lib").JcNodeRpc;
// const fetch = require("../lib/fetch");
const service = require("../lib/service");
const sinon = require("sinon");
const sandbox = sinon.createSandbox();
const chai = require("chai");
const expect = chai.expect;
const testAddress = "jpgWGpfHz8GxqUjz5nb6ej8eZJQtiF6KhH";

describe("test JcNodeRpc", function() {
  describe("test constructor", () => {
    it("if arguments length is 1", () => {
      const inst = new JcNodeRpc(["http://localhost"]);
      expect(inst.urls).to.deep.equal(["http://localhost"]);
      expect(inst.hosts).to.undefined;
      expect(inst.port).to.undefined;
      expect(inst.https).to.undefined;
    });

    it("if arguments length is 3", () => {
      const inst = new JcNodeRpc(["localhost"], 8080, false);
      expect(inst.hosts).to.deep.equal(["localhost"]);
      expect(inst.port).to.equal(8080);
      expect(inst.https).to.equal(false);
      expect(inst.urls).to.undefined;
    });
  });

  describe("test getSequence", () => {
    afterEach(() => {
      sandbox.restore();
    });

    it("call with right parameters", async () => {
      const inst = new JcNodeRpc(["https://srje071qdew231.swtc.top"]);
      const spy = sandbox.spy(service, "service");
      const sequence = await inst.getSequence(testAddress);
      expect(sequence).to.equal(3);
      expect(spy.calledOnce).to.true;
      expect(
        spy.getCall(0).calledWithExactly({
          data: {
            method: "account_info",
            params: [
              {
                account: testAddress
              }
            ]
          },
          method: "post",
          url: "https://srje071qdew231.swtc.top"
        })
      ).to.true;
    });

    it("get sequence in error parameter", async () => {
      const inst = new JcNodeRpc(["https://srje115qd43qw2.swtc.top"]);
      inst.getSequence("aaaa").catch((error) => {
        expect(error.message).to.equal("Account not found.");
      });
    });
  });

  describe("test createOrder", () => {
    after(() => {
      sandbox.restore();
    });

    it("call with right parameters", async () => {
      const inst = new JcNodeRpc(["https://srje071qdew231.swtc.top"]);
      const spy = sandbox.spy(service, "service");
      const blob = "create order";
      await inst.createOrder(blob);
      expect(spy.calledOnce).to.true;
      expect(
        spy.getCall(0).calledWithExactly({
          data: {
            method: "submit",
            params: [
              {
                tx_blob: blob
              }
            ]
          },
          method: "post",
          url: "https://srje071qdew231.swtc.top"
        })
      ).to.true;
    });
  });

  describe("test cancelOrder", () => {
    after(() => {
      sandbox.restore();
    });

    it("call with right parameters", async () => {
      const inst = new JcNodeRpc(["https://srje115qd43qw2.swtc.top"]);
      const spy = sandbox.spy(service, "service");
      const blob = "cancel order";
      await inst.cancelOrder(blob);
      expect(spy.calledOnce).to.true;
      expect(
        spy.getCall(0).calledWithExactly({
          data: {
            method: "submit",
            params: [
              {
                tx_blob: blob
              }
            ]
          },
          method: "post",
          url: "https://srje115qd43qw2.swtc.top"
        })
      ).to.true;
    });
  });

  describe("test transfer", () => {
    after(() => {
      sandbox.restore();
    });

    it("call with right parameters", async () => {
      const inst = new JcNodeRpc(["https://srje071qdew231.swtc.top"]);
      const spy = sandbox.spy(service, "service");
      const blob = "transfer";
      await inst.transfer(blob);
      expect(spy.calledOnce).to.true;
      expect(
        spy.getCall(0).calledWithExactly({
          data: {
            method: "submit",
            params: [
              {
                tx_blob: blob
              }
            ]
          },
          method: "post",
          url: "https://srje071qdew231.swtc.top"
        })
      ).to.true;
    });
  });

  describe("test setAccount", () => {
    after(() => {
      sandbox.restore();
    });

    it("call with right parameters", async () => {
      const inst = new JcNodeRpc(["https://srje115qd43qw2.swtc.top"]);
      const spy = sandbox.spy(service, "service");
      const blob = "set account";
      await inst.setAccount(blob);
      expect(spy.calledOnce).to.true;
      expect(
        spy.getCall(0).calledWithExactly({
          data: {
            method: "submit",
            params: [
              {
                tx_blob: blob
              }
            ]
          },
          method: "post",
          url: "https://srje115qd43qw2.swtc.top"
        })
      ).to.true;
    });
  });

  describe("test setBrokerage", () => {
    after(() => {
      sandbox.restore();
    });

    it("call with right parameters", async () => {
      const inst = new JcNodeRpc(["https://srje071qdew231.swtc.top"]);
      const spy = sandbox.spy(service, "service");
      const blob = "set brokerage";
      await inst.setBrokerage(blob);
      expect(spy.calledOnce).to.true;
      expect(
        spy.getCall(0).calledWithExactly({
          data: {
            method: "submit",
            params: [
              {
                tx_blob: blob
              }
            ]
          },
          method: "post",
          url: "https://srje071qdew231.swtc.top"
        })
      ).to.true;
    });
  });

  describe("test setSignerList", () => {
    after(() => {
      sandbox.restore();
    });

    it("call with right parameters", async () => {
      const inst = new JcNodeRpc(["https://srje115qd43qw2.swtc.top"]);
      const spy = sandbox.spy(service, "service");
      const blob = "set signerList";
      await inst.setSignerList(blob);
      expect(spy.calledOnce).to.true;
      expect(
        spy.getCall(0).calledWithExactly({
          data: {
            method: "submit",
            params: [
              {
                tx_blob: blob
              }
            ]
          },
          method: "post",
          url: "https://srje115qd43qw2.swtc.top"
        })
      ).to.true;
    });
  });

  describe("test sendRawTransaction", () => {
    after(() => {
      sandbox.restore();
    });

    it("call with right parameters", async () => {
      const inst = new JcNodeRpc(["https://srje071qdew231.swtc.top"]);
      const spy = sandbox.spy(service, "service");
      const blob = "sendRawTransaction";
      await inst.sendRawTransaction(blob);
      expect(spy.calledOnce).to.true;
      expect(
        spy.getCall(0).calledWithExactly({
          data: {
            method: "submit",
            params: [
              {
                tx_blob: blob
              }
            ]
          },
          method: "post",
          url: "https://srje071qdew231.swtc.top"
        })
      ).to.true;
    });
  });

  describe("test submit_multisigned", () => {
    after(() => {
      sandbox.restore();
    });

    it("call with right parameters", async () => {
      const inst = new JcNodeRpc(["https://srje115qd43qw2.swtc.top"]);
      const spy = sandbox.spy(service, "service");
      const params = "test";
      try {
        await inst.submit_multisigned(params);
      } catch (error) {
        expect(error.message).to.equal("Request failed with status code 502");
      }
      expect(spy.calledOnce).to.true;
      expect(
        spy.getCall(0).calledWithExactly({
          data: {
            method: "submit_multisigned",
            params: [
              {
                tx_json: params
              }
            ]
          },
          method: "post",
          url: "https://srje115qd43qw2.swtc.top"
        })
      ).to.true;
    });
  });
});
