// import 'crypto'

const MAX = 5000; // Max character count ~ 1000 words according to average word size
const MIN = 1; // The user must insert at least 1 character, otherwise it will not pass
async function publishToIPFS() { 
  const msg = document.getElementById("msg").value;
  const release_date = document.getElementById("release_date").value;
  const release_time = document.getElementById("release_time").value;
  if (release_date.toString().length < 1 || release_time.toString().length < 1){
    document.getElementById("out").innerHTML = "You must fill out all fields" 
		ipfs.stop()
    return
  }
  if (msg.length < MAX && msg.length > MIN){
    document.getElementById("out").innerHTML = "Deploying...";
    const ipfs = await Ipfs.create();
    const { cid } = await ipfs.add(msg);
    console.log(cid);
    console.log(release_date);
    writeCapsule(msg, release_date, release_time)

    document.getElementById("out").innerHTML = "Time capsule deployed to: " + cid;
    console.log(Object.keys(ipfs));
		ipfs.stop()
  } else{
    document.getElementById("out").innerHTML = "FAILED: Max character limit is " + MAX + " and minimum is " + MIN + ", your one was:\n" + msg.length.toString();
  }
}

function writeCapsule(msg, date, time) { 
  var db = firebase.database();
  db.ref('private_capsules/' + Date.now().toString()).set({
    msg: msg,
    date: date,
    time : time,
  });
}
