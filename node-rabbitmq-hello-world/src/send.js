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
    const message = "Hello RabbitMQ!";

    channel.assertQueue(queue, {
      durable: false,
    });

    channel.sendToQueue(queue, Buffer.from(message));
    console.log(`Send ${message} to queue ${queue}`);
  });

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
});
