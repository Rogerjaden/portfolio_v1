
import { useEffect, useState } from 'react';

const LEETCODE_USERNAME = 'Rogerjaden';
const GITHUB_USERNAME = 'Rogerjaden';

const LEETCODE_APIS = [
  `https://leetcode-stats.tashif.codes/${LEETCODE_USERNAME}`,
];

function RingStat({ value, label, tone, percent }) {
  const safePercent = Math.max(
    0,
    Math.min(100, Number(percent) || 0)
  );

  return (
    <div className={`coding-ring coding-ring-${tone}`}>
      <div
        className="coding-ring-visual"
        style={{
          '--ring-progress': `${safePercent * 3.6}deg`,
        }}
      >
        <div className="coding-ring-inner">
          <strong>{value ?? '—'}</strong>
        </div>
      </div>
      <span>{label}</span>
    </div>
  );
}

function format(value) {
  if (value == null || !Number.isFinite(Number(value))) {
    return '—';
  }

  return Number(value).toLocaleString('en-US');
}

// Normalize common response formats from LeetCode API providers.
function normalizeLeetCodeData(result) {
  const data = result?.data ?? result;

  if (
    !data ||
    result?.status === 'error' ||
    data.status === 'error'
  ) {
    throw new Error('Invalid LeetCode response');
  }

  const totalSolved = Number(
    data.totalSolved ?? data.total_solved
  );

  const easySolved = Number(
    data.easySolved ?? data.easy_solved
  );

  const mediumSolved = Number(
    data.mediumSolved ?? data.medium_solved
  );

  const hardSolved = Number(
    data.hardSolved ?? data.hard_solved
  );

  if (
    !Number.isFinite(totalSolved) ||
    !Number.isFinite(easySolved) ||
    !Number.isFinite(mediumSolved) ||
    !Number.isFinite(hardSolved)
  ) {
    throw new Error('Missing LeetCode statistics');
  }

  return {
    totalSolved,
    easySolved,
    mediumSolved,
    hardSolved,
    totalEasy: Number(
      data.totalEasy ?? data.total_easy ?? 0
    ),
    totalMedium: Number(
      data.totalMedium ?? data.total_medium ?? 0
    ),
    totalHard: Number(
      data.totalHard ?? data.total_hard ?? 0
    ),
    ranking: Number(
      data.ranking ?? data.globalRanking ?? 0
    ),
  };
}


async function fetchLeetCodeStats() {
  const url = LEETCODE_APIS[0];

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`LeetCode API returned ${response.status}`);
  }

  const data = await response.json();

  if (
    data.status !== 'success' ||
    data.username !== LEETCODE_USERNAME ||
    data.totalSolved == null
  ) {
    throw new Error('Invalid LeetCode statistics response');
  }

  return {
    totalSolved: Number(data.totalSolved),
    easySolved: Number(data.easySolved),
    mediumSolved: Number(data.mediumSolved),
    hardSolved: Number(data.hardSolved),
    totalEasy: Number(data.totalEasy),
    totalMedium: Number(data.totalMedium),
    totalHard: Number(data.totalHard),
    ranking: Number(data.ranking),
  };
}


