const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/statfut';

// Datos de ejemplo para poblar la base de datos
const seedData = {
  leagues: [
    {
      leagueId: 'laliga',
      name: 'La Liga',
      country: 'España',
      logo: '🇪🇸',
      season: '2024-2025',
      currentMatchday: 15,
      totalMatchdays: 38,
    },
    {
      leagueId: 'premier-league',
      name: 'Premier League',
      country: 'Inglaterra',
      logo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
      season: '2024-2025',
      currentMatchday: 14,
      totalMatchdays: 38,
    },
  ],

  teams: [
    {
      name: 'Real Madrid',
      logo: '⚪',
      leagueId: 'laliga',
      season: '2024-2025',
      city: 'Madrid',
      stadium: 'Santiago Bernabéu',
      founded: 1902,
      coach: 'Carlo Ancelotti',
      position: 1,
      points: 45,
      played: 15,
      won: 14,
      drawn: 3,
      lost: 1,
      goalsFor: 42,
      goalsAgainst: 15,
      goalDifference: 27,
      form: 'WWWDW',
    },
    {
      name: 'FC Barcelona',
      logo: '🔵🔴',
      leagueId: 'laliga',
      season: '2024-2025',
      city: 'Barcelona',
      stadium: 'Camp Nou',
      founded: 1899,
      coach: 'Xavi Hernández',
      position: 2,
      points: 42,
      played: 15,
      won: 13,
      drawn: 3,
      lost: 2,
      goalsFor: 38,
      goalsAgainst: 18,
      goalDifference: 20,
      form: 'WWDWL',
    },
    {
      name: 'Manchester City',
      logo: '🔵',
      leagueId: 'premier-league',
      season: '2024-2025',
      city: 'Manchester',
      stadium: 'Etihad Stadium',
      founded: 1880,
      coach: 'Pep Guardiola',
      position: 1,
      points: 40,
      played: 14,
      won: 12,
      drawn: 4,
      lost: 0,
      goalsFor: 45,
      goalsAgainst: 12,
      goalDifference: 33,
      form: 'WWWWW',
    },
  ],

  users: [
    {
      username: 'admin',
      email: 'admin@statfut.com',
      password: '$2b$10$XqZ3Z9Z9Z9Z9Z9Z9Z9Z9ZuZFZ9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z', // password: admin123
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
    },
    {
      username: 'testuser',
      email: 'user@test.com',
      password: '$2b$10$XqZ3Z9Z9Z9Z9Z9Z9Z9Z9ZuZFZ9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z', // password: test123
      firstName: 'Test',
      lastName: 'User',
      role: 'user',
    },
  ],

  matches: [
    {
      leagueId: 'laliga',
      season: '2024-2025',
      matchday: 16,
      homeTeam: 'Real Madrid',
      awayTeam: 'FC Barcelona',
      homeScore: null,
      awayScore: null,
      status: 'upcoming',
      date: new Date('2024-12-10T20:00:00Z'),
      venue: 'Santiago Bernabéu',
    },
    {
      leagueId: 'laliga',
      season: '2024-2025',
      matchday: 15,
      homeTeam: 'Real Madrid',
      awayTeam: 'Atlético Madrid',
      homeScore: 2,
      awayScore: 1,
      status: 'finished',
      date: new Date('2024-11-20T19:00:00Z'),
      venue: 'Santiago Bernabéu',
    },
    {
      leagueId: 'laliga',
      season: '2024-2025',
      matchday: 15,
      homeTeam: 'FC Barcelona',
      awayTeam: 'Valencia CF',
      homeScore: 3,
      awayScore: 0,
      status: 'finished',
      date: new Date('2024-11-21T20:00:00Z'),
      venue: 'Camp Nou',
    },
  ],

  players: [
    {
      name: 'Vinicius Jr',
      age: 23,
      nationality: 'Brasil',
      position: 'Delantero',
      jerseyNumber: 7,
      teamName: 'Real Madrid',
      photo: '🇧🇷',
      height: 176,
      weight: 73,
      preferredFoot: 'Derecho',
    },
    {
      name: 'Jude Bellingham',
      age: 20,
      nationality: 'Inglaterra',
      position: 'Centrocampista',
      jerseyNumber: 5,
      teamName: 'Real Madrid',
      photo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
      height: 186,
      weight: 75,
      preferredFoot: 'Derecho',
    },
    {
      name: 'Robert Lewandowski',
      age: 35,
      nationality: 'Polonia',
      position: 'Delantero',
      jerseyNumber: 9,
      teamName: 'FC Barcelona',
      photo: '🇵🇱',
      height: 185,
      weight: 81,
      preferredFoot: 'Derecho',
    },
    {
      name: 'Pedri',
      age: 21,
      nationality: 'España',
      position: 'Centrocampista',
      jerseyNumber: 8,
      teamName: 'FC Barcelona',
      photo: '🇪🇸',
      height: 174,
      weight: 60,
      preferredFoot: 'Derecho',
    },
    {
      name: 'Erling Haaland',
      age: 23,
      nationality: 'Noruega',
      position: 'Delantero',
      jerseyNumber: 9,
      teamName: 'Manchester City',
      photo: '🇳🇴',
      height: 194,
      weight: 88,
      preferredFoot: 'Izquierdo',
    },
    {
      name: 'Kevin De Bruyne',
      age: 32,
      nationality: 'Bélgica',
      position: 'Centrocampista',
      jerseyNumber: 17,
      teamName: 'Manchester City',
      photo: '🇧🇪',
      height: 181,
      weight: 70,
      preferredFoot: 'Derecho',
    },
  ],

  news: [
    {
      title: 'El Clásico: Real Madrid vs Barcelona se acerca',
      slug: 'clasico-real-madrid-barcelona',
      content: 'El partido más esperado de la temporada se jugará el próximo 10 de diciembre en el Santiago Bernabéu. Ambos equipos llegan en gran forma y prometen un espectáculo inolvidable.',
      author: 'Redacción StatFut',
      category: 'Partidos',
      tags: ['Real Madrid', 'Barcelona', 'La Liga', 'Clásico'],
      featured: true,
      publishedAt: new Date('2024-11-25T10:00:00Z'),
      views: 15234,
    },
    {
      title: 'Vinicius Jr lidera la tabla de goleadores',
      slug: 'vinicius-jr-goleadores',
      content: 'El brasileño del Real Madrid se consolida como el máximo artillero de La Liga con 12 goles en 15 partidos. Su gran momento lo posiciona como candidato al Balón de Oro.',
      author: 'Juan Pérez',
      category: 'Jugadores',
      tags: ['Vinicius Jr', 'Real Madrid', 'Goleadores'],
      featured: true,
      publishedAt: new Date('2024-11-24T14:30:00Z'),
      views: 8921,
    },
    {
      title: 'Barcelona vence 3-0 al Valencia en el Camp Nou',
      slug: 'barcelona-valencia-3-0',
      content: 'El equipo culé demostró su poderío ofensivo con goles de Lewandowski, Pedri y Raphinha. La victoria mantiene al Barcelona en la pelea por el título.',
      author: 'María García',
      category: 'Resultados',
      tags: ['Barcelona', 'Valencia', 'La Liga'],
      featured: false,
      publishedAt: new Date('2024-11-21T22:00:00Z'),
      views: 5432,
    },
    {
      title: 'Manchester City imparable: 5 victorias consecutivas',
      slug: 'manchester-city-racha',
      content: 'El equipo de Guardiola continúa su dominio en la Premier League. Haaland y De Bruyne son las figuras de un City que apunta al título.',
      author: 'David Smith',
      category: 'Equipos',
      tags: ['Manchester City', 'Premier League', 'Haaland'],
      featured: false,
      publishedAt: new Date('2024-11-23T16:45:00Z'),
      views: 6789,
    },
  ],

  statistics: [
    {
      playerName: 'Vinicius Jr',
      season: '2024-2025',
      leagueId: 'laliga',
      matchesPlayed: 15,
      goals: 12,
      assists: 7,
      yellowCards: 3,
      redCards: 0,
      minutesPlayed: 1287,
      shotsOnTarget: 34,
      passAccuracy: 82.5,
    },
    {
      playerName: 'Jude Bellingham',
      season: '2024-2025',
      leagueId: 'laliga',
      matchesPlayed: 15,
      goals: 8,
      assists: 5,
      yellowCards: 2,
      redCards: 0,
      minutesPlayed: 1320,
      shotsOnTarget: 22,
      passAccuracy: 88.3,
    },
    {
      playerName: 'Robert Lewandowski',
      season: '2024-2025',
      leagueId: 'laliga',
      matchesPlayed: 14,
      goals: 11,
      assists: 3,
      yellowCards: 1,
      redCards: 0,
      minutesPlayed: 1180,
      shotsOnTarget: 38,
      passAccuracy: 79.2,
    },
    {
      playerName: 'Pedri',
      season: '2024-2025',
      leagueId: 'laliga',
      matchesPlayed: 13,
      goals: 4,
      assists: 9,
      yellowCards: 2,
      redCards: 0,
      minutesPlayed: 1089,
      shotsOnTarget: 12,
      passAccuracy: 91.7,
    },
    {
      playerName: 'Erling Haaland',
      season: '2024-2025',
      leagueId: 'premier-league',
      matchesPlayed: 14,
      goals: 18,
      assists: 2,
      yellowCards: 1,
      redCards: 0,
      minutesPlayed: 1220,
      shotsOnTarget: 45,
      passAccuracy: 73.5,
    },
    {
      playerName: 'Kevin De Bruyne',
      season: '2024-2025',
      leagueId: 'premier-league',
      matchesPlayed: 12,
      goals: 5,
      assists: 12,
      yellowCards: 0,
      redCards: 0,
      minutesPlayed: 980,
      shotsOnTarget: 18,
      passAccuracy: 89.4,
    },
  ],
};

