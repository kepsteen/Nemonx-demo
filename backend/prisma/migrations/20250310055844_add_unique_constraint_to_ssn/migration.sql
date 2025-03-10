-- CreateTable
CREATE TABLE "diploma" (
    "id" SERIAL NOT NULL,
    "student_id" UUID NOT NULL,
    "degree" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR(10) NOT NULL,

    CONSTRAINT "diplomas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) NOT NULL,
    "ssn" CHAR(4) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" CHAR(10) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "student_ssn_key" ON "student"("ssn");

-- CreateIndex
CREATE UNIQUE INDEX "students_email_key" ON "student"("email");

-- AddForeignKey
ALTER TABLE "diploma" ADD CONSTRAINT "fk_student" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
