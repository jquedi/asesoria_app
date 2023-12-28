const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Storage = require("@google-cloud/storage").Storage;
const Vision = require("@google-cloud/vision");
const Firestore = require("@google-cloud/firestore");

const vision = new Vision.ImageAnnotatorClient();
const firestore = new Firestore();
const storage = new Storage();

admin.initializeApp();

// Configura la ruta específica para las facturas
const RUTA_ESPECIFICA = "facturas/";

exports.procesarFactura =
functions.storage.object().onFinalize(async (object) => {
  const filePath = object.name; // Ruta completa del archivo subido
  const bucketName = object.bucket; // Nombre del bucket
  let text = ""; // Inicializa la variable text

  try {
    const fileName = filePath.split("/").pop(); // Extrae el nombre del archivo

    // Verificar si el archivo está en la ruta específica
    if (filePath.startsWith(RUTA_ESPECIFICA)) {
      if (fileName.endsWith(".png") || fileName.endsWith(".jpg") ||
      fileName.endsWith(".jpeg")) {
        // Realiza OCR en la imagen
        const [result] = await vision.textDetection(`gs://${bucketName}/${filePath}`);
        const detections = result.textAnnotations;
        text = detections.length ? detections[0].description : "";
        console.log(`Texto extraído: ${text}`);
      } else if (fileName.endsWith(".pdf")) {
        // Procesar el PDF con Google Cloud Vision
        const [operation] = await vision.asyncBatchAnnotateFiles({
          requests: [{
            inputConfig: {
              gcsSource: {
                uri: `gs://${bucketName}/${filePath}`,
              },
              mimeType: "application/pdf",
            },
            features: [{type: "DOCUMENT_TEXT_DETECTION"}],
            outputConfig: {
              gcsDestination: {
                uri: `gs://${bucketName}/output/`,
              },
              batchSize: 1,
            },
          }],
        });

        // Esperar a que la operación termine
        const [filesResponse] = await operation.promise();
        const destinationUri =
        filesResponse.responses[0].outputConfig.gcsDestination.uri;

        // Recuperar el resultado del análisis OCR del archivo de salida
        const jsonOutput = destinationUri.replace("gs://", "").split("/");
        const bucket = storage.bucket(jsonOutput[0]);
        const outputFile = bucket.file(jsonOutput.slice(1).join("/"));

        const [jsonContent] = await outputFile.download();
        const annotations = JSON.parse(jsonContent.toString()).responses;

        // Concatenar el texto de todas las páginas
        annotations.forEach((response) => {
          if (response.fullTextAnnotation) {
            text += response.fullTextAnnotation.text + "\n";
          }
        });
      } else {
        console.log("El archivo no es una imagen ni PDF");
        return;
      }

      // Guarda el texto extraído en Firestore
      const docRef = firestore.collection("extractedTexts").doc();
      await docRef.set({fileName, text});
      console.log("Texto guardado en Firestore.");
    }
  } catch (error) {
    console.error(`Error al procesar el archivo ${filePath}:`, error);
  }
});
