const Web3 = require('web3');
const lockAbi = require('../abi/TokenLock.json');
const factoryAbi = require('../abi/TokenLockFactory.json');
const factoryAddress = process.env.FACTORY_ADDRESS;

class LockService {
	constructor() {
		this.web3 = new Web3(process.env.WEB3_PROVIDER || Web3.givenProvider || "http://localhost:8545");
	}
	
	async getUnlockDate(addr) {
		const tokenLock = new this.web3.eth.Contract(lockAbi, addr);

		return await tokenLock.methods.unlockDate().call();
	}

	async getLockAddress(lockName) {
		const factory = new this.web3.eth.Contract(factoryAbi, factoryAddress);

		return await factory.methods.getLockByName(lockName).call();
	}
}

module.exports = LockService;