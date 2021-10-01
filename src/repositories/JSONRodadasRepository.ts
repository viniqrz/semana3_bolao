import fs from "fs";
import Rodada from "../models/Rodada";
import RodadasRepository, {
  FindAllCallback,
  SaveCallback,
} from "./RodadasRepository";

const RODADAS_FILE_PATH = "./files/rodadas.json";

type RodadaFile = {
  numeroRodada: number;
};

export default class JSONRodadasRepository implements RodadasRepository {
  private rodadasFilePath: string;

  constructor(outrasRodadas?: string) {
    this.rodadasFilePath = outrasRodadas || RODADAS_FILE_PATH;
  }

  public findAll(): Rodada[] {
    try {
      const fileContent: Buffer = fs.readFileSync(this.rodadasFilePath);
      const rodadas = JSON.parse(fileContent.toString()) as RodadaFile[];

      return rodadas.map(({ numeroRodada }) => new Rodada(numeroRodada));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Falha a carregar os rodadas. Motivo: ${error.message}`
        );
      } else {
        throw error;
      }
    }
  }

  public save(rodadas: Rodada[]): void {
    try {
      fs.writeFileSync(this.rodadasFilePath, JSON.stringify(rodadas));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Falha ao salvar as rodadas. Motivo: ${error.message}`);
      } else {
        throw error;
      }
    }
  }

  public saveAsync(rodadas: Rodada[], callback: SaveCallback): void {
    fs.writeFile(this.rodadasFilePath, JSON.stringify(rodadas), {}, (error) => {
      if (error) {
        const err = new Error(
          `Falha ao salvar as rodadas. Motivo: ${error.message}`
        );

        callback(err);
        return;
      }

      callback(null);
    });
  }

  public findAllAsync(callback: FindAllCallback): void {
    fs.readFile(this.rodadasFilePath, (error, fileContent) => {
      if (error) {
        const err = new Error(
          `Falha a carregar os rodadas. Motivo: ${error.message}`
        );

        callback(err, null);
        return;
      }

      const rodadas = JSON.parse(fileContent.toString()) as RodadaFile[];
      const rodadasComClasse = rodadas.map(
        ({ numeroRodada }) => new Rodada(numeroRodada)
      );

      callback(null, rodadasComClasse);
    });
  }
}
