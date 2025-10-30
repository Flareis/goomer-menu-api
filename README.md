#  Goomer Menu API

API desenvolvida como parte de um desafio técnico, responsável por gerenciar produtos e promoções de um cardápio digital.  
Construída com **Node.js + Express + TypeScript**, utilizando **MySQL** como banco de dados.

---

## Funcionalidades

- **GET /menu** → Retorna produtos visíveis (`visibility = 1`) com promoções ativas anexadas  
- **GET /products** → Lista todos os produtos ativos 
- **GET /promotions** → Lista as promoções cadastradas

Cada produto pode conter uma promoção ativa, considerando:
- Dias da semana (`week_days`)
- Horário de início e fim (`start_time`, `end_time`)

---

## Arquitetura

O projeto segue uma estrutura modular inspirada em **Clean Architecture**, separando responsabilidades em camadas:

    src/
    ├── controllers/
    ├── entities/
    ├── infra/database
    ├── repositories/
    ├── routes/
    └── services/

---

## Configuração do Ambiente
1. Clonar o repositório

    git clone https://github.com/Flareis/goomer-menu-api.git

    cd goomer-menu-api

2. Instalar dependências

        npm install

3. Criar arquivo .env

Crie um arquivo .env na raiz do projeto:
    
    PORT=3000
    DATABASE_HOST=localhost
    DATABASE_PORT=3306
    DATABASE_USER=root
    DATABASE_PASSWORD=root
    DATABASE_NAME=goomer

### OBS: 
Use localhost se estiver rodando o MySQL localmente.
Dentro do Docker, o DB_HOST será automaticamente substituído por db.

4. Rodando com Docker (recomendado)

Certifique-se de ter Docker e Docker Compose instalados. Depois, execute:

    docker compose up --build
Isso irá subir o MySQL e a API

Executar migrações com:

    npm run migrate

Disponibilizar a aplicação em:
👉 http://localhost:3000/api/menu

5. Rodando localmente (sem Docker)

Caso prefira rodar sem containers:

    npm run build
    npm start

ou em modo desenvolvimento:

   npm run dev

6. Documentação da API (Swagger)

A documentação completa da API está disponível através do Swagger UI:

- Local: http://localhost:3000/api/docs
- Docker: http://[DOCKER_HOST]:3000/api/docs

7. Endpoints da API:

| Método | Endpoint                           | Descrição                                  |
| ------ | ---------------------------------- | ------------------------------------------ |
| GET    | `/api/menu`                        | Lista produtos visíveis + promoções ativas |
| POST   | `/api/products`                    | Cria um novo produto                       |
| GET    | `/api/products`                    | Lista todos os produtos                    |
| GET    | `/api/products/:id`                | Busca produto por ID                       |
| PUT    | `/api/products/:id`                | Atualiza um produto                        |
| DELETE | `/api/products/:id`                | Remove um produto                          |
| POST   | `/api/promotions`                  | Cria uma nova promoção                     |
| GET    | `/api/promotions`                  | Lista todas as promoções                   |
| GET    | `/api/promotions/activePromotions` | Lista promoções ativas no momento          |
| GET    | `/api/promotions/:id`              | Busca promoção por ID                      |
| PUT    | `/api/promotions/:id`              | Atualiza uma promoção                      |
| DELETE | `/api/promotions/:id`              | Remove uma promoção                        |


7. Exemplo de resposta /menu

        [
          {
            "id": 1,
            "name": "X-Burger",
            "price": 25.90,
            "category": "Lanches",
            "promotion": {
              "description": "Promoção de segunda!",
              "price": 19.90,
              "week_days": "mon",
              "start_time": "10:00",
              "end_time": "22:00"
            }
          }
        ]

8. Tecnologias utilizadas

 - Node.js
 - Express
 - TypeScript
 - MySQL
 - Docker
 - ESLint / Prettier

 ---

## Desafios e Melhorias Futuras

1. **Tipagem de week_days**: 
   - Atualmente: string no banco vs array na aplicação
   - Melhoria proposta: Implementar enum para padronizar os dias da semana e garantir consistência

2. **Validação de horários**:
   - Atualmente: validação básica de formato HH:mm
   - Melhoria: Tratar promoções que vão além da meia-noite e validar intervalo mínimo de 15 minutos, neste caso.

## Autora

 **Flávia dos Reis**
 
 **Desenvolvedora Backend Node.js**

  [GitHub](https://github.com/Flareis)     •    [LinkedIn](https://www.linkedin.com/in/flaviadosreis)
