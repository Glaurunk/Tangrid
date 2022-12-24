// returns a random is
function MakeId()  
{
    let ID = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for ( var i = 0; i < 12; i++ ) {
      ID += characters.charAt(Math.floor(Math.random() * 36));
    }
    return ID;
}

// displays a message in the message area
function DisplayMessage(text)
{
  messagesDiv.innerHTML = "";
  const msg = document.createElement('div');
  msg.classList.add('message');
  msg.innerHTML = text;
  messagesDiv.appendChild(msg);
  setTimeout(()=> {  messagesDiv.innerHTML = "";}, 5500);
}