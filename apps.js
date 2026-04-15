'use strict';

const DUE_DATE = new Date('2026-04-16T23:59:00');
const checkbox = document.getElementById('task-checkbox');
const card = document.querySelector('.todo-card');
const statusBadge = document.querySelector('.status');

function refreshTime() {
    const timeEl = document.querySelector('[data-testid="test-todo-time-remaining"]');
    const now = new Date();
    const diff = DUE_DATE - now;

    // Requirement: Must show "Overdue" or "Due in..."
    if (diff <= 0) {
        timeEl.textContent = "Overdue!";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

    if (days > 0) {
        timeEl.textContent = `Due in ${days} days`;
    } else {
        timeEl.textContent = `Due in ${hours} hours`;
    }
}

// Checkbox Toggle Behaviour
checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        card.classList.add('is-done');
        statusBadge.textContent = 'Done';
    } else {
        card.classList.remove('is-done');
        statusBadge.textContent = 'In Progress';
    }
});

// Delete feedback
document.querySelector('.btn-delete').addEventListener('click', () => {
    if (confirm("Are you sure you want to delete this task?")) {
        card.style.opacity = '0';
        setTimeout(() => card.remove(), 300);
    }
});

// Initialize
setInterval(refreshTime, 60000);
refreshTime();