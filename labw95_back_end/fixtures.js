const mongoose = require('mongoose');
const config = require('./config');
const Cocktail = require('./models/Cocktail');
const User = require('./models/User');
const nanoid = require('nanoid');

const run = async () => {
    await mongoose.connect(config.dbUrl, config.mongoOptions);

    const connection = mongoose.connection;

    const collections = await connection.db.collections();

    for (let collection of collections) {
        await collection.drop();
    }

    const [user2, user1, admin] = await User.create(
        {
            username: 'stgqseykpp_1558629434@tfbnw.net',
            facebookId: '109980593577521',
            name: 'Mark Alcfifgdcadhf McDonaldman',
            password: '111aaa',
            role: 'user',
            token: nanoid(),
            image: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=109980593577521&height=50&width=50&ext=1561277553&hash=AeQt7Ybkjlpi2F6W'
        },
        {
            username: 'uprihrlnyi_1558631968@tfbnw.net',
            facebookId: '100938861158493',
            name: 'Dorothy Alcgbgacgbfgc Carrierowitz',
            password: '111aaa',
            role: 'user',
            token: nanoid(),
            image: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=100938861158493&height=50&width=50&ext=1561277235&hash=AeQeTINEFa7naa40'
        },
        {
            username: "tflvywzwyb_1558629443@tfbnw.net",
            facebookId: '110738913500997',
            name: 'Sophia Alcfidffgbfac Putnamson',
            password: '111aaa',
            role: 'admin',
            token: nanoid(),
            image: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=110738913500997&height=50&width=50&ext=1561276502&hash=AeS3ghBe7qSFIYCG'
        }
    );

    await Cocktail.create(
        {
            name: "Sparkling Red Grape Punch",
            recipe: "In a punch bowl or pitcher, combine Welch's 100% White Grape Juice, orange juice, red grapes, orange wedges, and lemon slices. Refrigerate the ingredients for 1 hour. Before serving, stir in Welch’s Sparkling Red Grape Juice Cocktail and lemon soda.,",
            ingredients: [
                {name: "Welch's 100% White Grape Juice1 ", amount: "2 cups"},
                {name: "Welch’s Sparkling Red Grape Juice Cocktail", amount: "1 bottle"},
                {name: "halved red grapes, for garnish", amount: "1 cup"},
                {name: "sliced lemon", amount: "1 pcs"},
                {name: "orange juice", amount: "1 cup"},
                {name: "lemon soda", amount: "1 bottle"},
                {name: "orange wedges", amount: "1/4 cup"},

                ],
            image: "red_grape_punch.jpg",
            published: true,
            user: user2._id
        },
        {
            name: "Killer Koolade",
            recipe: "Fill a tall glass with ice. Pour in melon liqueur and amaretto liqueur. Top with cranberry juice.",
            ingredients: [
                {name: "melon liqueur", amount: "3/4 fluid ounce"},
                {name: "amaretto liqueur", amount: "1/2 fluid ounce"},
                {name: "cranberry juice", amount: "4 fluid ounces"},
            ],
            image: "koolaid.jpg",
            published: true,
            user: user1._id
        },
        {
            name: "Pineapple Sunrise Mimosas",
            recipe: "\"These simple, sweet mimosas are great for brunch. For a virgin version, substitute club soda or citrus-flavored sparkling water for the prosecco, and use grenadine instead of Campari.\"",
            ingredients: [
                {name: "pineapple juice", amount: "4 1/2 cups"},
                {name: "lime uice", amount: "1/3 cup"},
                {name: "fresh pineaplle", amount: "4 sclices"},
            ],
            image: "mimosa.jpg",
            published: true,
            user: admin._id
        },
        {
            name: "Mojitos by the Pitcher",
            recipe: "\"I have served this to people who have sworn that they dislike mojitos and they love it. I believe it is the fresh ingredients and the use of sugar, instead of simple syrup, muddled together that makes this cocktail refreshing and delicious. It takes a little bit of work but the results are well worth it. Serve over ice.\"",
            ingredients: [
                {name: "white sugar", amount: "1/2 cup"},
                {name: "fresh mint", amount: "36 leaves"},
                {name: "quartered limes", amount: "3 pcs"},
                {name: "rum Bacardi", amount: "1 cup"},
                {name: "club soda", amount: "1 liter"},
            ],
            image: "mojito.jpg",
            user: admin._id
        },
        {
            name: "The REAL Long Island Iced Tea",
            recipe: "\"There are a few impostors out there that claim to be Long Island Iced Teas. In actuality, there is only one correct way to make a LIIT... and this is it!\"",
            ingredients: [
                {name: "vodka", amount: "1/2 fluid ounce"},
                {name: "rum", amount: "1/2 ounce"},
                {name: "gin", amount: "1/2 ounce"},
            ],
            image: "real_long_island.jpg",
            user: user2._id
        },
        {
            name: "Dill Pickle Bloody Mary",
            recipe: "\"Here's a twist on your usual Bloody Mary. This is enough for four drinks to share with your brunch buddies. Prepare them the night before serving for optimum flavor.\"",
            ingredients: [
                {name: "dill pickle juice", amount: "4 tablespoons"},
                {name: "sriracha salt", amount: "1 tablespoon"},
                {name: "celery seed", amount: "1 tablespoon"},
                {name: "ground black pepper", amount: "1/2 tablespoon"},
                {name: "vegetable juice (such as V8®)", amount: "4 cups "},
            ],
            image: "bloody_mary.jpg",
            user: user1._id
        },
    );

    return connection.close();
};

run().catch(error => {
    console.error('Something went wrong!', error);
});