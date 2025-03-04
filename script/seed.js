const faker = require("faker");
const {
  db,
  models: { User, Product, Cart },
} = require("../server/db/index.js");
// COMMENT
const seed = async () => {
  await db.sync({ force: true });
  console.log("db synced!");
  for (let i = 0; i <= 100; i++) {
    const newUser = await User.create({
      username: faker.internet.userName(),
      password: faker.internet.password(),
    });
    await Cart.create({userId : newUser.id});
    await Product.create({
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
      imageUrl: `https://source.unsplash.com/random/200x200?sig=${i}`,  
      quantity : Math.floor(Math.random() * 100),
      cartQuantity: 1   
    });
  }
  // await User.create({username: "admin", password: "12345", isAdmin: true })
  const admin = await User.create({username: "admin", password: "12345", isAdmin: true })
 await Cart.create({userId : admin.id});
};

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
