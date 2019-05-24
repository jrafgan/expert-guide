const express = require('express');
const multer = require('multer');
const path = require('path');
const nanoid = require('nanoid');
const config = require('../config');
const Cocktail = require('../models/Cocktail');
const router = express.Router();
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const tryAuth = require('../middleware/tryAuth');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', tryAuth, async (req, res) => {
    try {
        let criteria = {user: req.query.user};
        let cocktails;

        if (req.query.user) {
            cocktails = await Cocktail.find(criteria);

            if (cocktails) return res.send(cocktails);
            else return res.sendStatus(404);
        } else {

            if (!req.user) {
                cocktails = await Cocktail.find({published: true});
            } else if (req.user.role === 'admin') {
                cocktails = await Cocktail.find();
            } else {
                cocktails = await Cocktail.find({published: true});
            }
            if (cocktails) return res.send(cocktails);
            else return res.sendStatus(500);
        }
    } catch (e) {
        return res.status(500).send(e);
    }
});

router.get('/:id', (req, res) => {

    const criteria = {_id: req.params.id};
    Cocktail.findOne(criteria).then(cocktail => {
        if (cocktail) res.send(cocktail);
        else res.sendStatus(404);
    }).catch(() => res.sendStatus(500));
});


router.post('/', [auth, upload.single('image')], (req, res) => {
    let cocktailData = req.body;
    try {
        cocktailData.ingredients = JSON.parse(req.body.ingredients);
    } catch (e) {
        console.log('this is error : ', e);

    }
    if (req.file) {
        cocktailData.image = req.file.filename;
    }
    cocktailData.user = req.user._id;

    const cocktail = new Cocktail(cocktailData);
    cocktail.save()
        .then(() => res.send({message: 'Ok'}))
        .catch(error => res.status(400).send(error));
});

router.post('/:id/toggle_published', [auth, permit('admin')], async (req, res) => {
    const cocktail = await Cocktail.findById(req.params.id);
    if (!cocktail) {
        return res.sendStatus(404);
    }
    cocktail.published = !cocktail.published;
    await cocktail.save();

    const cocktails = await Cocktail.find({user: req.user._id});
    return res.send(cocktails);
});

router.delete('/', [auth, permit('admin')], async (req, res) => {
    try {
        const id = req.query.id;
        const cocktail = await Cocktail.findById(id);

        if (cocktail) {
            await cocktail.remove();
            const coctails = await Cocktail.find();
            return res.status(200).send(coctails);
        } else {
            return res.status(400).send('Not found !');
        }

    } catch (error) {
        return res.status(400).send(error)
    }
});

module.exports = router;