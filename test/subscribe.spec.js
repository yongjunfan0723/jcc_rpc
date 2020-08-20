const SubscribeFactory = require("../lib").SubscribeFactory;
const ConfigFactory = require("../lib").ConfigFactory;
const InfoFactory = require("../lib").InfoFactory;
const sinon = require("sinon");
const sandbox = sinon.createSandbox();
const chai = require("chai");
const expect = chai.expect;

const configInst = ConfigFactory.init(["https://jccdex.cn"]);
const infoInst = InfoFactory.init(["https://iji41bdbd42011.swtc.top"]);
const TEST_NAME = "pollingConfig";
const TEST_INFONAME = "testpolling";
const testTask = configInst.getConfig.bind(configInst);
const testTask1 = infoInst.getAllTickers.bind(infoInst);
const polling = true;
const timer = 30 * 1000;

describe("test SubscribeTask", function() {
  afterEach(() => {
    sandbox.restore();
    SubscribeFactory.destroy();
  });
  describe("test register", function() {
    it("test register task", (done) => {
      const subscribeInst = SubscribeFactory.init();
      const registerRes = subscribeInst.register(TEST_NAME, testTask, polling, timer);
      expect(typeof registerRes.taskMap.get(TEST_NAME).task).to.equal("function");
      expect(registerRes.taskMap.get(TEST_NAME).polling).to.true;
      expect(registerRes.taskMap.get(TEST_NAME).timer).to.equal(timer);
      done();
    });
  });

  describe("test start", function() {
    it("test start task", () => {
      const subscribeInst = SubscribeFactory.init();
      subscribeInst
        .register(TEST_NAME, testTask, false, timer)
        .on(TEST_NAME, (error, res) => {
          if (error) {
            console.log("error", error);
          }
          if (res) {
            expect(res.msg).to.equal("pending request had been canceled");
          }
        })
        .start(TEST_NAME);
    });

    it("test start task is error", (done) => {
      const subscribeInst = SubscribeFactory.init();
      subscribeInst.register(TEST_NAME, testTask, false, timer);
      const taskJob = subscribeInst.getTask(TEST_NAME);
      const stub = sandbox.stub(taskJob, "task");
      stub.rejects(new Error("start in error"));
      taskJob.task().catch((error) => {
        expect(error.message).to.equal("start in error");
        done();
      });
    });
  });

  describe("test stopPolling", function() {
    it("test stop polling task", () => {
      const subscribeInst = SubscribeFactory.init();
      subscribeInst.register(TEST_NAME, testTask, polling, timer).start(TEST_NAME);
      const res = subscribeInst.stopPolling(TEST_NAME);
      expect(res.taskIdMap).to.be.empty;
      expect(res.taskIdMap.get(TEST_NAME)).to.undefined;
    });
  });

  describe("test stopAll", function() {
    it("test stop all task", () => {
      const subscribeInst = SubscribeFactory.init();
      subscribeInst.register(TEST_NAME, testTask, polling, timer).start(TEST_NAME);
      subscribeInst.register(TEST_INFONAME, testTask1, polling, timer).start(TEST_INFONAME);
      const res = subscribeInst.stopAll();
      expect(res.taskIdMap).to.be.empty;
    });
  });

  describe("test removeTask", function() {
    it("test remove task", () => {
      const subscribeInst = SubscribeFactory.init();
      subscribeInst.register(TEST_NAME, testTask, polling, timer);
      subscribeInst.register(TEST_INFONAME, testTask1, polling, timer);
      const res = subscribeInst.removeTask(TEST_NAME);
      expect(res.taskMap.get(TEST_NAME)).to.undefined;
    });
  });

  describe("test removeAll", function() {
    it("test remove all task", () => {
      const subscribeInst = SubscribeFactory.init();
      subscribeInst.register(TEST_NAME, testTask, polling, timer);
      subscribeInst.register(TEST_INFONAME, testTask1, polling, timer);
      const res = subscribeInst.removeAll();
      expect(res.taskMap).to.be.empty;
      expect(res.taskMap.get(TEST_NAME)).to.undefined;
      expect(res.taskMap.get(TEST_INFONAME)).to.undefined;
    });
  });

  describe("test getTask", function() {
    it("test get task", () => {
      const subscribeInst = SubscribeFactory.init();
      subscribeInst.register(TEST_NAME, testTask, polling, timer);
      const res = subscribeInst.getTask(TEST_NAME);
      expect(res).to.not.be.empty;
      expect(res.polling).to.true;
      expect(res.timer).to.equal(timer);
    });
  });
});
