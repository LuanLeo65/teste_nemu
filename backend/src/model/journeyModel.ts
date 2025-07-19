//src/model/journeyModel.ts
import xlsx from "xlsx";
import fs from 'fs/promises'

async function read(file: string) {
  try {
    const workbook = xlsx.readFile(file);

    //captura a primeira aba da planilha
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    //transforma o arquivo em objeto json
    const data = xlsx.utils.sheet_to_json(sheet);

    //apaga o arquivo temporario da pasta uploads
    await fs.unlink(file);

    return data;
  } catch (error) {
    console.log(`Erro no read do models:  ${error}`);
  }
}

export default { read };
