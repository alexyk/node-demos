log = console.log;

let cache = {};
let cacheCalls = 0;
let logCaching = false; // set to true if fib(10) or less is called

const memo = (func) => function() {
  let key;

  // TODO: Experiment with these
  // arguments.map(arg => key += (typeof(arg) == 'object' ? JSON.stringify(arg) : String(arg)));
  try {
    key = JSON.stringify(arguments);
  } catch(error) {
    //log(`No caching for ${arguments}`)
    // log(`No caching for ${arguments && arguments.join(`,`)} : 'n/a`)
  }

  if (key && cache[key]) {
    return cache[key];
  } else {
    let res = func.apply(null, arguments);
    if (logCaching) {
      log(`${arguments[0]} -> cached... -> ${res}`);
    }

    // Caching
    cache[key] = res;

    return res;
  }
}

const fib = memo(function(n) {
  if (n < 2){
    return 1;
  } else {
    let res = fib(n-2) + fib(n-1);
    return res;
  }
});

function timeToStr(valueImMS) {
  var asString = '';

  let timeFuncFactory = (div,txt) => 
    (val) => {
      let isMinimum = (div == 1);
      let res = val;
      let cur = (val > div ? val % div : 0);
      if ((val > 0 && cur > 0) || isMinimum) {
        if (isMinimum) {
          asString =`${val}${txt}`;
        } else {
          asString =`${cur}${txt} ${asString}`;
          res = (val-cur);
        }
      }

      // debug
      //log(`x${div}:${txt} ,  ${val}/${cur} -> ${res} / ${asString}`)
      return res;
    }

  let msec = timeFuncFactory(1,'ms')
  let sec = timeFuncFactory(1000,'s')
  let min = timeFuncFactory(1000*60,'m')
  let hr = timeFuncFactory(1000*60*60,'h')
  hr(min(sec(msec(valueImMS))))

  // return `${asString} / ${valueImMS}`;
  return asString;
}

const getTime = () => new Date().getTime();

function fibWrap(value) {
  cacheCalls = 0;
  logCaching = (value <= 10)
  let timeRecord = [];

  // execution START
  log(`\n------ Calling Fibonacci for ${value} ------`)
  let time = getTime()

  let oldCacheCount = Object.keys(cache).length;
  let res = fib(value)

  time = getTime() - time
  // execution END
  
  const timeStr = timeToStr(time);
  const before = oldCacheCount;
  const after = Object.keys(cache).length;
  const cacheStr = (before == after ? `${before} (no change)` : `${before} -> ${after}`);
  let bestTime = timeRecord[value];
  if (bestTime == null) bestTime = -1;
  // for (let u=value+2000; u < value-2000 && u>=0; u--) {
  //   if (u != value && timeRecord[u] != null) {
  //     bestTime = timeRecord[u];
  //   }
  // }
  
  log(`Result: ${res}`);
  log(`Time: ${timeStr}` + (time < bestTime ? ` (${Math.round(bestTime/time)}x improved` : '')); //TODO: Fix best time improvements not being printed
  log(`Cache Size: ${cacheStr}`);

  if (bestTime > time) timeRecord[value] = time;
}


console.clear()
fibWrap(10)
fibWrap(20)
// for (let i = 7830; i < 19000; i++)
  // fibWrap(i)

  // TODO: Investigate reaching call stack max here
fibWrap(7832)
fibWrap(7850) // if this is before the pervious - the call stack max is reached

// fibWrap(200000)
// fibWrap(9898724542534252345)
fibWrap(45)
fibWrap(7832)
fibWrap(4500)
log("\n")
