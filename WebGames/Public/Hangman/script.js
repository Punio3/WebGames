import Field from './Field.js';

const Words = ["KARMA", "WARCABY", "SZYSZKA", "KOT", "MYSZKA"];


const FieldType = document.getElementById('Text_Input');
const Letters_Section = document.getElementById('Letters_Section');
const Word_Section = document.getElementById('Word_Section'); 


let LettersInWordSection = [];
let WordsDrawn = [];
let LetterInLettersSection = [];

let _AmountOfWords;
let _AmountOfCorrectLetters;
let _AmountOfAllLeters;
let isGameEnded;


FieldType.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !isGameEnded) {
        event.preventDefault(); 
        if(CheckIfLetterIsInLetterSection(FieldType.value)) CheckIfLetterIsInWordSection(FieldType.value);
        FieldType.value = ''; 
        if (_AmountOfCorrectLetters === _AmountOfAllLeters) isGameEnded = true;  
    }
});

function CheckIfLetterIsInLetterSection(value) {
    for (let i = 0; i < LetterInLettersSection.length; i++) {
        if (LetterInLettersSection[i].letter === value) return false; 
        if (LetterInLettersSection[i].letter === '') { 
            LetterInLettersSection[i].SetLetter(value);
            LetterInLettersSection[i].ShowLetter();
            return true;
        }
    }
}
function CheckIfLetterIsInWordSection(value) {
    for (let i = 0; i < LettersInWordSection.length; i++) {
        if (LettersInWordSection[i].letter === value) {
            LettersInWordSection[i].ShowLetter();
            _AmountOfCorrectLetters++;
        }
    }
}

function CreateWords() {
    _AmountOfWords = 3;
    for (let i = 0; i < _AmountOfWords; i++) {
        const j = Math.floor(Math.random() * (Words.length));
        if (i % 2 === 0) WordsDrawn.push(Words[j] + "  ");
        else WordsDrawn.push(Words[j]);
        _AmountOfAllLeters += Words[j].length;
    }
}

function CountSize(AmountOfWords, Words) {
    if (AmountOfWords === 1) return Words[0].length;
    else if (AmountOfWords === 2) return Words[0].length + Words[1].length;
    else if (AmountOfWords === 3) return Words[0].length + Words[1].length > Words[2].length ? Words[0].length + Words[1].length : Words[2].length;
    return 0;
}
function CreateWordSection(AmountOfWords, Words) {
    let index = 0;

    Word_Section.innerHTML = '';
    let ColumnSize = CountSize(AmountOfWords, Words);

    Word_Section.style.gridTemplateRows = `repeat(${AmountOfWords/2}, ${100 / 1}%)`;
    Word_Section.style.gridTemplateColumns = `repeat(${ColumnSize}, ${100 / ColumnSize}%)`;

    for (let i = 0; i < AmountOfWords; i++) {
        for (let letter of WordsDrawn[i]) {
            const field = new Field(index, letter, 1);
            Word_Section.appendChild(field.element);
            LettersInWordSection.push(field);
            index++;
        }
    }
}

function CreateLettersSection() {
    let index = 0;

    Letters_Section.innerHTML = '';

    Letters_Section.style.gridTemplateRows = `repeat(${3}, ${100 / 3}%)`;
    Letters_Section.style.gridTemplateColumns = `repeat(${8}, ${100 / 8}%)`;

    for (let i = 0; i < 3 * 8; i++) {
        const field = new Field(index, '', 0);

        LetterInLettersSection.push(field);
        Letters_Section.appendChild(field.element);
        index++;
    }
}

function ResetGame() {
    LettersInWordSection = [];
    LetterInLettersSection = [];
    WordsDrawn = [];
    _AmountOfCorrectLetters = 0;
    _AmountOfAllLeters = 0;
    isGameEnded = false;

    CreateWords();
    CreateLettersSection();
    CreateWordSection(_AmountOfWords, WordsDrawn);
}

ResetGame();
