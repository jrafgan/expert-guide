const express = require('express');
const nanoid = require('nanoid');
const Track = require('../models/Track');
const Album = require('../models/Album');
const router = express.Router();
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const tryAuth = require('../middleware/tryAuth');


router.get('/', tryAuth, async (req, res) => {

    try {
        let criteria = {album: req.query.album};

        if (!req.user) {
            criteria = {
                $and: [
                    {published: true},
                    {album: req.query.album}
                ]
            }
        }
        if (req.query.album) {
            let tracks = await Track.find(criteria).populate('album').sort({number: 1});

            if (req.user && req.user.role === 'admin') {
                return res.send(tracks);
            }

            const result = [];
            tracks.map(track => {
                if (track.published === false && track.user.equals(req.user._id) || track.published === true) result.push(track);
            });

            if (result) return res.send(result);
            else return res.sendStatus(404);
        } else {
            const tracks = await Track.find().populate('album');

            if (tracks) return res.send(tracks);
            else return res.sendStatus(500);
        }
    } catch (e) {
        return res.status(500).send(e);
    }
});

// router.get('/', async (req, res)=>{
//    try {
//        const albums = await Album.find();
//
//        const trackCounts = await Track.aggregate([{$group: {_id: '$album', count: {$sum: 1}}}]); //здесь '$album' являеться полем, это значит группировать по ID полей album
//        console.log('this is productCounts ', trackCounts);
//
//        const albumsWithCount = albums.map(album=>{
//             const categoryCount = trackCounts.find(pc=>pc._id.equals(album._id)).count;
//           return {
//               ...album.toObject(),
//               count: categoryCount
//           }
//        });
//        res.send(albumsWithCount);
//    }  catch (e) {
//        res.sendStatus(500);
//    }
// });

router.post('/', auth, async (req, res) => {
    try {
        const trackData = req.body;
        trackData.user = req.user;

        let tracks = await Track.find({album: req.body.album}).sort({number: 1});
        trackData.number = tracks.length + 1;

        console.log('this is tracks ', tracks.length);

        const track = new Track(trackData);
        await track.save();
        res.send({message: 'Ok'});
    } catch (e) {
        res.status(400).send(e);
    }

});

router.post('/:id/toggle_published', [auth, permit('admin')], async (req, res) => {
    const track = await Track.findById(req.params.id);
    if (!track) {
        return res.sendStatus(404);
    }
    track.published = !track.published;
    await track.save();
    const tracks = await Track.find();
    return res.send(tracks);
});

router.delete('/', [auth, permit('admin')], async (req, res) => {
    try {
        const track = await Track.findById(req.query.id);

        if (track) {
            await track.remove();
            const tracks = await Track.find();
            return res.status(200).send(tracks);
        } else {
            return res.status(400).send('Not found !');
        }

    } catch (error) {
        return res.status(400).send(error)
    }
});


module.exports = router;
