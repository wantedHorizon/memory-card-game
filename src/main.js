const gameArea = document.querySelector('.game-area__game');
const menuArea = document.querySelector('.game-area__menu');

const time = document.querySelector('.time span');
const fails = document.querySelector('.err-counter span');


const state = {
    cardsGroups: [
        [
            {
                background: "https://cdn.shopify.com/s/files/1/2327/5701/articles/Omega-3-For-Dogs_1200x.jpg?v=1561351694",
                type: 1,
            },
            {
                background: "https://www.nationalgeographic.com/content/dam/animals/thumbs/rights-exempt/mammals/d/domestic-dog_thumb.jpg",
                type: 2,
            },
            {
                background: "https://media.nature.com/lw800/magazine-assets/d41586-020-01430-5/d41586-020-01430-5_17977552.jpg",
                type: 3,
            },
            {
                background: "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/17140825/Swedish-Vallhund-head-portrait-outdoors.jpg",
                type: 4,

            }, {
                background: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*",
                type: 5,
            },
            {
                background: "https://static01.nyt.com/images/2019/06/17/science/17DOGS/17DOGS-superJumbo.jpg",
                type: 6,
            }




        ]
    ],
    currentGroupCards: 0,
    cards: [],
    gameLevel: -1,
    startGame: false,
    errorCounter: 0,
    selectedCard1: null,
    selectedCard2: null,
    totalTime: 0,
    found: 0,
    clickEvents: [],
    clickActive: true,
    timeInterval: null



}





const createWorld = (level, groupType) => {

    let cardsElements = initGame(state.cardsGroups, 0);


    cardsElements = cardsElements.flat();
    shuffleArray(cardsElements);
    state.cards = cardsElements;
    cardsElements.forEach((card, index) => {
        card.dataset.index = index;
        gameArea.appendChild(card);

        state.clickEvents.push(card.addEventListener('click', cardOnclickHandler));

    });
}




const initGame = (cardsArr, type) => {

    return cardsArr[0].map((card, index) => {
        const card1 = createCard(card, index)
        const card2 = card1.cloneNode(true);
        card2.dataset.index = index + 6;
        return [card1, card2];

    })
}


const startGame = () => {
    btnOnResetGameHandler();
    state.timeInterval = setInterval(() => {
        state.totalTime++;
        time.innerHTML = state.totalTime;
    }, 1000);
}

const createCard = ({
    background,
    type
}, index) => {
    // console.log(background);
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.type = type;
    card.innerHTML = `
    <div class="card-inner">
    <div class="card-back">
      <img src="${background}" alt="Avatar" style="width:100%;height:100%;">
    </div>
    <div class="card-front">
    <img src="./card-back.png" alt="Avatar" style="width:100%;height:100%;" >
      
    </div>
  </div>
    `

    // card.style.background = `url(${background}) center center/cover`; 
    // card.style.objectFit = 'cover';
    // card.dataset.type=type;
    // card.dataset.index=index;


    return card;

}
//events

const btnOnResetGameHandler = (e) => {
    gameArea.innerHTML = "";

    createWorld();
    state.totalTime=0;
    fails.textContent = 0;
    state.errorCounter =0;
    state.selectedCard1 = null;
    state.selectedCard2 = null;
}

const btnOnStartGameHandler = (e) => {
    const menu =e.currentTarget.parentElement;
    const name = menu.querySelector('input.name').value;
    const level = menu.querySelector('select.level').value;

    if(!level || !name){
        return;
    }

    state.name = name;
    state.gameLevel = level;
    state.startGame = true;

    menuArea.style.display = "none";
    gameArea.style.display = "grid";

    startGame();
    


}

const btnReturnToMainMenu = (e) => {

    menuArea.style.display = "block";
    gameArea.style.display = "none";
    state.name = null;
    clearInterval(state.timeInterval);
    state.startGame = false;
    
    
}
const cardOnclickHandler = (e) => {
    const card = e.currentTarget;

    if (!state.clickActive || card.classList.contains('reveal')) {
        console.log('return');
        return;
    }

    //function to remove/pause all events
    const card1 = state.selectedCard1;
    card.classList.add('reveal');
    if (!card1) {
        state.selectedCard1 = {
            index: card.dataset.index,
            type: card.dataset.type
        }
    } else if (!state.selectedCard2) {
        state.clickActive = false;
        //valid two cards
        if (card1.type === card.dataset.type && card1.index !== card.dataset.index) {
            state.found++;
            if (state.found === 6) {
                //end game

                gameArea.innerHTML = "<h1> Game over You won!</h1>"
            }
            state.clickActive = true;
            state.selectedCard1 = null;
            state.selectedCard2 = null;
            return;
        }
        //incorret cards


        errorCards(state.cards[card1.index], card);

    }
    console.log(state);
}


const errorCards = (c1, c2) => {
    c1.classList.add('error');
    c2.classList.add('error');
    state.errorCounter++;
    fails.innerHTML = state.errorCounter;
    setTimeout(() => {
        c1.classList.remove('reveal');
        c2.classList.remove('reveal');
        c1.classList.remove('error');
        c2.classList.remove('error');
        state.selectedCard1 = null;
        state.selectedCard2 = null;

        state.clickActive = true;


    }, 2000);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}




//main 
// createWorld();

gameArea.style.display = 'none';

document.querySelector('.reset-game').addEventListener('click',btnOnResetGameHandler);
document.querySelector('.start-game').addEventListener('click',btnOnStartGameHandler);
document.querySelector('.new-game').addEventListener('click',btnReturnToMainMenu);

