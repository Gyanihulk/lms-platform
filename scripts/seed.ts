const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Music" },
        { name: "Fitness" },
        { name: "Photography" },
        { name: "Accounting" },
        { name: "Gaming" },
        { name: "Engineering" },
        { name: "Filming" },
      ],
    });
  } catch (err) {
    console.log(err, "[error in seeding categories]");
  } finally {
    await database.$disconnect();
  }
}

main()