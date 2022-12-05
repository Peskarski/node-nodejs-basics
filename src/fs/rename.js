import fs, { access, constants } from 'fs/promises';
import { getDirname } from '../utils/index.js';

const __dirname = getDirname(import.meta.url);

const rename = async () => {
    const directory = `${__dirname}/files`;
    

    const isFileExisting = async (path) => {
        try {
            await fs.access(path, constants.F_OK);
            return true;
        } catch {
            return false;
        }
    }

    try {
        if (await isFileExisting(`${directory}/properFilename.md`)) {
            throw new Error('FS operation failed');
        }

        await fs.rename(`${directory}/wrongFilename.txt`, `${directory}/properFilename.md`);
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed');
        }

        throw new Error(err);
    }
};

await rename();