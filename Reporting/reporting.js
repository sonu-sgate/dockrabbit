const amqp=require('amqplib')

async function startReportingService(){
    const connection=await amqp.connect('amqp://127.0.0.1')
    const channel=await connection.createChannel()

    await channel.assertQueue('reporting_queue',{durable:false})
console.log('Reporting service is wating for reporting requests')

channel.consume('reporting_queue',(msg)=>{
const reportingRequest=JSON.parse(msg.content.toString())
console.log(`Recieved reporing request:${JSON.stringify(reportingRequest)}`)

},{noAck:true})

}
startReportingService()