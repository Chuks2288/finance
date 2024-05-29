import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";


// if you want to use normal query like that of prisma query method in this drizzle
// import * as schema from "./schema";

export const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);


// if you want to use normal query like that of prisma query method in this drizzle
// export const db = drizzle(sql, { schema });