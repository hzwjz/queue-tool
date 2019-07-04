/**
 * queue tool
 */
import Queue from './src/queue';

function create(options) {
    return new Queue(options);
}

export default {
    create
}