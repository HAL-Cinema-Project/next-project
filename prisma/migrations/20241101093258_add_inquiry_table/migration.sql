-- CreateTable
CREATE TABLE "Inquiry" (
    "inquiry_id" SERIAL NOT NULL,
    "inquiry_subject" TEXT NOT NULL,
    "inquiry_content" TEXT NOT NULL,
    "inquiry_email" TEXT NOT NULL,

    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("inquiry_id")
);
