-- CreateTable
CREATE TABLE "Joke" (
    "id" TEXT NOT NULL,
    "joke" TEXT NOT NULL,
    "punchLine" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Joke_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Joke" ADD CONSTRAINT "Joke_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
