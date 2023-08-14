import { ObjectId } from 'mongodb';
import { albumFuncs ,bandFuncs} from '../data/index.js';
import {Router} from 'express'
const router = Router();

router
  .route('/:bandId')
  .get(async (req, res) => {
    let  bandId  = req.params.bandId;

  if (!ObjectId.isValid(bandId)) {
    return res.status(400).send('Invalid bandId');
  }
  const albums = await albumFuncs.getAll(bandId);
  if (albums.length === 0) {
    return res.status(404).send('No albums found for this band');
  }
   return res.status(200).json(albums);
})
  

// Delete album by Id
  .post(async (req, res) => {
    let data = req.body;
    let bandId  = req.params.bandId;

    if (!data.title || !data.releaseDate || !data.tracks) {
      return res.status(400).send('All fields are required');
    }

    if (!ObjectId.isValid(bandId)) {
      return res.status(400).send('Invalid bandId');
    }

    const band = await bandFuncs.get(bandId);
    if (!band) {
      return res.status(404).send('Band not found');
    }

    const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    if (!dateRegex.test(data.releaseDate)) {
      return res.status(400).send('Invalid release date format');
    }

    const releaseYear = new Date(data.releaseDate).getFullYear();
    const currentYear = new Date().getFullYear();
    if (releaseYear < 1900 || releaseYear > currentYear + 1) {
      return res.status(400).send('Release date out of range');
    }

    if (!Array.isArray(data.tracks) || data.tracks.length < 3 || !data.tracks.every(tracks => typeof tracks === 'string' && tracks.trim().length > 0)) {
      return res.status(400).send('Tracks must be an array of at least 3 valid strings');
    }

    const ratingRegex = /^[1-5](\.[0-9])?$/;
    if (!ratingRegex.test(data.rating)) {
      return res.status(400).send('Rating must be a number from 1 to 5 with one decimal place');
    }
    try{
    const album = await albumFuncs.create(bandId, data.title, data.releaseDate, data.tracks, data.rating ); 
    return res.status(200).json(album);
    }
    catch(e)
    {
      return res.status(500).json({error: "Error"});
    }
  });


router
  .route('/album/:albumId')
  .get(async (req, res) => {
    let albumId  = req.params.albumId;

  if (!ObjectId.isValid(albumId)) {
    res.status(400).send({ error: 'Invalid albumId' });
    return;
  }

  try {
    const album = await albumFuncs.get(albumId);

    if (!album) {
      
      res.status(404).send({ error: 'Album not found' });
      return;
    }

    res.status(200).send(album);
  } catch (err) {
    
    console.error(err);
    res.status(500).send({ error: 'Internal server error' });
  }
  })


// Delete an album
  .delete(async (req, res) => {
    let albumId = req.params.albumId;

  if (!ObjectId.isValid(albumId)) {
    
    res.status(400).send({ error: 'Invalid albumId' });
    return;
  }

  try {
    const album = await albumFuncs.remove(albumId);

    if (!album) {
      return res.status(404).send({ error: 'Album not found' });
    }
    
    res.status(200).send({ albumId, deleted: true });
  } catch (err) {
    
    console.error(err);
    res.status(500).send({ error: 'Internal server error' });
  }
  });

export default router;
