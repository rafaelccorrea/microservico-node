import { prismaClient } from "../../infra/database/prismaClient";
import { KafkaSendMessage } from "../../infra/provider/kafka/producer";

type CreateClientRequest = {
  name: string;
  password: string;
  email: string;
  phone: string;
};

export class CreateClientUseCase {
  constructor() {}
  async execute(data: CreateClientRequest) {
    const costumer = await prismaClient.client.findFirst({
      where: {
        email: data.email,
      },
    });

    if (costumer) {
      throw new Error("E-mail already exists!");
    }

    const customerCreate = await prismaClient.client.create({
      data: {
        ...data,
      },
    });

    const kafkaProducer = new KafkaSendMessage();

    // Envio da mensagem para o broker
    await kafkaProducer.execute("CUSTOMER_CREATED_KAFKA", {
      id: customerCreate.id,
      email: customerCreate.email
    });

    return customerCreate;
  }
}
