const amqp=require("amqplib")

async function startpaymentservice(){
    const connection=await amqp.connect('amqp://127.0.0.1')
    const channel=await connection.createChannel()


    await channel.assertQueue('payment_queue',{durable:false})

console.log('payment service is waiting for payment response')
channel.consume('payment_queue',(msg)=>{
    const paymentRequest=JSON.parse(msg.content.toString())
    console.log(`Recieved payment request :${JSON.stringify(paymentRequest)}`)
console.log('processing payment...')
console.log(paymentRequest,"paymentrequest")
// console.log(paymentRequest.userId,"paymentrequestuserId")
console.log('payment processed...')
// acknowledging the queue


 channel.ack(msg)
 
 },{noAck:false})
}
startpaymentservice()