CREATE TABLE "warehouses" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"pincod" varchar(6) NOT NULL
);
--> statement-breakpoint
CREATE INDEX "pincode_Idx" ON "warehouses" USING btree ("pincod");