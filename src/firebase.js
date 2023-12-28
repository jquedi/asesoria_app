import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCzb_e8lQ0NydgpkPEgX6TGZA_DCis1mD8",
  authDomain: "app-oficina-c264e.firebaseapp.com",
  databaseURL: "https://app-oficina-c264e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "app-oficina-c264e",
  storageBucket: "app-oficina-c264e.appspot.com",
  messagingSenderId: "237574994956",
  appId: "1:237574994956:web:c1db921c90571c1c990229",
  measurementId: "G-73BRBYMM35"
};

  
  const app = initializeApp(firebaseConfig);

  const analytics = getAnalytics(app);
  const db = getFirestore(app);
  const storage = getStorage(app);
  const auth = getAuth(app);
  
  export { db, auth, analytics, storage };