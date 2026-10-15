# Wear The Earth — Setup Guide (local version for VS Code)

## 1. Install Dependencies
### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 2. Adding Logos
- Place transparentclatt PNGs into `frontend/src/assets/logos/`
- Filenames must match `brand_data.csv`

## 3. Updating Brand Data
- Edit `backend/brand_data.csv` to add more brands, issues, impacts, and logo filenames.
