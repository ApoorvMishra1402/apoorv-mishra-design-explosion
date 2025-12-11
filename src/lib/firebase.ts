import { initializeApp, getApps } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAppConfig } from "@/lib/appConfig";

let _db: ReturnType<typeof getFirestore> | undefined;
let _storage: ReturnType<typeof getStorage> | undefined;

export async function getDb() {
  if (_db) return _db;
  const cfg = await getAppConfig();
  const app = getApps().length ? getApps()[0] : initializeApp(cfg.firebase);
  _db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
    // useFetchStreams: false,
  });
  return _db;
}

export async function getStorageBucket() {
  if (_storage) return _storage;
  const cfg = await getAppConfig();
  const app = getApps().length ? getApps()[0] : initializeApp(cfg.firebase);
  _storage = getStorage(app);
  return _storage;
}
