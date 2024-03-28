const fs = require('fs');
const Web3 = require('web3');
require('dotenv').config();


const infuraApiKey = process.env.INFURA_API_KEY;

const web3 = new Web3(`https://mainnet.infura.io/v3/${infuraApiKey}`);

// Read ABI from JSON file
const daiAbiPath = './dai_abi.json';
const daiAbi = JSON.parse(fs.readFileSync(daiAbiPath, 'utf-8')).abi;

// DAI token contract address
const daiContractAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F'; // DAI token contract address

// Define endpoint handler
async function fetchDaiContractBalance(req, res) {
    try {
        // Create contract instance
        const daiContract = new web3.eth.Contract(daiAbi, daiContractAddress);
        
        // Fetch balance of the DAI token contract
        const contractBalance = await daiContract.methods.balanceOf(daiContractAddress).call();
        
        // Print balance to console
        console.log(`Balance of DAI token contract: ${contractBalance}`);
        
        // Respond with success and data
        res.json({ success: true, contractBalance });
    } catch (error) {
        // Handle errors
        console.error("Error fetching DAI contract balance:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
}

// Export the endpoint handler
module.exports = fetchDaiContractBalance;