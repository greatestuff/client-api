const redis = require("redis");

const client = redis.createClient(process.env.REDIS_URL)

const setJWT = async(key, value) => 
{
    try 
    {
        await client.set(key, value);
    } catch (error) {
        console.log("ERROR : " + error)
    }
}

const getJWT = async(key, value) => 
    {
        try 
        {
            const value = await client.get(key);
        } 
        catch (error) 
        {
            
        }
    }

module.exports = 
{
    setJWT,
    getJWT
}