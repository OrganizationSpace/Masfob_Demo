// queueController.js
let channel

const setChannel = (ch) => {
    channel = ch
}

const sendToQueue = (queue, action, content) => {
    try {
        data = {
            action: action,
            data: content,
        }
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)))
        console.log(`Message sent to queue: ${queue}`)
        return true
    } catch (error) {
        console.error('Failed to send message to queue', error)
        return false
    }
}
const ack = (data) => {//This function acknowledges the receipt and successful processing of a message.
    channel.ack(data)//Acknowledges the message, telling RabbitMQ that the consumer has successfully processed it.
}
const nack = (data) => {//If a consumer encounters an error while processing a message, it can use nack to inform RabbitMQ that the message was not processed successfully.
    channel.nack(data)
}

module.exports = {
    setChannel,
    sendToQueue,
    ack,
    nack,
}