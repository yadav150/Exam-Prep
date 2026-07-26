import { auth } from './firebase.js';
import { getFirestore, collection, query, orderBy, limit, getDocs } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const app = auth.app;
const db = getFirestore(app);

const leaderboardDiv = document.getElementById('leaderboardTable');

async function loadLeaderboard() {
  try {
    const scoresRef = collection(db, 'quiz_scores');
    const q = query(scoresRef, orderBy('percentage', 'desc'), limit(20));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      leaderboardDiv.innerHTML = '<div class="no-scores">No scores yet. Be the first to take the quiz!</div>';
      return;
    }

    let html = '';
    let rank = 1;
    snapshot.forEach(doc => {
      const data = doc.data();
      html += `
        <div class="score-card">
          <span class="rank">#${rank}</span>
          <div class="player-info">
            <span class="player-name">${escapeHTML(data.displayName || 'Player')}</span>
            <span class="player-email">${escapeHTML(data.email || '')}</span>
          </div>
          <span class="score-value">${data.percentage}%</span>
        </div>
      `;
      rank++;
    });
    leaderboardDiv.innerHTML = html;
  } catch (error) {
    console.error('Error loading leaderboard:', error);
    leaderboardDiv.innerHTML = '<div class="error-msg">Failed to load leaderboard. Please try again later.</div>';
  }
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

loadLeaderboard();
