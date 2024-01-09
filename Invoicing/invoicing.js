const amqp=require('amqplib')

async function startInvoingService(){
    const connection=await amqp.connect('amqp://rabbitmq:5672')

    const channel=await connection.createChannel()


    await channel.assertQueue('Invoicing_queue',{durable:false})

    console.log('Invoicing service is waiting for invoicing requests')



channel.consume('Invoicing_queue',(msg)=>{
const InvoicingRequest=JSON.parse(msg.content.toString())

console.log(`Received invoicing request:${JSON.stringify(InvoicingRequest)}`)




},{noAck:true})}

startInvoingService()