const amqp=require("amqplib")

async function startpaymentservice(){
    const connection=await amqp.connect('amqp://rabbitmq:5672')
    const channel=await connection.createChannel()


    await channel.assertQueue('payment_queue',{durable:false})

console.log('payment service is waiting for payment response')
channel.consume('payment_queue',(msg)=>{
    const paymentRequest=JSON.parse(msg.content.toString())
    console.log(`Recieved payment request :${JSON.stringify(paymentRequest)}`)
},{noAck:true})
}
startpaymentservice()