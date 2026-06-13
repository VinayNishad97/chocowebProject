CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"fname" varchar(100) NOT NULL,
	"lname" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	"provider" varchar(20),
	"external_id" varchar(100) NOT NULL,
	"image" text,
	"role" varchar(12) DEFAULT 'customer' NOT NULL,
	"updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP,
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
