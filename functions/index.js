const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { DocumentProcessorServiceClient } = require('@google-cloud/documentai').v1;

admin.initializeApp();

const client = new DocumentProcessorServiceClient();

// Configura la ruta específica para las facturas
const RUTA_ESPECIFICA = "facturas/";

exports.procesarFactura = functions.storage.object().onFinalize(async (object) => {
  const filePath = object.name; // Ruta completa del archivo subido

  // Verificar si el archivo está en la ruta específica
  if (filePath.startsWith(RUTA_ESPECIFICA)) {
    // Procesa el documento con Document AI
    const processorId = 'f402b141016fcdf2'; // Reemplaza con tu Processor ID de Document AI
    const location = 'eu'; // Reemplaza con tu Location de Document AI
    const projectId = admin.instanceId().app.options.projectId;
    const name = client.processorPath(projectId, location, processorId);
    const imageUri = `gs://${object.bucket}/${filePath}`;

    try {
      const [result] = await client.processDocument({
        name: name,
        rawDocument: {
          uri: imageUri,
        },
      });
      const { document } = result;
      // Aquí puedes extraer los campos necesarios de `document`
      // Por ejemplo: `document.text`, `document.formFields`, etc.
      
      // Extraer información específica y estructurar los datos
      const extractedData = {
        // Aquí irían los campos extraídos
      };

      // Calcular el tiempo de procesamiento y almacenar en Firestore
      const startTime = Date.now();
      // ... procesamiento de datos ...
      const processingTime = Date.now() - startTime;

      // Almacenar en Firestore
      const firestoreRef = admin.firestore().collection("facturasSinProcesar").doc();
      await firestoreRef.set({
        clienteId: 'id-del-cliente', // Asegúrate de obtener el ID del cliente apropiado
        nombreArchivo: filePath.split('/').pop(),
        datosExtraidos: extractedData,
        tiempoProcesamiento: processingTime
      });
      
      console.log(`Factura procesada y almacenada en Firestore: ${filePath}`);

    } catch (error) {
      console.error(`Error al procesar el documento: ${error.message}`);
    }
  }
});
