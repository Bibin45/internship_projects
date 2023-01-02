import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyANMB48L497iic_4OH6U1nfr3_f7j85DQA",
  authDomain: "crypto-currency-7c2db.firebaseapp.com",
  projectId: "crypto-currency-7c2db",
  storageBucket: "crypto-currency-7c2db.appspot.com",
  messagingSenderId: "277266964342",
  appId: "1:277266964342:web:72a50d3702b6918056a457"
};
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const firestore=getFirestore(app)
export {auth,firestore}