const CHAINS = {"0x3":"Ropsten"};
function updateInfo(){
  if (!document.querySelector('.sendButton')){
    var sendBtnElement = document.createElement("BUTTON");
    sendBtnElement.className = "sendButton"
    sendBtnElement.onclick = publishToRop();
    var buttonParent = document.getElementById("sendDiv");
    buttonParent.appendChild(sendBtnElement);
  }

	const ethereumButton = document.querySelector('.enableEthereumButton');
  const sendButton = document.querySelector('.sendButton');

  //Will Start the metamask extension
  console.log("Requesting acct..");
  ethereum.request({ method: 'eth_requestAccounts' });
  //  <button id="publish_btn" onclick="publishToRop()">Publish to Ropsten</button> 
  var chainID = ethereum.chainId; 
  var acct = ethereum.selectedAddress; 
  if (Object.keys(CHAINS).includes(chainID)){
    ethereumButton.innerHTML = "Connected";
    sendButton.innerHTML = "Publish to " + CHAINS[chainID];
    info.innerHTML = "selected account: " + acct;
    console.log("set")
  } else{
    ethereumButton.innerHTML = "This chain is not supported";
    sendButton.remove()
    info.innerHTML = "This chain is not supported";
  }
}

