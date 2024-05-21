var messages = [
    "Can you believe it? I'm writing to you from the future! Life here's a wild ride, but I bet you're having your own adventures in 2024. Keep on hustling and chasing those dreams!",
    "Sending you a virtual hug from the future! Life here is a wild ride, but I bet you’re having your own adventures in 2024. Keep on being your awesome self!",
    "Writing to you from the future! Can’t help but wonder what life’s like for you in 2024. Whatever challenges you face, remember, you’re stronger than you think!",
    "Just wanted to drop you a message from the future! Life here is full of surprises, but I bet you’re having your own adventures in 2024. Keep on smiling and making memories!",
    "Sending you a message from the future! Can you believe it? Life here is like something out of a sci-fi movie, but I bet you’re having your own amazing experiences in 2024. Keep on shining bright!",
    "Hope you’re doing great in 2024! Just thought I’d shoot you a message from the future. Things here are wild, but I bet you’re holding it down too. Keep on shining!",
    "Sending you warm wishes from the future! Can’t help but wonder what life’s like for you in 2024. Whatever you’re up to, keep spreading joy and making the most of every moment!",
    "Guess who’s writing to you from the future? Yup, it’s me! Life here is a crazy ride, but I bet you’re having your own adventures in 2024. Keep on rocking, and don’t forget to enjoy the journey!",
    "Just wanted to drop you a quick message from the future! Hope you’re having a blast in 2024. Keep being awesome and chasing your dreams!",
    "From the precipice of tomorrow, I extend my regards to you, a denizen of yesteryears. The currents of time may carry us apart, but the bonds of empathy unite us across epochs. Wishing you tranquility amidst the tempests of existence.",
    "In the tapestry of time, our threads intertwine, weaving a narrative of shared experiences. As I pen this letter from the future, I am filled with a profound sense of connection to your era. Cherish each fleeting moment, for they are but whispers in the winds of eternity.",
    "Sending you warm wishes from the future! Life here is full of surprises, but I bet you’re having your own adventures in 2024. Keep on being your amazing self!",
    "Hope this message finds you smiling in 2024! I’m sending you good vibes from the future. Keep being your awesome self, and remember, every day is a new adventure!",
    "Sending you warm wishes from the future! Can’t help but wonder what life’s like for you in 2024. Whatever you’re up to, keep spreading positivity and chasing your dreams!",
    "It’s your future buddy dropping you a line! Things here are pretty epic, but I’m sure you’re having your own fun in 2024. Keep being awesome, and who knows, maybe we’ll meet in the future!",
    "Can you believe it? I’m writing to you from the future! Life here’s a wild ride, but I bet you’re having your own adventures in 2024. Keep on hustling and chasing those dreams!",
    "Hope this message finds you well in 2024! Life here in the future is like a rollercoaster ride, with twists and turns you never expect. But hey, keep riding the waves, and don’t forget to enjoy the journey!",
    "Sending you a letter from the future! Can you believe it? I wonder what life’s like for you in 2024. Is it full of adventures and surprises? Whatever it is, keep smiling and spreading joy!",
    "In the tapestry of time, our threads intertwine, weaving a narrative of shared experiences. As I pen this letter from the future, I am filled with a profound sense of connection to your era. Cherish each fleeting moment, for they are but whispers in the winds of eternity.",
    "As I navigate the labyrinth of time, your presence resonates like a distant melody. The epochs may change, but the essence of our shared humanity endures. May this missive serve as a beacon of hope in the vast expanse of eternity.",
    "Guess who’s sending you a message from the future? Yup, it’s me! Can you believe we’re communicating across time? Anyway, just wanted to drop a line and say hi. Hope you’re still rocking it in 2024. Catch you on the flip side!",
    "Greetings from the future! As I traverse the vast expanse of time, I can’t help but wonder about your adventures in 2024. Remember, every moment is a gift, so make the most of it!",
    "I’m writing to you from the future, where things are beyond anything you can imagine! But hey, don’t sweat it, enjoy the present in 2024. Keep smiling and shining bright!",
    "It’s me, from the future! Things here are pretty rad, gotta say. But I bet you’re rocking it in 2024 too! Keep being your awesome self, and remember, the future’s bright!",
    "Greetings from the future! I can’t help but wonder what life’s like in 2024. Are hoverboards a thing yet? Anyways, keep being awesome, and remember, the future’s full of possibilities!",
    "Hope this message finds ya well! I’m writing to you from the future, can ya believe it? Things here are crazier than a cat in a yarn factory, lemme tell ya! But hey, don’t stress too much ‘bout tomorrow, just enjoy the ride in 2024!",
];

var names = [
    "Benjamin","Maya","Liam","Ava","Elijah","Sophia","Jack","Isabel","Lucas","Olivia","Ethan","Mia","Noah","Emma","Aiden","Chloe","Samuel","Grace","Daniel","Lily","William","Harper","Michael","Natalie","Owen","Zoey","David","Emily","Alexander","Ella","James","Victoria","Matthew","Ava","Christopher","Scarlett","Andrew","Madison","Ethan","Charlotte","Logan","Abigail","Nathan","Evelyn","Jacob","Brooklyn","Samuel","Zoe","Dylan","Penelope",
];

