const Web3 = require('web3');
const lockAbi = require('../abi/TokenLock.json');
const factoryAbi = require('../abi/TokenLockFactory.json');
const factoryAddress = '0x9A676e781A523b5d0C0e43731313A708CB607508';

class LockService {
	constructor() {
		this.web3 = new Web3(Web3.givenProvider || process.env.WEB3_PROVIDER || "http://localhost:8545");
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