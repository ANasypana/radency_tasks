// Core
import fs from 'fs';
import util from 'util';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { schema, schemaArr } from '../../../../validation/configBack';
import { ISummary, INoteModel } from '../../../../types';
import { extractDates } from '../../../../halpers/date';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const filePath = path.join(process.cwd(), 'data/index.json');
    const readFile = util.promisify(fs.readFile);
    const writeFile = util.promisify(fs.writeFile);

    if(req.method === 'GET' && req.query.slug === 'stats') {
        try {
            const data = await readFile(filePath, 'utf-8');
            const arr = JSON.parse(data) as Array<INoteModel>;
            const summary = new Array<ISummary>();
            arr.filter(n => n.archived)
                .forEach(n => {
                if (!!n.category
                    && summary.filter((elm) => elm.category === n.category).length === 0) {
                    summary.push({
                        category: n.category,
                        active:   arr.filter((elm) => !elm.archived && elm.category === n.category).length,
                        archived: arr.filter((elm) => elm.archived && elm.category === n.category).length,
                    });
                }
            });
            res.status(200).json(summary);

        }catch (err) {
            const error = err as Error;
            const message = error.message || 'Something went wrong with extracting data';
            res.status(400).json({message});
        }
    }else if(req.method === 'GET' && req.query.slug !== 'stats'){
        try {
            const data = await readFile(filePath, 'utf-8');
            const arr = JSON.parse(data) as Array<INoteModel>;
            const note = arr.find(n => n.id === req.query.slug);

            if(!note){
                return res.status(404).json({message: 'Note does not exist'});
            }

            res.status(200).json(note);

        }catch (err) {
            const error = err as Error;
            const message = error.message || 'Something went wrong with extracting data';
            res.status(400).json({message});
        }

    } else if(req.method === 'DELETE'){
        try {
            const data = await readFile(filePath, 'utf-8');
            const arr = JSON.parse(data) as Array<INoteModel>;
            const note = arr.find(n => n.id === req.query?.slug);

            if(!note){
                return res.status(404).json({message: 'Note does not exist'});
            }
            const result = arr.filter(n => n.id !== req.query?.slug);

            await writeFile(filePath, JSON.stringify(result), 'utf-8');

            res.status(202).json('note was deleted');

        }catch (err) {
            const error = err as Error;
            const message = error.message || 'Something went wrong with removing data';
            res.status(400).json({message});
        }

    } else if((req.method === 'POST' || req.method === 'PATCH')
        && req.query.slug !== 'archive' && req.query.slug !== 'delete') {
        try {
            const data = await readFile(filePath, 'utf-8');
            const arr = JSON.parse(data) as Array<INoteModel>;
            const note = await schema.validate(req.body);

            const findNote = arr.find(n => n.id === req.query?.slug);

            if(!findNote){
                return res.status(404).json({message: 'Note does not exist'});
            }

            const updatedNota = {...findNote, ...note, dates: extractDates(note.description)};

            const result = arr.map(n => {
                if(n.id === req.query?.slug){
                    return { ...updatedNota };
                }
                return { ...n };
            });

            await writeFile(filePath, JSON.stringify(result), 'utf-8');

            res.status(201).json(updatedNota);
        }catch (err) {
            const error = err as Error;
            const message = error.message || 'Something went wrong with updating data';
            res.status(400).json({message});
        }
    } else if(req.method === 'POST' && req.query.slug === 'delete') {
        try {
            const data = await readFile(filePath, 'utf-8');
            const arr = JSON.parse(data) as Array<INoteModel>;
            const notes = await schemaArr.validate(req.body);
            const result = arr.filter(n => !notes?.includes(n.id));

            await writeFile(filePath, JSON.stringify(result), 'utf-8');

            res.status(202).json('notes were deleted');
        }catch (err) {
            const error = err as Error;
            const message = error.message || 'Something went wrong with remoting data';
            res.status(400).json({message});
        }
    } else if(req.method === 'POST' && req.query.slug === 'archive') {
        try {
            const data = await readFile(filePath, 'utf-8');
            const arr = JSON.parse(data) as Array<INoteModel>;
            const notes = await schemaArr.validate(req.body);

            const result = arr.map(n => {
                if(notes?.includes(n.id)){
                    return {
                        ...n,
                        archived: !n.archived
                    }
                }
                return {
                    ...n
                }
            });

            let message = '';
            if(!!notes && arr.find(n => n.id === notes[0])) {
                message = arr.find(n => n.id === notes[0])?.archived ? 'unarchived' : 'archived';
            }

            await writeFile(filePath, JSON.stringify(result), 'utf-8');

            res.status(202).json(`notes were ${message}`);
        }catch (err) {
            const error = err as Error;
            const message = error.message || 'Something went wrong';
            res.status(400).json({message});
        }
    }
};

export default handler;
