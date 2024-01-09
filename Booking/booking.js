const amqp=require('amqlib')
async function startBookingservice(){
    const connection=await amqp.connect('amqp://rabbitmq:5672');
    await channel.assertQueue('booking_queue',{durable:false});
    console.log('booking service is waiting for booking requests')

    channel.consume('booking_queue',(msg)=>{
        const bookingRequest=JSON.parse(msg.content.toString())

        console.log(`Received booking request: ${JSON.stringify(bookingRequest)}`)
    },{noAck:true})
}
startBookingservice()