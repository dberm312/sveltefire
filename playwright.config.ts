import { defineConfig } from "@playwright/test";

export default defineConfig({
  webServer: {
    command:
      'firebase emulators:exec --only firestore,database,storage,auth "npm run build && npm run dev"',
    port: 5173,
  },
  testDir: "tests",
  testMatch: /(.+\.)?(test|spec)\.[jt]s/,
  // workers: 1, // Set to run only one worker at a time
  // maxFailures: 1, // Stop after first failure
  // use: {
  //   headless: false, // Set to run in headed mode (shows browser window)
  // },
});
