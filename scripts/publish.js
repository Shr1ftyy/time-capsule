// import 'crypto'

const MAX = 5000; // Max character count ~ 1000 words according to average word size
const MIN = 1; // The user must insert at least 1 character, otherwise it will not pass
async function publishToIPFS() { 
  const msg = document.getElementById("msg").value;
  const release_date = document.getElementById("release_date").value;
  if (msg.length < MAX && msg.length > MIN){
    document.getElementById("out").innerHTML = "Deploying...";
    const ipfs = await Ipfs.create();
    const { cid } = await ipfs.add(msg);
    console.log(cid);
    console.log(release_date);

    var database = firebase.database();

    document.getElementById("out").innerHTML = "Time capsule deployed to: " + cid;
    console.log(Object.keys(ipfs));
		ipfs.stop()
  } else{
    document.getElementById("out").innerHTML = "FAILED: Max character limit is " + MAX + " and minimum is " + MIN + ", your one was:\n" + msg.length.toString();
  }
}

function writeCapsule(msg, date, time) { 
  firebase.database().ref('users/' + userId).set({
    msg: msg,
    date: date,
    time : time,
  });
  }
}
