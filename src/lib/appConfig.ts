export type AppConfig = {
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
  emailjs?: {
    serviceId: string;
    templateId: string;
    publicKey: string;
  };
  unsplash?: {
    accessKey: string;
  };
};

let cached: AppConfig | undefined;

export async function getAppConfig(): Promise<AppConfig> {
  if (cached) return cached;
  const base = import.meta.env.BASE_URL || "/";
  const res = await fetch(`${base}app-config.json`, { cache: "no-store" });
  const data = (await res.json()) as AppConfig;
  cached = data;
  return data;
}
