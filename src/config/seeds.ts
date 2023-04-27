import { RoleEnum } from '@modules/user/enum/role.enum';
import { UserRepository } from '@modules/user/user.repository';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userRepository = app.get(UserRepository);

  const admin = {
    email: 'admin@base.com',
    role: RoleEnum.admin,
  };

  const user = {
    email: 'user@base.com',
    role: RoleEnum.user,
  };

  console.log('Seeding users...');
  await userRepository.create(admin);
  await userRepository.create(user);
  console.log('Users seeded successfully!');

  await app.close();
}

bootstrap();
