import { readFile, readFileSync } from "fs";
import { pbkdf2, pbkdf2Sync } from "crypto";

const SECRET = "secret";

function calculaSha256(fileName: string): string {
  const fileContent = readFileSync(fileName);
  const buffer = pbkdf2Sync(SECRET, fileContent, 10000, 256, "sha256");
  return buffer.toString();
}

type CalculaSHA256CBK = (error: Error | null, sha256: string) => void;
function calculaSha256_v2(fileName: string, callback: CalculaSHA256CBK): void {
  readFile(fileName, (readFileError, fileContent) => {
    if (readFileError) {
      const errorLeituraArquivo = new Error(
        `Falha ao ler o arquivo, ${fileName}. Motivo: ${readFileError.message}`
      );

      callback(errorLeituraArquivo, null);
      return;
    }

    pbkdf2(SECRET, fileContent, 10000, 256, "sha256", (pbkdf2Error, result) => {
      if (pbkdf2Error) {
        const errorHash = new Error(
          `Falha ao aplicar o hash no arquivo, ${fileName}. Motivo: ${pbkdf2Error.message}`
        );

        callback(errorHash, null);
        return;
      }

      callback(null, result.toString());
    });
  });
}

// // IMPLEMENTACAO SINCRONA
// console.time("tempo_cripto_grafia");
// console.log("./node-v14.18.0.pkg pre");
// calculaSha256("./node-v14.18.0.pkg");
// console.log("./node-v16.10.0.pkg pre");
// calculaSha256("./node-v16.10.0.pkg");
// console.timeEnd("tempo_cripto_grafia");

// // IMPLEMENTACÃO ASSINCRONA
// console.time("tempo_cripto_grafia2A");
// console.time("tempo_cripto_grafia2B");
console.log("./node-v14.18.0.pkg pre");
calculaSha256_v2("./node-v14.18.0.pkg", (error, sha256: string) => {
  if (error) {
    console.log(error.message);
  } else {
    console.log("Hash 16 concluido", sha256.length);
  }
  // console.timeEnd("tempo_cripto_grafia2A");
});

console.log("./node-v16.10.0.pkg pre");
calculaSha256_v2("./node-v16.10.0.pkg", (error, sha256: string) => {
  if (error) {
    console.log(error.message);
  } else {
    console.log("Hash 16 concluido", sha256.length);
  }
  // console.timeEnd("tempo_cripto_grafia2B");
});
