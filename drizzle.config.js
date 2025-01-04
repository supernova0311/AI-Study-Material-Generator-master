import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: {
    url: "postgresql://AI-Study-Material-Gen_owner:Ud5RCG3wsYQT@ep-calm-band-a141xp3v.ap-southeast-1.aws.neon.tech/AI-Study-Material-Gen?sslmode=require",
  },
});
