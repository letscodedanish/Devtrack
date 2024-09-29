import fs from 'fs';
import path from 'path';

export const fetchSheetData = async (sheetId: string) => {
  const sheetPath = path.join(process.cwd(), 'sheets', `${sheetId}.json`);
  const fileContent = fs.readFileSync(sheetPath, 'utf-8');
  const sheetData = JSON.parse(fileContent);
  return sheetData;
};
