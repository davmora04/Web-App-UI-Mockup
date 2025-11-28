const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/statfut';

const matchSchema = new mongoose.Schema({}, { strict: false });

const main = async () => {
  try {
    console.log('🌱 Conectando a MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    const Match = mongoose.model('Match', matchSchema);

    // Actualizar fechas de partidos para que sean relativas a hoy
    const now = new Date();
    
    // Partidos upcoming: 5, 10, 15 días en el futuro
    const upcomingMatches = await Match.find({ status: 'upcoming' }).limit(10);
    console.log(`\n📝 Actualizando ${upcomingMatches.length} partidos upcoming...`);
    
    for (let i = 0; i < upcomingMatches.length; i++) {
      const futureDate = new Date(now);
      futureDate.setDate(futureDate.getDate() + (5 + i * 5));
      
      await Match.updateOne(
        { _id: upcomingMatches[i]._id },
        { date: futureDate }
      );
      console.log(`   ✅ Partido ${i + 1} actualizado a ${futureDate.toISOString()}`);
    }

    // Partidos recientes (finished): ayer, 2 días atrás, etc
    const finishedMatches = await Match.find({ status: 'finished' }).limit(10);
    console.log(`\n📝 Actualizando ${finishedMatches.length} partidos finished...`);
    
    for (let i = 0; i < finishedMatches.length; i++) {
      const pastDate = new Date(now);
      pastDate.setDate(pastDate.getDate() - (1 + i * 2));
      
      await Match.updateOne(
        { _id: finishedMatches[i]._id },
        { date: pastDate }
      );
      console.log(`   ✅ Partido ${i + 1} actualizado a ${pastDate.toISOString()}`);
    }

    console.log('\n✨ Fechas actualizadas correctamente');
    
    await mongoose.disconnect();
    console.log('✅ Desconectado de MongoDB');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

main();
