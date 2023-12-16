# crypto-ceres

## BLOCK
- Timestamp in milliseconds
- lastHash - the hash fo the block before it.
- hash - based on its own data.
- the data to store.
## Genesis Block
- First dummy block
## Block Hashes
- The hash is generated from the timestamp, lastHash, and stored data.
- **SHA-256** algorithm is used
## Implemented Websockets 
## Proof of Work System
- A consesus mechanism that requires the miners to do some amount of work in order to submit their block to blockchain.
- This has a benefit of detering dishonest and malicious miners from submitting their block.
- Because of the decentrilized nature of the blockchain any miner can replace the entire blockchain as long as the chain is long enough and has valid blocks.
- This chain will be accepted by all the peers.
- The proof-of-work system makes it computationaly expensive and ridiculous to generate the entire corrupt chains.
- But, it is manageable to submit one block.
- Many famous cryptocurrecies, including Bitcoin, uses proof-of-work system.
- There exist other mechanisms too such as Proof-of-Stake, Proof-of-Athority, Proof-of-Capacity, etc.
- 
