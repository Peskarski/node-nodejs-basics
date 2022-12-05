import os from 'os';
import { Worker } from 'worker_threads';
import { getDirname } from '../utils/index.js';

const __dirname = getDirname(import.meta.url);

const performCalculations = async () => {
    const numberOfCores = os.cpus().length;

    const promises = [];
    const runWorker = worker => new Promise((resolve, reject) => {
        worker.on('message', msg => {
            resolve({
                status: 'resolved',
                value: msg,
            });
        });
        worker.on("error", () => {
            resolve({
                status: 'error',
                data: null,
            })
        });
    });

    for (let i = 0; i < numberOfCores; i++) {
        const worker = new Worker(`${__dirname}/worker.js`, { workerData: 10 + i });
        promises.push(runWorker(worker));
    }

    Promise.all(promises).then((value) => console.log(value));
};

await performCalculations();