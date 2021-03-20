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

async function publishToRop() { 
	rpc = "https://mainnet.infura.io/v3/d0b2f9d7a7c9458399c4a57063893105"
  //compiled version of ../contracts/Capsule.sol
  contract = "608060405234801561001057600080fd5b506040518060400160405280600381526020017f6c6f6c00000000000000000000000000000000000000000000000000000000008152506000908051906020019061005c9291906100a3565b5033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506101a7565b8280546100af90610146565b90600052602060002090601f0160209004810192826100d15760008555610118565b82601f106100ea57805160ff1916838001178555610118565b82800160010185558215610118579182015b828111156101175782518255916020019190600101906100fc565b5b5090506101259190610129565b5090565b5b8082111561014257600081600090555060010161012a565b5090565b6000600282049050600182168061015e57607f821691505b6020821081141561017257610171610178565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b610297806101b66000396000f3fe6080604052600436106100225760003560e01c8063ce6d41de1461002e57610029565b3661002957005b600080fd5b34801561003a57600080fd5b50610043610059565b604051610050919061017e565b60405180910390f35b6060600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146100b557600080fd5b600080546100c2906101ef565b80601f01602080910402602001604051908101604052809291908181526020018280546100ee906101ef565b801561013b5780601f106101105761010080835404028352916020019161013b565b820191906000526020600020905b81548152906001019060200180831161011e57829003601f168201915b5050505050905090565b6000610150826101a0565b61015a81856101ab565b935061016a8185602086016101bc565b61017381610250565b840191505092915050565b600060208201905081810360008301526101988184610145565b905092915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156101da5780820151818401526020810190506101bf565b838111156101e9576000848401525b50505050565b6000600282049050600182168061020757607f821691505b6020821081141561021b5761021a610221565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000601f19601f830116905091905056fea2646970667358221220c76b6bcb2c8184e71567119d18774b3187f99edadac7bfc3dd60c601e28a8e9564736f6c63430008020033"
  let w3 = new Web3(rpc)

  // estimate gas price of contract deployment
  gas = w3.eth.estimateGas({'data':contract})
        .then(estimate=>console.log(estimate))
        .catch(err=>console.log(err))

  const msg = document.getElementById("msg").value;
  const release_date = document.getElementById("release_date").value;
  const release_time = document.getElementById("release_time").value;
  if (release_date.toString().length < 1 || release_time.toString().length < 1){
    document.getElementById("out").innerHTML = "You must fill out all the fields" 
    return
  }
  if (msg.length < MAX && msg.length > MIN){
    document.getElementById("out").innerHTML = "Sign the transaction to continue\nPayment " 
    document.getElementById("out").innerHTML = "Deploying...";

    document.getElementById("out").innerHTML = "Time capsule deployed to: " + cid;
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

