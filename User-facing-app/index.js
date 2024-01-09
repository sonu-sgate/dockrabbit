const express=require('express')
const amqp=require('amqplib')
const app=express()

app.use(express.json())

app.get('/',async(req,res)=>{
    console.log("hi")
    res.status(200).json({msg:"Welcome to our lovely backend"})
})
app.post('/submit-booking',async(req,res)=>{
    const {user,details}=req.body
    if(!user||!details){
        res.status(400).json({msg:"Please Provide the required details"})
    }else{
        try{
const connection=await amqp.connect('amqp://localhost')
const channel=await connection.createChannel()
const bookingRequest={user,details}
channel.sendToQueue('booking_queue',Buffer.from(JSON.stringify(bookingRequest)))

console.log(`Booking data send:${JSON.stringify(bookingRequest)}`)
res.status(200).json({msg:"booking data send"})
setTimeout(()=>{
connection.close()
},500)
        }catch(err){
            res.status(500).json({msg:"Internal error"})
        }
    }
})
app.listen(6050,()=>{
    console.log("port is running on the port number 9080")
})