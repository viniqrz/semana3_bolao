import Time from "./src/models/Time";
import Rodada from "./src/models/Rodada";

import JSONTimesRepository from "./src/repositories/JSONTimesRepository";
import JSONRodadasRepository from "./src/repositories/JSONRodadasRepository";

const timesRepository = new JSONTimesRepository("./files/times.json");
const rodadasRepository = new JSONRodadasRepository();

timesRepository.findAllAsync((error, times) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log(times.length);

  function geraCalendarioCampeonato(
    times: Time[],
    dataPrimeiroJogo: Date
  ): Rodada[] {
    // @todo Gerar um calendário de pontos corridos com ida e volta.
    // jogos serão nas quartas as 21:30 e nos domingos as 16:00.
    // Primeiro jogo será conforme o parametro
    return [];
  }

  console.log("Gerando as rodadas");
  const rodadas = geraCalendarioCampeonato(times, new Date(2021, 5, 23));

  console.log("Rodadas geradas com sucesso");
  rodadasRepository.saveAsync(rodadas, (error) => {
    if (error) {
      console.log("Error ao salvar as rodadas", error);
    } else {
      console.log("Rodadas salvas com sucesso");
    }
  });
});
