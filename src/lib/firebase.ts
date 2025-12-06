import { initializeApp, getApps } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getAppConfig } from "@/lib/appConfig";

let _db: ReturnType<typeof getFirestore> | undefined;

export async function getDb() {
  if (_db) return _db;
  const cfg = await getAppConfig();
  const app = getApps().length ? getApps()[0] : initializeApp(cfg.firebase);
  _db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
 
  });
  return _db;
}
