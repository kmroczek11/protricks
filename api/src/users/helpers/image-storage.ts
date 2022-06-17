import { FileUpload } from 'graphql-upload';
import { join, extname } from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';

type validFileExtension = '.png' | '.jpg' | '.jpeg';
type validMimeType = 'image/png' | 'image/jpg' | 'image/jpeg';

const validFileExtensions: validFileExtension[] = ['.png', '.jpg', '.jpeg'];
const validMimeTypes: validMimeType[] = [
  'image/png',
  'image/jpg',
  'image/jpeg',
];

export const saveImage = async (image: FileUpload, folder: string) => {
  const { filename, createReadStream, mimetype } = image;

  const extension = extname(filename) as validFileExtension;

  if (!validFileExtensions.includes(extension)) {
    throw new HttpException('Invalid extension', HttpStatus.BAD_REQUEST);
  }

  if (!validMimeTypes.includes(mimetype)) {
    throw new HttpException('Invalid mime type', HttpStatus.BAD_REQUEST);
  }

  const stream = createReadStream();

  const fileName = uuidv4() + extension;

  const filePath = folder + '/' + fileName;

  const imagesFolderPath = join(process.cwd(), `uploads`);

  const fullImagePath = join(imagesFolderPath + '/' + filePath);

  await stream.pipe(fs.createWriteStream(fullImagePath));

  return filePath;
};

export const removeFile = (filePath: string): void => {
  const filesFolderPath = join(process.cwd(), `uploads`);

  const fullFilePath = join(filesFolderPath + '/' + filePath);

  try {
    fs.unlinkSync(fullFilePath);
  } catch (err) {
    console.error(err);
  }
};
