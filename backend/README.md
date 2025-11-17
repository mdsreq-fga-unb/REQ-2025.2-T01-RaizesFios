# Backend - Raízes&Fios

## Tecnologias
- Node.js
- Express
- Prisma ORM
- PostgreSQL
- Docker & Docker Compose

## Como iniciar

### 1. Crie seu .env
Copie o arquivo `.env.example`:
```shell
cp .env.example .env
```

### 2. Suba com Docker

```shell
docker-compose up -d
```


### 3. Verifique se está funcionando

Acesse: http://localhost:3000/api/health

### 4. Criar as tabelas Prisma no Container
No terminal:
```shell
docker exec -it rf_api sh
```
```shell
npx prisma migrate dev
```
```shell
exit
```


---

##  Estrutura

- `/src` → código da API
- `/prisma` → modelagem do banco de dados
- `Dockerfile` → imagem da API
- `docker-compose.yml` → Orquestra a subida tanto da api quanto do banco de dados