async function seed() {
  try {
    console.log('🌱 Conectando a MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB\n');

    // Definir schemas simplificados
    const leagueSchema = new mongoose.Schema({
      leagueId: String,
      name: String,
      country: String,
      logo: String,
      season: String,
      currentMatchday: Number,
      totalMatchdays: Number,
    });

    const teamSchema = new mongoose.Schema({
      name: String,
      logo: String,
      leagueId: String,
      season: String,
      city: String,
      stadium: String,
      founded: Number,
      coach: String,
      position: Number,
      points: Number,
      played: Number,
      won: Number,
      drawn: Number,
      lost: Number,
      goalsFor: Number,
      goalsAgainst: Number,
      goalDifference: Number,
      form: String,
    });

    const userSchema = new mongoose.Schema({
      username: String,
      email: String,
      password: String,
      firstName: String,
      lastName: String,
      role: String,
    });

    const matchSchema = new mongoose.Schema({
      leagueId: String,
      season: String,
      matchday: Number,
      homeTeam: String,
      awayTeam: String,
      homeScore: Number,
      awayScore: Number,
      status: String,
      date: Date,
      venue: String,
    });

    const playerSchema = new mongoose.Schema({
      name: String,
      age: Number,
      nationality: String,
      position: String,
      jerseyNumber: Number,
      teamName: String,
      photo: String,
      height: Number,
      weight: Number,
      preferredFoot: String,
    });

    const newsSchema = new mongoose.Schema({
      title: String,
      slug: String,
      content: String,
      author: String,
      category: String,
      tags: [String],
      featured: Boolean,
      publishedAt: Date,
      views: Number,
    });

    const statisticSchema = new mongoose.Schema({
      playerName: String,
      season: String,
      leagueId: String,
      matchesPlayed: Number,
      goals: Number,
      assists: Number,
      yellowCards: Number,
      redCards: Number,
      minutesPlayed: Number,
      shotsOnTarget: Number,
      passAccuracy: Number,
    });

    const League = mongoose.model('League', leagueSchema);
    const Team = mongoose.model('Team', teamSchema);
    const User = mongoose.model('User', userSchema);
    const Match = mongoose.model('Match', matchSchema);
    const Player = mongoose.model('Player', playerSchema);
    const News = mongoose.model('News', newsSchema);
    const Statistic = mongoose.model('Statistic', statisticSchema);

    // Limpiar colecciones existentes
    console.log('🗑️  Limpiando colecciones existentes...');
    await League.deleteMany({});
    await Team.deleteMany({});
    await User.deleteMany({});
    await Match.deleteMany({});
    await Player.deleteMany({});
    await News.deleteMany({});
    await Statistic.deleteMany({});
    console.log('✅ Colecciones limpiadas\n');

    // Insertar ligas
    console.log('📊 Insertando ligas...');
    await League.insertMany(seedData.leagues);
    console.log(`✅ ${seedData.leagues.length} ligas insertadas\n`);

    // Insertar equipos
    console.log('⚽ Insertando equipos...');
    await Team.insertMany(seedData.teams);
    console.log(`✅ ${seedData.teams.length} equipos insertados\n`);

    // Insertar usuarios
    console.log('👥 Insertando usuarios...');
    await User.insertMany(seedData.users);
    console.log(`✅ ${seedData.users.length} usuarios insertados\n`);

    // Insertar partidos
    console.log('⚽ Insertando partidos...');
    await Match.insertMany(seedData.matches);
    console.log(`✅ ${seedData.matches.length} partidos insertados\n`);

    // Insertar jugadores
    console.log('👤 Insertando jugadores...');
    await Player.insertMany(seedData.players);
    console.log(`✅ ${seedData.players.length} jugadores insertados\n`);

    // Insertar noticias
    console.log('📰 Insertando noticias...');
    await News.insertMany(seedData.news);
    console.log(`✅ ${seedData.news.length} noticias insertadas\n`);

    // Insertar estadísticas
    console.log('📊 Insertando estadísticas...');
    await Statistic.insertMany(seedData.statistics);
    console.log(`✅ ${seedData.statistics.length} estadísticas insertadas\n`);

    console.log('🎉 ¡Seed completado exitosamente!\n');
    console.log('📝 Datos disponibles:');
    console.log(`   - ${seedData.leagues.length} ligas`);
    console.log(`   - ${seedData.teams.length} equipos`);
    console.log(`   - ${seedData.users.length} usuarios`);
    console.log(`   - ${seedData.matches.length} partidos`);
    console.log(`   - ${seedData.players.length} jugadores`);
    console.log(`   - ${seedData.news.length} noticias`);
    console.log(`   - ${seedData.statistics.length} estadísticas`);
    console.log('\n👤 Credenciales de prueba:');
    console.log('   Email: admin@statfut.com');
    console.log('   Password: admin123');
    console.log('\n   Email: user@test.com');
    console.log('   Password: test123');

  } catch (error) {
    console.error('❌ Error durante el seed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n✅ Desconectado de MongoDB');
    process.exit(0);
  }
}

seed();
