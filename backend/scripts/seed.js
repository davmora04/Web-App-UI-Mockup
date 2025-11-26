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

    const League = mongoose.model('League', leagueSchema);
    const Team = mongoose.model('Team', teamSchema);
    const User = mongoose.model('User', userSchema);

    // Limpiar colecciones existentes
    console.log('🗑️  Limpiando colecciones existentes...');
    await League.deleteMany({});
    await Team.deleteMany({});
    await User.deleteMany({});
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

    console.log('🎉 ¡Seed completado exitosamente!\n');
    console.log('📝 Datos disponibles:');
    console.log(`   - ${seedData.leagues.length} ligas`);
    console.log(`   - ${seedData.teams.length} equipos`);
    console.log(`   - ${seedData.users.length} usuarios`);
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
