import { fork } from 'child_process';
import { getDirname } from '../utils/index.js';

const __dirname = getDirname(import.meta.url);

const spawnChildProcess = async (args) => {
   const child = fork(`${__dirname}/files/script.js`, args, { stdio: 'pipe' });

   process.stdin.pipe(child.stdin);
   child.stdout.pipe(process.stdout);
};

spawnChildProcess(['arg1', 'arg2']);