'use server';

import * as fs from 'fs';
import { parse } from 'csv-parse';
import path from 'path';

export type Record = {
  month: number;
  hour: number;
  sum_of_percentages: number;
  production: number;
};

const pvout = 2250;
const transformRecord = (record: Omit<Record, 'production'>): Record => {
  const { month, hour, sum_of_percentages } = record;
  const production = Math.round(sum_of_percentages * pvout);
  return { month, hour, sum_of_percentages, production };
};

export const parseCSV = async (csvPath: string): Promise<Record[]> => {
  return new Promise((resolve, reject) => {
    const records: Record[] = [];
    //   Create a stream for reading the file

    const readStream = fs.createReadStream(
      path.join(process.cwd(), 'public', csvPath)
    );

    //   Create the parser
    const parser = parse({ columns: true, trim: true, cast: true });

    //   Pipe the stream through csv parser
    readStream
      .pipe(parser)
      .on('data', (data) => {
        records.push(transformRecord(data));
      })
      .on('end', () => {
        console.log('CSV file processing complete.');
        resolve(records);
      })
      .on('error', (err) => {
        console.error('An error occurred');
        reject(err);
      });
  });
};
