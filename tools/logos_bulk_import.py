import os
import shutil
import sys

def bulk_import(src_folder, dest_folder):
    for file in os.listdir(src_folder):
        if file.endswith('.png'):
            shutil.copy(os.path.join(src_folder, file), os.path.join(dest_folder, file))
    print("Logos imported successfully.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python logos_bulk_import.py <path_to_logos_folder>")
    else:
        bulk_import(sys.argv[1], os.path.join(os.path.dirname(__file__), "..", "frontend", "src", "assets", "logos"))
