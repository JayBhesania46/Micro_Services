import { bandFuncs } from '../data/index.js'
import {Router} from 'express'
import { ObjectId } from 'mongodb'
const router = Router();

router


  .route('/')
  .get(async (req, res) => {
    try {
      const bands = await bandFuncs.getAll();
      const formattedBands = bands.map(({ _id, name }) => ({ _id, name }));
      res.status(200).json(formattedBands);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  })


  .post(async (req, res) => {
    let data = req.body;

    // Check if all required fields are present and have valid values
    if (!data.name || !data.genre || !data.website || !data.recordCompany || !data.groupMembers || !data.yearBandWasFormed) {
      return res.status(400).send('All fields are required');
    }
  
    // Check that fields have correct types and formats
    if (typeof data.name !== 'string' || !data.name.trim()) {
      return res.status(400).send('Invalid name');
    }
    if (typeof data.website !== 'string' || !/^(http:\/\/www\.).+(.com)$/.test(data.website)) {
      return res.status(400).send('Invalid website format');
    }
    if (typeof data.recordCompany !== 'string' || !data.recordCompany.trim()) {
      return res.status(400).send('Invalid record company');
    }
    if (!Array.isArray(data.genre) || !data.genre.every(g => typeof g === 'string' && g.trim())) {
      return res.status(400).send('Invalid genre');
    }
    if (!Array.isArray(data.groupMembers) || !data.groupMembers.every(m => typeof m === 'string' && m.trim())) {
      return res.status(400).send('Invalid group members');
    }
    if (typeof data.yearBandWasFormed !== 'number' || data.yearBandWasFormed < 1900 || data.yearBandWasFormed > new Date().getFullYear()) {
      return res.status(400).send('Invalid year formed');
    }
  
    // Create band and return it
    const band =await bandFuncs.create(data.name.trim(), data.genre.map(genre => genre.trim()), data.website.trim(), data.recordCompany.trim(), data.groupMembers.map(groupMembers => groupMembers.trim()), data.yearBandWasFormed);
    return res.status(200).json(band);
  })


router

  .route('/:id')
  .get(async (req, res) => {
    try {
      let id = req.params.id;
      if (!ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Invalid ID' });
        return;
      }
      const band = await bandFuncs.get(id);
      if (!band) {
        res.status(404).json({ message: 'Band not found' });
        return;
      }
      res.status(200).json(band)
    }
      catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  })


  .delete(async (req, res) => {
    try {
      let id = req.params.id;
  
      // Check if id is a valid ObjectId
      
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid id format' });
      }
  
      // Check if band exists
      const band = await bandFuncs.get(id);
      
      if (!band) {
        return res.status(404).json({ message: 'Band not found' });
      }
  
      // Delete band
      await bandFuncs.remove(id);
      res.status(200).json({ bandId: id, deleted: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  })
  .put(async (req, res) => {
    let data = req.body;

    try {
      const id = req.params.id;
      
      if (!ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Invalid ID' });
        return;
      }
      const band = await bandFuncs.get(id);

      if (!band) {
        res.status(404).json({ message: 'Band not found' });
        return;
      }
      const band1 = await bandFuncs.update(data.id, data.name.trim(), data.genre.map(genre => genre.trim()), data.website.trim(), data.recordCompany.trim(), data.groupMembers.map(groupMembers => groupMembers.trim()), data.yearBandWasFormed);
      
      if (!band) {
        res.status(404).json({ message: 'Band not found' });
        return;
      }
      res.status(200).json({
        _id: band._id.toString(),
        name: band.name,
        genre: band.genre,
        website: band.website,
        recordCompany: band.recordCompany,
        groupMembers: band.groupMembers,
        yearBandWasFormed: band.yearBandWasFormed,
        albums: band.albums,
        overallRating: band.overallRating,
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    } 
  });

  export default router;