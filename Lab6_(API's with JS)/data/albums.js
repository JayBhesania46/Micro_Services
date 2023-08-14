import { ObjectId } from 'mongodb';
import { bands } from '../config/mongoCollections.js';

export const create = async (bandId, title, releaseDate, tracks, rating) => 
{
  if (!bandId || typeof bandId !== 'string') 
    throw Error('Invalid band ID');
  if (!title || typeof title !== 'string') 
    throw Error('Invalid album title');
  if (!releaseDate || isNaN(Date.parse(releaseDate))) 
    throw Error('Invalid release date');
  if (!Array.isArray(tracks) || tracks.length < 3) 
    throw Error('Invalid tracks');
  if (!rating || isNaN(parseInt(rating)) || rating < 0 || rating > 5) 
    throw Error('Invalid rating');

  const bandCollection = await bands();

  const newAlbum = {
    _id: new ObjectId(),
    title,
    releaseDate,
    tracks,
    rating
  };

  const addAlbum = await bandCollection.updateOne
  ( { _id: new ObjectId(bandId),albums: {$not:{$elemMatch:{title}}}},{ $addToSet: { albums: newAlbum } });
  if (addAlbum.modifiedCount === 0) {
    throw Error(`Could not create and add album to the band with the ID of ${bandId}`);
  }
  let temp=await bandCollection.findOneAndUpdate({_id: new ObjectId(bandId)});
  let tempRating=0;
  let tempavg=0;
  if(temp["albums"].length>0)
  {
    for(let rate of temp["albums"])
    {
      tempavg=tempavg + rate["rating"];
    }
    tempRating= Number((tempavg/temp["albums"].length).toFixed(1));
  }

  const updateOverallRating = await bandCollection.updateOne(
    { _id: new ObjectId(bandId) },
    [{ $set: { overallRating: tempRating } }]
  );

  if (updateOverallRating.modifiedCount === 0) {
    throw Error(`Could not update the overall rating of the band with the ID of ${bandId}`);
  }

  const band = await bandCollection.findOneAndUpdate({ _id: new ObjectId(bandId) });

  if (band === null) {
    throw Error(`There is no band with the ID of ${id}`);
  }

  return band;
}


export const getAll = async (bandId) => 
{
  if (!bandId || typeof bandId !== 'string') 
    throw Error('Invalid band ID');

  const bandCollection = await bands();
  const albumList = await bandCollection.findOne(
    { _id: new ObjectId(bandId) },
    { projection: { _id: 0, albums: 1 } }
  );

  if (!albumList || albumList.albums.length === 0) {
    throw Error(`Could not get all albums from the band with the ID of ${bandId}`);
  }

  return albumList.albums;    
};


export const get = async (albumId) => 
{
  if (!albumId || typeof albumId !== 'string') 
    throw Error('Invalid album ID');

  const bandCollection = await bands();

  const album = await bandCollection.findOne(
    { 'albums._id': new ObjectId(albumId) },
    { projection: { _id: 0, albums: { $elemMatch: { _id: new ObjectId(albumId) } } } }
  );

  if (!album) 
    throw Error(`There is no album with the ID of ${albumId}`);

  return album.albums[0];
}


export const remove = async (albumId) => 
{
  if (!albumId || typeof albumId !== 'string') 
    throw Error('Invalid album ID');

  const bandCollection = await bands();

  const bandWithAlbum = await bandCollection.findOne({ 'albums._id': new ObjectId(albumId) }, { projection: { _id: 1 } });
  if (!bandWithAlbum) 
    throw Error(`Could not find album with the ID of ${albumId}`);

  const bandId = bandWithAlbum._id.toString();

  const removeAlbum = await bandCollection.updateOne({ 'albums._id': new ObjectId(albumId) }, { $pull: { albums: { _id: new ObjectId(albumId) } } });
  if (removeAlbum.modifiedCount === 0) 
    throw Error(`Could not remove the album with the ID of ${albumId} from the band with the ID of ${bandId}`);
    let temp=await bandCollection.findOne({_id: new ObjectId(bandId)});
    let tempRating=0;
    let tempavg=0;
    if(temp["albums"].length>0)
    {
      for(let rate of temp["albums"])
      {
        tempavg=tempavg + rate["rating"];
      }
      tempRating= Number((tempavg/temp["albums"].length).toFixed(1));
    }
  const updateOverallRating = await bandCollection.updateOne({ _id: new ObjectId(bandId) }, [{ $set: { overallRating:tempRating } }]);
  if (updateOverallRating.modifiedCount === 0) 
    throw Error(`Could not update the overall rating of the band with the ID of ${bandId}`);

  return { albumId, deleted: true };
}

export default   
{
    create,
    get,
    getAll,
    remove
};
