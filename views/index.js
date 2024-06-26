async function listarFeriados() {
    try {
        const response = await fetch('/feriados');
        const feriados = await response.json();
        let tablaHTML = '<table border="1"><thead><tr><th>Nombre</th><th>Fecha</th></tr></thead><tbody>';

        feriados.forEach(function(feriado) {
            // Formatear la fecha en formato YYYY-MM-DD
            const fechaFormateada = new Date(feriado.fecha).toISOString().split('T')[0];
            
            tablaHTML += `<tr><td>${feriado.nombre}</td><td>${fechaFormateada}</td></tr>`;
        });

        tablaHTML += '</tbody></table>';
        document.getElementById('tablaFeriados').innerHTML = tablaHTML;
    } catch (error) {
        console.error('Error al obtener feriados:', error);
    }
}
document.getElementById('cargarFeriadoForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    const nombre = document.getElementById('nombre').value;
    const fecha = document.getElementById('fecha').value;

    try {
        const response = await fetch('/cargarFeriado', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, fecha }),
        });
        const data = await response.json();

        if (response.ok) {
            // Si la respuesta es exitosa (status 200), mostrar mensaje de éxito
            document.getElementById('mensajeExito').innerText = data.message;
            document.getElementById('mensajeError').innerText = ''; // Limpiar mensaje de error si hay alguno
        } else {
            // Si hay un error (status diferente de 200), mostrar el mensaje de error del servidor
            document.getElementById('mensajeError').innerText = data.error;
            document.getElementById('mensajeExito').innerText = ''; // Limpiar mensaje de éxito si hay alguno
        }

        // Limpiar el formulario después de enviar
        document.getElementById('cargarFeriadoForm').reset();

        // Actualizar la tabla de feriados después de agregar (si es necesario)
        listarFeriados();
    } catch (error) {
        console.error('Error al agregar feriado:', error);
        document.getElementById('mensajeError').innerText = 'Error al intentar agregar feriado';
        document.getElementById('mensajeExito').innerText = ''; // Limpiar mensaje de éxito si hay alguno
    }
});

/*

document.getElementById('cargarFeriadoForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    const nombre = document.getElementById('nombre').value;
    const fecha = document.getElementById('fecha').value;

    try {
        const response = await fetch('/cargarFeriado', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, fecha }),
        });
        const data = await response.json();
        document.getElementById('mensajeExito').innerText = data.message;

        // Limpiar el formulario después de enviar
        document.getElementById('cargarFeriadoForm').reset();

        // Actualizar la tabla de feriados después de agregar
        listarFeriados();
    } catch (error) {
        console.error('Error al agregar feriado:', error);
    }
});
*/

document.getElementById('eliminarFeriadoForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    const nombreEliminar = document.getElementById('nombreEliminar').value;
    const fechaEliminar = document.getElementById('fechaEliminar').value;

    try {
        // Enviar la solicitud DELETE a la ruta /eliminarFeriado
        const response = await fetch(`/eliminarFeriado`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre: nombreEliminar, fecha: fechaEliminar }),
        });

        // Verificar si la eliminación fue exitosa
        if (response.ok) {
            const data = await response.json();
            console.log('Feriado eliminado:', data);

            // Mostrar mensaje de éxito
            document.getElementById('mensajeExito').innerText = data.message;

            // Actualizar la tabla de feriados después de eliminar
            listarFeriados(); // Suponiendo que listarFeriados() ya está definido y actualiza la tabla
        } else {
            // Manejar errores de solicitud
            throw new Error('Error al eliminar feriado');
        }
    } catch (error) {
        console.error('Error al eliminar feriado:', error);
    }
});


document.getElementById('actualizarFeriadoForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    const nombreActual = document.getElementById('nombreActual').value;
    const fechaActual = document.getElementById('fechaActual').value;
    const nuevoNombre = document.getElementById('nuevoNombre').value;
    const nuevaFecha = document.getElementById('nuevaFecha').value;

    try {
        const response = await fetch('/actualizarFeriado', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombreActual, fechaActual, nuevoNombre, nuevaFecha }),
        });
        if (response.ok) {
            // Actualizar la tabla de feriados después de actualizar
            listarFeriados();
        } else {
            console.error('Error al actualizar feriado');
        }
    } catch (error) {
        console.error('Error al actualizar feriado:', error);
    }
});


/*const formElement = document.getElementById("/cargarFeriado");
formElement.addEventListener("submit",(event)=>{
    event.preventDefault();
    let nombre = document.getElementById("nombre").value;
    let fecha = document.getElementById("fecha").value;
    let  feriado = {nombre: nombre , fecha: fecha};
    let feriadoJSON = JSON.stringify(feriado);
    console.log(feriadoJSON);

     */
 /* fetch('http://localhost:3000/agregarferiado', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: feriadoJSON
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
})*/


