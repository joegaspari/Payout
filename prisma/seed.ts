import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seed() {
    try {

      // Lets collect the managerIDs and ClientIDs as they are generated in the db, this will be for generating relationships
      let managerIds: string[] = []
      let clientIds: string[] = []
      // Add user data using faker, lets create 5 users
      for (let i = 0; i < 6; i++) {
          const fakerUID = faker.string.uuid()
          const fakeUser = await prisma.user.create({
            data: {
              id: fakerUID,
              firstName: faker.person.firstName(),
              lastName: faker.person.lastName(),
              email: faker.internet.email(),
              password: `pass_123${i}`
            },
          });
          if (i < 2){
            const fakerManager = await prisma.manager.create({
              data: {
                id: fakerUID
              },
              select: {
                id: true
              }
            })
            managerIds.push(fakerManager.id)
          } else {
            const fakerClient = await prisma.client.create({
              data: {
                id: fakerUID,
                phoneNumber: faker.phone.number()
              }
            })
            clientIds.push(fakerClient.id)
          }
          
          console.log(fakeUser)
      }
      //lets link 2 clients to each of the managers
      const fakerManager1Client1 = await prisma.managerClient.create({
        data: {
          managerId: managerIds[0],
          clientId: clientIds[0]
        }
    })

      console.log('Data seeded into the User table successfully');


    }catch (error) {
      console.error('Error seeding data:', error);
    }finally {
        await prisma.$disconnect();
    }
}

seed();
