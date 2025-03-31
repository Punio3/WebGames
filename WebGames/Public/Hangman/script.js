import Field from './Field.js';
import Miss_Circles from './Miss_Circles.js';

const WordPools = {
    "£atwy": [
        "KAPELUSZ", "BALON", "SAMOCHÓD", "DOM", "PIES",
        "KAWA", "DROGA", "HERBATA", "KOC", "TELEFON"
    ],
    "Œredni": [
        "CZERWONY KAPELUSZ", "ZIELONY BALON", "SZYBKI SAMOCHÓD", "DU¯Y DOM", "MA£Y PIES",
        "BIA£A KAWA", "D£UGA DROGA", "CIEP£A HERBATA", "MIÊKKI KOC", "NOWY TELEFON"
    ],
    "Trudny": [
        "CZERWONY KAPELUSZ WE£NIANY", "ZIELONY BALON DU¯Y", "SZYBKI SAMOCHÓD SPORTOWY", "DU¯Y DOM DREWNIANY", "MA£Y PIES WESO£Y",
        "BIA£A KAWA MOCNA", "D£UGA DROGA KAMIENISTA", "CIEP£A HERBATA AROMATYCZNA", "MIÊKKI KOC WE£NIANY", "NOWY TELEFON DOTYKOWY"
    ]
};
const FieldType = document.getElementById('Text_Input');
const Letters_Section = document.getElementById('Letters_Section');
const Word_Section = document.getElementById('Word_Section');
const Miss_Circles_Section = document.getElementById('Miss_Type_Section');

document.addEventListener('DOMContentLoaded', initializeGame);

let LettersInWordSection = [];
let WordsDrawn = [];
let LetterInLettersSection = [];
let Miss_Circles_List = [];

let Miss_Types;
let _AmountOfCorrectLetters;
let _AmountOfAllLeters;
let isGameEnded;
let currentDifficulty = '£atwy';

function initializeGame() {
    setupButtons();
    setDifficulty(currentDifficulty);
    FieldType.addEventListener('keydown', handleInput);
}

function setupButtons() {
    document.getElementById("toggle-button").addEventListener('click', toggleSidebar);
    document.getElementById("easy-button").addEventListener('click', () => setDifficulty('£atwy'));
    document.getElementById("medium-button").addEventListener('click', () => setDifficulty('Œredni'));
    document.getElementById("hard-button").addEventListener('click', () => setDifficulty('Trudny'));
    document.getElementById("reset-button").addEventListener('click', resetGame);
}

function handleInput(event) {
    if (event.key === 'Enter' && !isGameEnded) {
        event.preventDefault();
        if (CheckIfLetterIsInLetterSection(FieldType.value)) {
            CheckIfLetterIsInWordSection(FieldType.value);
        }
        FieldType.value = '';
        if (_AmountOfCorrectLetters === _AmountOfAllLeters) isGameEnded = true;
    }
}

function CheckIfLetterIsInLetterSection(value) {
    for (let field of LetterInLettersSection) {
        if (field.letter === value) return false;
        if (field.letter === '') {
            field.SetLetter(value);
            field.ShowLetter();
            return true;
        }
    }
}

function CheckIfLetterIsInWordSection(value) {
    let foundLetter = false;
    for (let field of LettersInWordSection) {
        if (field.letter === value) {
            field.ShowLetter();
            _AmountOfCorrectLetters++;
            foundLetter = true;
        }
    }
    if (!foundLetter) Add_Miss_Type();
}

function Add_Miss_Type() {
    Miss_Circles_List[Miss_Types].ShowCircle();
    Miss_Types++;
    if (Miss_Types === 3) isGameEnded = true;
}

function Create_Miss_Circles() {
    const amountOfCircles = 3;
    Miss_Circles_Section.innerHTML = '';
    Miss_Circles_Section.style.gridTemplateColumns = `repeat(${amountOfCircles}, 1fr)`;

    Miss_Circles_List = Array.from({ length: amountOfCircles }, (_, index) => {
        const circle = new Miss_Circles(index);
        Miss_Circles_Section.appendChild(circle.element);
        return circle;
    });
}
function AddSpaceToWords() {
    for (let i = 0; i < WordsDrawn.length; i++) {
        if (i % 2 === 0) WordsDrawn[i] += " ";
    }
}
function CreateWords() {
    WordsDrawn = WordPools[currentDifficulty][Math.floor(Math.random() * WordPools[currentDifficulty].length)].split(' ');
    _AmountOfAllLeters = WordsDrawn.reduce((sum, word) => sum + word.length, 0);
    AddSpaceToWords();
}

function CountSize() {
    if (WordsDrawn.length === 1) return WordsDrawn[0].length;
    else if (WordsDrawn.length === 2) return WordsDrawn[0].length + WordsDrawn[1].length;
    else if (WordsDrawn.length === 3) return WordsDrawn[0].length + WordsDrawn[1].length > WordsDrawn[2].length ? WordsDrawn[0].length + WordsDrawn[1].length : WordsDrawn[2].length;
    return 0;
}
function CreateWordSection() {
    Word_Section.innerHTML = '';
    const rowCount = WordsDrawn.length;
    const columnCount = CountSize();

    Word_Section.style.display = 'grid';
    Word_Section.style.gridTemplateRows = `repeat(${rowCount}, auto)`;
    Word_Section.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
    Word_Section.style.width = `${40 * columnCount}px`;

    LettersInWordSection = WordsDrawn.flatMap((word, rowIndex) =>
        [...word].map((letter, colIndex) => {
            const field = new Field(rowIndex * word.length + colIndex, letter, 1);
            Word_Section.appendChild(field.element);
            return field;
        })
    );
}

function CreateLettersSection() {
    Letters_Section.innerHTML = '';
    Letters_Section.style.gridTemplateColumns = `repeat(8, auto)`;

    LetterInLettersSection = Array.from({ length: 24 }, (_, index) => {
        const field = new Field(index, '', 0);
        Letters_Section.appendChild(field.element);
        return field;
    });
}

function setDifficulty(level) {
    currentDifficulty = level;
    resetGame();
    toggleSidebar();
}

function resetGame() {
    LettersInWordSection = [];
    LetterInLettersSection = [];
    WordsDrawn = [];
    Miss_Circles_List = [];
    _AmountOfCorrectLetters = 0;
    _AmountOfAllLeters = 0;
    Miss_Types = 0;
    isGameEnded = false;

    CreateWords();
    CreateLettersSection();
    CreateWordSection();
    Create_Miss_Circles();
}

function toggleSidebar() {
    document.getElementById("difficultySidebar").classList.toggle("active");
}

setDifficulty(currentDifficulty);