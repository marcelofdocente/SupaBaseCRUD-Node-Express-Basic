
//app.js - Back-End
const express = require('express');
const cors = require('cors'); //importa a biblioteca cors
//biblioteca para manipular dados com Banco de Dados Supabase
const { createClient } = require('@supabase/supabase-js');
// Credenciais da sua base de dados Supabase
const supabaseUrl = 'https://obrtgyxyjvxjoirowjhe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9icnRneXh5anZ4am9pcm93amhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5MTc1NTMsImV4cCI6MjA0MzQ5MzU1M30.H1Qfamo2091ThoO4vEiw5iuL0sRzkT4ETo8xx3rBm2I';
// Cria um cliente Supabase
const supabase = createClient(supabaseUrl, supabaseKey);


//exporta a variavel supabase
// a variável supabase precisa estar disponível para todos os arquivos que precisam acessar a Supabase
//module.exports = { supabase }; // Corrigido: supabase (com 's')
module.exports = supabase; // exporta o cliente Supabase

const app = express();
const port = 3000;

// Habilita CORS para permitir requisições da interface web
app.use(cors()); //aplica o middleware cors a todas as rotas
app.use(express.json()); // Middleware para analisar dados JSON


//Rotas de Usuarios - importa as rotas de users.js
const usersRouter = require('./routes/users'); //ajusta o caminho caso necessário
//define o prefixo para as rotas de usuarios
//O primeiro argumento ('/users') define o prefixo para todas as rotas 
//definidas em usersRouter. Isso significa que todas as rotas dentro do 
//usersRouter serão acessíveis através de http://localhost:3000/users/
app.use('/users', usersRouter);


// Inicia o servidor
app.listen(port, async () => {
  console.log(`Servidor iniciado na porta ${port}`);
});

