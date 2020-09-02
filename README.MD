
# MemoryCards 2020 - 
## Pure  JS & HTML & CSS 


# **State object**

```
state = {
    cardsGroups: [[cards of type 1], [cards of type 2]],
    currentGroupCards: number(index of cardsGroup),
    gameLevel: [1-easy, 2-medium, 3-hard],
    startGame: true/false,
    errorCounter: number,
    selectedCard1: cardId,
    selectedCard1: cardId,
    totalTime: count seconds


    

}
```

## **METHODS** 
- **createWorld(level,groupType)** 
> initializing the user ui ,state  and starts the game.

- **initGame(cardsArr, type)**
> given cards create 'divs' of ui cards to display

- **startGame()**
> starts the timer, and reveals the board

* **card.onClick()**
```
 -first card: 
 revels the card and wait for the second card.

 -second card
 if(card1.type===card2.type)
    cards stays open 
 else {
     display err animation 
     increase error counter
 }    
 

 ```

- **resetGame()**
> start new game


# Page View

``` 
body {
    <div class="wrapper">
       <div class="navbar"><button class="reset">New Game</button></div>
        <div class="game-area">

            <div class="game-area__game">

            {<div 
                class="card reveal" 
                data-index="i"
                data-type = "card-type"
                
            > 
            </div> 
            } * 
        
            <div class="menu">
                <button class="menu__btn">Start Game</button>
            </div>

      

         </div>
        </div>


     </div>
}
```

## Card Object Description

 - data-set : 
     - reveal - css class that flips the card
     - data-index: location i
     - data-type: { card-type}
     - err: css animation that will scale the cards and add red border






