# brevy.ly

Um encurtador de URLs moderno, com backend em Fastify + Drizzle ORM + PostgreSQL e frontend em React + Zustand. O projeto utiliza Cloudflare R2 para armazenamento de arquivos.

## Como rodar o projeto

1. Clone o repositório e instale as dependências em `server` e `web`:
   ```sh
   cd server && npm install
   cd ../web && npm install
   ```
2. Suba o banco de dados PostgreSQL (há um `docker-compose.yml` em `server`).
   ```sh
   cd server
   docker compose up -d
   ```
3. Rode o backend:
   ```sh
   npm run build && npm start
   ```
4. Rode o frontend:
   ```sh
   cd ../web
   npm run dev
   ```

## Observação importante sobre download de CSV do Cloudflare

Ao baixar o CSV armazenado no Cloudflare R2, pode ocorrer um problema de rota: o Cloudflare cria uma rota extra chamada `/short-url`. Se o download não iniciar automaticamente, adicione `/short-url` ao final da URL no navegador para concluir o download corretamente.