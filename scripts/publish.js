// import 'crypto'

const MAX = 300;
const MIN = 1;
async function publish() { 
  const msg = document.getElementById("msg").value;
  if (msg.length < MAX && msg.length > MIN){
    const ipfs = await Ipfs.create();
    const { cid } = await ipfs.add(msg);
    console.log(cid);
    document.getElementById("out").innerHTML = "Time capsule deployed to: " + cid;
  } else{
    document.getElementById("out").innerHTML = "FAILED: Max character limit is " + MAX + " and minimum is " + MIN + ", your one was:\n" + msg.length.toString();
  }
}

