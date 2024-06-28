import pg from 'pg';


const pool = new Pool({
    connectionString: 'postgresql://carpw:dm01T4PiP9N4naBSKoiGmlt5aSRemfWE@dpg-cpiu6k21hbls73bn8d1g-a.oregon-postgres.render.com/dbapp_i2oj',
    ssl: {
        rejectUnauthorized: false, // Cambia a true si tienes el certificado CA
        // Puedes configurar el certificado CA si Render lo proporciona
    }
});
    

// Verificar la conexión inicial
pool.connect((err, client, done) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conexión establecida con la base de datos PostgreSQL en Render');
        done(); // Liberar el cliente de la conexión
    }
});

export default pool;


/*import "dotenv/config";
import pkg from 'pg'
const {Pool} = pkg;

const pool= new Pool({
    connectionString: "postgresql://carpw:dm01T4PiP9N4naBSKoiGmlt5aSRemfWE@dpg-cpiu6k21hbls73bn8d1g-a.oregon-postgres.render.com/dbapp_i2oj",
    ssl: true
     // allowExitOnIdle: true,
});

try{
    await pool.query("SELECT NOW()");
    console.log("Database connected");

}catch(error){
    console.log(error);
}


export default pool;
*/
