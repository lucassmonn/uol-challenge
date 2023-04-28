import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { PinoDefaultConfig } from '@config/pino.config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggingInterceptor } from '@shared/interceptors/log.interceptor';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { envsValidator } from './config';
import { AuthModule } from './modules/auth/auth.module';
import { ContentModule } from './modules/content/content.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envsValidator,
      validationOptions: {
        abortEarly: true,
        whitelist: true,
      },
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: false,
      context: ({ req }) => ({ req }),
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    UserModule,
    AuthModule,
    ContentModule,
    LoggerModule.forRoot({
      ...PinoDefaultConfig,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, LoggingInterceptor],
})
export class AppModule {}
