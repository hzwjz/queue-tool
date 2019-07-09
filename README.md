# queue tool 

[![Build Status](https://travis-ci.com/hzwjz/queue-tool.svg?branch=master)](https://travis-ci.com/hzwjz/queue-tool)

## API

### extend base task class 


```javascript
export default class MyTask extends Task{
    constructor(){
        super();
    }

    start(){
        super.start();

        // do task start
    }

    end(res){
        super.end(res);

        // do task end
    }

    error(err){
       super.error(err);

        // do task error
    }

    abort(){
        super.abort();

        // do task abort
    }
}
```

### add task to queue

```javascript

let ins = QueueTool.create({
    maxLimt: 10
});

let p = ins.add(new MyTask()); // return promise
p.then((res) => {
    // task ends
});

// or

let pall = ins.addList([
    new MyTask(),
    new MyTask(),
    new MyTask()
]); // return promise
pall.then((res) => {
    // all tasks end
});

```