# Semana 3 - NodeJS, Bibliotecas Padrões e Event Loop.

## File System

```typescript
import fs from "fs";

fs.writeFileSync("filename.txt", "Hello World!");

const data = fs.readFileSync("filename.txt");
console.log(data.toString());
```

### Buffer

Nem sempre o NodeJS vai trabalhar com todo o conteúdo de um arquivo em memória de uma só vez, portanto as biblitoecas 
costumam retornar e aceitar parametros do tipo Buffer.

### JSON

JSON é um padrão de escrita de objetos em muito utilizada para transportar informações de um lugar para o outro.
Exemplos comuns de uso são:
  - Corpo de requisições e respotas HTTP.
  - Escritas em arquivos de dados e mais popularmente configurações:
    - package.json
    - tsconfig.json

```typescript
import fs from "fs";
import Time from "./src/models/Time";

const timesFileContent: Buffer = fs.readFileSync("./files/times.json");

type TimeFile = {
  id: number;
  nome: string;
  estado: string;
};

const timesFile = JSON.parse(timesFileContent.toString()) as TimeFile[];

const times: Time[] = [];
for (const timeFile of timesFile) {
  times.push(new Time(timeFile.id, timeFile.nome, timeFile.estado));
}

times.sort((t1, t2) => t1.getId() - t2.getId());

fs.writeFileSync("./files/times-por-id.json", JSON.stringify(times, null, 2));
```


## Project Structure - Repositories

- JogosRepository
- TimesRepository

## Cripto

## Sync vs Async
### Performance
### Event-Loop
## Exercicio implementar as funções anteriores porém agora serão async.

## Erros e Exceptions

