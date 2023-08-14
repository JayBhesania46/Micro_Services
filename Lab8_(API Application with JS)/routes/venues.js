//Import express and express router as shown in lecture code and worked in previous labs
//You can make your axios calls to the API directly in the routes

import express from "express";
const router = express.Router();
import axios from 'axios'


router.route('/')
.get(async (req, res) => {
  try {

    res.render('homepage', {title: "Venue Finder", header: "Venue Finder"});
} catch (e) {
    
    res.status(400).json({ error: e });
}
});


router.route('/searchvenues')
.post(async (req, res) => {

    const apikey = 'gjBrlW5hKIX4qaBM3xAKYcfojH0GEGCn';
    const sTerm  = req.body.vname;
try {
    const venueList = await axios.get(`https://app.ticketmaster.com/discovery/v2/venues?keyword=${sTerm}&apikey=${apikey}&countryCode=US`)  
   
    const firstTen = []
    const vList = venueList.data._embedded.venues

    for(let i =0; i<10; i++)
    {
        firstTen.push(vList[i])
    }

    res.render('venueSearchResults', {title: "Venues Found", header: "Venues Found", term: req.body.vname, venues: firstTen});
} catch (e) {

    res.status(500).json({ error: e });
}
});


router.route('/venuedetails/:id')
.get(async (req, res) => {
    const vid = req.params.id;
    const apikey = 'gjBrlW5hKIX4qaBM3xAKYcfojH0GEGCn';
  try {
    const venueDetail = await axios.get(`https://app.ticketmaster.com/discovery/v2/venues/${vid}?&apikey=${apikey}&countryCode=US`)

    venueDetail.data.images = venueDetail.data.images || [{url: "/public/images/No_Image_Available.jpg"}]

    const imgUrl = venueDetail.data.images[0].url

    res.render('venueByID', {title: 'Venue Details', venue: venueDetail.data, imgUrl: imgUrl});
} catch (e) {
    
    return res.status(404).render('error', {title: "Error", error: "A venue with that ID could not be found."});
}
});


export default router;
