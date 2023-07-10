import { prismaClient } from "../../../database/prismaClient";
import { kafkaConsumer } from "../kafka.consumer";

type ProductConsumer = {
  code: string;
  id: string;
};

export async function createProductConsumer() {
  const consumer = await kafkaConsumer("PRODUCT_CREATED_KAFKA");

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const messageToString = message.value!.toString();
      const product = JSON.parse(messageToString) as ProductConsumer;

      await prismaClient.product.create({
        data: {
          externalId: product.id,
          code: product.code,
        },
      });
    },
  });
}

createProductConsumer();
