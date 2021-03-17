// import 'crypto'

const MAX = 300;
const MIN = 1;
async function publishToIPFS() { 
  const msg = document.getElementById("msg").value;
  const release_date = document.getElementById("release_date").value;
  if (msg.length < MAX && msg.length > MIN){
    document.getElementById("out").innerHTML = "Deploying...";
    const ipfs = await Ipfs.create();
    const { cid } = await ipfs.add(msg);
    console.log(cid);
    console.log(release_date);
    document.getElementById("out").innerHTML = "Time capsule deployed to: " + cid;
    console.log(Object.keys(ipfs));
		ipfs.stop()
  } else{
    document.getElementById("out").innerHTML = "FAILED: Max character limit is " + MAX + " and minimum is " + MIN + ", your one was:\n" + msg.length.toString();
  }
}

