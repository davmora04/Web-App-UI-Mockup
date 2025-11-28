const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/statfut';

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
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
  form: String
}, { timestamps: true, collection: 'teams' });

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  firstName: String,
  lastName: String,
  photo: String,
  nationality: { type: String, required: true },
  dateOfBirth: Date,
  position: { type: String, enum: ['GK', 'DEF', 'MID', 'FWD'], required: true },
  jerseyNumber: Number,
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  height: Number,
  weight: Number,
  preferredFoot: { type: String, enum: ['left', 'right', 'both'] },
  marketValue: Number
}, { timestamps: true, collection: 'players' });

const Player = mongoose.model('Player', playerSchema);
const Team = mongoose.model('Team', teamSchema);

const playersData = {
  'Real Madrid': [
    { name: 'Thibaut Courtois', firstName: 'Thibaut', lastName: 'Courtois', nationality: 'Belgium', position: 'GK', jerseyNumber: 1, height: 199, weight: 96, preferredFoot: 'left', marketValue: 45000000 },
    { name: 'Dani Carvajal', firstName: 'Daniel', lastName: 'Carvajal', nationality: 'Spain', position: 'DEF', jerseyNumber: 2, height: 173, weight: 73, preferredFoot: 'right', marketValue: 20000000 },
    { name: 'Éder Militão', firstName: 'Éder', lastName: 'Militão', nationality: 'Brazil', position: 'DEF', jerseyNumber: 3, height: 186, weight: 78, preferredFoot: 'right', marketValue: 60000000 },
    { name: 'David Alaba', firstName: 'David', lastName: 'Alaba', nationality: 'Austria', position: 'DEF', jerseyNumber: 4, height: 180, weight: 78, preferredFoot: 'left', marketValue: 35000000 },
    { name: 'Jude Bellingham', firstName: 'Jude', lastName: 'Bellingham', nationality: 'England', position: 'MID', jerseyNumber: 5, height: 186, weight: 75, preferredFoot: 'right', marketValue: 120000000 },
    { name: 'Nacho Fernández', firstName: 'Nacho', lastName: 'Fernández', nationality: 'Spain', position: 'DEF', jerseyNumber: 6, height: 180, weight: 76, preferredFoot: 'right', marketValue: 10000000 },
    { name: 'Vinícius Júnior', firstName: 'Vinícius', lastName: 'Júnior', nationality: 'Brazil', position: 'FWD', jerseyNumber: 7, height: 176, weight: 73, preferredFoot: 'right', marketValue: 120000000 },
    { name: 'Toni Kroos', firstName: 'Toni', lastName: 'Kroos', nationality: 'Germany', position: 'MID', jerseyNumber: 8, height: 183, weight: 76, preferredFoot: 'both', marketValue: 15000000 },
    { name: 'Joselu', firstName: 'José Luis', lastName: 'Mato', nationality: 'Spain', position: 'FWD', jerseyNumber: 9, height: 192, weight: 90, preferredFoot: 'right', marketValue: 8000000 },
    { name: 'Luka Modrić', firstName: 'Luka', lastName: 'Modrić', nationality: 'Croatia', position: 'MID', jerseyNumber: 10, height: 172, weight: 66, preferredFoot: 'both', marketValue: 10000000 },
    { name: 'Rodrygo', firstName: 'Rodrygo', lastName: 'Goes', nationality: 'Brazil', position: 'FWD', jerseyNumber: 11, height: 174, weight: 64, preferredFoot: 'right', marketValue: 80000000 },
    { name: 'Eduardo Camavinga', firstName: 'Eduardo', lastName: 'Camavinga', nationality: 'France', position: 'MID', jerseyNumber: 12, height: 182, weight: 68, preferredFoot: 'left', marketValue: 80000000 },
    { name: 'Andriy Lunin', firstName: 'Andriy', lastName: 'Lunin', nationality: 'Ukraine', position: 'GK', jerseyNumber: 13, height: 191, weight: 80, preferredFoot: 'right', marketValue: 10000000 },
    { name: 'Aurélien Tchouaméni', firstName: 'Aurélien', lastName: 'Tchouaméni', nationality: 'France', position: 'MID', jerseyNumber: 14, height: 185, weight: 81, preferredFoot: 'right', marketValue: 80000000 },
    { name: 'Federico Valverde', firstName: 'Federico', lastName: 'Valverde', nationality: 'Uruguay', position: 'MID', jerseyNumber: 15, height: 182, weight: 78, preferredFoot: 'right', marketValue: 100000000 },
  ],
  'FC Barcelona': [
    { name: 'Marc-André ter Stegen', firstName: 'Marc-André', lastName: 'ter Stegen', nationality: 'Germany', position: 'GK', jerseyNumber: 1, height: 187, weight: 85, preferredFoot: 'right', marketValue: 40000000 },
    { name: 'João Cancelo', firstName: 'João', lastName: 'Cancelo', nationality: 'Portugal', position: 'DEF', jerseyNumber: 2, height: 182, weight: 74, preferredFoot: 'right', marketValue: 25000000 },
    { name: 'Ronald Araujo', firstName: 'Ronald', lastName: 'Araujo', nationality: 'Uruguay', position: 'DEF', jerseyNumber: 4, height: 188, weight: 82, preferredFoot: 'right', marketValue: 70000000 },
    { name: 'Iñigo Martínez', firstName: 'Iñigo', lastName: 'Martínez', nationality: 'Spain', position: 'DEF', jerseyNumber: 5, height: 182, weight: 81, preferredFoot: 'left', marketValue: 10000000 },
    { name: 'Gavi', firstName: 'Pablo', lastName: 'Páez Gavira', nationality: 'Spain', position: 'MID', jerseyNumber: 6, height: 173, weight: 69, preferredFoot: 'right', marketValue: 90000000 },
    { name: 'Ferran Torres', firstName: 'Ferran', lastName: 'Torres', nationality: 'Spain', position: 'FWD', jerseyNumber: 7, height: 184, weight: 77, preferredFoot: 'right', marketValue: 50000000 },
    { name: 'Pedri', firstName: 'Pedro', lastName: 'González López', nationality: 'Spain', position: 'MID', jerseyNumber: 8, height: 174, weight: 60, preferredFoot: 'right', marketValue: 100000000 },
    { name: 'Robert Lewandowski', firstName: 'Robert', lastName: 'Lewandowski', nationality: 'Poland', position: 'FWD', jerseyNumber: 9, height: 185, weight: 81, preferredFoot: 'right', marketValue: 45000000 },
    { name: 'Ansu Fati', firstName: 'Ansu', lastName: 'Fati', nationality: 'Spain', position: 'FWD', jerseyNumber: 10, height: 178, weight: 66, preferredFoot: 'right', marketValue: 40000000 },
    { name: 'Raphinha', firstName: 'Raphael', lastName: 'Dias Belloli', nationality: 'Brazil', position: 'FWD', jerseyNumber: 11, height: 176, weight: 68, preferredFoot: 'left', marketValue: 60000000 },
    { name: 'Alejandro Balde', firstName: 'Alejandro', lastName: 'Balde', nationality: 'Spain', position: 'DEF', jerseyNumber: 3, height: 175, weight: 72, preferredFoot: 'left', marketValue: 40000000 },
    { name: 'Jules Koundé', firstName: 'Jules', lastName: 'Koundé', nationality: 'France', position: 'DEF', jerseyNumber: 23, height: 178, weight: 70, preferredFoot: 'right', marketValue: 60000000 },
    { name: 'Frenkie de Jong', firstName: 'Frenkie', lastName: 'de Jong', nationality: 'Netherlands', position: 'MID', jerseyNumber: 21, height: 180, weight: 74, preferredFoot: 'right', marketValue: 70000000 },
    { name: 'İlkay Gündoğan', firstName: 'İlkay', lastName: 'Gündoğan', nationality: 'Germany', position: 'MID', jerseyNumber: 22, height: 180, weight: 80, preferredFoot: 'right', marketValue: 25000000 },
    { name: 'Iñaki Peña', firstName: 'Iñaki', lastName: 'Peña', nationality: 'Spain', position: 'GK', jerseyNumber: 13, height: 184, weight: 79, preferredFoot: 'right', marketValue: 5000000 },
  ],
  'Manchester City': [
    { name: 'Ederson', firstName: 'Ederson', lastName: 'Moraes', nationality: 'Brazil', position: 'GK', jerseyNumber: 31, height: 188, weight: 86, preferredFoot: 'left', marketValue: 40000000 },
    { name: 'Kyle Walker', firstName: 'Kyle', lastName: 'Walker', nationality: 'England', position: 'DEF', jerseyNumber: 2, height: 183, weight: 83, preferredFoot: 'right', marketValue: 20000000 },
    { name: 'Rúben Dias', firstName: 'Rúben', lastName: 'Dias', nationality: 'Portugal', position: 'DEF', jerseyNumber: 3, height: 187, weight: 82, preferredFoot: 'right', marketValue: 75000000 },
    { name: 'John Stones', firstName: 'John', lastName: 'Stones', nationality: 'England', position: 'DEF', jerseyNumber: 5, height: 188, weight: 70, preferredFoot: 'right', marketValue: 40000000 },
    { name: 'Nathan Aké', firstName: 'Nathan', lastName: 'Aké', nationality: 'Netherlands', position: 'DEF', jerseyNumber: 6, height: 180, weight: 75, preferredFoot: 'left', marketValue: 40000000 },
    { name: 'Kevin De Bruyne', firstName: 'Kevin', lastName: 'De Bruyne', nationality: 'Belgium', position: 'MID', jerseyNumber: 17, height: 181, weight: 70, preferredFoot: 'right', marketValue: 80000000 },
    { name: 'Erling Haaland', firstName: 'Erling', lastName: 'Haaland', nationality: 'Norway', position: 'FWD', jerseyNumber: 9, height: 194, weight: 88, preferredFoot: 'left', marketValue: 180000000 },
    { name: 'Jack Grealish', firstName: 'Jack', lastName: 'Grealish', nationality: 'England', position: 'FWD', jerseyNumber: 10, height: 180, weight: 76, preferredFoot: 'right', marketValue: 70000000 },
    { name: 'Phil Foden', firstName: 'Phil', lastName: 'Foden', nationality: 'England', position: 'MID', jerseyNumber: 47, height: 171, weight: 69, preferredFoot: 'left', marketValue: 110000000 },
    { name: 'Bernardo Silva', firstName: 'Bernardo', lastName: 'Silva', nationality: 'Portugal', position: 'MID', jerseyNumber: 20, height: 173, weight: 64, preferredFoot: 'left', marketValue: 80000000 },
    { name: 'Rodri', firstName: 'Rodrigo', lastName: 'Hernández', nationality: 'Spain', position: 'MID', jerseyNumber: 16, height: 191, weight: 82, preferredFoot: 'right', marketValue: 100000000 },
    { name: 'Julián Álvarez', firstName: 'Julián', lastName: 'Álvarez', nationality: 'Argentina', position: 'FWD', jerseyNumber: 19, height: 170, weight: 71, preferredFoot: 'right', marketValue: 70000000 },
    { name: 'Manuel Akanji', firstName: 'Manuel', lastName: 'Akanji', nationality: 'Switzerland', position: 'DEF', jerseyNumber: 25, height: 187, weight: 85, preferredFoot: 'right', marketValue: 40000000 },
    { name: 'Joško Gvardiol', firstName: 'Joško', lastName: 'Gvardiol', nationality: 'Croatia', position: 'DEF', jerseyNumber: 24, height: 185, weight: 80, preferredFoot: 'left', marketValue: 75000000 },
    { name: 'Mateo Kovačić', firstName: 'Mateo', lastName: 'Kovačić', nationality: 'Croatia', position: 'MID', jerseyNumber: 8, height: 178, weight: 78, preferredFoot: 'right', marketValue: 40000000 },
  ],
  'Liverpool': [
    { name: 'Alisson', firstName: 'Alisson', lastName: 'Becker', nationality: 'Brazil', position: 'GK', jerseyNumber: 1, height: 193, weight: 91, preferredFoot: 'right', marketValue: 50000000 },
    { name: 'Trent Alexander-Arnold', firstName: 'Trent', lastName: 'Alexander-Arnold', nationality: 'England', position: 'DEF', jerseyNumber: 66, height: 180, weight: 69, preferredFoot: 'right', marketValue: 70000000 },
    { name: 'Virgil van Dijk', firstName: 'Virgil', lastName: 'van Dijk', nationality: 'Netherlands', position: 'DEF', jerseyNumber: 4, height: 195, weight: 92, preferredFoot: 'right', marketValue: 45000000 },
    { name: 'Andy Robertson', firstName: 'Andrew', lastName: 'Robertson', nationality: 'Scotland', position: 'DEF', jerseyNumber: 26, height: 178, weight: 64, preferredFoot: 'left', marketValue: 35000000 },
    { name: 'Mohamed Salah', firstName: 'Mohamed', lastName: 'Salah', nationality: 'Egypt', position: 'FWD', jerseyNumber: 11, height: 175, weight: 71, preferredFoot: 'left', marketValue: 65000000 },
    { name: 'Darwin Núñez', firstName: 'Darwin', lastName: 'Núñez', nationality: 'Uruguay', position: 'FWD', jerseyNumber: 9, height: 187, weight: 81, preferredFoot: 'right', marketValue: 70000000 },
    { name: 'Luis Díaz', firstName: 'Luis', lastName: 'Díaz', nationality: 'Colombia', position: 'FWD', jerseyNumber: 7, height: 178, weight: 67, preferredFoot: 'right', marketValue: 75000000 },
    { name: 'Alexis Mac Allister', firstName: 'Alexis', lastName: 'Mac Allister', nationality: 'Argentina', position: 'MID', jerseyNumber: 10, height: 176, weight: 73, preferredFoot: 'right', marketValue: 60000000 },
    { name: 'Dominik Szoboszlai', firstName: 'Dominik', lastName: 'Szoboszlai', nationality: 'Hungary', position: 'MID', jerseyNumber: 8, height: 186, weight: 74, preferredFoot: 'right', marketValue: 70000000 },
    { name: 'Cody Gakpo', firstName: 'Cody', lastName: 'Gakpo', nationality: 'Netherlands', position: 'FWD', jerseyNumber: 18, height: 189, weight: 78, preferredFoot: 'right', marketValue: 55000000 },
    { name: 'Wataru Endo', firstName: 'Wataru', lastName: 'Endo', nationality: 'Japan', position: 'MID', jerseyNumber: 3, height: 178, weight: 75, preferredFoot: 'right', marketValue: 20000000 },
    { name: 'Ibrahima Konaté', firstName: 'Ibrahima', lastName: 'Konaté', nationality: 'France', position: 'DEF', jerseyNumber: 5, height: 194, weight: 95, preferredFoot: 'right', marketValue: 50000000 },
    { name: 'Joe Gomez', firstName: 'Joseph', lastName: 'Gomez', nationality: 'England', position: 'DEF', jerseyNumber: 2, height: 188, weight: 77, preferredFoot: 'right', marketValue: 25000000 },
    { name: 'Curtis Jones', firstName: 'Curtis', lastName: 'Jones', nationality: 'England', position: 'MID', jerseyNumber: 17, height: 185, weight: 73, preferredFoot: 'right', marketValue: 30000000 },
    { name: 'Caoimhin Kelleher', firstName: 'Caoimhín', lastName: 'Kelleher', nationality: 'Ireland', position: 'GK', jerseyNumber: 62, height: 188, weight: 78, preferredFoot: 'right', marketValue: 15000000 },
  ]
};

