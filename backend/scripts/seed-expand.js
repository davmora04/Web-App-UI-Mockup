const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/statfut';
const bcrypt = require('bcrypt');

const expandData = {
  leagues: [
    {
      leagueId: 'seriea',
      name: 'Serie A',
      country: 'Italia',
      logo: '🇮🇹',
      season: '2024-2025',
      currentMatchday: 15,
      totalMatchdays: 38,
    },
  ],

  teams: [
    // Serie A
    {
      name: 'Juventus',
      logo: '⚫⚪',
      leagueId: 'seriea',
      season: '2024-2025',
      city: 'Turin',
      stadium: 'Allianz Stadium',
      founded: 1897,
      coach: 'Massimiliano Allegri',
      position: 1,
      points: 47,
      played: 20,
      won: 14,
      drawn: 5,
      lost: 1,
      goalsFor: 35,
      goalsAgainst: 12,
      goalDifference: 23,
      form: 'WWDWW',
    },
    {
      name: 'AC Milan',
      logo: '🔴⚫',
      leagueId: 'seriea',
      season: '2024-2025',
      city: 'Milan',
      stadium: 'San Siro',
      founded: 1899,
      coach: 'Paulo Fonseca',
      position: 2,
      points: 43,
      played: 20,
      won: 13,
      drawn: 4,
      lost: 3,
      goalsFor: 41,
      goalsAgainst: 22,
      goalDifference: 19,
      form: 'WWLWD',
    },
    {
      name: 'Inter Milan',
      logo: '🔵⚫',
      leagueId: 'seriea',
      season: '2024-2025',
      city: 'Milan',
      stadium: 'San Siro',
      founded: 1908,
      coach: 'Simone Inzaghi',
      position: 3,
      points: 42,
      played: 19,
      won: 13,
      drawn: 3,
      lost: 3,
      goalsFor: 43,
      goalsAgainst: 18,
      goalDifference: 25,
      form: 'WWWLW',
    },
    {
      name: 'AS Roma',
      logo: '🔴🟡',
      leagueId: 'seriea',
      season: '2024-2025',
      city: 'Rome',
      stadium: 'Stadio Olimpico',
      founded: 1927,
      coach: 'José Mourinho',
      position: 4,
      points: 38,
      played: 19,
      won: 11,
      drawn: 5,
      lost: 3,
      goalsFor: 34,
      goalsAgainst: 21,
      goalDifference: 13,
      form: 'DWDWL',
    },
    {
      name: 'Lazio',
      logo: '🔵⚪',
      leagueId: 'seriea',
      season: '2024-2025',
      city: 'Rome',
      stadium: 'Stadio Olimpico',
      founded: 1900,
      coach: 'Maurizio Sarri',
      position: 5,
      points: 35,
      played: 19,
      won: 10,
      drawn: 5,
      lost: 4,
      goalsFor: 32,
      goalsAgainst: 25,
      goalDifference: 7,
      form: 'DWDWW',
    },
    // Más equipos de La Liga y Premier
    {
      name: 'Atlético Madrid',
      logo: '🔴⚪',
      leagueId: 'laliga',
      season: '2024-2025',
      city: 'Madrid',
      stadium: 'Cívitas Metropolitano',
      founded: 1903,
      coach: 'Diego Simeone',
      position: 4,
      points: 35,
      played: 15,
      won: 10,
      drawn: 5,
      lost: 2,
      goalsFor: 28,
      goalsAgainst: 16,
      goalDifference: 12,
      form: 'DWWDW',
    },
    {
      name: 'Liverpool',
      logo: '🔴',
      leagueId: 'premier-league',
      season: '2024-2025',
      city: 'Liverpool',
      stadium: 'Anfield',
      founded: 1892,
      coach: 'Jürgen Klopp',
      position: 2,
      points: 48,
      played: 19,
      won: 15,
      drawn: 3,
      lost: 1,
      goalsFor: 47,
      goalsAgainst: 19,
      goalDifference: 28,
      form: 'WWWDW',
    },
    {
      name: 'Arsenal',
      logo: '🔴',
      leagueId: 'premier-league',
      season: '2024-2025',
      city: 'London',
      stadium: 'Emirates Stadium',
      founded: 1886,
      coach: 'Mikel Arteta',
      position: 3,
      points: 43,
      played: 19,
      won: 13,
      drawn: 4,
      lost: 2,
      goalsFor: 40,
      goalsAgainst: 20,
      goalDifference: 20,
      form: 'WDWWL',
    },
    {
      name: 'Chelsea',
      logo: '🔵',
      leagueId: 'premier-league',
      season: '2024-2025',
      city: 'London',
      stadium: 'Stamford Bridge',
      founded: 1905,
      coach: 'Mauricio Pochettino',
      position: 4,
      points: 35,
      played: 19,
      won: 10,
      drawn: 5,
      lost: 4,
      goalsFor: 38,
      goalsAgainst: 25,
      goalDifference: 13,
      form: 'WWDLW',
    },
    {
      name: 'Manchester United',
      logo: '🔴',
      leagueId: 'premier-league',
      season: '2024-2025',
      city: 'Manchester',
      stadium: 'Old Trafford',
      founded: 1878,
      coach: 'Erik ten Hag',
      position: 5,
      points: 32,
      played: 19,
      won: 9,
      drawn: 5,
      lost: 5,
      goalsFor: 35,
      goalsAgainst: 28,
      goalDifference: 7,
      form: 'DWLWW',
    },
  ],

  players: [
    // Serie A Players
    {
      name: 'Cristiano Ronaldo',
      age: 38,
      nationality: 'Portugal',
      position: 'FWD',
      jerseyNumber: 7,
      teamName: 'AC Milan',
      photo: '🇵🇹',
      height: 187,
      weight: 84,
      preferredFoot: 'Izquierdo',
    },
    {
      name: 'Dušan Vlahović',
      age: 24,
      nationality: 'Serbia',
      position: 'FWD',
      jerseyNumber: 7,
      teamName: 'Juventus',
      photo: '🇷🇸',
      height: 188,
      weight: 82,
      preferredFoot: 'Derecho',
    },
    {
      name: 'Lautaro Martínez',
      age: 26,
      nationality: 'Argentina',
      position: 'FWD',
      jerseyNumber: 10,
      teamName: 'Inter Milan',
      photo: '🇦🇷',
      height: 175,
      weight: 77,
      preferredFoot: 'Derecho',
    },
    {
      name: 'Paulo Dybala',
      age: 30,
      nationality: 'Argentina',
      position: 'FWD',
      jerseyNumber: 21,
      teamName: 'AS Roma',
      photo: '🇦🇷',
      height: 177,
      weight: 75,
      preferredFoot: 'Izquierdo',
    },
    // Premier League Additional Players
    {
      name: 'Mohamed Salah',
      age: 31,
      nationality: 'Egypt',
      position: 'FWD',
      jerseyNumber: 11,
      teamName: 'Liverpool',
      photo: '🇪🇬',
      height: 175,
      weight: 71,
      preferredFoot: 'Izquierdo',
    },
    {
      name: 'Harry Kane',
      age: 30,
      nationality: 'England',
      position: 'FWD',
      jerseyNumber: 10,
      teamName: 'Manchester United',
      photo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
      height: 188,
      weight: 89,
      preferredFoot: 'Derecho',
    },
    {
      name: 'Phil Foden',
      age: 23,
      nationality: 'England',
      position: 'MID',
      jerseyNumber: 47,
      teamName: 'Manchester City',
      photo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
      height: 180,
      weight: 70,
      preferredFoot: 'Izquierdo',
    },
    {
      name: 'Bukayo Saka',
      age: 22,
      nationality: 'England',
      position: 'FWD',
      jerseyNumber: 7,
      teamName: 'Arsenal',
      photo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
      height: 178,
      weight: 68,
      preferredFoot: 'Izquierdo',
    },
    // La Liga Additional Players
    {
      name: 'Luis Díaz',
      age: 27,
      nationality: 'Colombia',
      position: 'FWD',
      jerseyNumber: 9,
      teamName: 'Barcelona',
      photo: '🇨🇴',
      height: 180,
      weight: 75,
      preferredFoot: 'Izquierdo',
    },
    {
      name: 'Vinícius Júnior',
      age: 23,
      nationality: 'Brazil',
      position: 'FWD',
      jerseyNumber: 7,
      teamName: 'Real Madrid',
      photo: '🇧🇷',
      height: 176,
      weight: 73,
      preferredFoot: 'Derecho',
    },
  ],

  matches: [
    // Serie A Matches
    {
      leagueId: 'seriea',
      season: '2024-2025',
      matchday: 16,
      homeTeam: 'Juventus',
      awayTeam: 'Inter Milan',
      homeScore: null,
      awayScore: null,
      status: 'upcoming',
      date: new Date('2024-12-15T20:00:00Z'),
      venue: 'Allianz Stadium',
    },
    {
      leagueId: 'seriea',
      season: '2024-2025',
      matchday: 16,
      homeTeam: 'AC Milan',
      awayTeam: 'AS Roma',
      homeScore: 2,
      awayScore: 1,
      status: 'finished',
      date: new Date('2024-11-26T20:00:00Z'),
      venue: 'San Siro',
    },
    {
      leagueId: 'seriea',
      season: '2024-2025',
      matchday: 16,
      homeTeam: 'Lazio',
      awayTeam: 'Juventus',
      homeScore: 1,
      awayScore: 3,
      status: 'finished',
      date: new Date('2024-11-25T18:00:00Z'),
      venue: 'Stadio Olimpico',
    },
    // Premier League Additional Matches
    {
      leagueId: 'premier-league',
      season: '2024-2025',
      matchday: 15,
      homeTeam: 'Manchester City',
      awayTeam: 'Liverpool',
      homeScore: 2,
      awayScore: 2,
      status: 'finished',
      date: new Date('2024-11-26T15:30:00Z'),
      venue: 'Etihad Stadium',
    },
    {
      leagueId: 'premier-league',
      season: '2024-2025',
      matchday: 15,
      homeTeam: 'Arsenal',
      awayTeam: 'Chelsea',
      homeScore: 3,
      awayScore: 0,
      status: 'finished',
      date: new Date('2024-11-25T12:00:00Z'),
      venue: 'Emirates Stadium',
    },
    {
      leagueId: 'premier-league',
      season: '2024-2025',
      matchday: 16,
      homeTeam: 'Manchester United',
      awayTeam: 'Manchester City',
      homeScore: null,
      awayScore: null,
      status: 'upcoming',
      date: new Date('2024-12-10T20:00:00Z'),
      venue: 'Old Trafford',
    },
  ],

  news: [
    {
      title: 'Juventus mantiene el liderato en la Serie A',
      slug: 'juventus-liderato-seriea',
      content: 'La Vecchia Signora continúa con su dominio en Italia tras vencer a Lazio 3-1 en un partido emocionante. Vlahović fue determinante con dos goles que aseguran la permanencia en la cúspide de la Serie A.',
      author: 'Redacción StatFut',
      category: 'Equipos',
      tags: ['Juventus', 'Serie A', 'Liderato'],
      featured: true,
      publishedAt: new Date('2024-11-25T18:00:00Z'),
      views: 12543,
    },
    {
      title: 'Derby milanés: AC Milan vence a Inter en tabla',
      slug: 'derby-milan-ac-inter',
      content: 'El clásico de Milán se decidió en favor del AC Milan que se mantiene por encima del Inter. Ambos equipos luchan por el podio en una emocionante campaña de Serie A.',
      author: 'Redacción StatFut',
      category: 'Partidos',
      tags: ['AC Milan', 'Inter', 'Serie A', 'Derby'],
      featured: true,
      publishedAt: new Date('2024-11-26T22:00:00Z'),
      views: 18765,
    },
    {
      title: 'Salah lidera la tabla de goleadores de la Premier',
      slug: 'salah-goleadores-premier',
      content: 'Mohamed Salah sigue siendo el máximo artillero de la Premier League con 14 goles en 17 partidos. El futbolista egipcio mantiene una racha de forma espectacular.',
      author: 'Juan Pérez',
      category: 'Jugadores',
      tags: ['Liverpool', 'Premier League', 'Salah'],
      featured: false,
      publishedAt: new Date('2024-11-26T14:30:00Z'),
      views: 9876,
    },
    {
      title: 'Manchester City y Liverpool empatan en el Etihad',
      slug: 'man-city-liverpool-empate',
      content: 'Partido de ensueño en el Etihad Stadium donde Manchester City y Liverpool se repartieron los puntos. Un empate 2-2 que deja abiertas todas las posibilidades en la Premier League.',
      author: 'David Smith',
      category: 'Partidos',
      tags: ['Manchester City', 'Liverpool', 'Premier League'],
      featured: false,
      publishedAt: new Date('2024-11-26T16:45:00Z'),
      views: 14321,
    },
    {
      title: 'Arsenal domina a Chelsea en derbi londinense',
      slug: 'arsenal-chelsea-derbi',
      content: 'Los Gunners golearon al Chelsea 3-0 en un espectáculo ofensivo impresionante. Saka y Martinelli fueron decisivos en una noche de gala para el conjunto del Emirates.',
      author: 'María García',
      category: 'Resultados',
      tags: ['Arsenal', 'Chelsea', 'Premier League'],
      featured: false,
      publishedAt: new Date('2024-11-25T14:00:00Z'),
      views: 11234,
    },
  ],

  statistics: [
    // Serie A Statistics
    {
      playerName: 'Dušan Vlahović',
      season: '2024-2025',
      leagueId: 'seriea',
      matchesPlayed: 20,
      goals: 16,
      assists: 4,
      yellowCards: 2,
      redCards: 0,
      minutesPlayed: 1650,
      shotsOnTarget: 48,
      passAccuracy: 76.3,
    },
    {
      playerName: 'Lautaro Martínez',
      season: '2024-2025',
      leagueId: 'seriea',
      matchesPlayed: 19,
      goals: 14,
      assists: 6,
      yellowCards: 3,
      redCards: 0,
      minutesPlayed: 1540,
      shotsOnTarget: 42,
      passAccuracy: 78.5,
    },
    {
      playerName: 'Cristiano Ronaldo',
      season: '2024-2025',
      leagueId: 'seriea',
      matchesPlayed: 18,
      goals: 12,
      assists: 3,
      yellowCards: 1,
      redCards: 0,
      minutesPlayed: 1450,
      shotsOnTarget: 38,
      passAccuracy: 81.2,
    },
    // Premier League Additional Statistics
    {
      playerName: 'Mohamed Salah',
      season: '2024-2025',
      leagueId: 'premier-league',
      matchesPlayed: 17,
      goals: 14,
      assists: 7,
      yellowCards: 2,
      redCards: 0,
      minutesPlayed: 1450,
      shotsOnTarget: 52,
      passAccuracy: 82.4,
    },
    {
      playerName: 'Phil Foden',
      season: '2024-2025',
      leagueId: 'premier-league',
      matchesPlayed: 16,
      goals: 9,
      assists: 8,
      yellowCards: 1,
      redCards: 0,
      minutesPlayed: 1320,
      shotsOnTarget: 36,
      passAccuracy: 85.3,
    },
    {
      playerName: 'Harry Kane',
      season: '2024-2025',
      leagueId: 'premier-league',
      matchesPlayed: 15,
      goals: 11,
      assists: 5,
      yellowCards: 2,
      redCards: 0,
      minutesPlayed: 1260,
      shotsOnTarget: 40,
      passAccuracy: 79.8,
    },
  ],
};

