const config = require('./config')
const twit = require('twit')

const T = new twit(config)

function retweet(){
    // Params to be passed to the 'search/tweets' API endpoint
    let params = {
        q : searchText + '',
        result_type : 'mixed',
        count : 25,
    }

    T.get('search/tweets', params, function(err_search, data_search, response_search){

        let tweets = data_search.statuses
        if (!err_search)
        {
            let tweetIDList = []
            for(let tweet of tweets) {
                tweetIDList.push(tweet.id_str);

                //more code here later...
            }

            // Call the 'statuses/retweet/:id' API endpoint for retweeting EACH of the tweetID
            for (let tweetID of tweetIDList) {
                T.post('statuses/retweet/:id', {id : tweetID}, function(err_rt, data_rt, response_rt){
                    if(!err_rt){
                        console.log("\n\nRetweeted! ID - " + tweetID)
                    }
                    else {
                        console.log("\nError... Duplication maybe... " + tweetID)
                        console.log("Error = " + err_rt)
                    }
                })
            }
        }
        else {
            console.log("Error while searching" + err_search)
            process.exit(1)
        }
    })
}

//Avoid duplacting tweet
if(tweet.text.startsWith("RT @")){
    if(tweet.retweeted_status){
        tweetIDList.push(tweet.retweeted_status.id_str);
    }else{
        tweetIDList.push(tweet.id_str);
    }
}else{
    tweetIDList.push(tweet.idStr);
}

// Utility function - Gives unique elements from an array
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

// Get only unique entries
tweetIDList = tweetIDList.filter( onlyUnique )



// Run every 60 seconds
setInterval(function() { retweet('#DataScience OR #DataVisualization'); }, 60000)
