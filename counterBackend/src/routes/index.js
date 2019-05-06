import express from 'express';
import Frequency from '../config/model';
const router = express.Router();

router.get('/getdata', async (req, res) => {
  try {
    let data = await Frequency.find().sort({date: -1});
    if (data.length > 0) {
      // console.log(data);
      return res.status(200).json(data);
    } else {
      return res.status(400).json();
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ err: error });
  }
});

router.post('/postdata', async (req, res) => {
  try {
    let string = (req.body.data).toLowerCase();
    let pattern = /\w+/g,

    matchedWords = String(string).match( pattern );
    // console.log(matchedWords ,"words");

/* The Array.prototype.reduce method assists us in producing a single value from an
   array. In this case, we're going to use it to output an object with results. */
let counts = matchedWords.reduce(function ( stats, word ) {

    /* `stats` is the object that we'll be building up over time.
       `word` is each individual entry in the `matchedWords` array */
    if ( stats.hasOwnProperty( word ) ) {
        /* `stats` already has an entry for the current `word`.
           As a result, let's increment the count for that `word`. */
        stats[ word ] = stats[ word ] + 1;
    } else {
        /* `stats` does not yet have an entry for the current `word`.
           As a result, let's add a new entry, and set count to 1. */
        stats[ word ] = 1;
    }

    /* Because we are building up `stats` over numerous iterations,
       we need to return it for the next pass to modify it. */
    return stats;

}, {} );

/* Now that `counts` has our object, we can log it. */

Object.keys(counts).forEach(async (element, i) =>{
// console.log(element , counts[element]);

let data = await Frequency.findOne({word : element});
if(data) {
  let newcounts = counts[element] + data.count;
  let newData = await Frequency.findOneAndUpdate({word : element}, {$set :{ count :newcounts}  });
}else {
  const frequency = await Frequency.create({
    word: element,
    count: counts[element]
});
}
// console.log(Object.keys(counts).length, i);
if(Object.keys(counts).length === i+1){
  // console.log(Object.keys(counts).length , i, true);
    let dataxx = await Frequency.find().sort({date: -1});
// console.log(dataxx);
return res.status(200).json(dataxx);
}
else{
  // console.log(Object.keys(counts).length , i, false);
}
}
);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: error });
  }
});


module.exports = router;