async function expandSeed() {
  try {
    console.log('🌱 Conectando a MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB\n');

    // Definir schemas
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
    const Player = mongoose.model('Player', playerSchema);
    const Match = mongoose.model('Match', matchSchema);
    const News = mongoose.model('News', newsSchema);
    const Statistic = mongoose.model('Statistic', statisticSchema);

    // Insertar ligas (sin duplicados)
    console.log('📊 Insertando ligas (nuevas)...');
    for (const league of expandData.leagues) {
      const exists = await League.findOne({ leagueId: league.leagueId });
      if (!exists) {
        await League.create(league);
        console.log(`   ✅ ${league.name} agregada`);
      } else {
        console.log(`   ⏭️  ${league.name} ya existe`);
      }
    }
    console.log();

    // Insertar equipos (sin duplicados)
    console.log('⚽ Insertando equipos (nuevos)...');
    for (const team of expandData.teams) {
      const exists = await Team.findOne({ name: team.name, leagueId: team.leagueId });
      if (!exists) {
        await Team.create(team);
        console.log(`   ✅ ${team.name} agregado`);
      } else {
        console.log(`   ⏭️  ${team.name} ya existe`);
      }
    }
    console.log();

    // Insertar jugadores (sin duplicados)
    console.log('👤 Insertando jugadores (nuevos)...');
    for (const player of expandData.players) {
      const exists = await Player.findOne({ name: player.name });
      if (!exists) {
        await Player.create(player);
        console.log(`   ✅ ${player.name} agregado`);
      } else {
        console.log(`   ⏭️  ${player.name} ya existe`);
      }
    }
    console.log();

    // Insertar partidos
    console.log('⚽ Insertando partidos (nuevos)...');
    for (const match of expandData.matches) {
      const exists = await Match.findOne({ homeTeam: match.homeTeam, awayTeam: match.awayTeam, date: match.date });
      if (!exists) {
        await Match.create(match);
        console.log(`   ✅ ${match.homeTeam} vs ${match.awayTeam} agregado`);
      } else {
        console.log(`   ⏭️  ${match.homeTeam} vs ${match.awayTeam} ya existe`);
      }
    }
    console.log();

    // Insertar noticias
    console.log('📰 Insertando noticias (nuevas)...');
    for (const article of expandData.news) {
      const exists = await News.findOne({ slug: article.slug });
      if (!exists) {
        await News.create(article);
        console.log(`   ✅ "${article.title}" agregada`);
      } else {
        console.log(`   ⏭️  "${article.title}" ya existe`);
      }
    }
    console.log();

    // Insertar estadísticas
    console.log('📊 Insertando estadísticas (nuevas)...');
    for (const stat of expandData.statistics) {
      const exists = await Statistic.findOne({ playerName: stat.playerName, leagueId: stat.leagueId });
      if (!exists) {
        await Statistic.create(stat);
        console.log(`   ✅ Estadísticas de ${stat.playerName} agregadas`);
      } else {
        console.log(`   ⏭️  Estadísticas de ${stat.playerName} ya existen`);
      }
    }
    console.log();

    // Contar totales
    const leagues = await League.countDocuments();
    const teams = await Team.countDocuments();
    const players = await Player.countDocuments();
    const matches = await Match.countDocuments();
    const news = await News.countDocuments();
    const stats = await Statistic.countDocuments();

    console.log('🎉 ¡Expansión de datos completada!\n');
    console.log('📝 Totales en la base de datos:');
    console.log(`   - ${leagues} ligas`);
    console.log(`   - ${teams} equipos`);
    console.log(`   - ${players} jugadores`);
    console.log(`   - ${matches} partidos`);
    console.log(`   - ${news} noticias`);
    console.log(`   - ${stats} estadísticas`);
    console.log();
    console.log('✨ Ligas disponibles:');
    const allLeagues = await League.find({});
    allLeagues.forEach(l => console.log(`   - ${l.name} (${l.country})`));

  } catch (error) {
    console.error('❌ Error durante la expansión:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n✅ Desconectado de MongoDB');
    process.exit(0);
  }
}

expandSeed();
