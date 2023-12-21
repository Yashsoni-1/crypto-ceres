
const ChainUtil = require('../chain-util');
const Transaction = require('./transaction')
const {INITIAL_BALANCE} = require('../config');



class Wallet
{
    constructor()
    {
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    toString()
    {
        return `Wallet -
            publicKey: ${this.publicKey.toString()}
            balance  : ${this.balance}`
    }

    sign(dataHash)
    {
        return this.keyPair.sign(dataHash);
    }

    createTransaction(recipient, amount, blockchain, transactionPool)
    {
        this.balance = this.calculateBalance(blockchain);
        if(amount > this.balance)
        {
            console.log(`Amount: ${amount} exceeds current balance: ${this.balance}`);
            return;
        }

        let transaction = transactionPool.existingTransaction(this.publicKey);

        if(transaction)
        {
            transaction.update(this, recipient, amount);
        }
        else 
        {
            transaction = Transaction.newTransaction(this, recipient, amount);
            transactionPool.updateOrAddTransaction(transaction);
        }

        return transaction;
    }

    calculateBalance(blockchain)
    {
        console.log(this.publicKey);
        let balance = this.balance;
        let transactions = [];
        console.log(blockchain);
        blockchain.chain.forEach(block => block.data.forEach(transaction => {
            console.log(transaction);
            transactions.push(transaction);
        }));

        const walletInputs = transactions.filter(
            transaction => transaction.input.address === this.publicKey);
        
        console.log(walletInputs);

        let startTime = 0;

        let flag = false;

        if(walletInputs.length > 0) 
        {
            flag = true;
            console.log('//////////////////////////////////////////////////');
            const recentInputT = walletInputs.reduce(
                (prev, current) => prev.input.timestamp > current.input.timestamp ? prev : current);
            console.log(recentInputT);
            balance = recentInputT.outputs.find(output => output.address === this.publicKey).amount;
            startTime = recentInputT.input.timestamp;
        }
       

            transactions.forEach(transaction => {
                if(transaction.input.timestamp > startTime)
                {
                    transaction.outputs.find(output => {
                        if (output.address === this.publicKey) {
                            balance += output.amount;
                        }
                    });
                }

                if(flag === true) {console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');};
            });
        
        return balance;
    }

    static blockchainWallet() 
    {
        const blockchainWallet = new this();
        blockchainWallet.address = 'blockchain-wallet';
        return blockchainWallet;
    }
}

module.exports = Wallet;