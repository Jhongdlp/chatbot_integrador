# Configuración de Google Apps Script

Para que los formularios funcionen, necesitas copiar este script en tu proyecto de Google Apps Script y configurar las pestañas de tu Hoja de Cálculo NOJOS.

## 1. El Script (Code.gs)

Copia y pega este código en tu editor de Apps Script:

```javascript
/**
 * SCRIPT MAESTRO EMPODERATECH
 * Recibe datos de 'DiagnosisForm' (convocatoria) y 'BrigadasForm' (brigadas)
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  
  // Intenta obtener el bloqueo por 30 segundos
  try {
    lock.waitLock(30000); 
  } catch (e) {
    return createJSONOutput({ result: 'error', error: 'Servidor ocupado, intente nuevamente.' });
  }

  try {
    // 1. Validar que lleguen datos
    if (!e || !e.postData || !e.postData.contents) {
      return createJSONOutput({ result: 'error', error: 'No se recibieron datos POST válidos.' });
    }

    var rawData;
    try {
      rawData = JSON.parse(e.postData.contents);
    } catch (parseError) {
      return createJSONOutput({ result: 'error', error: 'Error al procesar JSON: ' + parseError.toString() });
    }

    // 2. Abrir la hoja de cálculo activa
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var targetSheetName = "";

    // 3. Seleccionar pestaña según formType
    if (rawData.formType === "brigadas") {
      targetSheetName = "Brigadas";
    } else if (rawData.formType === "convocatoria") {
      targetSheetName = "Convocatoria";
    } else {
      return createJSONOutput({ result: 'error', error: 'Tipo de formulario desconocido: ' + rawData.formType });
    }

    var sheet = doc.getSheetByName(targetSheetName);

    // Si no existe la pestaña, crearla y avisar (opcional) o retornar error
    if (!sheet) {
      return createJSONOutput({ result: 'error', error: 'No existe la pestaña: ' + targetSheetName + '. Por favor créela en su Google Sheet.' });
    }

    // 4. Mapeo Dinámico basado en Encabezados (Fila 1)
    // ADVERTENCIA: La hoja DEBE tener encabezados en la fila 1
    var lastColumn = sheet.getLastColumn();
    if (lastColumn === 0) {
      return createJSONOutput({ result: 'error', error: 'La hoja ' + targetSheetName + ' está vacía. Agregue encabezados en la fila 1.' });
    }

    var headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
    var newRow = [];
    var date = new Date(); // Fecha del servidor

    // Recorrer cada columna de la cabecera y buscar el dato correspondiente
    for (var i = 0; i < headers.length; i++) {
      var header = headers[i]; // El nombre exacto en la celda A1, B1, etc.
      
      if (header.toLowerCase() === 'fecha' || header.toLowerCase() === 'timestamp') {
        newRow.push(date); // Insertar fecha automática
      } else {
        // Buscar el valor en el JSON usando la clave exacta del encabezado
        // Si no existe, insertar cadena vacía
        var value = rawData[header];
        
        // Manejo de valores nulos o indefinidos
        if (value === undefined || value === null) {
          value = ''; 
        }
        
        // Si es un array (ej. checkboxes), convertir a string separado por comas
        if (Array.isArray(value)) {
          value = value.join(", ");
        }
        
        // Comilla simple al inicio para forzar texto en Sheets (evita auto-formato de números/fechas erróneo)
        // Opcional, pero recomendado para teléfonos o IDs largos
        newRow.push("'" + value); 
      }
    }

    // 5. Insertar la fila
    sheet.appendRow(newRow);

    return createJSONOutput({ result: 'success', row: sheet.getLastRow() });

  } catch (e) {
    return createJSONOutput({ result: 'error', error: e.toString() });
  } finally {
    lock.releaseLock();
  }
}

// Función auxiliar para respuestas JSON consistentes con CORS headers (aunque no-cors ignora, es buena práctica)
function createJSONOutput(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// Función doGet para pruebas simples en el navegador
function doGet(e) {
  return ContentService.createTextOutput("El script está activo. Usa POST para enviar datos.");
}
```

