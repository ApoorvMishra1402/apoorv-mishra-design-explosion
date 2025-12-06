import posthog from "posthog-js";

const POSTHOG_KEY = "phc_placeholder"; // Replace with your actual PostHog key
const POSTHOG_HOST = "https://app.posthog.com";

export const initAnalytics = () => {
  // Only initialize in production or if key is configured
  if (typeof window !== "undefined" && POSTHOG_KEY !== "phc_placeholder") {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: true,
      persistence: "localStorage",
    });
  }
};

export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && POSTHOG_KEY !== "phc_placeholder") {
    posthog.capture(eventName, properties);
  }
};

export const trackPageView = (pageName: string) => {
  trackEvent("page_view", { page: pageName });
};

export const identifyUser = (userId: string, traits?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && POSTHOG_KEY !== "phc_placeholder") {
    posthog.identify(userId, traits);
  }
};

export { posthog };
