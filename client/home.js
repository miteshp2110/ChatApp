const connectButton=document.getElementById('connectButton')

var room=document.getElementById('roomInput')
var uname=document.getElementById('nameInput')

connectButton.addEventListener('click',()=>{
    makeConnection()
})

function makeConnection(){
    if(uname.value!="" && room.value!=""){
        //console.log("name: "+uname.value+" room: "+room.value)
        const url=window.location.href
        const baseURL=`${url}chat/`
        const params=new URLSearchParams({
            name:uname.value,
            room:room.value
        })

        window.location.href=`${baseURL}?${params.toString()}`

    }
}


