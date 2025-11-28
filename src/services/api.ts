const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001';

const json = async (res: Response) => {
  if (!res.ok) throw res;
  return res.json();
};

const transformLeague = (l: any) => {
  let id = l.leagueId || l._id || l.id;
  if (id === 'premier-league') id = 'premier';
  return {
    id,
    name: l.name,
    country: l.country,
    logo: l.logo,
    season: Array.isArray(l.seasons) ? l.seasons[0] : l.season || ''
  };
};

const transformTeam = (t: any) => {
  const formArr = typeof t.form === 'string' ? t.form.split('').map((c: string) => (c === 'W' || c === 'D' || c === 'L' ? c : c)) : Array.isArray(t.form) ? t.form : [];
  let leagueId = t.leagueId || '';
  if (leagueId === 'premier-league') leagueId = 'premier';
  return {
    id: t._id || t.id,
    name: t.name,
    logo: t.logo,
    position: t.position,
    points: t.points,
    played: t.played,
    won: t.won,
    drawn: t.drawn,
    lost: t.lost,
    goalsFor: t.goalsFor,
    goalsAgainst: t.goalsAgainst,
    goalDifference: t.goalDifference,
    form: formArr,
    leagueId
  } as any;
};

const transformMatch = (m: any, teamsMap: Record<string, any>) => {
  const home = teamsMap[m.homeTeam] || teamsMap[m.homeTeamId] || null;
  const away = teamsMap[m.awayTeam] || teamsMap[m.awayTeamId] || null;
  
  let leagueId = m.leagueId || m.league;
  if (leagueId === 'premier-league') leagueId = 'premier';
  if (leagueId === 'la-liga') leagueId = 'laliga';
  if (leagueId === 'serie-a') leagueId = 'seriea';
  
  return {
    id: m._id || m.id,
    homeTeam: home || { id: m.homeTeamId || m.homeTeam, name: m.homeTeam, logo: '' },
    awayTeam: away || { id: m.awayTeamId || m.awayTeam, name: m.awayTeam, logo: '' },
    date: m.date,
    score: m.homeScore !== null && m.awayScore !== null ? { home: m.homeScore, away: m.awayScore } : m.score,
    status: m.status,
    league: leagueId,
    minute: m.minute
  } as any;
};

const transformNews = (n: any) => ({
  id: n._id || n.id,
  title: n.title,
  summary: n.summary || n.content?.substring(0, 150) || '',
  content: n.content,
  source: n.source || n.author || n.tags?.[0] || 'StatFut',
  date: n.publishedAt || n.date || n.createdAt,
  image: n.image || 'https://images.unsplash.com/photo-1634813052369-3584119ccd2a',
  category: n.category || 'general'
});

export const getLeagues = async () => {
  const res = await fetch(`${API_URL}/api/leagues`);
  const data = await json(res);
  return Array.isArray(data) ? data.map(transformLeague) : [];
};

export const getTeams = async (leagueId?: string, season?: string) => {
  const params = new URLSearchParams();
  if (leagueId) params.set('leagueId', leagueId);
  if (season) params.set('season', season);
  const url = `${API_URL}/api/teams${params.toString() ? `?${params.toString()}` : ''}`;
  const res = await fetch(url);
  const data = await json(res);
  return Array.isArray(data) ? data.map(transformTeam) : [];
};

export const getStandings = async (leagueId: string, season?: string) => {
  const url = `${API_URL}/api/teams/standings/${leagueId}${season ? `?season=${encodeURIComponent(season)}` : ''}`;
  const res = await fetch(url);
  const data = await json(res);
  return Array.isArray(data) ? data.map(transformTeam) : [];
};

export const searchTeams = async (q: string) => {
  const res = await fetch(`${API_URL}/api/teams/search?q=${encodeURIComponent(q)}`);
  const data = await json(res);
  return Array.isArray(data) ? data.map(transformTeam) : [];
};

export const getMatchesUpcoming = async (limit = 5) => {
  const res = await fetch(`${API_URL}/api/matches/upcoming?limit=${limit}`);
  const data = await json(res);
  const teams = await getTeams();
  const map: Record<string, any> = {};
  teams.forEach((t: any) => {
    map[t.id] = t;
    map[t.name] = t;
  });
  return Array.isArray(data) ? data.map((m: any) => transformMatch(m, map)) : [];
};

