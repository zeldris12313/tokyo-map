// firebase-config.js - 共用 Firebase 連線與設定
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  initializeFirestore, 
  persistentLocalCache, 
  persistentMultipleTabManager,
  collection, 
  addDoc, 
  onSnapshot, 
  deleteDoc, 
  doc, 
  updateDoc, 
  setDoc 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDgwn1M-tPBlNguY0xjQ7XhTYpybNP08CI",
  authDomain: "tokyo-travel-2026-9a82e.firebaseapp.com",
  projectId: "tokyo-travel-2026-9a82e",
  storageBucket: "tokyo-travel-2026-9a82e.firebasestorage.app",
  messagingSenderId: "1066036344126",
  appId: "1:1066036344126:web:8e47e8497866ea8206e86f",
  measurementId: "G-6MFJZKJZ6H"
};

export const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
});

export { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc, setDoc };

// 圖片壓縮共用函式 (最大 600px，輕量快速)
export async function compressImage(file, maxDim = 600, quality = 0.6) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        if (width > height && width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}
