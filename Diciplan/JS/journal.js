// Initialize Quill Rich Text Editor
const quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean']
        ]
    }
});

// Mood Tracker
const moodOptions = document.querySelectorAll('.mood-option');
let selectedMood = null;

moodOptions.forEach(option => {
    option.addEventListener('click', () => {
        moodOptions.forEach(mood => mood.classList.remove('selected'));
        option.classList.add('selected');
        selectedMood = option.getAttribute('data-mood');
    });
});

// Save Journal Entry
const saveJournalButton = document.getElementById('save-journal');
const timeline = document.querySelector('.timeline');

saveJournalButton.addEventListener('click', () => {
    const entry = quill.root.innerHTML.trim();
    const mood = selectedMood;

    if (entry && mood) {
        const today = new Date().toLocaleDateString();
        const journalData = {
            date: today,
            entry: entry,
            mood: mood
        };
        saveJournalEntry(journalData);
        displayJournalEntries();
        alert('Journal saved successfully!');
        quill.root.innerHTML = '';
        moodOptions.forEach(mood => mood.classList.remove('selected'));
        // Confetti Animation
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    } else {
        alert('Please write something and select a mood.');
    }
});

// Save Journal Entry to LocalStorage
function saveJournalEntry(data) {
    let journalEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    journalEntries.push(data);
    localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
}

// Display Past Journal Entries
function displayJournalEntries() {
    const journalEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    timeline.innerHTML = journalEntries.map(entry => `
        <div class="journal-entry">
            <strong>${entry.date} - ${entry.mood}</strong>
            <div>${entry.entry}</div>
        </div>
    `).join('');
}

// Load Past Journal Entries on Page Load
window.addEventListener('load', () => {
    displayJournalEntries();
});

// Affirmations
const useDefaultAffirmationsButton = document.getElementById('use-default-affirmations');
const createAffirmationButton = document.getElementById('create-affirmation');
const affirmationText = document.getElementById('affirmation-text');

const defaultAffirmations = [
    "I am capable of achieving my goals.",
    "I am worthy of success and happiness.",
    "Every day, I grow stronger and more confident.",
    "I attract positivity and abundance into my life.",
    "I am grateful for all that I have and all that is coming.",
    "I am constantly improving and becoming my best self.",
    "I am unstoppable. No one can stop me.",
    "I am a dream to chase. Nothing can stop me.",
    "I don’t lose. I win."
];

useDefaultAffirmationsButton.addEventListener('click', () => {
    const randomAffirmation = defaultAffirmations[Math.floor(Math.random() * defaultAffirmations.length)];
    affirmationText.textContent = randomAffirmation;
});

createAffirmationButton.addEventListener('click', () => {
    const customAffirmation = prompt('Write your own affirmation:');
    if (customAffirmation) {
        affirmationText.textContent = customAffirmation;
    }
});

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});