# BlocMind.io API Documentation

This document provides detailed information on the REST APIs for BlocMind.io, a university management system powered by AI and blockchain. These APIs enable integration with university portals, third-party services, and custom applications for managing grades, diplomas, DAO governance, and rewards.

## Base URL
All API endpoints are accessed via:  
`https://api.blocmind.io/v1`

## Authentication
BlocMind.io uses **JWT (JSON Web Token)** for authentication. Tokens are required for all protected endpoints.

### Login
- **Endpoint**: `POST /auth/login`
- **Description**: Authenticates a user and returns a JWT token.
- **Request Body**:
  ```json
  {
    "email": "user@university.edu",
    "password": "securepassword"
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Errors**:
  - 401 Unauthorized: Invalid credentials.
  - 400 Bad Request: Missing email or password.

### Token Usage
Include the JWT in the `Authorization` header for protected endpoints:  
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Endpoints

### 1. Grade Management

#### Submit Grade
- **Endpoint**: `POST /grades/submit`
- **Description**: Submits a grade to the blockchain for a student and course.
- **Role**: Lecturer or Admin
- **Request Body**:
  ```json
  {
    "studentId": "12345",
    "courseId": "CS101",
    "grade": "A",
    "semester": "2025-S1"
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "txHash": "0xabc1234567890...",
    "message": "Grade submitted to blockchain"
  }
  ```
- **Errors**:
  - 403 Forbidden: Insufficient permissions.
  - 400 Bad Request: Invalid student or course ID.
  - 500 Internal Server Error: Blockchain transaction failed.

#### Get Student Grades
- **Endpoint**: `GET /grades/student/:studentId`
- **Description**: Retrieves all grades for a student.
- **Role**: Student, Lecturer, or Admin
- **Parameters**:
  - `studentId` (path): Student’s unique ID (e.g., `12345`).
  - `semester` (query, optional): Filter by semester (e.g., `2025-S1`).
- **Response** (200 OK):
  ```json
  [
    {
      "courseId": "CS101",
      "grade": "A",
      "semester": "2025-S1",
      "timestamp": "2025-05-08T10:00:00Z"
    },
    {
      "courseId": "MATH201",
      "grade": "B+",
      "semester": "2025-S1",
      "timestamp": "2025-05-08T12:00:00Z"
    }
  ]
  ```
- **Errors**:
  - 404 Not Found: Student not found.
  - 403 Forbidden: Unauthorized access to grades.

### 2. Diploma Management

#### Mint Diploma NFT
- **Endpoint**: `POST /diplomas/mint`
- **Description**: Mints an NFT for a student’s diploma on the Polygon blockchain.
- **Role**: Admin
- **Request Body**:
  ```json
  {
    "studentId": "12345",
    "degree": "Bachelor of Science in Computer Science",
    "date": "2025-05-08",
    "institution": "Nkumba University"
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "nftId": "0xdef4567890...",
    "txHash": "0xghi1234567890...",
    "metadata": {
      "studentId": "12345",
      "degree": "Bachelor of Science in Computer Science",
      "date": "2025-05-08"
    }
  }
  ```
- **Errors**:
  - 403 Forbidden: Insufficient permissions.
  - 400 Bad Request: Invalid diploma details.
  - 500 Internal Server Error: NFT minting failed.

#### Verify Diploma
- **Endpoint**: `GET /diplomas/verify/:nftId`
- **Description**: Verifies the authenticity of a diploma NFT.
- **Role**: Public (no authentication required)
- **Parameters**:
  - `nftId` (path): NFT’s unique identifier (e.g., `0xdef4567890...`).
- **Response** (200 OK):
  ```json
  {
    "valid": true,
    "metadata": {
      "studentId": "12345",
      "degree": "Bachelor of Science in Computer Science",
      "date": "2025-05-08",
      "institution": "Nkumba University"
    }
  }
  ```
- **Errors**:
  - 404 Not Found: NFT not found.
  - 500 Internal Server Error: Blockchain query failed.

### 3. DAO Governance

#### Create Proposal
- **Endpoint**: `POST /dao/propose`
- **Description**: Submits a new governance proposal to the Solana-based DAO.
- **Role**: Student, Lecturer, or Admin (with sufficient BlocCoin stake)
- **Request Body**:
  ```json
  {
    "title": "Add AI Course to Curriculum",
    "description": "Introduce a new course on Artificial Intelligence for 2026.",
    "stake": 100
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "proposalId": "789",
    "txHash": "0xjkl1234567890...",
    "message": "Proposal submitted to DAO"
  }
  ```
- **Errors**:
  - 403 Forbidden: Insufficient BlocCoin stake.
  - 400 Bad Request: Invalid proposal details.
  - 500 Internal Server Error: DAO transaction failed.

#### Vote on Proposal
- **Endpoint**: `POST /dao/vote`
- **Description**: Casts a vote on an active DAO proposal.
- **Role**: Student, Lecturer, or Admin (with sufficient BlocCoin stake)
- **Request Body**:
  ```json
  {
    "proposalId": "789",
    "vote": true
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "txHash": "0xmnq1234567890...",
    "message": "Vote recorded"
  }
  ```
- **Errors**:
  - 403 Forbidden: Insufficient stake or unauthorized.
  - 404 Not Found: Proposal not found.
  - 400 Bad Request: Voting period expired.

#### Get Proposal Details
- **Endpoint**: `GET /dao/proposals/:proposalId`
- **Description**: Retrieves details of a DAO proposal.
- **Role**: Public
- **Parameters**:
  - `proposalId` (path): Proposal’s unique ID (e.g., `789`).
- **Response** (200 OK):
  ```json
  {
    "proposalId": "789",
    "title": "Add AI Course to Curriculum",
    "description": "Introduce a new course on Artificial Intelligence for 2026.",
    "status": "Active",
    "votesFor": 150,
    "votesAgainst": 50,
    "deadline": "2025-05-15T23:59:59Z"
  }
  ```
- **Errors**:
  - 404 Not Found: Proposal not found.

### 4. Reward System

#### Distribute BlocCoins
- **Endpoint**: `POST /rewards/distribute`
- **Description**: Awards BlocCoins to a student for academic or extracurricular achievements.
- **Role**: Admin
- **Request Body**:
  ```json
  {
    "studentId": "12345",
    "amount": 50,
    "reason": "Academic Excellence - GPA 4.0"
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "txHash": "0xpqr1234567890...",
    "message": "BlocCoins distributed"
  }
  ```
- **Errors**:
  - 403 Forbidden: Insufficient permissions.
  - 400 Bad Request: Invalid student ID or amount.
  - 500 Internal Server Error: Blockchain transaction failed.

#### Check BlocCoin Balance
- **Endpoint**: `GET /rewards/balance/:studentId`
- **Description**: Retrieves a student’s BlocCoin balance.
- **Role**: Student or Admin
- **Parameters**:
  - `studentId` (path): Student’s unique ID (e.g., `12345`).
- **Response** (200 OK):
  ```json
  {
    "studentId": "12345",
    "balance": 200
  }
  ```
- **Errors**:
  - 404 Not Found: Student not found.
  - 403 Forbidden: Unauthorized access.

### 5. User Management

#### Register User
- **Endpoint**: `POST /users/register`
- **Description**: Registers a new user (student, lecturer, or admin).
- **Role**: Admin
- **Request Body**:
  ```json
  {
    "email": "student@university.edu",
    "password": "securepassword",
    "role": "student",
    "name": "John Doe",
    "studentId": "12345"
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "userId": "67890",
    "email": "student@university.edu",
    "role": "student",
    "name": "John Doe"
  }
  ```
- **Errors**:
  - 403 Forbidden: Insufficient permissions.
  - 400 Bad Request: Invalid or duplicate email/student ID.
  - 500 Internal Server Error: Database error.

#### Get User Profile
- **Endpoint**: `GET /users/:userId`
- **Description**: Retrieves a user’s profile.
- **Role**: Self or Admin
- **Parameters**:
  - `userId` (path): User’s unique ID (e.g., `67890`).
- **Response** (200 OK):
  ```json
  {
    "userId": "67890",
    "email": "student@university.edu",
    "role": "student",
    "name": "John Doe",
    "studentId": "12345"
  }
  ```
- **Errors**:
  - 404 Not Found: User not found.
  - 403 Forbidden: Unauthorized access.

## Error Handling
All endpoints return standardized error responses:
```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "status": 400
}
```
Common error codes:
- `INVALID_REQUEST`: Missing or invalid parameters.
- `UNAUTHORIZED`: Invalid or missing JWT.
- `FORBIDDEN`: Insufficient permissions.
- `NOT_FOUND`: Resource not found.
- `INTERNAL_ERROR`: Server or blockchain failure.

## Rate Limiting
- **Limit**: 100 requests per minute per IP.
- **Response** (429 Too Many Requests):
  ```json
  {
    "error": "Rate limit exceeded",
    "retryAfter": 60
  }
  ```

## Security
- **HTTPS**: All requests must use HTTPS.
- **CORS**: Restricted to authorized university domains.
- **Input Validation**: Sanitized to prevent injection attacks.
- **Blockchain Security**: Wallet signatures for sensitive operations (e.g., grade submission, NFT minting).

## Integration Notes
- **Webhook Support**: Configure webhooks for real-time updates (e.g., grade submitted, proposal created).
- **SDKs**: JavaScript and Python SDKs are available in the repository (`/sdks/`).
- **Testing**: Use the sandbox environment at `https://sandbox.api.blocmind.io/v Erasure
1` for development.

## Example Usage (cURL)
### Login
```bash
curl -X POST https://api.blocmind.io/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@university.edu", "password": "securepassword"}'
```

### Submit Grade
```bash
curl -X POST https://api.blocmind.io/v1/grades/submit \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{"studentId": "12345", "courseId": "CS101", "grade": "A", "semester": "2025-S1"}'
```

### Verify Diploma
```bash
curl -X GET https://api.blocmind.io/v1/diplomas/verify/0xdef4567890...
```

## Repository
Full API source code and SDKs are available at:  
[https://github.com/blocmind-io/blocmind-io](https://github.com/blocmind-io/blocmind-io)

## Support
For API-related queries, contact:  
- Email: [api-support@blocmind.io](mailto:api-support@blocmind.io)  
- GitHub Issues: [blocmind-io/issues](https://github.com/blocmind-io/blocmind-io/issues)