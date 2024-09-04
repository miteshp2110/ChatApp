const express=require('express')
const socketIO=require('socket.io')
const http=require('http')
const { Socket } = require('dgram')
const path=require('path')
const app=express()






const server=http.createServer(app)

const io=socketIO(server)
//Express endpoints

app.use(express.static(path.join(__dirname,'client')))
app.use('/chat',express.static(path.join(__dirname,'client/main')))




//Socket io 
io.on('connection',(socket)=>{
    //To handle connection
    console.log("Connected a user with id: "+socket.id)
    console.log("name: "+socket.handshake.query.name)
    console.log("room: "+socket.handshake.query.room)

    socket.join(socket.handshake.query.room)

    socket.to(socket.handshake.query.room).emit('broadcast',{'name':socket.handshake.query.name,'flag':1})


    //To handle message

    socket.on('message',(data)=>{
        //console.log("user sent a message")
        socket.to(socket.handshake.query.room).emit('messageRecieved',data)
    })


    



    //To handle disconnect
    socket.on('disconnect',()=>{
        console.log("user disconnected")
        socket.to(socket.handshake.query.room).emit('broadcast',{'name':socket.handshake.query.name,'flag':0})


    })
})



server.listen(3000,()=>{
    console.log("Server running on port "+3000)
})