document.addEventListener('DOMContentLoaded', function () {
    var scatterButton = document.getElementById('scatter-button');
    var generatedCards = [];
    var isScattered = false;

    scatterButton.addEventListener('click', function () {
        scatterCards();
        clearInterval(cardGenerationInterval);
        isScattered = true;
    });

    var backImages = [
        'images/1.png','images/1.png','images/1.png','images/2.png','images/1.png','images/2.png','images/1.png','images/2.png','images/1.png','images/2.png','images/3.png','images/4.png','images/5.png','images/6.png', 
        'images/7.png','images/8.png','images/8.png','images/8.png','images/8.png','images/9.png','images/10.png','images/4.png','images/5.png','images/6.png','images/6.png','images/6.png','images/6.png','images/7.png',
        'images/8.png','images/9.png','images/10.png','images/11.png','images/12.png','images/13.png','images/14.png','images/15.png','images/16.png','images/17.png','images/18.png','images/19.png','images/20.png',
        'images/21.png','images/22.png','images/23.png','images/24.png','images/25.png','images/26.png','images/27.png','images/28.png','images/29.png','images/30.png','images/31.png','images/32.png',
    ];

    var cardGenerationInterval;

    function startCardGeneration() {
        cardGenerationInterval = setInterval(generateCard, 4000);
    }

    var spinner = document.getElementById('spinner');
    spinner.addEventListener('transitionend', function (event) {
        if (event.propertyName === 'opacity') {
            startCardGeneration();
        }
    });

    function scatterCards() {
        if (generatedCards.length === 0) {
            generateCard();
        }

        generatedCards.forEach(function (card) {
            var newX = Math.random() * (window.innerWidth - card.offsetWidth * 1.5);
            var newY = Math.random() * (window.innerHeight - card.offsetHeight * 1.5);
            card.style.left = newX + 'px';
            card.style.top = newY + 'px';
            card.classList.add('tilt-on-hover');
        });

        generatedCards.forEach(function (card) {
            card.addEventListener('mouseenter', function() {
                card.querySelector('.back-image').style.display = 'block';
            });
            card.addEventListener('mouseleave', function() {
                card.querySelector('.back-image').style.display = 'none';
            });
        });

        resolveOverlap(generatedCards);
    }

    function generateCard() {
        var newBox = document.createElement('div');
        newBox.className = 'box';

        var backImage = document.createElement('img');
        backImage.src = backImages[Math.floor(Math.random() * backImages.length)];
        backImage.classList.add('back-image');
        backImage.style.display = 'none';

        newBox.innerHTML = "<div class='front'>Dear 2024,<br>" + messages[Math.floor(Math.random() * messages.length)] + "<br><br>Remember me,<br>&emsp;" + getRandomName() + "</div>";
        newBox.appendChild(backImage);

        document.body.appendChild(newBox);
        generatedCards.push(newBox);

        void newBox.offsetWidth;

        newBox.style.opacity = '1';
    }

    function resolveOverlap(cards) {
        for (var i = 0; i < cards.length; i++) {
            for (var j = i + 1; j < cards.length; j++) {
                var rect1 = cards[i].getBoundingClientRect();
                var rect2 = cards[j].getBoundingClientRect();

                if (!(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom)) {
                    var newX = Math.random() * (window.innerWidth - cards[j].offsetWidth);
                    var newY = Math.random() * (window.innerHeight - cards[j].offsetHeight);
                    cards[j].style.left = newX + 'px';
                    cards[j].style.top = newY + 'px';
                }
            }
        }
    }

    function getRandomName() {
        var nameIndex = Math.floor(Math.random() * names.length);
        var name = names.splice(nameIndex, 1)[0];
        names.push(name);
        return name;
    }

    setTimeout(function() {
        spinner.style.opacity = '0';
    }, 4000);

    document.body.addEventListener('click', function(event) {
        var clickedCard = event.target.closest('.box');
        if (clickedCard) {
            var otherCards = generatedCards.filter(function(card) {
                return card !== clickedCard;
            });

            otherCards.forEach(function(card) {
                card.style.transition = 'opacity 2s ease';
                card.style.opacity = '0';
            });

            setTimeout(function () {
                var visibleCards = generatedCards.filter(function(card) {
                    return card.style.opacity === '1';
                });

                if (visibleCards.length === 1) {
                    var centerX = (window.innerWidth - clickedCard.offsetWidth) / 2;
                    var centerY = (window.innerHeight - clickedCard.offsetHeight) / 2;
                    var translateX = centerX - clickedCard.getBoundingClientRect().left;
                    var translateY = centerY - clickedCard.getBoundingClientRect().top;
                    clickedCard.style.transition = 'transform 2s ease, left 2s ease, top 2s ease';
                    clickedCard.style.transform = 'translate(' + translateX + 'px, ' + translateY + 'px)';
                    clickedCard.style.left = centerX + 'px';
                    clickedCard.style.top = centerY + 'px';
                    
                    // Hide the scatter button
                    scatterButton.style.display = 'none';
                }
            }, 2000);
        }
    });
});

