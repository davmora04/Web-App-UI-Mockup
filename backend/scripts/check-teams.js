const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/football-stats';

async function checkTeams() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    console.log('Database:', mongoose.connection.db.databaseName);
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\nCollections:', collections.map(c => c.name));
    
    const teams = await mongoose.connection.db.collection('teams').find({}).toArray();
    console.log(`\nFound ${teams.length} teams:`);
    teams.forEach(t => console.log(`  - ${t.name} (ID: ${t._id})`));
    
    const players = await mongoose.connection.db.collection('players').find({}).toArray();
    console.log(`\nFound ${players.length} players`);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}

checkTeams();
