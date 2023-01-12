// Adds event listeners to the UI buttons
function InitUI()
{   
    // SETTINGS BUTTON
    settingsBtn.addEventListener('click', ()=> {
        settingsDiv.classList.toggle('hidden');
    });
    
    // RULES BUTTON
    rulesBtn.addEventListener('click', ()=> {
        rulesDiv.classList.toggle('hidden');
    });
    
    // START BUTTON
    startBtn.addEventListener('click' , ()=> {
        // CLose panels
        homeScreen.classList.add('hidden');
        settingsDiv.classList.add('hidden');
        rulesDiv.classList.add('hidden');
        setTimeout(()=> {
            DisplayMessage("Game Begins",1000);
            // Disable radio buttons
            playerOrderRbtns.forEach(btn => { 
                btn.disabled = true;
                btn.parentElement.style.opacity = "0.5";
                btn.parentElement.title = "The first player can be defined only before starting a game";
            }); 
            difficultyRbtns.forEach(btn => { 
                btn.disabled = true;
                btn.parentElement.style.opacity = "0.5";
                btn.parentElement.title = "The game difficulty can be defined only before starting a game";
            }); 
            // Start by player order
            if (playerOrder === 1) {
                setTimeout(()=> { 
                    DrawCard(1) ;
                },3000);
            } else {
                setTimeout(()=> { 
                    SetActivePlayer(2) },3000);
            }
            // enable ui buttons
            setTimeout(()=> { 
                ShowActivePlayer();
                CountTime();
                gameStarted = true;
                if (playerOrder === 1) {             
                    undoBtn.disabled = false;
                    discardBtn.disabled = false;
                    endBtn.disabled = false;
                    restartBtn.disabled = false;
                    exitBtn.disabled = false;
                }
            }, 3000);
        });
    });

    rotateBtn.addEventListener('click', ()=> {
        if (selectedT && gameStarted === true && playerOrder === 1) RotateTile();
    });

    //PLAYER ORDER
    playerOrderRbtns.forEach(btn => {
        btn.addEventListener('click', ()=> {
            if (btn.checked) {
                if (gameStarted === false) {
                    let p = parseInt(btn.dataset.player);
                    if (p === 1) playerOrder = 1;
                    if (p === 2) playerOrder = 2;
                    if (p === 0) playerOrder = Math.round(Math.random(1,2))+1;
                } 
            }
        });
    });
    
    //DIFFICULTY LEVEL
    difficultyRbtns.forEach(btn => {
        btn.addEventListener('click', ()=> {
            if (btn.checked) {
                if (gameStarted === false) {
                    difficulty = parseInt(btn.dataset.difficulty);
                } 
            }
        });
    });
    
    //UNDO BUTTON
    undoBtn.addEventListener('click', ()=> {
        confirmCommand = 'undo';
        modalLabel = '';
        modalText = 'Undo the last Placement?';
        document.querySelector('.modal-footer').style.visibility = 'visible';
        $('#modal').modal('show');
    });
       
    //DISCARD & PASS BUTTON
    discardBtn.addEventListener('click', ()=> {
        confirmCommand = 'discard';
        modalLabel.innerHTML = '';
        modalText.innerHTML = 'Discard the current hand and draw 6?';
        document.querySelector('.modal-footer').style.visibility = 'visible';
        $('#modal').modal('show');
    });

    //GIVE UP BUTTON
    endBtn.addEventListener('click', ()=> { 
        confirmCommand = 'surrender';
        modalLabel.innerHTML = '';
        modalText.innerHTML = "Are you sure you want to surrender? Regardless of the current score you will loose the match";
        document.querySelector('.modal-footer').style.visibility = 'visible';
        $('#modal').modal('show');
    });

    //NEW GAME BUTTON
    restartBtn.addEventListener('click', ()=> { 
        confirmCommand = 'restart';
        document.querySelector('.modal-footer').style.visibility = 'visible';
        modalLabel.innerHTML = '';
        modalText.innerHTML = "Are you sure you want to start a new game? All progress will be lost";
        $('#modal').modal('show');
    });

    // EXIT BUTTON
    exitBtn.addEventListener('click', ()=> { 
        confirmCommand = 'exit';
        document.querySelector('.modal-footer').style.visibility = 'visible';
        modalLabel.innerHTML = '';
        modalText.innerHTML = "Are you sure you want to exit to the main menu? All progress will be lost";
        $('#modal').modal('show');
    });

    // CONFIRM BUTTON
    confirmBtn.addEventListener('click', ()=> {
        switch(confirmCommand)
        {
            case 'surrender':
                $('#modal').modal('hide');
                DisplayMessage("Player 1 yields");
                setTimeout(()=> { Surrender() },1000);
                break;
            case 'restart':
                SetCookie('reload','true');
                location.reload();
                break;
            case 'exit':
                location.reload();
                break;
            case 'discard':
                $('#modal').modal('hide');
                DisplayMessage("Player 1 discards and draws 6 <br> Player 1 passes the turn");
                setTimeout(()=> { ResuffleAndPass(1) },2000);
                break;
            case 'undo':
                Undo();
                break;
            default:
                break;
        }
    });
}


// Undo last move
function Undo()
{
    console.log('undo');
}

// Ends the game and displayes the winner
function GameOver()
{   
    Clear();
    clearInterval(timer);
    if (p1Score>p2Score) modalLabel.innerHTML = 'GAME OVER <br> PLAYER 1 WINS!';
    else if (p1Score<p2Score) modalLabel.innerHTML = 'GAME OVER <br> THE CPU WINS!';
    else modalLabel.innerHTML = 'GAME OVER <br> IT\'S A TIE!';
    modalText.innerHTML = 'Final Score: ' + p1Score + ' - ' + p2Score + '. Time Elapsed: ' + timeSpan.innerHTML;
    document.querySelector('.modal-footer').style.visibility = 'hidden';
    $('#modal').modal('show');
    restartBtn.disabled = false;
    exitBtn.disabled = false;
}

// Ends the game if the player yields
function Surrender()
{
    Clear();
    modalLabel.innerHTML = 'GAME OVER <br> THE CPU WINS!';
    modalText.innerHTML = 'Player 1 yielded';
    document.querySelector('.modal-footer').style.visibility = 'hidden';
    $('#modal').modal('show');
    restartBtn.disabled = false;
    exitBtn.disabled = false;
    clearInterval(timer);
}

