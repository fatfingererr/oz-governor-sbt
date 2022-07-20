# OZ Governor SBT

SBT for the OZ Governor use

```
npm install
cp .env.example .env

npm run compile
npm run deploy

npx hardhat verify <contract address> --network matic
```

## Usage

1. npm run token:deploy
2. npm run token:mint
3. npm run token:delegate
4. npm run timelock:deploy
5. npm run governor:deploy
6. npm run token:ownership:transfer
7. npm run timelock:setroles
8. npm run governor:proposal:mint
9. npm run governor:proposal:vote
10. npm run governor:proposal:execute