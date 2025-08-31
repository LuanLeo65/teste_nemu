//src/model/journeyModel.ts
import xlsx from "xlsx";

async function read(file: string) {
  try {
    const workbook = xlsx.readFile(file);

    //captura a primeira aba da planilha
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    //transforma o arquivo em objeto json
    const data = xlsx.utils.sheet_to_json(sheet);

    return data;
  } catch (error) {
    console.log(`Erro no read do models:  ${error}`);
  }
}

export default { read };
