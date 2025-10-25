# Imagem base
FROM node:20-alpine

# Cria diretório da aplicação
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta
EXPOSE 3000

# Comando pra rodar em dev
CMD ["npm", "run", "dev"]
