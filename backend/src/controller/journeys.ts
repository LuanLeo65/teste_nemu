//src/controller/journeys.ts
import { Response, Request } from "express";
import  readFile  from "../model/journeyModel";
import { IJourneyArray } from "../model/journey";

async function getJourneys(req: Request, res: Response, next: any) {
  try {
    //Captura o arquivo enviado e faz uma verificação
    const file = req.file?.path;
    if (!file)
      return res.status(400).json({ erro: "Arquivo nao enviado/encontrado" });

    //Le o arquivo enviado e faz a verificação
    const fileObject = await readFile.read(file) as IJourneyArray;
    if (!fileObject)
      return res.status(400).json({ erro: "Erro na leitura das jornadas" });

    //Agrupa todos que contem o mesmo sessionId
    const agrouped: Record<
      string,
      { utm_source: string; createdAt: string }[]
    > = {};

    fileObject.forEach((item) => {
      if (!agrouped[item.sessionId]) agrouped[item.sessionId] = [];
      if (item.created_At)
        agrouped[item.sessionId].push({
          utm_source: item.utm_source,
          createdAt: item.created_At,
        });
    });

    //Coloca em ordem atraves da data de criação
    for (const sessionId in agrouped) {
      agrouped[sessionId].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }

    //Objeto final que ira conter o resultado
    const result: Record<string, string[]> = {};

    //loop para deixar apenas o nome do touchpoint no array(utm_source)
    for (const sessionId in agrouped) {
      const utms = agrouped[sessionId].map((item) => item.utm_source);

      //Se conter 2, ja adiciona os dois no resultado e continua
      if (utms.length <= 2) {
        result[sessionId] = utms;
        continue;
      }
      //captura o primeiro indice, o ultimo, e o meio das informacoes
      const firstJourney = utms[0];
      const lastJourney = utms[utms.length - 1];
      const middleJourney = utms.slice(1, utms.length - 1);

      //Faz a verificação e nao deixa ter repetido, com a parte do meio das informações
      const uniqueMiddle = [...new Set(middleJourney)];


      result[sessionId] = [firstJourney, ...uniqueMiddle, lastJourney];
    }

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ erro: "Ocorreu um erro interno durante a chamada das jornadas" });
  }
}

export default { getJourneys };
