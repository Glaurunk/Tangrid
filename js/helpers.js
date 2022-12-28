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
function DisplayMessage(text,delay=0)
{
  setTimeout( ()=> {
    messagesDiv.innerHTML = "";
    const msg = document.createElement('div');
    msg.classList.add('message');
    msg.innerHTML = text;
    messagesDiv.appendChild(msg);
    setTimeout(()=> {  messagesDiv.innerHTML = "";}, 5500);
  }, delay);
}

// counts and displays the elapsed time
function CountTime()
{
  // If the minutes or seconds are less than 10 add a zero
  let preS = "0";
  let preM = "0";
  const timeSpan = document.getElementById('time');
  let minutes = 0;
  let seconds = 0;
  // start clock
  setInterval(()=>{
    seconds ++;
    if (seconds > 9) preS = "";
    if (seconds >= 60) {
      seconds = 0;
      preS = "0";
      minutes++;
    }
    if (minutes > 9) preM = "";
    timeSpan.innerHTML = preM + minutes + ":" + preS + seconds;
  }, 1000);
}

// shows the active player
function ShowActivePlayer()
{
  if (activePlayer == 2) nowPlaying.innerHTML = "Now Playing: Player 2";
  else nowPlaying.innerHTML = "Now Playing: Player 1";
}

// passes the turn
function SwapActivePlayer()
{
  if (activePlayer == 1) activePlayer = 2;
  else activePlayer = 1;
  if (activePlayer == 2) Player2Turn();
  if (activePlayer == 1) DrawCard(1);
  ShowActivePlayer();
}

