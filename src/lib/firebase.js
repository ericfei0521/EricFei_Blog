import { firebaseConfig } from '../../firebase.config';
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseSet = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
export const firestore = firebaseSet.firestore();
