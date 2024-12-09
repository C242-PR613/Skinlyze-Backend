# Skinlyze Backend API

### Endpoint: 

<https://skinlyze-backend-249825855363.asia-southeast2.run.app> 

**or** 

<http://localhost:8080>

### Documentation: 

<https://skinlyze-backend-249825855363.asia-southeast2.run.app/api-docs>

**or** 

<http://localhost:8080/api-docs>

## How To Replicate Project

#### 1. Clone the Repository
```bash
git clone https://github.com/Skinlyze/Skinlyze-Backend.git
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Rename `.env.example` to `.env`

#### 4. Edit `.env` File
```txt
ML_PREDICT_ENDPOINT=[ML Model predictor URL]
DB_PRIVATE_KEY_PATH=[Path to Service Account Key]
PORT="8080"
DB_NAME="(default)"
BUCKET_NAME=[cloud storage bucket name]
```
> **NOTE:** Instruction for deploying ML predictor can be found here: <https://github.com/Skinlyze/Skinlyze-ML/blob/main/README.md#how-to-replicate-project>

> Instruction on how to get Service Account key can be found here: <https://firebase.google.com/docs/admin/setup#initialize_the_sdk_in_non-google_environments>

> Instruction on how to get create cloud storage bucket can be found here: <https://cloud.google.com/storage/docs/creating-buckets>

#### 5. Start the Server
```bash
npm start
```
