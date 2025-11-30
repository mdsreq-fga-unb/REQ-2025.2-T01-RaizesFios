# Estágio 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependências (incluindo devDependencies para o build)
RUN npm ci

# Copiar código fonte
COPY . .

# Gerar cliente Prisma e Buildar o TypeScript
RUN npm run prisma:generate
RUN npm run build

# Estágio 2: Produção
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copiar apenas arquivos necessários do estágio de build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

# Expor a porta
EXPOSE 3000

# Comando de inicialização (roda migrações antes de iniciar)
CMD ["/bin/sh", "-c", "npx prisma migrate deploy && npm run start"]
