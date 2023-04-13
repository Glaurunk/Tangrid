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
    const msg = document.createElement('div');
    msg.classList.add('message');
    msg.innerHTML = text;
    messagesDiv.appendChild(msg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }, delay);
}

// displays a message in the message area
function DisplayDetails(text)
{
    const msg = document.createElement('li');
    msg.classList.add('list-group-item');
    msg.innerHTML = text;
    detailsUl.appendChild(msg);
}

// counts and displays the elapsed time
function CountTime()
{
  // If the minutes or seconds are less than 10 add a zero
  let preS = "0";
  let preM = "0";
  let minutes = 0;
  let seconds = 0;
  // start clock
  timer = setInterval(()=>{
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
  nowPlaying.innerHTML = activePlayer;
}

// passes the turn
function SetActivePlayer(player)
{
  Clear();
  // check for available positions
  let x = FindAvailablePositions();
  if (x.length === 0) GameOver();

  activePlayer = player;
  if (activePlayer === 2) {
    SetDetailsColor(2);
    DisplayMessage('The Computer plays');
    ToggleButtons(0,0,0,0,0);
    Player2Turn();
  }
  if (activePlayer === 1) {
    DisplayMessage('Player 1 plays');
    SetDetailsColor(1);
    setTimeout(() => { 
      ToggleButtons(2,1,1,1,1);
      DrawCard(1);
    },2000);
  }
  ShowActivePlayer();
}

// Toggles UI buttons on (1) and off (0). Other values leave the state unchanged
function ToggleButtons(rotate=2,discard=2,surrender=2,restart=2,exit=2)
{
  if (rotate === 1) rotateBtn.disabled = false;
  else if (rotate === 0) rotateBtn.disabled = true;

  if (discard === 1) discardBtn.disabled = false;
  else if (rotate === 0) discardBtn.disabled = true;

  if (surrender === 1) endBtn.disabled = false;
  else if (rotate === 0) endBtn.disabled = true;

  if (restart === 1) restartBtn.disabled = false;
  else if (rotate === 0) restartBtn.disabled = true;

  if (exit === 1) exitBtn.disabled = false;
  else if (rotate === 0) exitBtn.disabled = true;
}

// Clears State and Data
function Clear()
{
  selectedT = 0;
  detailsUl.innerHTML = "";
}

// Sets a cookie for a given time in ms
function SetCookie(cname, cvalue, ms=5000) {
  const d = new Date();
  d.setTime(d.getTime() + (ms));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=None;Secure";
}

// gets a cookie by name
function GetCookie(cname) { 
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//reverses a position. Used for referencing neighboring opposite positions
function ReversePosition(pos)
{
    switch(pos)
    {
        case 'top':
            return 'bottom';
        case 'right':
            return 'left';
        case 'bottom':
            return 'top';
        case 'left':
            return 'right';
        default:
            break;
    }
}

// A Helper that receives a label and a position and returns a character
function GetColorFromPosition(label,position)
{
    switch(position)
    {
        case 'top':
            return label.substr(0,1);
        case 'right':
            return label.substr(1,1);
        case 'bottom':
            return label.substr(2,1);
        case 'left':
            return label.substr(3,1);
        default:
            break;
    }
}

// Moves the last character inside a 4 characters string to the front
function RotateString(string)
{
    if (string.length != 4) return;
    var b = string.substr(0,3);
    var a = string.substr(3,1);
    selectedT.dataset.label = a+b;
}

// Returns an alphnumerical position on the grid based on an index
function GetPositionFormIndex(index)
{
    const a = 65 + Math.floor(index/5); 
    const b = 1 + index%5;
    //console.log('a='+a + ',b='+b);
    return String.fromCharCode(a)+b;
}




