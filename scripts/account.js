export function getAccount(){
	const ethereumButton = document.querySelector('.enableEthereumButton');
	ethereumButton.addEventListener('click', () => {
		//Will Start the metamask extension
		console.log("Requesting acct..");
		window.ethereum.request({ method: 'eth_requestAccounts' });
		//  <button id="publish_btn" onclick="publishToRop()">Publish to Ropsten</button> 
		if (configChains.includes(chainID)){
			var btn = document.createElement("BUTTON");
			var chainID  = parseInt(window.ethereum.chainId);
			ethereumButton.innerHTML = configChains[chainID];
			document.getElementById("out").innerHTML = "This chain is not supported";
		} else{
			document.getElementById("out").innerHTML = "This chain is not supported";
		}
	});
}

