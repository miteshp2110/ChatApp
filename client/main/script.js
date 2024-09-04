

const params=new URLSearchParams(window.location.search)
const uname=params.get('name')
const room=params.get('room')
const roomNumber=document.getElementById('roomNumber')

roomNumber.innerHTML=`Room: ${room}`


const chatArea=document.getElementById('chatContainer')
const sendButton=document.getElementById('sendButton')
const sendText=document.getElementById('sendText')


//make connection

const socket=io({
    query:{
        name:uname,
        room:room
    }
})

//Handle socket io broadcast
socket.on('broadcast',(data)=>{
    handleBroadcast(data)
})

//To handle recieved message
socket.on('messageRecieved',(data)=>{
    //console.log("name: "+data.name+" msg: "+data.message)

    const msgElement=document.createElement('div')
    msgElement.classList.add('message')

    const msgTitle=document.createElement('div')
    msgTitle.classList.add('messageSender')
    msgTitle.innerHTML=data.name

    msgElement.appendChild(msgTitle)
        
    const msgBody=document.createElement('div')
    msgBody.innerHTML=data.message

    msgElement.appendChild(msgBody)


    chatArea.appendChild(msgElement)
    chatArea.scrollTop=chatArea.scrollHeight
})










sendButton.addEventListener('click',()=>{
    sendMessage()
})

sendText.addEventListener('keydown',function(event){
    if(event.key=="Enter"){
        sendMessage()
    }
})

function sendMessage(){
    //console.log("send message")

    if(sendText.value!='' && roomNumber.innerHTML!='No connection'){
        const msgElement=document.createElement('div')
        msgElement.classList.add('message')
        msgElement.classList.add('sent')

        const msgTitle=document.createElement('div')
        msgTitle.classList.add('messageSender')
        msgTitle.classList.add('sender')
        msgTitle.innerHTML='You'

        msgElement.appendChild(msgTitle)
        
        const msgBody=document.createElement('div')
        msgBody.innerHTML=sendText.value

        msgElement.appendChild(msgBody)


        chatArea.appendChild(msgElement)
        chatArea.scrollTop=chatArea.scrollHeight

        
        socket.emit('message',{
            'name':uname,
            'message':sendText.value
        })
        sendText.value=''
    }

}


function handleBroadcast(data){
    const broadCastElement=document.createElement('div')
    broadCastElement.classList.add('broadcast')


    if(data.flag==1){
        broadCastElement.innerHTML=`${data.name} has joined the chat`
    }else{
        broadCastElement.innerHTML=`${data.name} has left the chat`
    }

    chatArea.appendChild(broadCastElement)
    chatArea.scrollTop=chatArea.scrollHeight
}




