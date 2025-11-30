import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const admins = [
    {
      name: 'Administrador',
      email: 'admin@raizesfios.com',
      password: 'raizesfios123',
    },
  ];

  console.log('Iniciando Seed de Administradores...');

  for (const admin of admins) {
    const exists = await prisma.user.findUnique({
      where: { email: admin.email },
    });

    if (!exists) {
      const hashedPassword = await bcrypt.hash(admin.password, 10);
      await prisma.user.create({
        data: {
          name: admin.name,
          email: admin.email,
          password: hashedPassword,
          role: 'ADMIN',
        },
      });
      console.log(`✅ Admin criado: ${admin.email}`);
    } else {
      console.log(`ℹ️ Admin já existe: ${admin.email}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

