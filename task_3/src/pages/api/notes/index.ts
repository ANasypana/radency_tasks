// Core
import fs from 'fs';
import util from 'util';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { schema } from '../../../validation/configBack';
import { extractDates } from '../../../halpers/date';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const filePath = path.join(process.cwd(), 'data/index.json');
    const readFile = util.promisify(fs.readFile);
    const writeFile = util.promisify(fs.writeFile);
    if(req.method === 'GET') {
        try {
            const data = await readFile(filePath, 'utf-8');

            res.status(200).json(JSON.parse(data));

        }catch (err) {
            const error = err as Error;
            const message = error.message || 'Something went wrong with extracting data';

            res.status(400).json({message});
        }
    }else if(req.method === 'POST') {
        try {
            const data = await readFile(filePath, 'utf-8');
            const arr = JSON.parse(data);
            const note = await schema.validate(req.body);

            const newNote = {
                ...note,
                id:      (arr.length + Date.now()).toString(),
                created: new Date().toString(),
                dates:   extractDates(note.description),
            };

            arr.push({...newNote});

            await writeFile(filePath, JSON.stringify(arr), 'utf-8');

            res.status(201).json(newNote);
        }catch (err) {
            const error = err as Error;
            const message = error.message || 'Something went wrong with adding data';
            res.status(400).json({ message });
        }
    }
};

export default handler;
