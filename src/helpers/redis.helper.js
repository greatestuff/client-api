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

const getJWT = async(key) => 
{
            return new Promise((resolve, reject) => {
                try 
                {
                    client.get(key, function (err, res) {

                        if(err){ reject(err); }
                        resolve(res)

                    });
                } 
                catch (error) 
                {
                    console.log(error)
                    reject(err);
                }
            })
            

            //console.log("Value  : " + value)
        
}

const deleteAccessJWT = async(key) => 
{
                return new Promise((resolve, reject) => {
                    try 
                    {
                        if(key)
                        {
                            client.del(key, function (err, res) {
    
                                if(err){ reject(err); }
                                resolve(res)
        
                            });
                        }
                        
                    } 
                    catch (error) 
                    {
                        console.log(error)
                        reject(err);
                    }
                })
                
    
                //console.log("Value  : " + value)
            
}

module.exports = 
{
    setJWT,
    getJWT,
    deleteAccessJWT
}