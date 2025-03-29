import Field from './Field.js';
import Miss_Circles from './Miss_Circles.js';

const Words = ["KARMA", "WARCABY", "SZYSZKA", "KOT", "MYSZKA"];


const FieldType = document.getElementById('Text_Input');
const Letters_Section = document.getElementById('Letters_Section');
const Word_Section = document.getElementById('Word_Section'); 
const Miss_Circles_Section = document.getElementById('Miss_Type_Section'); 

let LettersInWordSection = [];
let WordsDrawn = [];
let LetterInLettersSection = [];
let Miss_Circles_List = [];

let Miss_Types;
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
    let FoundLetter = false;

    for (let i = 0; i < LettersInWordSection.length; i++) {
        if (LettersInWordSection[i].letter === value) {
            LettersInWordSection[i].ShowLetter();
            _AmountOfCorrectLetters++;
            FoundLetter = true;
        }
    }

    if (!FoundLetter) {
        Add_Miss_Type();
    }
}

function Create_Miss_Circles() {
    let _AmountOfCircles = 3;
    let index = 0;

    Miss_Circles_Section.innerHTML = '';

    Miss_Circles_Section.style.gridTemplateRows = `repeat(${1}, ${100 / 1}%)`;
    Miss_Circles_Section.style.gridTemplateColumns = `repeat(${_AmountOfCircles}, 1fr)`;

    for (let i = 0; i < _AmountOfCircles; i++) {
        const miss_circles = new Miss_Circles(index);

        Miss_Circles_Section.appendChild(miss_circles.element);
        Miss_Circles_List.push(miss_circles);

        index++;
    }
}

function Add_Miss_Type() {
    Miss_Circles_List[Miss_Types].ShowCircle();
    Miss_Types++;

    if (Miss_Types === 3) {
        isGameEnded = true;
    }
}

function CreateWords() {
    _AmountOfWords = 3;

    for (let i = 0; i < _AmountOfWords; i++) {
        const j = Math.floor(Math.random() * (Words.length));
        if (i % 2 === 0) WordsDrawn.push(Words[j] + " ");
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

    Word_Section.style.width = `${40 * ColumnSize}px`;

    Word_Section.style.gridTemplateRows = `repeat(${2}, ${100 / 2}%)`;
    Word_Section.style.gridTemplateColumns = `repeat(${ColumnSize}, 1fr)`;

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
    Letters_Section.style.gridTemplateColumns = `repeat(8, auto)`;

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
    Miss_Types = 0;
    isGameEnded = false;

    CreateWords();
    CreateLettersSection();
    CreateWordSection(_AmountOfWords, WordsDrawn);
    Create_Miss_Circles();
}

ResetGame();