## 2. Configuración de los Encabezados (Headers)

Para que el script sepa dónde guardar cada dato, **DEBES escribír los siguientes nombres exactos en la FILA 1 de cada pestaña**.

### Pestaña: `Convocatoria`
Escribe estos nombres en las celdas A1, B1, C1, etc. (El orden no importa, pero el nombre SÍ debe ser exacto):

| Nombre de la Columna (Header) | Dato que guarda |
|--- |--- |
| `fecha` | Fecha y hora automática |
| `email` | Correo electrónico |
| `modalidad` | Virtual / Presencial |
| `tipoOrganizacion` | Sector Comunitario, Asociativo, etc. |
| `sector` | Agroindustria, Comercio, etc. |
| `productoPrincipal` | Producto Principal |
| `cantidadProduccion` | Cantidad |
| `frecuenciaProduccion` | Frecuencia |
| `nombreNegocio` | Nombre del Emprendimiento |
| `apellidos` | Apellidos |
| `nombres` | Nombres |
| `identificacion` | Cédula / RUC |
| `genero` | Género |
| `edad` | Edad |
| `telefono` | Teléfono |
| `participacionMINTEL` | Eventos MINTEL |
| `temasInteres` | Temáticas (Array) |
| `provincia` | Provincia |
| `canton` | Cantón |
| `parroquia` | Parroquia |
| `identidadDigital` | Nivel Identidad Digital |
| `correoElectronico` | Correo Corporativo (Paso 3) |
| `buscadoresMapas` | Presencia en mapas |
| `herramientasOficinaCloudsentasCloud` | Herramientas Cloud |
| `procesosInternos` | Digitalización procesos |
| `ventasDigitales` | Canales de venta |
| `usoDatos` | Uso de datos |
| `ciberseguridad` | Medidas de seguridad |
| `capacitacion` | Capacitación personal |
| `habilitadoresAvanzados` | IA / Big Data |
| `liderazgo` | Liderazgo digital |
| `estrategia` | Estrategia digital |
| `colaboracion` | Colaboración |
| `innovacion` | Innovación |
| `impactoAmbientalLegal` | Impacto Ambiental |
| `crecimientoVentas` | Ventas |
| `exportaciones` | Exportaciones |
| `generacionEmpleo` | Empleo |
| `observaciones` | Observaciones |

---

### Pestaña: `Brigadas`
Escribe estos nombres en las celdas A1, B1, C1, etc.

| Nombre de la Columna (Header) | Dato que guarda |
|--- |--- |
| `fecha` | Fecha y hora automática |
| `participacion` | Participación previa |
| `ciudadSector` | Ciudad / Sector contacto |
| `apellidos` | Apellidos |
| `nombres` | Nombres |
| `edad` | Edad |
| `genero` | Género |
| `email` | Email |
| `telefono` | Teléfono |
| `lugarTaller` | Sitio / Lugar taller |
| `espacioFisico` | ¿Tiene espacio físico? |
| `provincia` | Provincia |
| `ciudadCanton` | Ciudad / Cantón |
| `direccion` | Dirección exacta |
| `tematicas` | Temáticas solicitadas |
| `observaciones` | Observaciones generales |
| `autorizacion` | Autorización LOPDP |

## 3. Despliegue (IMPORTANTE)

Para que los cambios surtan efecto:
1.  En Apps Script, haz clic en el botón azul **"Implementar"** (Deploy) > **"Nueva implementación"**.
2.  Tipo: **Aplicación web**.
3.  Descripción: "Versión final v1".
4.  Ejecutar como: **Yo** (tu cuenta de Google).
5.  Quién tiene acceso: **Cualquiera** (Anyone). **<-- CRUCIAL**
6.  Haz clic en **Implementar**.
7.  Copia la **URL de la aplicación web** (termina en `/exec`).
8.  Esa es la URL que ya pusimos en el código React. Si cambia, actualízala en el código.
