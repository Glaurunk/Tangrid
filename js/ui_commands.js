// Adds event listeners to the UI buttons
function InitUI()
{   
    startBtn.addEventListener('click' , ()=> {
        homeScreen.classList.add('hidden');
        setTimeout(()=> {
            DisplayMessage("Game Begins",1000);
            CountTime();
            ShowActivePlayer();
            setTimeout(()=> { DrawCard(1) },3000);
        });
        setTimeout(()=> { gameStarted = true }, 5000);
    });

    rotateBtn.addEventListener('click', ()=> {
        if (selectedT) RotateTile();
    });
}

// Undo last move
function Undo()
{
    p1handDiv.appendChild()
}

// Displays a modal foe Player 2 Thinking
function ShowP2Thinking()
{
    p2thinkDiv.classList.add('shown');
    setTimeout(()=> {
        p2thinkDiv.classList.remove('shown');
        SwapActivePlayer();
    }, P2_THINK_TIME);
}

// reveals player 2 hand
function FlipP2Hand(facing)
{
    for (let i=0; i<p2Hand.length; i++)
    {
        p2Hand[i].facing = facing;
    }
    //DrawPlayerHand(2);  
}
