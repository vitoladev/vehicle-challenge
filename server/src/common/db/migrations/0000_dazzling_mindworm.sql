CREATE TABLE IF NOT EXISTS "vehicles" (
	"id" serial PRIMARY KEY NOT NULL,
	"placa" text NOT NULL,
	"chassi" varchar(17) NOT NULL,
	"renavam" integer NOT NULL,
	"modelo" text NOT NULL,
	"marca" text NOT NULL,
	"ano" integer NOT NULL
);
