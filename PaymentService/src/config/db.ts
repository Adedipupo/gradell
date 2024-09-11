import { Pool } from 'pg';

// PostgreSQL connection pool configuration for User Service
export const db = new Pool({
  user: 'postgres', 
  host: '127.0.0.1',
  database: 'payment',   
  password: 'postgres',
  port: 5432,            
});

db.on('error', (err:any) => {
  console.error('Unexpected error on PostgreSQL User database client', err);
//   process.exit(-1);
});
