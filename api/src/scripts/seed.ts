import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

import { AppDataSource } from '../data-source';

async function runSeed() {
  try {
    await AppDataSource.initialize();

    const sqlFilePath = path.resolve(__dirname, '..', 'init.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf8');

    await AppDataSource.query(sql);

    console.log('Seed executed successfully');
    await AppDataSource.destroy();
  } catch (error) {
    console.error('Error running seed:', error);
    process.exit(1);
  }
}

runSeed();