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

const pvout = 2220;
const transformRecord = (
  record: Omit<Record, 'production'>,
  globalCapacity: number
): Record => {
  const { month, hour, sum_of_percentages } = record;
  const production = Math.round(sum_of_percentages * pvout * globalCapacity);
  return { month, hour, sum_of_percentages, production };
};

export const parseCSV = async (
  csvReadStream: any,
  globalCapacity: number
): Promise<Record[]> => {
  return new Promise((resolve, reject) => {
    const records: Record[] = [];

    //   Create the parser
    const parser = parse({ columns: true, trim: true, cast: true });

    //   Pipe the stream through csv parser
    csvReadStream
      .pipe(parser)
      .on('data', (data: any) => {
        records.push(transformRecord(data, globalCapacity));
      })
      .on('end', () => {
        console.log('CSV file processing complete.');
        resolve(records);
      })
      .on('error', (err: any) => {
        console.error('An error occurred');
        reject(err);
      });
  });
};
