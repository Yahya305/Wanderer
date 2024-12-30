-- CreateTable
CREATE TABLE "Trip" (
    "tripId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startLocation" TEXT NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("tripId")
);

-- CreateTable
CREATE TABLE "Destination" (
    "destinationId" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,

    CONSTRAINT "Destination_pkey" PRIMARY KEY ("destinationId")
);

-- CreateTable
CREATE TABLE "Flight" (
    "flightId" TEXT NOT NULL,
    "fromId" TEXT NOT NULL,
    "toId" TEXT NOT NULL,

    CONSTRAINT "Flight_pkey" PRIMARY KEY ("flightId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Flight_fromId_key" ON "Flight"("fromId");

-- CreateIndex
CREATE UNIQUE INDEX "Flight_toId_key" ON "Flight"("toId");

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Destination" ADD CONSTRAINT "Destination_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("tripId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "Destination"("destinationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_toId_fkey" FOREIGN KEY ("toId") REFERENCES "Destination"("destinationId") ON DELETE RESTRICT ON UPDATE CASCADE;
