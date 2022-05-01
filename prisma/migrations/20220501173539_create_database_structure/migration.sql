-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PLANNED', 'ON_GOING', 'CONCLUDED', 'PAUSED');

-- CreateTable
CREATE TABLE "company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "position" TEXT,
    "city" TEXT,
    "state" TEXT,
    "image" TEXT,
    "company_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT,
    "company_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_sprint" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "initial_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deadline" TIMESTAMP(3) NOT NULL,
    "project_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "project_sprint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_scope" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "project_scope_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_type" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "task_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "task_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "estimated_points" INTEGER,
    "status" "TaskStatus" NOT NULL DEFAULT E'PLANNED',
    "responsible_id" TEXT NOT NULL,
    "creator_id" TEXT NOT NULL,
    "task_category_id" TEXT,
    "task_type_id" TEXT,
    "task_scope_id" TEXT,
    "parent_id" TEXT,
    "project_sprint_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_comment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "task_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "parent_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "task_comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_cnpj_key" ON "company"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "project_icon_key" ON "project"("icon");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_sprint" ADD CONSTRAINT "project_sprint_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_scope" ADD CONSTRAINT "project_scope_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_category" ADD CONSTRAINT "task_category_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_responsible_id_fkey" FOREIGN KEY ("responsible_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_project_sprint_id_fkey" FOREIGN KEY ("project_sprint_id") REFERENCES "project_sprint"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_task_scope_id_fkey" FOREIGN KEY ("task_scope_id") REFERENCES "project_scope"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_task_type_id_fkey" FOREIGN KEY ("task_type_id") REFERENCES "task_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_task_category_id_fkey" FOREIGN KEY ("task_category_id") REFERENCES "task_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_comment" ADD CONSTRAINT "task_comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_comment" ADD CONSTRAINT "task_comment_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_comment" ADD CONSTRAINT "task_comment_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "task_comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
