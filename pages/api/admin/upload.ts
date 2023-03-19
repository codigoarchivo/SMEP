import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary';
// import fs from 'fs';

/* Configuring the cloudinary library with the cloudinary url. */
cloudinary.config(process.env.CLOUDINARY_URL || '');

type Data = {
    message: string
}

export const config = {
    api: {
        bodyParser: false,
    }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return uploadFile(req, res);

        default:
            res.status(400).json({ message: 'Bad request' });
    }
}

const uploadFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    /* Parsing the file and saving it to the public folder. */
    const imageUrl = await parseFiles(req);

    /* Returning the imageUrl to the frontend. */
    return res.status(200).json({ message: imageUrl });
}

const parseFiles = async (req: NextApiRequest): Promise<string> => {
    return new Promise((resolve, reject) => {
        /* Creating a new instance of the formidable.IncomingForm class. */
        const form = new formidable.IncomingForm();

        /* Parsing the file and saving it to the public folder. */
        form.parse(req, async (err, fields, files) => {
            // console.log({ err, fields, files });
            if (err) return reject(err);

            /* Saving the file to the public folder. */
            const filePath = await saveFile(files.file as formidable.File)
            resolve(filePath);
        })
    })
}


const saveFile = async (file: formidable.File): Promise<string> => {
    /* Saving the file to the public folder. */
    // const data = fs.readFileSync(file.filepath);
    // fs.writeFileSync(`./public/${file.originalFilename}`, data);
    // fs.unlinkSync(file.filepath); // elimina
    // return;

    /* Uploading the file to the cloudinary server. */
    const { secure_url } = await cloudinary.uploader.upload(file.filepath);
    return secure_url;

}