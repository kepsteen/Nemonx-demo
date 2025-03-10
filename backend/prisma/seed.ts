import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seeding...');

  // Create students with realistic data
  const student1 = await prisma.student.upsert({
    where: { email: 'emma.wilson@university.edu' },
    update: {},
    create: {
      name: 'Emma Wilson',
      ssn: '6723',
      email: 'emma.wilson@university.edu',
      phone: '2025550187',
    },
  });

  const student2 = await prisma.student.upsert({
    where: { email: 'michael.chen@university.edu' },
    update: {},
    create: {
      name: 'Michael Chen',
      ssn: '8945',
      email: 'michael.chen@university.edu',
      phone: '3125557629',
    },
  });

  const student3 = await prisma.student.upsert({
    where: { email: 'sophia.rodriguez@university.edu' },
    update: {},
    create: {
      name: 'Sophia Rodriguez',
      ssn: '3412',
      email: 'sophia.rodriguez@university.edu',
      phone: '4155559034',
    },
  });

  const student4 = await prisma.student.upsert({
    where: { email: 'james.patel@university.edu' },
    update: {},
    create: {
      name: 'James Patel',
      ssn: '5291',
      email: 'james.patel@university.edu',
      phone: '7185556472',
    },
  });

  const student5 = await prisma.student.upsert({
    where: { email: 'olivia.nguyen@university.edu' },
    update: {},
    create: {
      name: 'Olivia Nguyen',
      ssn: '1078',
      email: 'olivia.nguyen@university.edu',
      phone: '6175558901',
    },
  });

  const student6 = await prisma.student.upsert({
    where: { email: 'ethan.williams@university.edu' },
    update: {},
    create: {
      name: 'Ethan Williams',
      ssn: '4567',
      email: 'ethan.williams@university.edu',
      phone: '8325553214',
    },
  });

  console.log('Created students:', {
    student1,
    student2,
    student3,
    student4,
    student5,
    student6,
  });

  // Create diplomas with realistic data
  const diplomas = await Promise.all([
    // Student 1 diplomas (3)
    prisma.diploma.create({
      data: {
        student_id: student1.id,
        degree: 'Bachelor of Science in Computer Engineering',
        status: 'success',
      },
    }),
    prisma.diploma.create({
      data: {
        student_id: student1.id,
        degree: 'Master of Science in Artificial Intelligence',
        status: 'success',
      },
    }),
    prisma.diploma.create({
      data: {
        student_id: student1.id,
        degree: 'Ph.D. in Machine Learning',
        status: 'processing',
      },
    }),

    // Student 2 diplomas (2)
    prisma.diploma.create({
      data: {
        student_id: student2.id,
        degree: 'Bachelor of Science in Biochemistry',
        status: 'success',
      },
    }),
    prisma.diploma.create({
      data: {
        student_id: student2.id,
        degree: 'Doctor of Medicine',
        status: 'processing',
      },
    }),

    // Student 3 diplomas (2)
    prisma.diploma.create({
      data: {
        student_id: student3.id,
        degree: 'Bachelor of Arts in International Relations',
        status: 'success',
      },
    }),
    prisma.diploma.create({
      data: {
        student_id: student3.id,
        degree: 'Master of Public Policy',
        status: 'success',
      },
    }),

    // Student 4 diplomas (1)
    prisma.diploma.create({
      data: {
        student_id: student4.id,
        degree: 'Bachelor of Business Administration in Finance',
        status: 'pending',
      },
    }),

    // Student 5 diplomas (2)
    prisma.diploma.create({
      data: {
        student_id: student5.id,
        degree: 'Bachelor of Fine Arts in Graphic Design',
        status: 'failed',
      },
    }),
    prisma.diploma.create({
      data: {
        student_id: student5.id,
        degree: 'Master of Fine Arts in Digital Media',
        status: 'processing',
      },
    }),

    // Student 6 diplomas (2)
    prisma.diploma.create({
      data: {
        student_id: student6.id,
        degree: 'Bachelor of Science in Environmental Science',
        status: 'success',
      },
    }),
    prisma.diploma.create({
      data: {
        student_id: student6.id,
        degree: 'Master of Science in Sustainability',
        status: 'pending',
      },
    }),
  ]);

  console.log(`Created ${diplomas.length} diplomas successfully!`);
  console.log('Seeding completed successfully!');
}

main()
  .catch(e => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
