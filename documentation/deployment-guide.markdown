# BlocMind.io Deployment Guide

This guide provides detailed instructions for deploying **BlocMind.io**, a university management system powered by AI and blockchain, on cloud infrastructure (AWS) and decentralized storage (IPFS and Arweave). It covers prerequisites, environment setup, deployment of frontend, backend, smart contracts, and mobile app components, as well as post-deployment verification. This guide is intended for system administrators and DevOps engineers with experience in cloud and blockchain technologies.

## Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Repository Setup](#repository-setup)
4. [Environment Configuration](#environment-configuration)
5. [Cloud Deployment (AWS)](#cloud-deployment-aws)
6. [Decentralized Storage (IPFS and Arweave)](#decentralized-storage-ipfs-and-arweave)
7. [Smart Contract Deployment](#smart-contract-deployment)
8. [Mobile App Deployment](#mobile-app-deployment)
9. [Post-Deployment Verification](#post-deployment-verification)
10. [Troubleshooting](#troubleshooting)
11. [Support](#support)

---

## Overview

BlocMind.io consists of multiple components:
- **Frontend**: React 18 with Next.js 14, styled with Tailwind CSS.
- **Backend**: Node.js with Express, integrated with MongoDB, Solana, and Hyperledger Fabric.
- **Blockchain**: Smart contracts on Solana (Rust) and Polygon (Solidity).
- **Storage**: MongoDB for student data, Arweave for diplomas, IPFS for static assets.
- **AI Layer**: GPT-4 for chatbots, TensorFlow for analytics.
- **Mobile App**: React Native for iOS and Android.

Deployment involves setting up these components on AWS for scalability and IPFS/Arweave for decentralization, with smart contracts deployed on Solana and Polygon blockchains.

---

## Prerequisites

### Software
- **Node.js**: v18 or higher (`node --version`)
- **npm**: v9 or higher (`npm --version`)
- **MongoDB**: v6 or higher (local or MongoDB Atlas)
- **Solana CLI**: v1.18+ (`solana --version`)
- **Truffle**: v5.11+ (`truffle version`)
- **IPFS**: v0.17+ (`ipfs version`)
- **Rust**: v1.75+ (`rustc --version`)
- **Python**: v3.8+ for TensorFlow (`python --version`)
- **React Native CLI**: v13+ (`react-native --version`)
- **AWS CLI**: v2.15+ (`aws --version`)
- **Docker**: v24+ (optional, `docker --version`)

### Accounts and Services
- **AWS Account**: With access to EC2, S3, and Route 53.
- **MongoDB Atlas**: For cloud-hosted MongoDB (optional).
- **Solana Wallet**: With SOL for transaction fees.
- **Polygon Wallet**: With MATIC for gas fees.
- **Arweave Account**: With AR tokens for storage.
- **IPFS Node**: Local or hosted (e.g., Pinata, Infura).
- **OpenAI API Key**: For GPT-4 integration.

### Hardware
- **AWS EC2**: t3.medium (2 vCPUs, 4GB RAM) or better.
- **Local Machine**: 8GB RAM, 4-core CPU, 50GB free storage for development.

---

## Repository Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/blocmind-io/blocmind-io.git
   cd blocmind-io
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Verify Structure**:
   Ensure the following folders exist:
   ```
   blocmind-io/
   ├── frontend/          # React, Next.js, Tailwind CSS
   ├── backend/           # Node.js, Express, MongoDB
   ├── blockchain/        # Smart contracts (Rust, Solidity)
   ├── mobile-app/        # React Native
   ├── documentation/     # Guides and whitepaper
   ├── tests/             # Unit and integration tests
   ├── .env.example       # Environment template
   └── package.json
   ```

---

## Environment Configuration

1. **Copy Environment File**:
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env`**:
   Update the `.env` file with your configuration:
   ```env
   # Backend
   PORT=3001
   MONGO_URI=mongodb://localhost:27017/blocmind
   JWT_SECRET=your_jwt_secret_32_chars_or_more

   # Blockchain
   SOLANA_RPC=https://api.mainnet-beta.solana.com
   POLYGON_RPC=https://polygon-rpc.com
   SOLANA_PRIVATE_KEY=your_solana_private_key
   POLYGON_PRIVATE_KEY=your_polygon_private_key

   # AI
   OPENAI_API_KEY=sk-your_openai_api_key
   TENSORFLOW_MODEL_PATH=/path/to/model

   # Storage
   ARWEAVE_KEY=your_arweave_key
   IPFS_HOST=localhost
   IPFS_PORT=5001
   IPFS_PROTOCOL=http

   # AWS
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=us-east-1
   AWS_S3_BUCKET=blocmind-assets
   ```

3. **Generate Keys**:
   - **Solana**: Run `solana-keygen new` and copy the private key to `SOLANA_PRIVATE_KEY`.
   - **Polygon**: Use MetaMask or Hardhat to generate an Ethereum-compatible private key for `POLYGON_PRIVATE_KEY`.
   - **JWT Secret**: Generate a random 32-character string (e.g., `openssl rand -hex 16`).
   - **Arweave**: Obtain a key from [arweave.org](https://arweave.org).
   - **OpenAI**: Get an API key from [platform.openai.com](https://platform.openai.com).

4. **Secure Environment**:
   - Ensure `.env` is added to `.gitignore` to prevent accidental commits.
   - Store sensitive keys in a secure vault (e.g., AWS Secrets Manager) for production.

---

## Cloud Deployment (AWS)

### 1. Set Up AWS Infrastructure
1. **EC2 Instance**:
   - Launch a `t3.medium` instance (Ubuntu 22.04 LTS).
   - Configure security group to allow:
     - Port 80 (HTTP) and 443 (HTTPS) for frontend.
     - Port 3001 for backend APIs.
     - Port 27017 for MongoDB (if local).
   - SSH into the instance: `ssh -i your-key.pem ubuntu@ec2-public-ip`.

2. **S3 Bucket**:
   - Create a bucket (e.g., `blocmind-assets`) for static assets and backups.
   - Set public read access for static files (e.g., images, CSS).

3. **Route 53**:
   - Register a domain (e.g., `blocmind.io`) or use a subdomain.
   - Create an A record pointing to the EC2 instance’s public IP.

4. **RDS (Optional)**:
   - Set up a MongoDB instance on AWS RDS if not using MongoDB Atlas.
   - Update `MONGO_URI` in `.env` with the RDS endpoint.

### 2. Deploy Backend
1. **Install Dependencies**:
   ```bash
   sudo apt update
   sudo apt install -y nodejs npm mongodb
   ```

2. **Copy Repository**:
   - Transfer the `blocmind-io` folder to EC2 using SCP:
     ```bash
     scp -i your-key.pem -r blocmind-io ubuntu@ec2-public-ip:/home/ubuntu
     ```

3. **Install Project Dependencies**:
   ```bash
   cd /home/ubuntu/blocmind-io
   npm install
   ```

4. **Start Backend**:
   ```bash
   cd backend
   npm run build
   npm run start
   ```

5. **Use PM2 for Persistence**:
   ```bash
   npm install -g pm2
   pm2 start dist/index.js --name blocmind-backend
   pm2 save
   pm2 startup
   ```

6. **Verify**:
   - Test the API: `curl http://localhost:3001/health`
   - Expected response: `{"status": "OK"}`

### 3. Deploy Frontend
1. **Install Nginx**:
   ```bash
   sudo apt install -y nginx
   ```

2. **Build Frontend**:
   ```bash
   cd /home/ubuntu/blocmind-io/frontend
   npm run build
   ```

3. **Configure Nginx**:
   - Create a config file: `/etc/nginx/sites-available/blocmind`
   - Add:
     ```nginx
     server {
         listen 80;
         server_name blocmind.io;

         location / {
             root /home/ubuntu/blocmind-io/frontend/out;
             try_files $uri $uri/ /index.html;
         }

         location /api/ {
             proxy_pass http://localhost:3001;
             proxy_set_header Host $host;
             proxy_set_header X-Real-IP $remote_addr;
         }
     }
     ```
   - Enable the site:
     ```bash
     sudo ln -s /etc/nginx/sites-available/blocmind /etc/nginx/sites-enabled/
     sudo nginx -t
     sudo systemctl restart nginx
     ```

4. **Verify**:
   - Access `http://blocmind.io` in a browser.
   - Confirm the frontend loads and API calls (e.g., `/api/health`) succeed.

---

## Decentralized Storage (IPFS and Arweave)

### 1. Set Up IPFS
1. **Install IPFS**:
   ```bash
   wget https://dist.ipfs.io/go-ipfs/v0.17.0/go-ipfs_v0.17.0_linux-amd64.tar.gz
   tar -xvzf go-ipfs_v0.17.0_linux-amd64.tar.gz
   cd go-ipfs
   sudo bash install.sh
   ipfs init
   ```

2. **Start IPFS Daemon**:
   ```bash
   ipfs daemon &
   ```

3. **Upload Static Assets**:
   ```bash
   cd /home/ubuntu/blocmind-io/frontend/out
   ipfs add -r .
   ```
   - Note the root CID (e.g., `Qm...`) for pinning or gateway access.

4. **Pin to Remote Service** (Optional):
   - Use Pinata or Infura to pin the CID for redundancy.
   - Update frontend to serve assets via IPFS gateway (e.g., `https://ipfs.io/ipfs/Qm...`).

### 2. Set Up Arweave
1. **Install Arweave CLI**:
   ```bash
   npm install -g arweave-deploy
   ```

2. **Upload Diploma Data**:
   ```bash
   cd /home/ubuntu/blocmind-io/backend
   arweave deploy diplomas.json --key-file /path/to/arweave-key.json
   ```
   - Replace `diplomas.json` with your data file.
   - Note the transaction ID for retrieval.

3. **Verify**:
   - Access data at `https://arweave.net/<transaction-id>`.

---

## Smart Contract Deployment

### 1. Solana Contracts
1. **Build Contracts**:
   ```bash
   cd /home/ubuntu/blocmind-io/blockchain/solana
   cargo build-bpf
   ```

2. **Deploy Contracts**:
   ```bash
   solana program deploy target/deploy/university_dao.so
   solana program deploy target/deploy/grade_registry.so
   ```
   - Note the program IDs for backend integration.
   - Ensure `SOLANA_PRIVATE_KEY` is funded with SOL.

3. **Verify**:
   - Check deployment on [solscan.io](https://solscan.io) using the program ID.

### 2. Polygon Contracts
1. **Configure Truffle**:
  Ascent: Update `truffle-config.js` with your Polygon RPC (`POLYGON_RPC` from `.env`).

2. **Deploy Contracts**:
   ```bash
   cd /home/ubuntu/blocmind-io/blockchain/polygon
   truffle migrate --network polygon
   ```
   - Ensure `POLYGON_PRIVATE_KEY` is funded with MATIC.

3. **Verify**:
   - Check deployment on [polygonscan.com](https://polygonscan.com) using the contract address.

4. **Update Backend**:
   - Add contract addresses to `.env`:
     ```env
     DIPLOMA_NFT_ADDRESS=0x...
     REWARD_DISTRIBUTOR_ADDRESS=0x...
     ```

---

## Mobile App Deployment

1. **Build App**:
   ```bash
   cd /home/ubuntu/blocmind-io/mobile-app
   npm install
   ```

2. **iOS**:
   - Requires Xcode and Apple Developer account.
   - Run:
     ```bash
     npm run ios
     ```

3. **Android**:
   - Requires Android Studio and SDK.
   - Run:
     ```bash
     npm run android
     ```

4. **Publish**:
   - Generate release builds and submit to App Store/Google Play.
   - Follow [React Native docs](https://reactnative.dev/docs/publishing-to-app-stores).

---

## Post-Deployment Verification

1. **Frontend**:
   - Access `http://blocmind.io` and verify the UI loads.
   - Test login and navigation.

2. **Backend**:
   - Run: `curl https://blocmind.io/api/health`
   - Expected: `{"status": "OK"}`

3. **API**:
   - Test endpoints using Postman or cURL (see [api.md](api.md)).
   - Example:
     ```bash
     curl -X POST https://blocmind.io/api/auth/login -H "Content-Type: application/json" -d '{"email": "test@university.edu", "password": "password"}'
     ```

4. **Blockchain**:
   - Submit a test grade and verify the transaction on [solscan.io](https://solscan.io).
   - Mint a test diploma NFT and verify on [polygonscan.com](https://polygonscan.com).

5. **Storage**:
   - Access a diploma file on Arweave: `https://arweave.net/<tx-id>`.
   - Access frontend assets on IPFS: `https://ipfs.io/ipfs/<cid>`.

6. **Mobile App**:
   - Install on a device and test login, notifications, and offline mode.

---

## Troubleshooting

### Common Issues
- **Backend Not Starting**:
  - Check `MONGO_URI`, `JWT_SECRET`, and port conflicts.
  - View logs: `pm2 logs blocmind-backend`.
- **Frontend Not Loading**:
  - Verify Nginx config: `sudo nginx -t`.
  - Check EC2 security group for port 80/443.
- **Smart Contract Deployment Failed**:
  - Ensure sufficient SOL/MATIC in wallets.
  - Check network status: [solana.status.io](https://solana.status.io), [polygonscan.com](https://polygonscan.com).
- **IPFS/Arweave Upload Failed**:
  - Verify `IPFS_HOST`, `ARWEAVE_KEY`, and network connectivity.
  - Retry with a different IPFS node (e.g., Pinata).
- **Mobile App Build Errors**:
  - Update Xcode/Android Studio and dependencies.
  - Check [React Native troubleshooting](https://reactnative.dev/docs/troubleshooting).

### Advanced Support
- **AWS Issues**: Refer to [AWS EC2 docs](https://docs.aws.amazon.com/ec2).
- **Blockchain Errors**: Submit a GitHub issue at [blocmind-io/issues](https://github.com/blocmind-io/blocmind-io/issues).
- **General Queries**: Email [support@blocmind.io](mailto:support@blocmind.io).

---

## Support

For deployment-related assistance, contact:
- **Email**: [support@blocmind.io](mailto:support@blocmind.io)
- **Phone**: +256-123-456-789 (East Africa support, 9 AM–5 PM UTC+3)
- **GitHub**: [blocmind-io/issues](https://github.com/blocmind-io/blocmind-io/issues)
- **Website**: [blocmind.io/support](https://blocmind.io/support)

Use the in-portal **Help** chat (powered by GPT-4) for real-time deployment guidance.

---

*BlocMind.io – Deploying the future of education with AI and blockchain.*