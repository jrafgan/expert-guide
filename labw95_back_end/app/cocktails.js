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

    console.log(req.query.user);

    try {
        let criteria = {user: req.query.user};

        if (!req.user) {
            criteria = {published: true}
        }

        if (req.query.user) {

            let cocktails = await Cocktail.find(criteria);

            if (req.user && req.user.role === 'admin') {
                return res.send(cocktails);
            }
            const result = [];
            cocktails.map(cocktail => {
                if (cocktail.published === false && cocktail.user.equals(req.user._id) || cocktail.published === true) result.push(cocktail);
            });

            if (result) return res.send(result);
            else return res.sendStatus(404);
        } else {
            const cocktails = await Cocktail.find();
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
    const cocktailData = req.body;

    if (req.file) {
        cocktailData.image = req.file.filename;
    }
    cocktailData.user = req.user;
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
    const cocktails = await Cocktail.find();
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