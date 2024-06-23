import { EncryptPassword } from "../utils/hash-password";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const data = {
    name: "Admin",
    username: "admin",
    email: "admin@localhost",
    password: await EncryptPassword("123"),
  };

  const userAdmin = await prisma.tbm_user.upsert({
    where: { username: data.username },
    update: data,
    create: data,
  });

  console.log({
    userAdmin,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
