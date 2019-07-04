/**
 * queue tool test
 */
const expect = require('chai').expect;
let QueueTool = require('../index').default; // esm default
let Queue = require('../src/queue').default;

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

/*
describe('Queue', () => {
    // beforeEach(() => {

    // })

    describe('add', () => {
        
    });

    describe('addList', () => {
        
    });

    describe('abortAll', () => {

    });

    describe('isReachLimt', () => {

    });
});
*/