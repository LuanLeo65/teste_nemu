//__tests__/journeys.test.ts
import { jest, describe, expect, it, afterEach, afterAll} from '@jest/globals'
import request from "supertest";
import app from "../src/app";
import repository from "../src/model/journeyModel";
import path from 'path'
import fs from 'fs/promises'

const journey = [
  {
    utm_source: "facebook",
    utm_campaign: "campaign_teste",
    utm_medium: "medium_teste",
    utm_content: "content_teste",
    sessionId: "session_id_teste",
    created_At: '2025-01-01T10:00:00Z'
  },

  {
    utm_source: "google",
    utm_campaign: "campaign_teste",
    utm_medium: "medium_teste",
    utm_content: "content_teste",
    sessionId: "session_id_teste",
    created_At: '2025-01-01T11:00:00Z'
  },
];


afterEach(async () => {
  const dir = path.join(__dirname, '../uploads');
  const files = await fs.readdir(dir);
  await files.map(f => fs.unlink(path.join(dir, f)));
})

afterAll(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe("Testando as chamadas referente a journeys", () => {
  it("GET /journeys , deve retornar 200", async () => {
    jest.spyOn(repository, "read").mockResolvedValue(journey);

    const result = await request(app)
      .get("/journeys")
      .attach("file", Buffer.from("fake content"), "fake.xlsx");

    expect(result.status).toBe(200);
    expect(result.body.session_id_teste).toEqual(['facebook', 'google'])
  });

  it("GET /journeys , deve retornar 400, quando nao mandar nenhum arquivo", async () => {
    jest.spyOn(repository, "read").mockResolvedValue(journey);

    const result = await request(app).get("/journeys");

    expect(result.status).toBe(400);
    expect(result.body.erro).toBe("Arquivo nao enviado/encontrado");
  });

  it("GET /journeys , deve retornar 400, quando arquivo vier vazio", async () => {
    jest.spyOn(repository, "read").mockResolvedValue(undefined);

    const result = await request(app)
      .get("/journeys")
      .attach("file", Buffer.from("fake content"), "fake.xlsx");

    expect(result.status).toBe(400);
    expect(result.body.erro).toBe("Erro na leitura das jornadas");
  });

  it("GET /journeys , deve retornar 500, erro inesperado", async () => {
    jest.spyOn(repository, "read").mockRejectedValue("Erro interno");

    const result = await request(app)
      .get("/journeys")
      .attach("file", Buffer.from("fake content"), "fake.xlsx");

    expect(result.status).toBe(500);
    expect(result.body.erro).toBe(
      "Ocorreu um erro interno durante a chamada das jornadas"
    );
  });
});