export default function CodingActivity() {
  const [leetcode, setLeetcode] = useState(null);

  const [github, setGithub] = useState({
    repos: null,
    stars: null,
    followers: null,
    commits: null,
    languages: [],
  });

  const [loadState, setLoadState] = useState({
    leetcode: 'loading',
    github: 'loading',
  });

  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadLeetCode() {
      setLoadState((state) => ({
        ...state,
        leetcode: 'loading',
      }));

      try {
        const data = await fetchLeetCodeStats();

        if (cancelled) return;

        setLeetcode(data);

        setLoadState((state) => ({
          ...state,
          leetcode: 'ready',
        }));
      } catch (error) {
        console.error('LeetCode statistics failed:', error);

        if (cancelled) return;

        setLoadState((state) => ({
          ...state,
          leetcode: 'error',
        }));
      }
    }

    async function loadGithub() {
      setLoadState((state) => ({ ...state, github: 'loading' }));

      try {
        // In production, point this to the separate Render Web Service.
        // Local development defaults to the local Node API.

        const githubApiUrl = import.meta.env.VITE_GITHUB_API_URL;

        const response = await fetch(githubApiUrl);

        if (!response.ok) {
          throw new Error(`GitHub stats API returned ${response.status}`);
        }

        const data = await response.json();
        if (
          !Number.isFinite(Number(data.repos)) ||
          !Number.isFinite(Number(data.followers)) ||
          !Array.isArray(data.languages)
        ) {
          throw new Error('Invalid GitHub statistics response');
        }

        if (cancelled) return;

        setGithub({
          repos: Number(data.repos),
          followers: Number(data.followers),
          commits: Number(data.commits ?? 0),
          languages: data.languages,
        });

        setLoadState((state) => ({ ...state, github: 'ready' }));
      } catch (error) {
        console.error('GitHub statistics failed:', error);

        if (cancelled) return;

        setLoadState((state) => ({ ...state, github: 'error' }));
      }
    }

    loadLeetCode();
    loadGithub();

    return () => {
      cancelled = true;
    };
  }, [retry]);

  const easyPercent = leetcode?.totalEasy
    ? (leetcode.easySolved / leetcode.totalEasy) * 100
    : 0;

  const mediumPercent = leetcode?.totalMedium
    ? (leetcode.mediumSolved / leetcode.totalMedium) * 100
    : 0;

  const hardPercent = leetcode?.totalHard
    ? (leetcode.hardSolved / leetcode.totalHard) * 100
    : 0;

  const leetcodeUrl =
    `https://leetcode.com/u/${LEETCODE_USERNAME}/`;

  const githubUrl =
    `https://github.com/${GITHUB_USERNAME}`;

  return (
    <section
      className="coding-activity"
      aria-label="Coding activity and profiles"
    >
      <div className="coding-activity-top">
        <div className="activity-platform">
          <div className="activity-heading">
            <a
              href={leetcodeUrl}
              target="_blank"
              rel="noreferrer"
            >
              LEETCODE ↗
            </a>
          </div>

          <div className="leetcode-overview">
            <div className="leetcode-total">
              <strong>
                {loadState.leetcode === 'ready'
                  ? format(leetcode?.totalSolved)
                  : '—'}
              </strong>

              <span>PROBLEMS SOLVED</span>

              <small>
                {loadState.leetcode === 'loading'
                  ? 'LOADING STATISTICS…'
                  : loadState.leetcode === 'error'
                    ? 'STATS CURRENTLY UNAVAILABLE'
                    : leetcode?.ranking
                      ? `GLOBAL RANK #${format(leetcode.ranking)}`
                      : 'PUBLIC PROFILE STATS'}
              </small>
            </div>

            <div className="leetcode-rings">
              <RingStat
                value={
                  loadState.leetcode === 'ready'
                    ? format(leetcode?.easySolved)
                    : '—'
                }
                label="EASY"
                tone="easy"
                percent={easyPercent}
              />

              <RingStat
                value={
                  loadState.leetcode === 'ready'
                    ? format(leetcode?.mediumSolved)
                    : '—'
                }
                label="MEDIUM"
                tone="medium"
                percent={mediumPercent}
              />

              <RingStat
                value={
                  loadState.leetcode === 'ready'
                    ? format(leetcode?.hardSolved)
                    : '—'
                }
                label="HARD"
                tone="hard"
                percent={hardPercent}
              />
            </div>
          </div>

          <p className="activity-quote">
            I SOLVE PROBLEMS FOR FUN. THE FUN IS DEBATABLE.
          </p>

          {loadState.leetcode === 'error' && (
            <button
              type="button"
              className="coding-retry-button"
              onClick={() => setRetry((value) => value + 1)}
            >
              RETRY LEETCODE STATS ↻
            </button>
          )}
        </div>
      </div>

      <div className="activity-platform github-activity">
        <div className="activity-heading">
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            GITHUB ↗
          </a>

          <a
            className="profile-chip"
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            ⌘ @{GITHUB_USERNAME}
          </a>
        </div>

        <div className="github-stats-grid">
          <div>
            <strong>{format(github.repos)}</strong>
            <span>PUBLIC REPOSITORIES</span>
          </div>

          <div>
            <strong>{format(github.commits)}</strong>
            <span>ALL-TIME COMMITS*</span>
          </div>

          <div>
            <strong>{format(github.followers)}</strong>
            <span>FOLLOWERS</span>
          </div>
        </div>

        <div className="language-list">
          <span>LANGUAGES:</span>

          {github.languages.length ? (
            github.languages.map((language) => (
              <span
                className="language-chip"
                key={language}
              >
                {language}
              </span>
            ))
          ) : (
            <span className="language-chip">
              {loadState.github === 'error'
                ? 'UNAVAILABLE'
                : 'LOADING'}
            </span>
          )}
        </div>

        <p className="activity-footnote">
          GITHUB DATA VIA CACHED API · LEETCODE STATS
          VIA PUBLIC PROVIDER
        </p>

        {loadState.github === 'error' && (
          <button
            type="button"
            className="coding-retry-button"
            onClick={() => setRetry((value) => value + 1)}
          >
            RETRY GITHUB DATA ↻
          </button>
        )}
      </div>
    </section>
  );
}
