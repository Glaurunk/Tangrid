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
            ShowActivePlayer();
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
                    SwapActivePlayer() },3000);
            }
            // enable ui buttons
            setTimeout(()=> { 
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
    //DISCARD & PASS BUTTON
    //GIVE UP BUTTON
    endBtn.addEventListener('click', ()=> { 
        confirmBtn.addEventListener('click', ()=> {
            Clear();
            $('#modal').modal('hide');
            setTimeout(()=> {
                modalLabel.innerHTML = "The CPU wins the game";
                modalText.innerHTML = '';
                document.querySelector('.modal-footer').style.visibility = 'hidden';
                $('#modal').modal('show');
                restartBtn.disabled = false;
                exitBtn.disabled = false;
                clearInterval(timer);
            },1000);
        });
        modalLabel.innerHTML = '';
        modalText.innerHTML = "Are you sure you want to surrender? Regardless of the current score you will loose the match";
        document.querySelector('.modal-footer').style.visibility = 'visible';
        $('#modal').modal('show');
    });


    //NEW GAME BUTTON
    restartBtn.addEventListener('click', ()=> { 
        confirmBtn.addEventListener('click', ()=> { 
            SetCookie('reload','true');
            location.reload();
        });
        document.querySelector('.modal-footer').style.visibility = 'visible';
        modalLabel.innerHTML = '';
        modalText.innerHTML = "Are you sure you want to start a new game? All progress will be lost";
        $('#modal').modal('show');
    });

    // EXIT BUTTON
    exitBtn.addEventListener('click', ()=> { 
        confirmBtn.addEventListener('click', ()=> location.reload() );
        document.querySelector('.modal-footer').style.visibility = 'visible';
        modalLabel.innerHTML = '';
        modalText.innerHTML = "Are you sure you want to exit to the main menu? All progress will be lost";
        $('#modal').modal('show');
    });
}

// Undo last move
function Undo()
{
    p1handDiv.appendChild();
}



