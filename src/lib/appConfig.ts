// export type AppConfig = {
//   firebase: {
//     apiKey: string;
//     authDomain: string;
//     projectId: string;
//     storageBucket: string;
//     messagingSenderId: string;
//     appId: string;
//   };
//   emailjs?: {
//     serviceId: string;
//     templateId: string;
//     publicKey: string;
//   };
//   unsplash?: {
//     accessKey: string;
//   };
// };

// let cached: AppConfig | undefined;

// export async function getAppConfig(): Promise<AppConfig> {
//   if (cached) return cached;
//   const base = import.meta.env.BASE_URL || "/";
//   const res = await fetch(`${base}app-config.json`, { cache: "no-store" });
//   const data = (await res.json()) as AppConfig;
//   cached = data;
//   return data;
// }

export type AppConfig = {
  adminUid?: string;
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

/**
 * Reads application configuration from environment variables (using Vite's VITE_ prefix convention).
 */
export async function getAppConfig(): Promise<AppConfig> {
  if (cached) return cached;

  const env = import.meta.env;

  const config: AppConfig = {
    firebase: {
      // Firebase (Required)
      apiKey: env.VITE_FIREBASE_API_KEY as string,
      authDomain: env.VITE_FIREBASE_AUTH_DOMAIN as string,
      projectId: env.VITE_FIREBASE_PROJECT_ID as string,
      storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET as string,
      messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
      appId: env.VITE_FIREBASE_APP_ID as string,
    },
    // EmailJS (Optional)
    ...(env.VITE_EMAILJS_SERVICE_ID && {
      emailjs: {
        serviceId: env.VITE_EMAILJS_SERVICE_ID as string,
        templateId: env.VITE_EMAILJS_TEMPLATE_ID as string,
        publicKey: env.VITE_EMAILJS_PUBLIC_KEY as string,
      },
    }),
    // Unsplash (Optional)
    ...(env.VITE_UNSPLASH_ACCESS_KEY && {
      unsplash: {
        accessKey: env.VITE_UNSPLASH_ACCESS_KEY as string,
      },
    }),
  };

  // Simple check to ensure required config exists
  if (!config.firebase.apiKey) {
      console.error("VITE_FIREBASE_API_KEY is missing. Check your .env file and restart the development server.");
  }
  
  cached = config;
  return config;
}
