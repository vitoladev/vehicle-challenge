CREATE TABLE IF NOT EXISTS "vehicles" (
	"id" serial PRIMARY KEY NOT NULL,
	"placa" text NOT NULL,
	"chassi" varchar(17) NOT NULL,
	"renavam" bigint NOT NULL,
	"modelo" text NOT NULL,
	"marca" text NOT NULL,
	"ano" integer NOT NULL,
	CONSTRAINT "vehicles_placa_unique" UNIQUE("placa"),
	CONSTRAINT "vehicles_chassi_unique" UNIQUE("chassi"),
	CONSTRAINT "vehicles_renavam_unique" UNIQUE("renavam")
);