export const getMatches = async () => {
  const res = await fetch(`${API_URL}/api/matches`);
  const data = await json(res);
  const teams = await getTeams();
  const map: Record<string, any> = {};
  teams.forEach((t: any) => {
    map[t.id] = t;
    map[t.name] = t;
  });
  return Array.isArray(data) ? data.map((m: any) => transformMatch(m, map)) : [];
};

export const getMatchesLive = async () => {
  const res = await fetch(`${API_URL}/api/matches/live`);
  const data = await json(res);
  const teams = await getTeams();
  const map: Record<string, any> = {};
  teams.forEach((t: any) => {
    map[t.id] = t;
    map[t.name] = t;
  });
  return Array.isArray(data) ? data.map((m: any) => transformMatch(m, map)) : [];
};

export const getMatchesRecent = async (limit = 5) => {
  const res = await fetch(`${API_URL}/api/matches/recent?limit=${limit}`);
  const data = await json(res);
  const teams = await getTeams();
  const map: Record<string, any> = {};
  teams.forEach((t: any) => {
    map[t.id] = t;
    map[t.name] = t;
  });
  return Array.isArray(data) ? data.map((m: any) => transformMatch(m, map)) : [];
};

export const getNews = async () => {
  const res = await fetch(`${API_URL}/api/news`);
  const data = await json(res);
  return Array.isArray(data) ? data.map(transformNews) : [];
};

export const getNewsFeatured = async () => {
  const res = await fetch(`${API_URL}/api/news/featured`);
  const data = await json(res);
  return Array.isArray(data) ? data.map(transformNews) : [];
};

const transformPlayer = (p: any) => ({
  id: p._id || p.id,
  name: p.name,
  age: p.age,
  nationality: p.nationality,
  position: p.position,
  jerseyNumber: p.jerseyNumber,
  teamId: p.teamId,
  teamName: p.teamName,
  photo: p.photo
});

export const getPlayers = async () => {
  const res = await fetch(`${API_URL}/api/players`);
  const data = await json(res);
  return Array.isArray(data) ? data.map(transformPlayer) : [];
};

export const getPlayersByTeam = async (teamId: string) => {
  const res = await fetch(`${API_URL}/api/players?teamId=${encodeURIComponent(teamId)}`);
  const data = await json(res);
  return Array.isArray(data) ? data.map(transformPlayer) : [];
};

export const searchPlayers = async (q: string) => {
  const res = await fetch(`${API_URL}/api/players/search?q=${encodeURIComponent(q)}`);
  const data = await json(res);
  return Array.isArray(data) ? data.map(transformPlayer) : [];
};

export const getTeamStats = async (teamId: string) => {
  const res = await fetch(`${API_URL}/api/statistics/team/${encodeURIComponent(teamId)}`);
  return json(res);
};

export const getMatchStats = async (matchId: string) => {
  const res = await fetch(`${API_URL}/api/statistics/match/${encodeURIComponent(matchId)}`);
  return json(res);
};

export const register = async (payload: any) => {
  const res = await fetch(`${API_URL}/api/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return json(res);
};

export const login = async (payload: { username?: string; email?: string; password: string }) => {
  const loginPayload = {
    email: payload.email || payload.username || '',
    password: payload.password
  };
  const res = await fetch(`${API_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginPayload)
  });
  return json(res);
};

export const fetchWithAuth = async (path: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('statfut-token');
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  } as Record<string, string>;
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  return json(res);
};

export const getProfile = async () => {
  return fetchWithAuth('/api/users/me');
};

export const getPlayerStats = async (playerName: string) => {
  const playersRes = await fetch(`${API_URL}/api/players/search?q=${encodeURIComponent(playerName)}`);
  const players = await json(playersRes);
  
  if (!Array.isArray(players) || players.length === 0) {
    return [];
  }
  
  const playerId = players[0]._id || players[0].id;
  
  const statsRes = await fetch(`${API_URL}/api/statistics/player/${playerId}`);
  return json(statsRes);
};

export default {
  getLeagues,
  getTeams,
  getStandings,
  searchTeams,
  getMatches,
  getMatchesUpcoming,
  getMatchesLive,
  getMatchesRecent,
  getNews,
  getNewsFeatured,
  register,
  login,
  fetchWithAuth,
  getProfile,
  getPlayers,
  getPlayersByTeam,
  searchPlayers,
  getTeamStats,
  getMatchStats,
  getPlayerStats
};
