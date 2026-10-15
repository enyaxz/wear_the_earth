from flask import Flask, jsonify
import pandas as pd
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Load and normalize the CSV
try:
    df = pd.read_csv('brand_data.csv', quotechar='"', skipinitialspace=True)
    df.columns = df.columns.str.strip()
    df['Brand Name'] = df['Brand Name'].astype(str).str.encode('ascii', 'ignore').str.decode('ascii')
    df['Sustainability'] = df['Sustainability'].fillna('').str.lower()
    df['Category'] = df['Category'].fillna('')
except Exception as e:
    df = pd.DataFrame()
    print(f"Error loading CSV: {e}")

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "Backend is live", "routes": ["/api/brand/<brand_name>", "/api/ethical-alternatives/<brand_name>"]})

@app.route('/api/brand/<brand_name>', methods=['GET'])
def get_brand(brand_name):
    if df.empty:
        return jsonify({'error': 'Data unavailable'}), 500

    brand_name = brand_name.strip().lower()
    result = df[df['Brand Name'].str.strip().str.lower() == brand_name]

    if result.empty:
        return jsonify({'error': 'Brand not found'}), 404

    brand = result.iloc[0]
    data = {
        'Brand': brand['Brand Name'],
        'Sustainability': brand.get('Sustainability', 'Information not available'),
        'Issues': brand.get('Issues', 'Information not available'),
        'MaterialSourcing': brand.get('Material Sourcing', 'Information not available'),
        'Recycling': brand.get('Recycling', 'Information not available'),
        'SustainabilityPledges': brand.get('Sustainability Pledges', 'Information not available'),
        'TransparencyScore': brand.get('Transparency Score', 'Information not available'),
        'Category': brand.get('Category', 'Information not available'),
        'SustainabilityTag': brand.get('Sustainability', 'Information not available'),
        'Alternatives': brand.get('Alternatives', '').split(',') if 'Alternatives' in df.columns and pd.notna(brand.get('Alternatives')) else []
    }

    return jsonify(data)

@app.route('/api/ethical-alternatives/<brand_name>', methods=['GET'])
def get_ethical_alternatives(brand_name):
    if df.empty:
        return jsonify({'error': 'Data unavailable'}), 500

    brand_name = brand_name.strip().lower()
    result = df[df['Brand Name'].str.strip().str.lower() == brand_name]

    if result.empty:
        return jsonify({'error': 'Brand not found'}), 404

    brand = result.iloc[0]
    category = brand.get('Category', '').strip()
    tag = brand.get('Sustainability', '').strip().lower()

    tag_order = {'unsustainable': 0, 'questionable': 1, 'sustainable': 2}
    current_rank = tag_order.get(tag, 0)

    better_brands = df[
        (df['Category'].str.strip() == category) &
        (df['Sustainability'].map(tag_order) > current_rank)
    ]

    alternatives = better_brands['Brand Name'].dropna().unique().tolist()[:3]

    return jsonify({
        'brand': brand['Brand Name'],
        'ethical_alternatives': alternatives
    })

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 10000))  # Render injects this
    app.run(host='0.0.0.0', port=port)
