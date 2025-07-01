const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connecté avec succès');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error);
    process.exit(1);
  }
};

connectDB();
