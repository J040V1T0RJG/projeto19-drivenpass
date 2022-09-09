CREATE TABLE "users"(
    "id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("id");
ALTER TABLE
    "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");
CREATE TABLE "credentials"(
    "id" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
ALTER TABLE
    "credentials" ADD PRIMARY KEY("id");
CREATE TABLE "secureNotes"(
    "id" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "annotation" VARCHAR(1000) NOT NULL
);
ALTER TABLE
    "secureNotes" ADD PRIMARY KEY("id");
CREATE TABLE "cards"(
    "id" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "cardholderName" TEXT NOT NULL,
    "securityCode" TEXT NOT NULL,
    "expirationDate" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isVitual" BOOLEAN NOT NULL,
    "type" VARCHAR(8) CHECK
        ("type" IN('credit', 'debit', 'both')) NOT NULL
);
ALTER TABLE
    "cards" ADD PRIMARY KEY("id");
ALTER TABLE
    "cards" ADD CONSTRAINT "cards_number_unique" UNIQUE("number");
CREATE TABLE "wifi"(
    "id" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
ALTER TABLE
    "wifi" ADD PRIMARY KEY("id");
CREATE TABLE "sessions"(
    "id" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "creationDate" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);
ALTER TABLE
    "sessions" ADD PRIMARY KEY("id");
ALTER TABLE
    "sessions" ADD CONSTRAINT "sessions_token_unique" UNIQUE("token");
ALTER TABLE
    "secureNotes" ADD CONSTRAINT "securenotes_userid_foreign" FOREIGN KEY("userId") REFERENCES "users"("id");
ALTER TABLE
    "credentials" ADD CONSTRAINT "credentials_userid_foreign" FOREIGN KEY("userId") REFERENCES "users"("id");
ALTER TABLE
    "cards" ADD CONSTRAINT "cards_userid_foreign" FOREIGN KEY("userId") REFERENCES "users"("id");
ALTER TABLE
    "wifi" ADD CONSTRAINT "wifi_userid_foreign" FOREIGN KEY("userId") REFERENCES "users"("id");
ALTER TABLE
    "sessions" ADD CONSTRAINT "sessions_userid_foreign" FOREIGN KEY("userId") REFERENCES "users"("id");