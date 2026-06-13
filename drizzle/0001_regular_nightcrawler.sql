CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"image" text,
	"description" text,
	"price" integer NOT NULL,
	"updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP,
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP
);
