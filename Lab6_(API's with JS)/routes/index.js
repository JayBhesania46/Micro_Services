import postRoutes from './albums.js';
import userRoutes from './bands.js';

const constructorMethod = (app) => {
  app.use('/albums', postRoutes);
  app.use('/bands', userRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({error: 'Route Not found'});
  });
};

export default constructorMethod;
