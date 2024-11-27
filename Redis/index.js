import express from "express";
import redis from 'redis'

const app = express();
const port = 3000;

//create redis client
let redisClient
(
    async () => {
        redisClient = redis.createClient();
        await redisClient.connect();
        console.log("Redis client connected");
        redisClient.on("error", (err) => {
            console.log("Redis Client Error", err);
        });
        redisClient.on("ready", () => {
            console.log("Redis client ready");
        });
    }
)()

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// expensive db call without redis, response time: 14.22s
app.get("/calculate-data", (req, res) => {
    try {
        let calculateData = 0
        for (let i = 0; i < 10000000000; i++) {
            calculateData += i;
        }

        res.json({
            calculateData,
        });
    } catch (error) {
        console.log(error);
    }
})

// expensive db call with redis
app.get("/redis-calculate-data", async (req, res) => {
    try {
        let calculateData = 0

        //check if data is already cached in redis
        const cachedData = await redisClient.get("calculateData");
        console.log("cachedData", cachedData);
        if (cachedData) {
            return res.json({
                calculateData: parseInt(cachedData),
            });
        }

        for (let i = 0; i < 10000000000; i++) {
            calculateData += i;
        }

        //set data in redis
        await redisClient.set("calculateData", calculateData);

        res.json({
            calculateData,
        });
    } catch (error) {
        console.log(error);
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});