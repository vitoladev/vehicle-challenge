import {
  bigint,
  integer,
  pgTable,
  serial,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const vehicles = pgTable(
  "vehicles",
  {
    id: serial("id").primaryKey(),
    placa: text("placa").unique().notNull(),
    chassi: varchar("chassi", { length: 17 }).unique().notNull(),
    renavam: bigint("renavam", { mode: "number" }).unique().notNull(),
    modelo: text("modelo").notNull(),
    marca: text("marca").notNull(),
    ano: integer("ano").notNull(),
  },
  (table) => {
    return {
      placaIdx: uniqueIndex("placa_idx").on(table.placa),
      chassiIdx: uniqueIndex("chassi_idx").on(table.chassi),
      renavamIdx: uniqueIndex("renavam_idx").on(table.renavam),
    };
  }
);
