import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'node:crypto';

const prisma = new PrismaClient();

const taskTypesData = [
  {
    id: randomUUID(),
    description: 'História',
    icon: 'https://team-1578750134585.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium',
  },
  {
    id: randomUUID(),
    description: 'Tarefa',
    icon: 'https://team-1578750134585.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium',
  },
  {
    id: randomUUID(),
    description: 'Subtarefa',
    icon: 'https://team-1578750134585.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10316?size=medium',
  },
  {
    id: randomUUID(),
    description: 'Bug',
    icon: 'https://team-1578750134585.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium',
  },
];

const load = async () => {
  try {
    await prisma.taskType.deleteMany();
    console.log('Deleted records in category table');

    await prisma.taskType.createMany({
      data: taskTypesData,
    });
    console.log('Added category data');
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
