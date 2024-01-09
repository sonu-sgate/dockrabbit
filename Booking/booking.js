const amqp=require('amqplib')
async function startBookingservice(){
    const connection=await amqp.connect("amqp://127.0.0.1");
    const channel=await connection.createChannel()

    await channel.assertQueue('booking_queue',{durable:false});
    await channel.assertQueue('payment_queue',{durable:false})
    console.log('booking service is waiting for booking requests')

    channel.consume('booking_queue',(msg)=>{
        const bookingRequest=JSON.parse(msg.content.toString())

        console.log(`Received booking request: ${JSON.stringify(bookingRequest)}`)
        console.log("processing request... ")

        const paymentRequest={user:bookingRequest.user,amount:100}
        channel.sendToQueue('payment_queue',Buffer.from(JSON.stringify(paymentRequest)))
console.log(`Sent Payment request :${JSON.stringify(paymentRequest)}`)
console.log(bookingRequest,"bookingrequest")
console.log("booking processed...")
        // acknowleding the booking queue
channel.ack(msg)
    },{noAck:false})
}
startBookingservice()