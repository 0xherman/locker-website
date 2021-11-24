const Web3 = require('web3');
const lockAbi = require('../abi/TokenLock.json');

class LockService {
	constructor() {
		this.web3 = new Web3(Web3.givenProvider || process.env.WEB3_PROVIDER || "http://localhost:8545");
	}
	
	async getUnlockDate(addr) {
		const tokenLock = new this.web3.eth.Contract(lockAbi, addr);

		return await tokenLock.methods.unlockDate().call();
	}
}

module.exports = LockService;