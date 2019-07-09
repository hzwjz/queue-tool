/**
 * task test
 */
import Task from '../src/task';
import TaskStatus from '../src/taskStatus';

export default class TestTask extends Task{
    constructor(endWidthError){
        super();

        this._endWidthError = !!endWidthError;
    }

    start(){
        super.start();

        setTimeout(() => {
            if(this._endWidthError){
                this.error(2);
                return;
            }

            if(this._status != TaskStatus.TASK_STATUS_CANCELLED){
                this.end(1);
            }
        }, Math.random() * 2000);
    }

    // end(res){
        
    // }

    // error(err){
       
    // }

    // abort(){
        
    // }
}
