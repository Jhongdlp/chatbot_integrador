function doPost(e) {
    // 1. Obtener la hoja activa
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // 2. Parsear los datos recibidos (JSON)
    var data = JSON.parse(e.postData.contents);

    // 3. Agregar los datos. 
    // IMPORTANTE: El orden aquí debe coincidir con las columnas de tu hoja de cálculo.
    sheet.appendRow([
        new Date(),              // Columna A: Fecha y Hora
        data.nombres,            // Columna B: Nombres
        data.apellidos,          // Columna C: Apellidos
        data.cedula,             // Columna D: Cédula
        data.email,              // Columna E: Email
        "'" + data.telefono,     // Columna F: Teléfono (Comilla forja texto para evitar notación científica)
        data.edad,               // Columna G: Edad
        data.genero,             // Columna H: Género
        data.institucion,        // Columna I: Institución
        data.provincia,          // Columna J: Provincia
        data.canton,             // Columna K: Cantón
        data.observaciones       // Columna L: Observaciones
    ]);

    // 4. Retornar respuesta exitosa (formato JSON)
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
        .setMimeType(ContentService.MimeType.JSON);
}

// Función de prueba (opcional, para depurar en el editor)
function testAppend() {
    var mockData = {
        nombres: "Juan",
        apellidos: "Pérez",
        cedula: "1712345678",
        email: "test@ejemplo.com",
        telefono: "0991234567",
        edad: "18 a 24 años",
        genero: "Masculino",
        institucion: "Emprendedor",
        provincia: "Pichincha",
        canton: "Quito",
        observaciones: "Prueba de script"
    };

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
        new Date(),
        mockData.nombres,
        mockData.apellidos,
        mockData.cedula,
        mockData.email,
        "'" + mockData.telefono,
        mockData.edad,
        mockData.genero,
        mockData.institucion,
        mockData.provincia,
        mockData.canton,
        mockData.observaciones
    ]);
}
