/**
 * task base
 */
import TaskStatus from './taskStatus';
import EventEmitter from 'events';

export default class Task extends EventEmitter{
    constructor(){
        super();

        this._status = TaskStatus.TASK_STATUS_NOTSTART;
    }

    start(){
        this._status = TaskStatus.TASK_STATUS_RUNNING;
        this.emit('start');
    }

    end(res){
        if(this._status == TaskStatus.TASK_STATUS_CANCELLED || this._status == TaskStatus.TASK_STATUS_ERROR){
            console.error('task is cancelled or error, can not be ended!');
            return;
        }

        this._status = TaskStatus.TASK_STATUS_END;
        this.emit('end', res);
    }

    error(err){
        this._status = TaskStatus.TASK_STATUS_ERROR;
        this.emit('error', err);
    }

    abort(){
        if (this._status == TaskStatus.TASK_STATUS_NOTSTART || this._status == TaskStatus.TASK_STATUS_RUNNING) {
            this._status = TaskStatus.TASK_STATUS_CANCELLED;
            this.emit('cancel');
        }
    }
 
    getStatus(){
        return this._status;
    }
}
