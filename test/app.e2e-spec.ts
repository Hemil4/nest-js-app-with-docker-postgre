import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto';
import { CreateBookmarkDto } from 'src/bookmark/dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();

    pactum.request.setBaseUrl(process.env.BASE_URL || 'http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('auth', () => {
    describe('signup', () => {
      it('should fail to sign up with invalid email', async () => {
        const dto: AuthDto = {
          email: 'test.com',
          password: '12345678',
        };

        await pactum.spec().post('/auth/signup').withBody(dto).expectStatus(400);
      });
      it('should throw if email empty', async () => {
        const dto: AuthDto = {
          email: '',
          password: '12345678',
        };

        await pactum.spec().post('/auth/signup').withBody(dto).expectStatus(400);
      });
      it('should sign up successfully', async () => {
        const dto: AuthDto = {
          email: 'vH4Q2@example.com',
          password: '12345678',
        };

        await pactum.spec().post('/auth/signup').withBody(dto).expectStatus(200);
      });
    });

    describe('signin', () => {
      it('should fail to sign in with invalid email', async () => {
        const dto: AuthDto = {
          email: 'test.com',
          password: '12345678',
        };

        await pactum.spec().post('/auth/signin').withBody(dto).expectStatus(400);
      });
      it('should throw if email empty', async () => {
        const dto: AuthDto = {
          email: '',
          password: '12345678',
        };

        await pactum.spec().post('/auth/signin').withBody(dto).expectStatus(400);
      });
      it('should sign in successfully', async () => {
        const dto: AuthDto = {
          email: 'vH4Q2@example.com',
          password: '12345678',
        };

        await pactum.spec().post('/auth/signin').withBody(dto).expectStatus(200).stores('userAt', 'access_token');
      });
    });
  });

  describe('user', () => {
    describe('Get me', () => {
      it('should get current user', async () => {
        await pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });

    describe('Edit user', () => {
      it('should update user', async () => {
        const dto: EditUserDto = {
          email: 'vH4Q2@example.com',
          firstName: 'John',
        };

        await pactum
          .spec()
          .patch('/users')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200);
      });
    });
  });

  describe('Bookmarks', () => {
    describe('Get empty bookmarks', () => {
      it('get empty bookmarks', async () => {
        await pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBody([]);
      });
    });
    describe('Create bookmark', () => {
      const dto: CreateBookmarkDto = {
        title: 'Test Bookmark',
        link: 'https://test.com',
      };
      it('should create bookmark', async () => {
        await pactum
          .spec()
          .post('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(201)
          .stores('bookmarkId', 'id');
      });
    });
    describe('Get bookmarks', () => {
      it('get bookmarks', async () => {
        await pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });
    describe('Get bookmark by id', () => {
      it('should get bookmark by id', () => {
        return pactum
          .spec()
          .get('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBodyContains('$S{bookmarkId}');
      });
    });
    describe('Edit bookmark', () => {
      const dto: CreateBookmarkDto = {
        title: 'Updated Bookmark',
        link: 'https://updated.com',
      };
      it('should edit bookmark', async () => {
        await pactum
          .spec()
          .patch('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains('$S{bookmarkId}');

      });
    });
    describe('Delete bookmark', () => {
      it('should delete bookmark', async () => {
        await pactum
          .spec()
          .delete('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(204);
      });
    });
    describe('Get empty bookmarks', () => {
      it('get empty bookmarks', async () => {
        await pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
      });
    });
    
  });
});
