# BlocMind.io Governance Guide

This guide outlines the decentralized governance process for BlocMind.io, a university management system powered by AI and blockchain. The system uses a **Decentralized Autonomous Organization (DAO)** to enable students, lecturers, alumni, and administrators to participate in decision-making for university policies, such as curriculum changes, budget allocations, and infrastructure development. Governance is facilitated through smart contracts on the Solana blockchain, ensuring transparency, security, and immutability.

## Table of Contents
1. [Overview of the DAO](#overview-of-the-dao)
2. [Roles and Eligibility](#roles-and-eligibility)
3. [Governance Process](#governance-process)
   - [Staking BlocCoins](#staking-bloccoins)
   - [Submitting a Proposal](#submitting-a-proposal)
   - [Voting on Proposals](#voting-on-proposals)
   - [Executing Approved Proposals](#executing-approved-proposals)
4. [Proposal Guidelines](#proposal-guidelines)
5. [Example Proposal](#example-proposal)
6. [Monitoring and Transparency](#monitoring-and-transparency)
7. [Troubleshooting](#troubleshooting)
8. [Support](#support)

---

## Overview of the DAO

The BlocMind.io DAO empowers stakeholders to collaboratively govern university operations. Key features include:
- **Decentralized Decision-Making**: Stakeholders vote on proposals using BlocCoins, the platform’s native token.
- **Transparency**: All proposals, votes, and outcomes are recorded on the Solana blockchain, publicly verifiable.
- **Security**: Time-locked voting and wallet signatures prevent manipulation.
- **Accessibility**: Participation is available via the web portal and mobile app, with offline caching for low-bandwidth areas.

The DAO operates through the `UniversityDAO` smart contract, written in Rust, which manages proposal creation, voting, and execution.

---

## Roles and Eligibility

### Eligible Participants
- **Students**: Currently enrolled, with a verified university email and blockchain wallet.
- **Lecturers**: Faculty members with active accounts.
- **Alumni**: Graduates with verified diploma NFTs.
- **Administrators**: University staff with admin-level access.

### Requirements
- **BlocCoin Stake**: A minimum of **100 BlocCoins** is required to submit or vote on proposals.
- **Wallet**: A Solana-compatible wallet (e.g., Phantom, Solflare) linked to your BlocMind.io account.
- **Account Verification**: Active account with no pending compliance issues.

---

## Governance Process

### Staking BlocCoins
1. Log in to [blocmind.io](https://blocmind.io) or the mobile app.
2. Navigate to **Governance** > **Wallet**.
3. Ensure you have at least 100 BlocCoins in your wallet:
   - Earn BlocCoins through academic excellence, attendance, or participation (see [User Guide](user-guide.md)).
   - Purchase BlocCoins via the university’s approved exchange (if applicable).
4. Click **Stake** and confirm with your wallet signature to lock 100 BlocCoins for governance participation.
5. Staked BlocCoins are returned after voting or proposal completion, minus minimal transaction fees.

**Note**: Staking is required per proposal for submitting or voting.

### Submitting a Proposal
1. Go to **Governance** > **Create Proposal**.
2. Fill in the proposal form:
   - **Title**: A concise name (e.g., `Add AI Course to Curriculum`).
   - **Description**: Detailed explanation, including rationale and impact (max 1000 words).
   - **Category**: Select from options like Curriculum, Budget, Infrastructure, or Policy.
   - **Duration**: Default 7 days (non-editable).
3. Stake 100 BlocCoins and submit the proposal.
4. Receive a **Proposal ID** and blockchain transaction hash for tracking.

**Tip**: Proposals are reviewed by admins for compliance before going live.

### Voting on Proposals
1. Navigate to **Governance** > **Active Proposals**.
2. Select a proposal to view its details (title, description, category, deadline).
3. Click **Vote** and choose:
   - **Yes**: Support the proposal.
   - **No**: Oppose the proposal.
4. Stake 100 BlocCoins and confirm with your wallet signature.
5. Your vote is recorded on the Solana blockchain, and a transaction hash is provided.

**Rules**:
- Voting is open for **7 days** from the proposal’s start date.
- One vote per stakeholder per proposal.
- Votes are weighted equally, regardless of BlocCoin stake beyond the minimum.

### Executing Approved Proposals
1. After the 7-day voting period, the DAO smart contract tallies votes.
2. A proposal is approved if it receives a **simple majority** (>50% Yes votes).
3. Approved proposals are automatically executed via the smart contract:
   - Example: A curriculum change is logged on-chain and sent to the academic office.
4. Results are published in **Governance** > **Proposal History**.
5. Staked BlocCoins are returned to participants (minus Solana transaction fees).

**Note**: Rejected proposals are archived but remain publicly viewable.

---

## Proposal Guidelines

To ensure productive governance, proposals must adhere to the following:
- **Relevance**: Must pertain to university operations (e.g., academics, budget, facilities).
- **Clarity**: Provide a clear title, detailed description, and expected outcomes.
- **Feasibility**: Include realistic timelines and resource requirements.
- **Compliance**: Must align with university policies and local regulations.
- **No Spam**: Proposals deemed frivolous or repetitive may be rejected by admins.

**Examples of Valid Proposals**:
- Introduce a new course (e.g., Artificial Intelligence).
- Allocate budget for lab equipment.
- Update campus sustainability policies.

**Examples of Invalid Proposals**:
- Personal requests (e.g., grade changes).
- Vague ideas without actionable steps.
- Proposals violating university ethics.

---

## Example Proposal

**Title**: Add Artificial Intelligence Course to Curriculum  
**Category**: Curriculum  
**Description**:  
We propose introducing a new course, "Introduction to Artificial Intelligence," for the 2026 academic year. The course will cover machine learning, neural networks, and ethics in AI, preparing students for tech careers. The estimated cost is $50,000 for faculty training and materials, funded from the academic budget. Expected outcomes include increased enrollment and industry partnerships.  
**Submitted By**: Jane Doe, Lecturer  
**Stake**: 100 BlocCoins  
**Voting Period**: May 10–17, 2025  
**Outcome**: Approved with 60% Yes votes, implemented in Q3 2026.

---

## Monitoring and Transparency

### Tracking Proposals
- **Web Portal**: View active and past proposals in **Governance** > **Proposals**.
- **Mobile App**: Receive notifications for new proposals and voting deadlines.
- **Blockchain Explorer**: Verify proposal and vote transactions on [solscan.io](https://solscan.io) using the transaction hash.

### Public Records
- All proposals, votes, and outcomes are stored on the Solana blockchain.
- Access public records via [blocmind.io/governance](https://blocmind.io/governance) or Solana explorers.
- Admins publish quarterly governance reports summarizing DAO activity.

### Auditability
- Smart contract code is open-source at [github.com/blocmind-io/blocmind-io](https://github.com/blocmind-io/blocmind-io).
- Third-party audits are conducted annually to ensure DAO integrity.

---

## Troubleshooting

### Common Issues
- **Insufficient BlocCoins**:
  - Check your balance in **Wallet**.
  - Earn more through academic achievements or purchase via approved exchanges.
- **Wallet Signature Failed**:
  - Verify your wallet (e.g., Phantom) is connected and funded with SOL for transaction fees.
  - Check Solana network status at [solana.status.io](https://solana.status.io).
- **Proposal Not Visible**:
  - Ensure it passed admin review (allow 24 hours).
  - Refresh the **Proposals** page or clear cache.
- **Voting Period Expired**:
  - Votes must be cast within the 7-day window.
  - Check the proposal’s deadline in **Active Proposals**.
- **Stake Not Returned**:
  - Stakes are returned after voting ends, minus minimal Solana fees.
  - Contact support if delayed beyond 48 hours.

### Advanced Support
- **Smart Contract Issues**: Submit a GitHub issue at [blocmind-io/issues](https://github.com/blocmind-io/blocmind-io/issues).
- **Wallet Problems**: Refer to your wallet’s documentation (e.g., Phantom, Solflare).
- **General Queries**: Use the in-portal **Help** chat or email support.

---

## Support

For governance-related assistance, contact:
- **Email**: [governance@blocmind.io](mailto:governance@blocmind.io)
- **Phone**: +256-123-456-789 (East Africa support, 9 AM–5 PM UTC+3)
- **GitHub**: [blocmind-io/issues](https://github.com/blocmind-io/blocmind-io/issues)
- **Website**: [blocmind.io/support](https://blocmind.io/support)

The in-portal **Help** chat (powered by GPT-4) provides real-time DAO guidance.

---

*BlocMind.io – Empowering decentralized education governance with blockchain.*