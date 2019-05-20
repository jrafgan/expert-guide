const express = require('express');
const History = require('../models/TrackHistory');
const router = express.Router();
const auth = require('../middleware/auth');
const Track = require('../models/Track');
const Album = require('../models/Album');
const Artist = require('../models/Artist');

router.get('/', auth, async (req, res) => {
    try {
        const history  = await History.find().sort({datetime: -1});
        res.send(history);
    } catch (e) {
        res.sendStatus(500);
    }

});

router.post('/', auth, async (req, res) => {
        console.log('this is req body trackId: ', req.body.trackId);
    try {
        const track = await Track.findById(req.body.trackId);
        console.log('this is track : ', track);
        const album = await Album.findById(track.album);
        console.log('this is album : ', album);
        const artist = await Artist.findById(album.artist);
        console.log('this is artist : ', artist);

        const historyData = req.body;
        // historyData.date();
        historyData.artistName = artist.name;
        historyData.trackTitle = track.title;
        console.log('history data ', historyData);
        const history = new History(historyData);
        console.log('this is history ', history);
        await history.save();
        res.status(200).send(history);

    } catch (e) {
        console.log(e);
        return res.status(400).send(e)
    }

});

module.exports = router;