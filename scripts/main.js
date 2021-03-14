requirejs.config({
  //By default load any module IDs from js/lib
  baseUrl: '.',
  //except, if the module ID starts with "app",
  //load it from the js/app directory. paths
  //config is relative to the baseUrl, and
  //never includes a ".js" extension since
  //the paths config could be for a directory.
});

// Start the main app logic.
requirejs(['ipfs-min.min.js'], function(ip){
  async function main() { 
    const msg = document.getElementById("msg").value;
    const ipfs = await ip.IPFS.create();
    const { cid } = await ipfs.add(msg);
    console.log(cid);
    document.getElementById("out").innerHTML = "Your message has uploaded to IPFS at: " + cid;
  }
});

