import { readFileSync, writeFileSync } from "fs";
import crypto from "crypto";
import Usuario from "../src/models/Usuario";

function applyHash(senha: string): string {
  const secret = "secret_bem_incomum_da_galera_montar_tabelas";
  return crypto.createHmac("sha256", secret).update(senha).digest("hex");
}

const coleta = new Usuario(
  "Paulo Coleta",
  "coleta@rarolabs.com.br",
  applyHash("123456")
);

writeFileSync("usuarios.json", JSON.stringify([coleta]));

type CredenciaisJSON = {
  email: string;
  senha: string;
};

function login(email: string, senha: string) {
  const hashedPassword = applyHash(senha);
  const fileContent = readFileSync("usuarios.json").toString();
  const usuarios = JSON.parse(fileContent) as CredenciaisJSON[];
  const usuario = usuarios.find(
    (u) => u.email === email && u.senha === hashedPassword
  );
  console.log(usuario);
  if (usuario === undefined) {
    console.log("Usuario não encontrado");
  } else {
    console.log("Bem vindo");
  }
}

console.time("tempo_2_logins");
login("coleta@rarolabs.com.br", "123455");
login("coleta@rarolabs.com.br", "123456");
console.timeEnd("tempo_2_logins");