async function seedPlayers() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Wait a bit for connection to stabilize
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Clear existing players
    await Player.deleteMany({});
    console.log('Cleared existing players');

    // Get all teams with detailed logging
    const teamCount = await Team.countDocuments();
    console.log(`Team count: ${teamCount}`);
    
    const teams = await Team.find({}).lean();
    console.log(`Found ${teams.length} teams:`, teams.map(t => ({ name: t.name, id: t._id })));

    let totalPlayersCreated = 0;

    // Create players for each team
    for (const team of teams) {
      const teamPlayers = playersData[team.name];
      
      if (teamPlayers) {
        const players = teamPlayers.map(p => ({
          ...p,
          teamId: team._id,
          dateOfBirth: new Date(1990 + Math.floor(Math.random() * 15), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
          photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&size=128&background=random`
        }));

        await Player.insertMany(players);
        console.log(`✓ Created ${players.length} players for ${team.name}`);
        totalPlayersCreated += players.length;
      } else {
        console.log(`⚠ No player data found for ${team.name}`);
      }
    }

    console.log(`\n✓ Successfully seeded ${totalPlayersCreated} players`);

    // Show summary
    const playerCount = await Player.countDocuments();
    console.log(`Total players in database: ${playerCount}`);

  } catch (error) {
    console.error('Error seeding players:', error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

seedPlayers();
