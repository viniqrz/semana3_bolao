import Jogo from "./Jogo";

export default class Rodada {
  protected jogos: Jogo[];
  protected readonly numeroRodada: number;

  public constructor(numeroRodada: number) {
    this.jogos = [];
    this.numeroRodada = numeroRodada;
  }

  public addJogo(jogo: Jogo): void {
    this.jogos = [...this.jogos, jogo];
  }

  public getJogos(): Jogo[] {
    return this.jogos;
  }

  public getJogoById(jogoId: number): Jogo {
    return this.jogos.find((jogo) => jogo.getId() === jogoId);
  }

  /**
   * O horário de limite aposta de uma rodada é determinado pelo horário do jogo que ocorrer mais cedo.
   */
  public getHorarioLimiteAposta(): Date {
    return this.jogos.reduce((acc, cur) => {
      const dataHora = cur.getDataHora();
      if (dataHora <= acc) return dataHora;
      return acc;
    }, new Date());
  }
}
