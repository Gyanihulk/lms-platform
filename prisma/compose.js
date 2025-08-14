const fs = require("fs");
const path = require("path");

const prismaDir = path.join(process.cwd(), "prisma");
const outputFile = path.join(prismaDir, "schema.prisma");

const partsDir = path.join(prismaDir, "parts");

const parts = [];

// Always include schema.header.prisma first
const headerPath = path.join(prismaDir, "schema.header.prisma");
if (fs.existsSync(headerPath)) {
  parts.push(fs.readFileSync(headerPath, "utf-8").trim());
} else {
  console.error("❌ Missing schema.header.prisma — must contain datasource & generator.");
  process.exit(1);
}

// Then include all other .prisma files in /parts (alphabetically)
if (fs.existsSync(partsDir)) {
  const files = fs.readdirSync(partsDir)
    .filter(f => f.endsWith(".prisma"))
    .sort(); // keep order predictable
  for (const file of files) {
    const filePath = path.join(partsDir, file);
    parts.push(fs.readFileSync(filePath, "utf-8").trim());
  }
}

// Optionally include other files like enums/models if outside /parts

// Write final schema
fs.writeFileSync(outputFile, parts.join("\n\n"));
console.log(`✅ Prisma schema composed into ${outputFile}`);
