import express from 'express';

const app = express();
const PORT = Number(process.env.PORT || 3001);
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'Rogerjaden';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
const CACHE_TTL_MS = 15 * 60 * 1000;
let cache = { value: null, expiresAt: 0 };

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && (origin === FRONTEND_ORIGIN || FRONTEND_ORIGIN === '*')) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

async function githubFetch(url) {
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'roger-portfolio-github-stats',
  };
  if (GITHUB_TOKEN) headers.Authorization = `Bearer ${GITHUB_TOKEN}`;

  const response = await fetch(url, { headers });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub API ${response.status}: ${body.slice(0, 300)}`);
  }
  return response;
}

function lastPageFromLink(linkHeader) {
  if (!linkHeader) return null;
  const last = linkHeader.split(',').find((part) => part.includes('rel="last"'));
  if (!last) return null;
  const match = last.match(/[?&]page=(\d+)/);
  return match ? Number(match[1]) : null;
}

async function getCommitCount(repo) {
  const url = `https://api.github.com/repos/${encodeURIComponent(GITHUB_USERNAME)}/${encodeURIComponent(repo.name)}/commits?author=${encodeURIComponent(GITHUB_USERNAME)}&per_page=1`;
  try {
    const response = await githubFetch(url);
    const rows = await response.json();
    const lastPage = lastPageFromLink(response.headers.get('link'));
    return lastPage ?? rows.length;
  } catch (error) {
    // Empty repositories can return 409; skip them rather than failing all stats.
    if (String(error.message).includes('GitHub API 409')) return 0;
    console.warn(`Unable to count commits for ${repo.name}:`, error.message);
    return 0;
  }
}

async function buildStats() {
  const profileResponse = await githubFetch(`https://api.github.com/users/${encodeURIComponent(GITHUB_USERNAME)}`);
  const profile = await profileResponse.json();

  const repos = [];
  for (let page = 1; ; page += 1) {
    const response = await githubFetch(`https://api.github.com/users/${encodeURIComponent(GITHUB_USERNAME)}/repos?type=owner&per_page=100&page=${page}&sort=updated`);
    const batch = await response.json();
    repos.push(...batch);
    if (batch.length < 100) break;
  }

  const languageCounts = {};
  for (const repo of repos) {
    if (repo.language) languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
  }
  const languages = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name]) => name);

  // Each request asks for one commit and reads the final pagination page,
  // avoiding downloading up to 100 commits from every repository.
  const counts = await Promise.all(repos.map(getCommitCount));
  return {
    username: GITHUB_USERNAME,
    repos: profile.public_repos,
    followers: profile.followers,
    commits: counts.reduce((sum, count) => sum + count, 0),
    languages,
    updatedAt: new Date().toISOString(),
  };
}

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.get('/api/github-stats', async (_req, res) => {
  if (cache.value && Date.now() < cache.expiresAt) {
    res.setHeader('Cache-Control', 'public, max-age=300');
    return res.json(cache.value);
  }
  try {
    const stats = await buildStats();
    cache = { value: stats, expiresAt: Date.now() + CACHE_TTL_MS };
    res.setHeader('Cache-Control', 'public, max-age=300');
    return res.json(stats);
  } catch (error) {
    console.error('Failed to build GitHub stats:', error.message);
    if (cache.value) return res.json({ ...cache.value, stale: true });
    return res.status(502).json({ message: 'GitHub statistics are temporarily unavailable.' });
  }
});

app.listen(PORT, () => console.log(`GitHub stats API listening on port ${PORT}`));
