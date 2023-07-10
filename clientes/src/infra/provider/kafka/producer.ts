import { kafka } from ".";

export class KafkaSendMessage {
  async execute(topic: string, payload: any): Promise<void> {
    const producer = kafka.producer();

    await producer.connect();

    console.log(`MESSAGE SEND TO TOPIC: ${topic}`);
    console.log(payload);

    await producer.send({
      topic,
      messages: [
        {
          value: JSON.stringify(payload),
        },
      ],
    });
    await producer.disconnect();
  }
}
