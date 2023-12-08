const hre = require("hardhat");
const abi = require("./aaveabi.json");
const erc20abi = require("@openzeppelin/contracts/build/contracts/ERC20.json");
async function main() {
  
   
        const signer = await hre.ethers.provider.getSigner();

    
        const aaveAddress = "0x02c3e5420527D75c1c864a58D6a2A73B0EfbfA4D";
        const aaveAbi = abi.abi; 
        console.log(aaveAbi);
        const aave = new hre.ethers.Contract(aaveAddress, aaveAbi, signer);

        const amountToDeposit = hre.ethers.parseEther("10"); // 10 tokens

        // SepoliaETH token address
        const tokenAddress = "0x99FCee8A75550a027Fdb674c96F2D7DA31C79fcD";
        //console.log(signer);
        const erc20Abi = erc20abi.abi;
        const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, signer);
    
        await tokenContract.approve(aaveAddress, amountToDeposit);
        console.log("Approved");
       
        const depositTx = await aave.connect(signer).supply(tokenAddress, amountToDeposit, signer.address, 0);
        console.log("Deposited");
        await depositTx.wait();
    
}

main()
    .then(() => console.log('Done'))
    .catch((error) => {
        console.error(error);
    });
