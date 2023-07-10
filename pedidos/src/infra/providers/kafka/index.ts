import { Kafka, logLevel  } from "kafkajs";

const kafka = new Kafka({
  logLevel: logLevel.INFO,
  brokers: ["dominant-husky-6872-us1-kafka.upstash.io:9092"],
  sasl: {
    mechanism: "scram-sha-256",
    username: "ZG9taW5hbnQtaHVza3ktNjg3MiTMBxalPrRSemH8c6th3p2NDDr9tuO87G5ZoaQ",
    password: "41cfaca444ab42eab4d780cca491dbd7",
  },
  ssl: true,
});

export { kafka };
