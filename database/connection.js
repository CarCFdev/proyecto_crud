
import pkg from 'pg';
const { Pool } = pkg;

// Configuración de la conexión a la base de datos en Render
const pool = new Pool({
    connectionString: 'postgresql://carpw:dm01T4PiP9N4naBSKoiGmlt5aSRemfWE@dpg-cpiu6k21hbls73bn8d1g-a.oregon-postgres.render.com/dbapp_i2oj',
    ssl: {
        rejectUnauthorized: true // Necesario si Render requiere SSL y no tienes certificados configurados
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