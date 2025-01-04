import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    NODE_ENV: z.string().optional(),
    ENCRYPTION_SECRET: z.string().min(1),
  },
  client: {
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    ENCRYPTION_SECRET: process.env.ENCRYPTION_SECRET,
  },
});
