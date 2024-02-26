let player1Name = '';
let player2Name = '';
let playerBtn = document.querySelector('#player-btn')
let player

let boxes = document.querySelectorAll('.box')
let resetBtn = document.querySelector('#reset-btn')

let newGameBtn = document.querySelector('#new-btn')
let msgContainer = document.querySelector('.msg-container')
let msg = document.querySelector('#msg')

let tryGameBtn = document.querySelector('#try-btn')
let tryContainer = document.querySelector('.try-container')

let turnO = true;   // player O
let count = 0;

let winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],  
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add('hide')
    tryContainer.classList.add('hide')
    document.body.style.backgroundColor = '#548687'
    window.refresh();
}
const choosePlayer = () => {
    player1Name = prompt('Enter player 1 name: ')
    player2Name = prompt('Enter player 2 name: ')
}
const enableBoxes = () => {
    for (let box of boxes){
        box.disabled = false;
        box.innerText = '';
    }
    
}
const disableBoxes = () => {
    for (let box of boxes){
        box.disabled = true;
    }
}
boxes.forEach((box) => {


    box.addEventListener('click', () => {
        if (player1Name != "" && player2Name != ""){
            if(turnO){
                box.innerText = 'O'
                turnO = false;
                player = player1Name
            }else{
                box.innerText = 'X'
                turnO = true;
                player = player2Name
            }
            count++;
            box.disabled = true;
            checkWinner();        
        }else{
            alert('please choose player...')
        }
    })

})

const showWinner = (winner) => {
        msg.innerText = `Congratulations, winner is ${winner}`;
        document.body.style.backgroundColor = '#00dd11'
        msgContainer.classList.remove('hide')
        disableBoxes();
    
}
const tieGame = () => {
    tryContainer.classList.remove('hide')
    document.body.style.backgroundColor = '#dd1100'
    disableBoxes();
}

function checkWinner(){
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText
        let pos2Val = boxes[pattern[1]].innerText
        let pos3Val = boxes[pattern[2]].innerText
        // console.log(pos1Val, pos2Val, pos3Val)
        if (pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(player);
            }else{
                if(count == 9){
                    tieGame()
                }
            }
        }
    }
}

newGameBtn.addEventListener('click', resetGame);
tryGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);
playerBtn.addEventListener('click', () => {
    choosePlayer();
    playerBtn.classList.add('hide');
})