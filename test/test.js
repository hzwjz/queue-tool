/**
 * queue tool test
 */
const expect = require('chai').expect;
let QueueTool = require('../index').default; // esm default
let Queue = require('../src/queue').default;
let Task = require('../src/task').default;
let TaskStatus = require('../src/taskStatus').default;
let TestTask = require('./testTask').default;

describe('QueueTool', () => {
    describe('create queue instance', () => {
        it('with no options', () => {
            expect(QueueTool.create()).to.be.instanceOf(Queue);
        });

        it('with maxlimt options', () => {
            let ins = QueueTool.create({
                maxLimt: 10
            });
            expect(ins).to.be.instanceOf(Queue);
            expect(ins.getLimit()).to.equals(10);
        });
    });
});

describe('Queue', function() {
    let queue; 

    this.timeout(60000);

    before(() => {
        queue = new Queue();
    }); 

    // beforeEach(() => {
       
    // })

    describe('add', () => {
        it('add normal task', (done) => {
            let t = new TestTask();
            let addpromise = queue.add(t);
            addpromise.then((res) => {
                expect(res).to.be.equals(1);
                expect(t.getStatus()).to.be.equals(TaskStatus.TASK_STATUS_END);
                
                done();
            });
        });
        
        it('add type error task', (done) => {
            let t = Object.create(null);
            let addpromise = queue.add(t);
            
            addpromise.catch((msg) => {
                expect(msg).to.be.a('string');
                expect(msg).to.include('type error');
                done();
            });
        });
    });

    describe('addList', () => {
        it('add normal task list', (done) => {
            let tarr = [new TestTask(), new TestTask(), new TestTask()];
            let addlistpromise = queue.addList(tarr);
            addlistpromise.then((ress) => {
                expect(tarr[0].getStatus()).to.be.equals(TaskStatus.TASK_STATUS_END);
                expect(tarr[1].getStatus()).to.be.equals(TaskStatus.TASK_STATUS_END);
                expect(tarr[2].getStatus()).to.be.equals(TaskStatus.TASK_STATUS_END);
                done();
            });
        });

        it('add error task list', (done) => {
            let tarr = [new TestTask(true), new TestTask(), new TestTask()];
            let addlistpromise = queue.addList(tarr);
            addlistpromise.catch((error) => {
                expect(error).to.be.equals(2);
                expect(tarr[0].getStatus()).to.be.equals(TaskStatus.TASK_STATUS_ERROR);
                done();
            });
        });
    });

    describe('abortAll', () => {
        it('add task list and abort all', () => {
            let tarr = [new TestTask(), new TestTask(), new TestTask()];
            let q = new Queue();
            q.addList(tarr);
            q.abortAll();
            expect(tarr[0].getStatus()).to.be.equals(TaskStatus.TASK_STATUS_CANCELLED);
            expect(tarr[1].getStatus()).to.be.equals(TaskStatus.TASK_STATUS_CANCELLED);
            expect(tarr[2].getStatus()).to.be.equals(TaskStatus.TASK_STATUS_CANCELLED);
        });
    });

    // describe('isReachLimt', () => {

    // });
});