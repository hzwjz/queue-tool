/**
 * queue
 */
import TaskStatus from './taskStatus';
import Task from './task';

const defaultMaxLimit = 30;

export default class Queue {
    constructor(options) {
        this._maxLimt = options ? (options.maxLimt ? options.maxLimt : defaultMaxLimit) : defaultMaxLimit;
        this._taskList = [];
        this._runingCount = 0;
    }

    getLimit() {
        return this._maxLimt;
    }

    add(task){
        if(!task instanceof Task){
            // throw new Error('the queue\'s task should be instance of Task Class');
            return Promise.reject('the queue\'s task should be instance of Task Class');
        }

        return new Promise((resolve, reject) => {
            task.on('start', () => {
                this._taskStart();
            });

            task.on('end', (res) => {
                this._taskEnd();

                resolve(res);
            });
            
            task.on('error', (err) => {
                this._taskError();

                reject(err);
            });

            task.on('cancel', () => {
                this._taskCancel();

                resolve();
            });

            this._taskList.push(task);

            this._checkRun();
        });
    }

    addList(list){
        return Promise.all(list.map((task) => {
            return this.add(task);
        }));
    }

    _checkRun(){
        if(this._runingCount >= this._maxLimt){
            return;
        }

        let currentAllStart = true;

        for(let i = 0; i < this._taskList.length; i++){
            if(this._taskList[i].getStatus() == TaskStatus.TASK_STATUS_NOTSTART){                
                this._taskList[i].start();

                currentAllStart = (i == this._taskList.length - 1);
                break;
            }else if(this._taskList[i].getStatus() == TaskStatus.TASK_STATUS_END || 
                     this._taskList[i].getStatus() == TaskStatus.TASK_STATUS_ERROR || 
                     this._taskList[i].getStatus() == TaskStatus.TASK_STATUS_CANCELLED){

                this._taskList.splice(i, 1);
                i--;
            }
        }

        if(!currentAllStart){
            this._checkRun();
        }else{
            // console.log('all task in queue has start...');
        }
    }

    _taskStart(){
        this._runingCount++;
    }
    
    _taskEnd(){
        this._runingCount--;

        this._checkRun();
    }

    _taskError(){
        this._runingCount--;

        this._checkRun();
    }

    _taskCancel(){
        this._runingCount--;

        this._checkRun();
    }

    isReachLimt(){
        return this._runingCount >= this._maxLimt;
    }

    abortAll() {
        for (let i = 0; i < this._taskList.length; i++) {
            if (this._taskList[i].getStatus() == constant.TASK_STATUS.RUNNING) {
                this._taskList[i].abort();
            }
        }
    }
}