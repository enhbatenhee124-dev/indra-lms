import { Queue } from "bullmq";
import redis from "./redis";

export const emailQueue = new Queue("email-notifications", {
  connection: redis as any,
});
