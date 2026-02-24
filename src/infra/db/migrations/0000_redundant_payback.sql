CREATE TABLE "links" (
	"id" text PRIMARY KEY NOT NULL,
	"original_url" text NOT NULL,
	"short_url" text NOT NULL,
	"access_count" text DEFAULT '0' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"remote_key" text NOT NULL,
	"remote_url" text NOT NULL,
	CONSTRAINT "links_original_url_unique" UNIQUE("original_url"),
	CONSTRAINT "links_short_url_unique" UNIQUE("short_url"),
	CONSTRAINT "links_remote_key_unique" UNIQUE("remote_key")
);
