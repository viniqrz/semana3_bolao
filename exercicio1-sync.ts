import Time from "./src/models/Time";
import Rodada from "./src/models/Rodada";

import JSONTimesRepository from "./src/repositories/JSONTimesRepository";
import JSONRodadasRepository from "./src/repositories/JSONRodadasRepository";

function geraCalendarioCampeonato(
  times: Time[],
  dataPrimeiroJogo: Date
): Rodada[] {
  // @todo Gerar um calendário de pontos corridos com ida e volta.
  // jogos serão nas quartas as 21:30 e nos domingos as 16:00.
  // Primeiro jogo será conforme o parametro
  return [];
}

const timesRepository = new JSONTimesRepository("./files/times.json");
const rodadasRepository = new JSONRodadasRepository();

try {
  const times = timesRepository.findAll();
  console.log("Quantidade de times: ", times.length);
  console.log("Gerando as rodadas");
  const rodadas = geraCalendarioCampeonato(times, new Date(2021, 5, 23));
  console.log("Rodadas geradas com sucesso");
  rodadasRepository.save(rodadas);
  console.log("Rodadas salvas com sucesso");
} catch (error) {
  if (error instanceof Error) {
    console.log("Algo deu errado", error.message);
  } else {
    console.log("Algo deu muito errado", error);
  }
}
