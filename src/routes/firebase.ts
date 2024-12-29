import { initializeApp } from "firebase/app";
import {
  connectFirestoreEmulator,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import {
  connectDatabaseEmulator,
  getDatabase,
  ref as dbRef,
  set,
} from "firebase/database";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { dev } from "$app/environment";
import {
  connectStorageEmulator,
  getStorage,
  ref as storageRef,
  uploadString,
} from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAkNpMV8Yoy4CTTwD4hXPxkbNmryC-ekNg",
  authDomain: "sveltefire-testing-f8563.firebaseapp.com",
  projectId: "sveltefire-testing-f8563",
  storageBucket: "sveltefire-testing-f8563.firebasestorage.app",
  messagingSenderId: "713113940573",
  appId: "1:713113940573:web:f9ac3c9f4c56a92ccc53b4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;

if (dev || import.meta.env.MODE === "ci") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
  connectDatabaseEmulator(rtdb, "localhost", 9000);
  connectStorageEmulator(storage, "localhost", 9199);

  // Seed Firestore
  setDoc(doc(db, "posts", "test"), {
    title: "Hi Mom",
    content: "this is a test",
  });

  // Seed Realtime Database
  set(dbRef(rtdb, "posts/test"), {
    title: "Hi Mom",
    content: "this is a test",
  });

  // Create a reference to the file to create
  const fileRef = storageRef(storage, "test.txt");

  // Upload a string to the file
  uploadString(fileRef, "Hello, world!", "raw")
    .then(() => {
      console.log("File created successfully!");
    })
    .catch((error) => {
      console.error("Error creating file:", error);
    });
}
