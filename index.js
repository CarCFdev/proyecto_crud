//import "dotenv/config";
import express from 'express';
const app = express();
import path from 'path'; // Importa el módulo 'path'
import cors from  'cors';
import pool from "./database/connection.js";
import { fileURLToPath } from 'url';

app.set("view engine","ejs");


app.use(express.static('views'));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/",function(req,res){
    res.render("registro");
})


app.use(
    express.urlencoded({
        extended : true
    })
)
app.use(express.json());

app.use(cors());








// Ruta GET para mostrar todos los feriados
app.get("/feriados", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM feriados");
        const feriados = result.rows; // Obtener filas de la consulta

        res.json(feriados); // Enviar los feriados como respuesta JSON
    } catch (error) {
        console.error("Error al obtener feriados:", error);
        res.status(500).json({ error: "Error al obtener feriados" });
    }
});


const normalizeString = (str) => {
    return str.toLowerCase().trim(); // Convertir a minúsculas y quitar espacios al inicio y final
};
app.post('/cargarFeriado', async (req, res) => {

    let { nombre, fecha } = req.body;  // Cambiar a let para permitir reasignación
    
    // Normalizar el nombre antes de verificar o insertar
    nombre = normalizeString(nombre);
    try {
        // Verificar si ya existe un feriado con el mismo nombre o fecha
        const query = 'SELECT * FROM feriados WHERE nombre = $1 OR fecha = $2';
        const result = await pool.query(query, [nombre, fecha]);

        if (result.rows.length > 0) {
            // Si se encuentra un feriado con el mismo nombre o fecha, no se agrega
            return res.status(400).json({ error: 'Ya existe un feriado con este nombre o fecha.' });
        }

        // Si no existe, proceder con la inserción
        await pool.query('INSERT INTO feriados (nombre, fecha) VALUES ($1, $2)', [nombre, fecha]);

        res.json({ message: 'Feriado agregado exitosamente.' });
    } catch (error) {
        console.error('Error al agregar feriado:', error);
        res.status(500).json({ error: 'Error interno al agregar feriado.' });
    }
});


app.delete('/eliminarFeriado', async (req, res) => {
    const { nombre, fecha } = req.body;
    try {
        let query = 'DELETE FROM feriados WHERE ';
        let queryParams = [];

        if (nombre) {
            query += 'nombre = $1';
            queryParams.push(nombre);
        } else if (fecha) {
            query += 'fecha = $1';
            queryParams.push(fecha);
        } else {
            return res.status(400).json({ error: 'Debe proporcionar al menos un nombre o una fecha para eliminar un feriado' });
        }

        const result = await pool.query(query, queryParams);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'No se encontró ningún feriado para eliminar' });
        }

        res.json({ message: `Feriado con ${nombre ? 'nombre' : 'fecha'} ${nombre || fecha} eliminado` });
    } catch (error) {
        console.error(`Error al eliminar feriado con ${nombre ? 'nombre' : 'fecha'} ${nombre || fecha}:`, error);
        res.status(500).json({ error: `Error al eliminar feriado con ${nombre ? 'nombre' : 'fecha'} ${nombre || fecha}` });
    }
});


app.put('/actualizarFeriado', async (req, res) => {
    const { nombreActual, fechaActual, nuevoNombre, nuevaFecha } = req.body;
    
    if (!nombreActual && !fechaActual) {
        return res.status(400).json({ message: 'Debe proporcionar el nombre o la fecha del feriado para actualizar' });
    }
    
    if (!nuevoNombre && !nuevaFecha) {
        return res.status(400).json({ message: 'Debe proporcionar un nuevo nombre o una nueva fecha para actualizar' });
    }
    
    let query = 'UPDATE feriados SET ';
    let queryParams = [];
    let updateFields = [];
    
    if (nuevoNombre) {
        updateFields.push('nombre = $1');
        queryParams.push(nuevoNombre);
    }
    
    if (nuevaFecha) {
        updateFields.push('fecha = $' + (queryParams.length + 1));
        queryParams.push(nuevaFecha);
    }
    
    let whereClause = '';
    
    if (nombreActual) {
        whereClause = 'nombre = $' + (queryParams.length + 1);
        queryParams.push(nombreActual);
    }
    
    if (fechaActual) {
        if (whereClause) whereClause += ' AND ';
        whereClause += 'fecha = $' + (queryParams.length + 1);
        queryParams.push(fechaActual);
    }
    
    query += updateFields.join(', ') + ' WHERE ' + whereClause;
    
    try {
        await pool.query(query, queryParams);
        res.json({ message: 'Feriado actualizado con éxito' });
    } catch (error) {
        console.error('Error al actualizar feriado:', error);
        res.status(500).json({ message: 'Error al actualizar feriado' });
    }
});


const PORT = process.env.PORT || 4000;
app.listen (PORT,()=>{
    console.log("server listening on port "+PORT);

})


