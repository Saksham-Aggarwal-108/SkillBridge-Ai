import { PrismaClient } from '@prisma/client';
import { SEEDED_ROLES, SEEDED_OPPORTUNITIES, SEEDED_EMPLOYER_JOBS } from '../data/seedData.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding SkillBridge AI database...');

  // 1. Seed Roles & Skills
  for (const roleData of SEEDED_ROLES) {
    const role = await prisma.careerRole.upsert({
      where: { title: roleData.title },
      update: {
        description: roleData.description,
        domain: roleData.domain,
        expExpectations: roleData.expExpectations,
      },
      create: {
        id: roleData.id,
        title: roleData.title,
        domain: roleData.domain,
        description: roleData.description,
        expExpectations: roleData.expExpectations,
      },
    });

    // Seed Skills and RoleSkill relations
    for (const req of roleData.requiredSkills) {
      const skill = await prisma.skill.upsert({
        where: { name: req.skill },
        update: {},
        create: {
          name: req.skill,
          normalizedName: req.skill,
          category: 'Technical',
          demand: req.weight >= 1.2 ? 'Critical' : 'High',
        },
      });

      await prisma.roleSkill.upsert({
        where: {
          roleId_skillId: {
            roleId: role.id,
            skillId: skill.id,
          },
        },
        update: {
          isRequired: true,
          weight: req.weight,
          requiredLevel: req.requiredLevel,
        },
        create: {
          roleId: role.id,
          skillId: skill.id,
          isRequired: true,
          weight: req.weight,
          requiredLevel: req.requiredLevel,
        },
      });
    }
  }

  // 2. Seed Opportunities
  for (const opp of SEEDED_OPPORTUNITIES) {
    await prisma.opportunity.upsert({
      where: { id: opp.id },
      update: {},
      create: opp,
    });
  }

  // 3. Seed Demo User (Alex Sharma)
  const demoUser = await prisma.user.upsert({
    where: { email: 'alex.sharma@skillbridge.ai' },
    update: {},
    create: {
      email: 'alex.sharma@skillbridge.ai',
      name: 'Alex Sharma',
      passwordHash: 'demo123',
      role: 'STUDENT',
      profile: {
        create: {
          headline: 'Computer Science Student | Aspiring Software Developer',
          experienceLevel: 'Entry Level (0-1 yrs)',
          targetRole: 'Software Developer',
          learningStyle: 'Projects & Documentation',
          readinessScore: 78,
          isDemo: true,
          rawText: 'Java, SQL, Git, HTML, CSS, JavaScript, Data Structures & Algorithms',
        },
      },
    },
    include: { profile: true },
  });

  if (demoUser.profile) {
    const demoSkills = [
      { name: 'Java', prof: 4, status: 'Strong' },
      { name: 'SQL', prof: 4, status: 'Strong' },
      { name: 'Git', prof: 4, status: 'Strong' },
      { name: 'HTML5', prof: 3, status: 'Developing' },
      { name: 'CSS3', prof: 3, status: 'Developing' },
      { name: 'JavaScript', prof: 3, status: 'Developing' },
      { name: 'Data Structures & Algorithms', prof: 3, status: 'Developing' },
      { name: 'Spring Boot', prof: 1, status: 'Needs Attention' },
      { name: 'REST APIs', prof: 2, status: 'Needs Attention' },
    ];

    for (const dSkill of demoSkills) {
      const skill = await prisma.skill.upsert({
        where: { name: dSkill.name },
        update: {},
        create: {
          name: dSkill.name,
          normalizedName: dSkill.name,
          category: 'Technical',
        },
      });

      await prisma.userSkill.upsert({
        where: {
          profileId_skillId: {
            profileId: demoUser.profile.id,
            skillId: skill.id,
          },
        },
        update: {
          proficiency: dSkill.prof,
          status: dSkill.status,
        },
        create: {
          profileId: demoUser.profile.id,
          skillId: skill.id,
          proficiency: dSkill.prof,
          status: dSkill.status,
        },
      });
    }

    // Seed Initial Roadmap for Alex
    const roadmap = await prisma.roadmap.create({
      data: {
        profileId: demoUser.profile.id,
        targetRole: 'Software Developer',
        totalPhases: 4,
        items: {
          create: [
            {
              phase: 1,
              phaseName: 'Phase 1: Strengthen Foundations',
              title: 'Data Structures & Algorithms Mastery',
              description: 'Focus on arrays, hash maps, trees, and dynamic programming for technical interviews.',
              skillName: 'Data Structures & Algorithms',
              effort: '3 weeks',
              resources: JSON.stringify([
                { name: 'LeetCode Core 75', url: 'https://leetcode.com', type: 'Practice' },
                { name: 'NeetCode Roadmap', url: 'https://neetcode.io', type: 'Course' },
              ]),
              isCompleted: true,
              orderIndex: 0,
            },
            {
              phase: 2,
              phaseName: 'Phase 2: Domain Architecture',
              title: 'Master Enterprise Spring Boot & REST APIs',
              description: 'Build backend microservices and REST controllers in Java.',
              skillName: 'Spring Boot',
              effort: '3 weeks',
              resources: JSON.stringify([
                { name: 'Spring Guides', url: 'https://spring.io/guides', type: 'Doc' },
              ]),
              isCompleted: false,
              orderIndex: 0,
            },
          ],
        },
      },
    });
  }

  // 4. Seed Demo Employer & Jobs
  const employer = await prisma.user.upsert({
    where: { email: 'recruiter@fintechdynamics.com' },
    update: {},
    create: {
      email: 'recruiter@fintechdynamics.com',
      name: 'FinTech Dynamics Hiring',
      passwordHash: 'demo123',
      role: 'EMPLOYER',
    },
  });

  for (const job of SEEDED_EMPLOYER_JOBS) {
    await prisma.job.upsert({
      where: { id: job.id },
      update: {},
      create: {
        ...job,
        employerId: employer.id,
      },
    });
  }

  console.log('✅ SkillBridge AI Database successfully seeded!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
