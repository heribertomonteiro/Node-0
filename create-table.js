import  { sql } from './db.js'

// sql`DROP TABLE IF EXISTS videos;`.then(()=>{
//     console.log('Tabela  APAGADA')
// })

sql `
CREATE TABLE videos (
    id text primary key,
    title VARCHAR (255),
    description VARCHAR (255),
    duration INT
  );
`.then(()=>{
    console.log('Tabela Criada!')
})