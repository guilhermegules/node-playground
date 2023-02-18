const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (error, connection) => {
  if (error) {
    throw error;
  }

  connection.createChannel((channelError, channel) => {
    if (channelError) {
      throw channelError;
    }

    const queue = "hello";

    channel.assertQueue(queue, {
      durable: false,
    });

    console.log(
      `* Waiting for messages in queue ${queue}. To Exit press CTRL+C`
    );

    channel.consume(
      queue,
      (message) => {
        console.log(`[x] Received ${message.content.toString()}`);
      },
      {
        noAck: true,
      }
    );
  });
});
