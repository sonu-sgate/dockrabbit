const amqp=require('amqplib')

async function startInvoingService(){
    const connection=await amqp.connect('amqp://127.0.0.1')

    const channel=await connection.createChannel()


    await channel.assertQueue('Invoicing_queue',{durable:false})
    await channel.assertQueue('reporting_queue',{durable:false})

    console.log('Invoicing service is waiting for invoicing requests')



channel.consume('Invoicing_queue',(msg)=>{
const InvoicingRequest=JSON.parse(msg.content.toString())
// console.log(msg,"invoicing msg")
console.log(`Received invoicing request:${JSON.stringify(InvoicingRequest)}`)
const reportRequest={user:msg.user,Report:"Yes"}
channel.sendToQueue("reporting_queue",Buffer.from(JSON.stringify(reportRequest)))



channel.ack(msg)
},{noAck:false})}

startInvoingService()