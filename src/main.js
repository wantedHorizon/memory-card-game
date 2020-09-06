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
            },
            {
                background: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/dog_cool_summer_slideshow/1800x1200_dog_cool_summer_other.jpg",
                type: 7,
            },
            {
                background: "https://i.insider.com/5ec6c6dc988ee362762f137b?width=1100&format=jpeg&auto=webp",
                type: 8,
            },
            {
                background: "https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=300&quality=45&auto=format&fit=max&dpr=2&s=20c1a08d26568b0d2623dfc8a59c0e44",
                type: 9,
            },
            {
                background: "https://atlantahumane.org/wp-content/uploads/2020/06/Adopt-a-Dog-Page-Header-Image.jpg",
                type: 10,

            }, {
                background: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRAO8aETizUy52JGirP7qbert5woSPuVOrOLw&usqp=CAU",
                type: 11,
            },
            {
                background: "https://static.standard.co.uk/s3fs-public/thumbnails/image/2020/01/16/11/pet-tech-tractive-gps-classic-.jpg?w968",
                type: 12,
            }






        ],
        [
            {
                background: "https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg",
                type: 1,
            },
            {
                background: "https://www.sciencenews.org/wp-content/uploads/2020/02/021520_catallergies_main.jpg",
                type: 2,
            },
            {
                background: "https://images.theconversation.com/files/140105/original/image-20161003-20228-bbrcqu.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=496&fit=clip",
                type: 3,
            },
            {
                background: "https://icatcare.org/app/uploads/2018/07/Elderly-cats.png",
                type: 4,

            }, {
                background: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*",
                type: 5,
            },
            {
                background: "https://images.theconversation.com/files/85597/original/image-20150618-23263-z93lud.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip",
                type: 6,
            },
            {
                background: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/dog_cool_summer_slideshow/1800x1200_dog_cool_summer_other.jpg",
                type: 7,
            },
            {
                background: "https://woodgreen.org.uk/image/image/image/aqCXTNCYOPOJ1ra5XEyeLqte58IAvUyDbNarHLTF.jpeg?w=800&h=422&fit=crop-center",
                type: 8,
            },
            {
                background: "https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=300&quality=45&auto=format&fit=max&dpr=2&s=20c1a08d26568b0d2623dfc8a59c0e44",
                type: 9,
            },
            {
                background: "https://atlantahumane.org/wp-content/uploads/2020/06/Adopt-a-Dog-Page-Header-Image.jpg",
                type: 10,

            }, {
                background: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRAO8aETizUy52JGirP7qbert5woSPuVOrOLw&usqp=CAU",
                type: 11,
            },
            {
                background: "https://static.standard.co.uk/s3fs-public/thumbnails/image/2020/01/16/11/pet-tech-tractive-gps-classic-.jpg?w968",
                type: 12,
            }






        ],
        
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





const createWorld = () => {
    console.log(state.gameLevel);
    let cardsElements = initGame(state.cardsGroups, state.gameLevel, 0);


    cardsElements = cardsElements.flat();
    shuffleArray(cardsElements);
    state.cards = cardsElements;
    cardsElements.forEach((card, index) => {
        card.dataset.index = index;
        gameArea.appendChild(card);

        state.clickEvents.push(card.addEventListener('click', cardOnclickHandler));

    });
}




const initGame = (cardsArr, level, groupType) => {
    let upTo = 0;
    switch (parseInt(level)) {
        case 0:
            upTo = 6;
            gameArea.setAttribute('level', 'easy');
            break;
        case 1:
            upTo = 9;
            gameArea.setAttribute('level', 'medium');

            break;
        case 2:
            upTo = 12;
            gameArea.setAttribute('level', 'hard');

            break;
        default:
            console.log("level error");
    }

    const cards = cardsArr[groupType].slice(0, upTo);



    return cards.map((card, index) => {
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
    state.totalTime = 0;
    fails.textContent = 0;
    state.errorCounter = 0;
    state.selectedCard1 = null;
    state.selectedCard2 = null;
}

const btnOnStartGameHandler = (e) => {
    const menu = e.currentTarget.parentElement;
    const name = menu.querySelector('input.name').value;
    const level = menu.querySelector('select.level').value;

    if (!level || !name) {
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

document.querySelector('.reset-game').addEventListener('click', btnOnResetGameHandler);
document.querySelector('.start-game').addEventListener('click', btnOnStartGameHandler);
document.querySelector('.new-game').addEventListener('click', btnReturnToMainMenu);