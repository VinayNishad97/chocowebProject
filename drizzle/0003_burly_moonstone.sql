ALTER TABLE "warehouses" ADD COLUMN "updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE "warehouses" ADD COLUMN "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP;