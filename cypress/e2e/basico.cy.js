describe('Gestión de Feriados', () => {
    it('Carga la página principal', () => {
      cy.visit('https://proyecto-crud.onrender.com/');
      cy.contains('Ingresar Feriado').should('be.visible');
    });
  });

// Prueba para agregar un feriado
describe('Agregar Feriado', () => {
    it('Debería agregar un feriado correctamente', () => {
        cy.visit('http://localhost:3000');

        cy.get('#nombre').type('Año nuevo');
        cy.get('#fecha').type('2024-01-01'); 

        
        cy.get('#cargarFeriadoForm').submit();

        cy.contains('Año nuevo').should('exist');
    });
});

describe('Actualizar Feriado', () => {
    it('Debería actualizar el nombre de un feriado', () => {
        cy.visit('http://localhost:3000'); // Cambia la URL según corresponda

        // Esperar a que el formulario esté presente
        cy.get('#actualizarFeriadoForm', { timeout: 10000 }).should('exist');

        // Rellenar el formulario de actualización
        cy.get('#nombreActual').type('Feriado de Prueba');
        cy.get('#nuevoNombre').type('Nuevo Feriado');
        cy.get('#fechaActual').clear(); 
        cy.get('#nuevaFecha').clear(); 

        //envia el formulario de actualización
        cy.get('#actualizarFeriadoForm').submit();

        // verifica que el nombre del feriado este actualizado
        cy.contains('Nuevo Feriado', { timeout: 10000 }).should('exist');
        cy.contains('Feriado de Prueba', { timeout: 10000 }).should('not.exist');
    });

    it('Debería actualizar la fecha de un feriado', () => {
        cy.visit('http://localhost:3000'); 

        // espera a que el formulario esté presente
        cy.get('#actualizarFeriadoForm', { timeout: 10000 }).should('exist');

        cy.get('#nombreActual').type('Nuevo Feriado');
        cy.get('#nuevaFecha').type('2023-07-01'); 
        cy.get('#fechaActual').clear(); 
        cy.get('#nuevoNombre').clear(); 

        cy.get('#actualizarFeriadoForm').submit();

        cy.contains('2023-07-01', { timeout: 10000 }).should('exist');
    });
});



describe('Eliminar Feriado', () => {
    it('Debería eliminar un feriado por nombre', () => {
        cy.visit('http://localhost:3000'); 

        cy.get('#nombreEliminar').type('Nuevo feriado');
        cy.get('#fechaEliminar').clear(); 
        cy.get('#eliminarFeriadoForm').submit();


    });

    it('Debería eliminar un feriado por fecha', () => {
        cy.visit('http://localhost:3000'); 
        cy.get('#nombreEliminar').clear(); 
        cy.get('#fechaEliminar').type('2024-01-01'); 
   
        cy.get('#eliminarFeriadoForm').submit();

    });
});