# 🏠 Smart House Price Prediction Platform

An end-to-end Machine Learning web application that predicts house prices using **Gradient Boosting Regression**. The project demonstrates the complete ML lifecycle—from data preprocessing and feature engineering to model training, API development using FastAPI, and an interactive frontend for real-time predictions.

---

## 🚀 Project Overview

The **Smart House Price Prediction Platform** is designed to estimate house prices based on important property features. The project follows industry-standard machine learning and software engineering practices by integrating:

- Data preprocessing and feature engineering
- Exploratory Data Analysis (EDA)
- Model comparison and evaluation
- Machine Learning model deployment
- REST API using FastAPI
- Interactive web frontend

This project showcases practical AI engineering skills by combining Machine Learning with modern backend and frontend development.

---

# ✨ Features

- 📊 Exploratory Data Analysis (EDA)
- 🧹 Data Cleaning & Missing Value Handling
- 🔧 Feature Engineering
- 🤖 Multiple Regression Models
- 🏆 Gradient Boosting Regressor (Best Performing Model)
- 📈 Model Performance Comparison
- 🔍 Feature Importance Analysis
- 🌐 REST API using FastAPI
- 💻 Interactive Frontend
- ⚡ Real-Time House Price Prediction

---

# 📈 Model Performance

| Model | R² Score |
|--------|----------|
| Linear Regression | 0.6476 |
| Ridge Regression | 0.6811 |
| Lasso Regression | 0.6478 |
| Decision Tree Regressor | 0.7884 |
| Random Forest Regressor | 0.8999 |
| Gradient Boosting Regressor | **0.8957** |

### Selected Model

**Gradient Boosting Regressor**

Evaluation Metrics:

- **MAE:** 16,753.77
- **RMSE:** 28,289.87
- **R² Score:** 0.8957

---

# 🏗️ System Architecture

```text
                User
                  │
                  ▼
        Frontend (HTML/CSS/JS)
                  │
                  ▼
          FastAPI Backend
                  │
                  ▼
         Data Preprocessing
                  │
                  ▼
          StandardScaler
                  │
                  ▼
   Gradient Boosting Regressor
                  │
                  ▼
      Predicted House Price
```

---

# 🛠️ Tech Stack

## Programming Language

- Python

## Machine Learning

- Scikit-learn
- Pandas
- NumPy

## Data Visualization

- Matplotlib

## Backend

- FastAPI
- Uvicorn

## Frontend

- HTML5
- CSS3
- JavaScript

## Development Tools

- Jupyter Notebook
- VS Code

## Version Control

- Git
- GitHub

---

# 📂 Project Structure

```text
Smart-House-Price-Prediction/

├── backend/
│   ├── api/
│   ├── config/
│   ├── schemas/
│   ├── services/
│   ├── utils/
│   └── app.py
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── data/
│   ├── raw/
│   └── processed/
│
├── images/
│
├── models/
│   ├── gradient_boosting.pkl
│   ├── scaler.pkl
│   ├── feature_columns.pkl
│   └── model_comparison.csv
│
├── notebooks/
│   └── 01_data_understanding.ipynb
│
├── tests/
│
├── README.md
├── requirements.txt
├── LICENSE
└── .gitignore
```

---

# 📁 Folder Description

| Folder | Description |
|---------|-------------|
| backend | FastAPI backend implementation |
| frontend | User interface |
| data | Raw and processed datasets |
| images | Project screenshots |
| models | Saved ML models and artifacts |
| notebooks | Data analysis and model training notebooks |
| tests | Testing scripts |
| README.md | Project documentation |
| requirements.txt | Python dependencies |

---

# 🌐 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | API Status |
| GET | `/health` | Health Check |
| POST | `/predict` | Predict House Price |

---

# 📸 Application Preview

## Home Page

> Add screenshot here

```
images/home_page.png
```

---

## Prediction Result

> Add screenshot here

```
images/prediction_result.png
```

---

## Swagger API

> Add screenshot here

```
images/swagger_api.png
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Vedansh1011/Smart-House-Price-Prediction.git
```

---

## Navigate to Project

```bash
cd Smart-House-Price-Prediction
```

---

## Create Virtual Environment

```bash
python -m venv venv
```

---

## Activate Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Run FastAPI Server

```bash
cd backend

uvicorn app:app --reload
```

---

## Open Swagger UI

```
http://127.0.0.1:8000/docs
```

---

# 🔮 Future Improvements

- Improve preprocessing pipeline to fully match the training workflow
- Support additional prediction features
- Enhance frontend with charts and analytics
- Docker containerization
- Cloud deployment (AWS / Azure / Render)
- Prediction history
- Explainable AI (SHAP/LIME)
- User authentication
- CI/CD pipeline integration

---

# 📌 Key Learning Outcomes

Through this project, I gained practical experience in:

- Data preprocessing and feature engineering
- Machine Learning model selection
- Regression model evaluation
- FastAPI backend development
- REST API design
- Frontend-backend integration
- Model serialization using Joblib
- Version control using Git and GitHub
- End-to-end ML application development

---

# 👨‍💻 Author

**Vedansh Kumar Srivastava**

M.Tech Computer Science & Engineering

AI Engineer | Applied AI | Machine Learning Enthusiast

GitHub: https://github.com/Vedansh1011

---

# ⭐ If you found this project useful

Please consider giving this repository a ⭐ on GitHub.