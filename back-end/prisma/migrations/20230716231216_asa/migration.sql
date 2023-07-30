/*
  Warnings:

  - The values [friendship_request] on the enum `notificationType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "notificationType_new" AS ENUM ('Accepted_request', 'game_invitation', 'Achievement', 'GroupInvitation');
ALTER TABLE "Notification" ALTER COLUMN "Type" TYPE "notificationType_new" USING ("Type"::text::"notificationType_new");
ALTER TYPE "notificationType" RENAME TO "notificationType_old";
ALTER TYPE "notificationType_new" RENAME TO "notificationType";
DROP TYPE "notificationType_old";
COMMIT;
