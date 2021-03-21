// import 'crypto'
//NOTE - Timestamps are based off of UTC timezone

const MAX = 5000; // Max character count ~ 1000 words according to average word size
const MIN = 1; // The user must insert at least 1 character, otherwise it will not pass
//The Function Below To Encrypt Text
const encryptWithAES = (text, passphrase) => {
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};
//The Function Below To Decrypt Text
const decryptWithAES = (ciphertext, passphrase) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

async function publishToIPFS() { 
  const msg = document.getElementById("msg").value;
  const pass = document.getElementById("pass").value;
  const release_date = document.getElementById("release_date").value;
  const release_time = document.getElementById("release_time").value;


  var now = new Date;
  var min_timestamp = new Date().getTime()
    // minimum timestamp required : 5 minutes
  min_timestamp += 5 * 60 * 1000;
  rel_date = release_date.split("-");
  rel_time = release_time.split(":");

  
  console.log("release_date: ", release_date);
  const release_timestamp = Date.UTC(parseInt(rel_date[0]), parseInt(rel_date[1])-1, parseInt(rel_date[2]),
                                    parseInt(rel_time[0]), parseInt(rel_time[1]), 0, 0);
  console.log("release: ", release_timestamp);
  console.log("min: ", min_timestamp);


  const encryptText = encryptWithAES(msg, pass); 
  let decryptText = decryptWithAES(encryptText, pass);

  console.log("enc:" + encryptText);
  console.log("dec:" + decryptText);

  const ipfs = await Ipfs.create();
  if (release_date.toString().length < 1 || release_time.toString().length < 1){
    document.getElementById("out").innerHTML = "You must fill out all fields" 
		ipfs.stop()
    return
  }
  
  if (release_timestamp <= min_timestamp){
    document.getElementById("out").innerHTML = "The time capsule cannot be opened in less than 5 minutes after it's deployment" 
		ipfs.stop()
    return
  }

  if (msg.length < MAX && msg.length > MIN){
    document.getElementById("out").innerHTML = "Deploying...";
    const { cid } = await ipfs.add(encryptText);
    console.log(cid.toString());
    console.log(release_date, release_time);

    writeCapsule(encryptText, cid.toString(), pass, release_timestamp);

    document.getElementById("out").innerHTML = "Encrypted time capsule deployed to: " + cid;
    console.log(Object.keys(ipfs));
		ipfs.stop()
  } else{
    document.getElementById("out").innerHTML = "FAILED: Max character limit is " + MAX + " and minimum is " + MIN + ", your one was:\n" + msg.length.toString();
  }
}

// displays public capsules
async function dispPubCap() {
  var ipfs = await Ipfs.create();
  var now = new Date;
  var utc_timestamp = Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate() , 
      now.getUTCHours(), now.getUTCMinutes(), 0, 0);
  var db = firebase.firestore();
  priv_capsules = db.collection('/private_capsules');
  var query = undefined;

  await priv_capsules.where("timestamp", "<", utc_timestamp)
    .get()
    .then((querySnapshot) => { query = {}
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            query[doc.id.toString()] = doc.data()
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

    if (Object.keys(query).length < 1){
      ipfs.stop();
      console.log('nothing found');
      return;
    } 

    var stopped = false;
    // yuck, might need to change some stuff here later :C
    Object.values(query).forEach(async (data)=>{
      const table = document.getElementById('pub_cap');
      var row = table.insertRow();
      var cell0 = row.insertCell(0);
      var cell1 = row.insertCell(1);
      var dec = decryptWithAES(data.msg, data.pass);
      cell0.innerHTML = dec.toString().slice(0,20) + "...";
      var { cid } = await ipfs.add(dec);
      cell1.innerHTML = "https://gateway.ipfs.io/ipfs/" + cid;
      ipfs.stop();
    });

}

function writeCapsule(msg, hash, pass, timestamp) { 
  var db = firebase.firestore();
  db.collection('private_capsules/').add({
    msg: msg,
    hash: hash,
    pass: pass,
    timestamp: timestamp,
  }).then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
    console.error("Error adding document: ", error);
});

}



// PUBLISHING ON ETH - WIP



// function publishToRop() { 
//   console.log("Publishing..");
// 	rpc = "https://mainnet.infura.io/v3/d0b2f9d7a7c9458399c4a57063893105";
//   fetch('contracts/Capsule.sol')
//   .then(response => response.text())
//   .then((data) => {
//     console.log(data);
//     contract = data;
//   });

//   //bytecode of ../contracts/Capsule.sol

//   BrowserSolc.loadVersion("soljson-v0.7.2-nightly.2020.9.25+commit.b34465c5.js", function(compiler) {
//     optimize = 1;
//     result = compiler.compile(contract, optimize);
//     console.log(result);
//   });
//   var bytecode = result;
//   let w3 = new Web3(rpc);

//   // estimate gas price of contract deployment
//   gas = w3.eth.estimateGas({'data':bytecode}).then((c)=>{console.log(c);
//         opGas=c});

//   checkParams();

// }

// function checkParams(){
//   const msg = document.getElementById("msg").value;
//   const release_date = document.getElementById("release_date").value;
//   const release_time = document.getElementById("release_time").value;
//   if (release_date.toString().length < 1 || release_time.toString().length < 1){
//     document.getElementById("out").innerHTML = "You must fill out all the fields" 
//     return false
//   }
//   if (msg.length < MAX && msg.length > MIN){
//     return true
//   } else{
//     return false
//   }

// }

