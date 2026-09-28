const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');



const pool = new Pool({
  host: 'localhost',       // Geralmente 'localhost' ou um IP/endereço
  user: 'postgres',          // Seu usuário do Postgres
  password: 'jay123',      // Sua senha
  database: 'outro',       // Nome do banco de dados
  port: 5432,              // Porta padrão do Postgres
});


const adapter = new PrismaPg(pool);

process.env.PORT = 3000;

module.exports = new PrismaClient({ adapter });