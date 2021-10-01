import Usuario from "./Usuario";
import ApostaJogo from "./ApostaJogo";

export default class ApostaRodada {
  protected readonly usuario: Usuario;
  protected readonly apostasJogos: ApostaJogo[];

  public constructor(usuario: Usuario, apostasJogos: ApostaJogo[]) {
    this.usuario = usuario;
    this.apostasJogos = apostasJogos;
  }

  /**
   * Atualiza a pontução de cada jogo na Rodada e retorna a pontuacão total do usuario.
   *
   * @return a pontuação do usuário na rodada
   */
  public atualizaPontuacao(): number {
    return this.apostasJogos.reduce((a, b) => a + b.atualizaPontuacao(), 0);
  }
}
