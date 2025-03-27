import os
import re
import csv
from pathlib import Path
from typing import Dict, List, Set, Optional

class PageInfo:
    def __init__(self, name: str, path: str, parent: str = ""):
        self.name = name
        self.path = path
        self.parent = parent
        self.internal_links: Set[str] = set()
        self.api_endpoints: Set[str] = set()

def clean_path(path: str) -> str:
    """Convert file system path to URL path"""
    path = path.replace("\\", "/")
    path = re.sub(r"/page\.tsx$", "", path)
    path = re.sub(r"^\(platform\)/", "/", path)
    path = re.sub(r"^\(auth\)/", "/", path)
    path = re.sub(r"^\(default\)/", "/", path)
    return path

def get_parent_path(path: str) -> str:
    """Get parent path from URL path"""
    parts = path.split("/")
    if len(parts) <= 2:
        return ""
    return "/".join(parts[:-1])

def extract_links(content: str) -> Set[str]:
    """Extract internal links from file content"""
    links = set()
    # Match Next.js Link components and href attributes
    link_patterns = [
        r'<Link\s+href=["\']([^"\']+)["\']',
        r'href=["\']([^"\']+)["\']',
        r'router\.push\(["\']([^"\']+)["\']'
    ]
    for pattern in link_patterns:
        matches = re.finditer(pattern, content)
        for match in matches:
            link = match.group(1)
            if link.startswith("/") or link.startswith("./"):
                links.add(link.replace("./", "/"))
    return links

def extract_api_endpoints(content: str) -> Set[str]:
    """Extract API endpoints from file content"""
    endpoints = set()
    # Match fetch, axios and other API calls
    api_patterns = [
        r'fetch\(["\']([^"\']+)["\']',
        r'axios\.[a-z]+\(["\']([^"\']+)["\']',
        r'api\.([^"\']+)\(',
    ]
    for pattern in api_patterns:
        matches = re.finditer(pattern, content)
        for match in matches:
            endpoint = match.group(1)
            if endpoint.startswith("/api/") or endpoint.startswith("./api/"):
                endpoints.add(endpoint.replace("./api/", "/api/"))
    return endpoints

def analyze_codebase(root_dir: str) -> Dict[str, PageInfo]:
    """Analyze the Next.js codebase and build page information"""
    pages: Dict[str, PageInfo] = {}
    
    # Walk through the app directory
    for root, _, files in os.walk(os.path.join(root_dir, "app")):
        for file in files:
            if file == "page.tsx":
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, os.path.join(root_dir, "app"))
                url_path = clean_path(rel_path)
                
                # Generate page name from path
                name = url_path.split("/")[-1]
                if not name:
                    name = "Home"
                else:
                    name = name.replace("-", " ").title()
                
                parent_path = get_parent_path(url_path)
                page_info = PageInfo(name, url_path, parent_path)
                
                # Read file content and extract links and API endpoints
                with open(full_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    page_info.internal_links = extract_links(content)
                    page_info.api_endpoints = extract_api_endpoints(content)
                
                pages[url_path] = page_info
    
    return pages

def generate_csv(pages: Dict[str, PageInfo], output_file: str):
    """Generate CSV file with page information"""
    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(["Page Name", "URL Path", "Parent Page", "Internal Links", "API Endpoints"])
        
        for page in sorted(pages.values(), key=lambda x: x.path):
            writer.writerow([
                page.name,
                page.path,
                page.parent,
                ", ".join(sorted(page.internal_links)),
                ", ".join(sorted(page.api_endpoints))
            ])

def main():
    # Set paths
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    output_file = os.path.join(root_dir, "site-map.csv")
    
    # Analyze codebase
    print("Analyzing codebase...")
    pages = analyze_codebase(root_dir)
    
    # Generate CSV
    print(f"Generating sitemap CSV at {output_file}...")
    generate_csv(pages, output_file)
    print("Done!")

if __name__ == "__main__":
    main() 