import {
  bigint,
  integer,
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const vehicles = pgTable("vehicles", {
  id: serial("id").primaryKey(),
  placa: text("placa").unique().notNull(),
  chassi: varchar("chassi", { length: 17 }).unique().notNull(),
  renavam: bigint("renavam", { mode: "number" }).unique().notNull(),
  modelo: text("modelo").notNull(),
  marca: text("marca").notNull(),
  ano: integer("ano").notNull(),
});
