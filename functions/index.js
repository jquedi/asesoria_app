const functions = require("firebase-functions");
const admin = require("firebase-admin");

const Vision = require("@google-cloud/vision");
const Firestore = require("@google-cloud/firestore");
const vision = new Vision.ImageAnnotatorClient();
const firestore = new Firestore();

admin.initializeApp();

// Configura la ruta específica para las facturas
const RUTA_ESPECIFICA = "facturas/";


/**
 * Preprocesa un texto para su análisis.
 * - Convierte el texto a minúsculas.
 * - Elimina acentos y caracteres diacríticos.
 * - Remueve espacios y saltos de línea innecesarios.
 *
 * @param {string} texto - El texto a preprocesar.
 * @return {string} El texto preprocesado.
 */
function preprocesarTexto(texto) {
  // Convertir a minúsculas y eliminar acentos
  let textoNormalizado =
  texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Eliminar espacios y saltos de línea innecesarios
  textoNormalizado = textoNormalizado.replace(/\s+/g, " ").trim();

  return textoNormalizado;
}


exports.procesarFactura =
functions.storage.object().onFinalize(async (object) => {
  const filePath = object.name; // Ruta completa del archivo subido
  try {
    const bucketName = object.bucket; // Nombre del bucket
    const fileName = filePath.split("/").pop(); // Extrae el nombre del archivo

    // Verificar si el archivo está en la ruta específica
    if (filePath.startsWith(RUTA_ESPECIFICA)) {
      // Verifica si el archivo es una imagen
      if (!fileName.endsWith(".png") && !fileName.endsWith(".jpg") &&
      !fileName.endsWith(".jpeg")) {
        console.log("El archivo no es una imagen.");
        return;
      }

      // Realiza OCR en la imagen
      const [result] = await vision.textDetection(`gs://${bucketName}/${filePath}`);
      const detections = result.textAnnotations;
      console.log("Texto detectado:", detections);

      // Extrae el texto completo de la primera anotación
      const text = detections.length ? detections[0].description : "";
      console.log(`Texto extraído: ${text}`);

      // Preprocesa el texto extraído
      const textNormalized = preprocesarTexto(text);

      // Guarda el texto extraído en Firestore
      const docRef = firestore.collection("extractedTexts").doc();
      await docRef.set({
        fileName: fileName,
        text: textNormalized,
      });

      console.log("Texto guardado en Firestore.");
    }
  } catch (error) {
    console.error(`Error al procesar el archivo ${filePath}:`, error);
  }
});
