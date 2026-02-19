CREATE TABLE "links" (
	"id" text PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"remote_key" text NOT NULL,
	"remote_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "links_url_unique" UNIQUE("url"),
	CONSTRAINT "links_remote_key_unique" UNIQUE("remote_key")
);
