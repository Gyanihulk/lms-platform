// prisma/seedAltitude.js
import { PrismaClient, RoleEnum, RoleType, AppliesToType } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();
const GLOBAL_ID = 'GLOBAL';
const PASSWORD = 'password123';

async function main() {
  console.log('🔄 Resetting and seeding Altitude Aviation data...');

  // 1) Clean existing data (delete in correct dependency order)
  await prisma.roleFunctionality.deleteMany({});
  await prisma.role.deleteMany({});
  await prisma.functionality.deleteMany({});
  await prisma.module.deleteMany({});
  await prisma.user.deleteMany({});

  // 2) Modules & Functionalities (tailored to Altitude Aviation)
  const modulesData = [
    {
      name: 'Programs',
      key: 'programs',
      description: 'Pilot training program catalogue',
      functionalities: [
        { name: 'View Programs', key: 'view_programs', description: 'Explore training programs' },
        { name: 'Download Brochure', key: 'download_brochure', description: 'Download program brochure' },
        { name: 'Apply to Program', key: 'apply_program', description: 'Submit program enrollment' },
      ],
    },
    {
      name: 'Support',
      key: 'support',
      description: 'Learner support and FAQ',
      functionalities: [
        { name: 'Ask Question', key: 'ask_question', description: 'Ask a FAQ question' },
        { name: 'Contact Academy', key: 'contact_academy', description: 'Reach out to the academy' },
      ],
    },
    {
      name: 'Testimonials',
      key: 'testimonials',
      description: 'Student stories and reviews',
      functionalities: [
        { name: 'View Testimonials', key: 'view_testimonials', description: 'See alumni reviews' },
      ],
    },
  ];

  for (const mod of modulesData) {
    const createdModule = await prisma.module.upsert({
      where: { key: mod.key },
      update: { name: mod.name, description: mod.description },
      create: { name: mod.name, key: mod.key, description: mod.description },
    });

    await Promise.all(
      mod.functionalities.map((func) =>
        prisma.functionality.upsert({
          where: { key: func.key },
          update: { name: func.name, description: func.description, moduleId: createdModule.id },
          create: { moduleId: createdModule.id, name: func.name, key: func.key, description: func.description },
        })
      )
    );
  }

  // 3) Roles
  const rolesData = [
    { name: 'Super Admin', type: RoleType.SYSTEM, appliesTo: AppliesToType.GLOBAL, appliesToId: GLOBAL_ID },
    { name: 'Admin',       type: RoleType.SYSTEM, appliesTo: AppliesToType.GLOBAL, appliesToId: GLOBAL_ID },
    { name: 'Instructor',  type: RoleType.CUSTOM, appliesTo: AppliesToType.GLOBAL, appliesToId: GLOBAL_ID },
    { name: 'Student',     type: RoleType.CUSTOM, appliesTo: AppliesToType.GLOBAL, appliesToId: GLOBAL_ID },
  ];

  const upsertedRoles = await Promise.all(
    rolesData.map(r =>
      prisma.role.upsert({
        where: { name_appliesTo_appliesToId_type: { name: r.name, appliesTo: r.appliesTo, appliesToId: r.appliesToId, type: r.type } },
        update: {},
        create: r,
      })
    )
  );
  const roleByName = Object.fromEntries(upsertedRoles.map(r => [r.name, r]));

  // 4) Role → Functionality assignments
  const allFuncs = await prisma.functionality.findMany();

  // Super Admin: all functionality
  await Promise.all(allFuncs.map(func =>
    prisma.roleFunctionality.upsert({
      where: { roleId_functionalityId: { roleId: roleByName['Super Admin'].id, functionalityId: func.id } },
      update: { allow: true },
      create: { roleId: roleByName['Super Admin'].id, functionalityId: func.id, allow: true },
    })
  ));

  // Admin: limited access
  const adminFuncs = allFuncs.filter(f => ['view_programs', 'download_brochure', 'ask_question', 'contact_academy'].includes(f.key));
  await Promise.all(adminFuncs.map(func =>
    prisma.roleFunctionality.upsert({
      where: { roleId_functionalityId: { roleId: roleByName['Admin'].id, functionalityId: func.id } },
      update: { allow: true },
      create: { roleId: roleByName['Admin'].id, functionalityId: func.id, allow: true },
    })
  ));

  // Student: only apply + view programs
  const studentFuncs = allFuncs.filter(f => ['view_programs', 'apply_program'].includes(f.key));
  await Promise.all(studentFuncs.map(func =>
    prisma.roleFunctionality.upsert({
      where: { roleId_functionalityId: { roleId: roleByName['Student'].id, functionalityId: func.id } },
      update: { allow: true },
      create: { roleId: roleByName['Student'].id, functionalityId: func.id, allow: true },
    })
  ));

  // Instructor: view programs + testimonials + contact
  const instructorFuncs = allFuncs.filter(f => ['view_programs', 'view_testimonials', 'contact_academy'].includes(f.key));
  await Promise.all(instructorFuncs.map(func =>
    prisma.roleFunctionality.upsert({
      where: { roleId_functionalityId: { roleId: roleByName['Instructor'].id, functionalityId: func.id } },
      update: { allow: true },
      create: { roleId: roleByName['Instructor'].id, functionalityId: func.id, allow: true },
    })
  ));

  // 5) Users
  const passwordHash = await hash(PASSWORD, 10);
  const users = [
    { email: 'superadmin@altitude.com', name: 'Super Admin', role: RoleEnum.SUPER_ADMIN },
    { email: 'admin@altitude.com',      name: 'Admin',       role: RoleEnum.ADMIN },
    { email: 'instructor@altitude.com', name: 'Instructor',  role: RoleEnum.INSTRUCTOR },
    { email: 'student@altitude.com',    name: 'Student',     role: RoleEnum.STUDENT },
  ];

  await Promise.all(users.map(u =>
    prisma.user.upsert({
      where: { email: u.email },
      update: { name: u.name, role: u.role },
      create: { email: u.email, name: u.name, password: passwordHash, role: u.role },
    })
  ));

  console.log('✅ Altitude Aviation seeding completed!');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
