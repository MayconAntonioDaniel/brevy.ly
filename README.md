# brevy.ly

Um encurtador de URLs moderno, com backend em Fastify + Drizzle ORM + PostgreSQL e frontend em React + Zustand. O projeto utiliza Cloudflare R2 para armazenamento de arquivos.

## Como rodar o projeto

1. Clone o repositório e instale as dependências em `server` e `web`:
   ```sh
   cd server && npm install
   cd ../web && npm install
   ```
2. Configure o arquivo `.env` na pasta `server` com as variáveis necessárias (veja o exemplo em `.env.test`).
3. Suba o banco de dados PostgreSQL (há um `docker-compose.yml` em `server`).
   ```sh
   cd server
   docker compose up -d
   ```
4. Rode o backend:
   ```sh
   npm run build && npm start
   ```
5. Rode o frontend:
   ```sh
   cd ../web
   npm run dev
   ```

## Observação importante sobre download de CSV do Cloudflare

Ao baixar o CSV armazenado no Cloudflare R2, pode ocorrer um problema de rota: o Cloudflare cria uma rota extra com nome do seu Bucket. Se o download não iniciar automaticamente, adicione `/{nome do seu bucket}` após a sua URL pública.