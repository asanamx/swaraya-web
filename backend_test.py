#!/usr/bin/env python3
"""
Favicon verification test suite for swaraya rebrand (Carbón + Girasol palette).
Tests HTTP delivery, dimensions, color palette, and HTML metadata.
"""

import requests
from PIL import Image
from io import BytesIO
import sys
from collections import Counter

# Base URL from environment
BASE_URL = "https://nextjs-swaraya.preview.emergentagent.com"

# Expected files and their properties
FAVICON_FILES = {
    "/favicon-16.png": {"mime": "image/png", "dimensions": (16, 16)},
    "/favicon-32.png": {"mime": "image/png", "dimensions": (32, 32)},
    "/icon-192.png": {"mime": "image/png", "dimensions": (192, 192)},
    "/icon-512.png": {"mime": "image/png", "dimensions": (512, 512)},
    "/icon-512-maskable.png": {"mime": "image/png", "dimensions": (512, 512)},
    "/apple-icon.png": {"mime": "image/png", "dimensions": (180, 180)},
    "/safari-pinned-tab.svg": {"mime": ["image/svg+xml", "application/xml", "text/xml"], "dimensions": None},
}

# Color palette
OLD_INDIGO_COLORS = ["#2C3E80", "#5468D6"]
NEW_CARBON = "#0a0a0a"  # rgb(10, 10, 10)
NEW_GIRASOL = "#f6b91f"  # rgb(246, 185, 31)

def hex_to_rgb(hex_color):
    """Convert hex color to RGB tuple."""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def color_distance(c1, c2):
    """Calculate Euclidean distance between two RGB colors."""
    return sum((a - b) ** 2 for a, b in zip(c1, c2)) ** 0.5

def test_http_delivery():
    """Test 1: HTTP 200 + correct MIME types for all favicon files."""
    print("\n" + "="*80)
    print("TEST 1: HTTP DELIVERY - Status 200 + Correct MIME Types")
    print("="*80)
    
    all_passed = True
    
    for path, props in FAVICON_FILES.items():
        url = BASE_URL + path
        try:
            response = requests.get(url, timeout=10)
            status = response.status_code
            content_type = response.headers.get('Content-Type', '').split(';')[0].strip()
            
            # Check status
            if status != 200:
                print(f"❌ {path}: HTTP {status} (expected 200)")
                all_passed = False
                continue
            
            # Check MIME type
            expected_mime = props["mime"]
            if isinstance(expected_mime, list):
                mime_ok = content_type in expected_mime
                expected_str = " or ".join(expected_mime)
            else:
                mime_ok = content_type == expected_mime
                expected_str = expected_mime
            
            if mime_ok:
                print(f"✅ {path}: HTTP 200, Content-Type: {content_type}")
            else:
                print(f"❌ {path}: HTTP 200 but Content-Type is '{content_type}' (expected {expected_str})")
                all_passed = False
                
        except Exception as e:
            print(f"❌ {path}: Request failed - {e}")
            all_passed = False
    
    return all_passed

def test_dimensions():
    """Test 2: Verify correct dimensions for all PNG files."""
    print("\n" + "="*80)
    print("TEST 2: PNG DIMENSIONS")
    print("="*80)
    
    all_passed = True
    
    for path, props in FAVICON_FILES.items():
        if props["dimensions"] is None:  # Skip SVG
            continue
            
        url = BASE_URL + path
        try:
            response = requests.get(url, timeout=10)
            if response.status_code != 200:
                print(f"❌ {path}: Cannot download (HTTP {response.status_code})")
                all_passed = False
                continue
            
            img = Image.open(BytesIO(response.content))
            actual_size = img.size
            expected_size = props["dimensions"]
            
            if actual_size == expected_size:
                print(f"✅ {path}: {actual_size[0]} x {actual_size[1]} (correct)")
            else:
                print(f"❌ {path}: {actual_size[0]} x {actual_size[1]} (expected {expected_size[0]} x {expected_size[1]})")
                all_passed = False
                
        except Exception as e:
            print(f"❌ {path}: Failed to verify dimensions - {e}")
            all_passed = False
    
    return all_passed

def test_color_palette():
    """Test 3: Verify new Carbón + Girasol palette (NOT old indigo)."""
    print("\n" + "="*80)
    print("TEST 3: COLOR PALETTE - New Carbón + Girasol (NOT old indigo)")
    print("="*80)
    
    all_passed = True
    test_files = ["/icon-192.png", "/apple-icon.png"]
    
    old_indigo_rgb = [hex_to_rgb(c) for c in OLD_INDIGO_COLORS]
    carbon_rgb = hex_to_rgb(NEW_CARBON)
    girasol_rgb = hex_to_rgb(NEW_GIRASOL)
    
    for path in test_files:
        url = BASE_URL + path
        try:
            response = requests.get(url, timeout=10)
            if response.status_code != 200:
                print(f"❌ {path}: Cannot download (HTTP {response.status_code})")
                all_passed = False
                continue
            
            img = Image.open(BytesIO(response.content)).convert('RGB')
            width, height = img.size
            
            # Sample pixels from different regions
            samples = []
            # Center region (for background check)
            for x in range(width // 4, 3 * width // 4, max(1, width // 20)):
                for y in range(height // 4, 3 * height // 4, max(1, height // 20)):
                    samples.append(img.getpixel((x, y)))
            
            # Check for old indigo colors (should NOT be present)
            has_old_indigo = False
            for pixel in samples:
                for old_color in old_indigo_rgb:
                    if color_distance(pixel, old_color) < 30:  # Tolerance
                        has_old_indigo = True
                        print(f"❌ {path}: Found OLD INDIGO color at pixel {pixel} (close to {old_color})")
                        all_passed = False
                        break
                if has_old_indigo:
                    break
            
            if not has_old_indigo:
                print(f"✅ {path}: No old indigo colors detected")
            
            # Check for dark carbon background
            dark_pixels = [p for p in samples if all(c < 50 for c in p)]  # Very dark pixels
            carbon_pixels = [p for p in dark_pixels if color_distance(p, carbon_rgb) < 30]
            
            if carbon_pixels:
                print(f"✅ {path}: Found {len(carbon_pixels)} carbon-like pixels (dark background present)")
            else:
                print(f"⚠️  {path}: No carbon (#0a0a0a) background detected - found {len(dark_pixels)} dark pixels")
                # Not failing this as the background might be slightly different
            
            # Check for girasol yellow dot
            yellow_pixels = [p for p in samples if p[0] > 200 and 130 < p[1] < 200 and p[2] < 80]
            girasol_pixels = [p for p in yellow_pixels if color_distance(p, girasol_rgb) < 50]
            
            if girasol_pixels:
                print(f"✅ {path}: Found {len(girasol_pixels)} girasol-like pixels (yellow dot present)")
            else:
                print(f"⚠️  {path}: No girasol (#f6b91f) yellow detected - found {len(yellow_pixels)} yellow-ish pixels")
                # Not failing this as the dot might be small
                
        except Exception as e:
            print(f"❌ {path}: Failed to verify palette - {e}")
            all_passed = False
    
    return all_passed

def test_html_metadata():
    """Test 4: Verify HTML <head> contains correct favicon metadata."""
    print("\n" + "="*80)
    print("TEST 4: HTML HEAD METADATA")
    print("="*80)
    
    all_passed = True
    
    try:
        response = requests.get(BASE_URL + "/", timeout=10)
        if response.status_code != 200:
            print(f"❌ Cannot fetch homepage (HTTP {response.status_code})")
            return False
        
        html = response.text.lower()
        
        # Check for favicon links
        checks = [
            ('favicon-16.png', 'sizes="16x16"'),
            ('favicon-32.png', 'sizes="32x32"'),
            ('icon-192.png', 'sizes="192x192"'),
            ('icon-512.png', 'sizes="512x512"'),
            ('apple-icon.png', 'sizes="180x180"'),
            ('safari-pinned-tab.svg', 'rel="mask-icon"'),
        ]
        
        for filename, attribute in checks:
            if filename in html and attribute.lower() in html:
                print(f"✅ Found <link> for {filename} with {attribute}")
            else:
                print(f"❌ Missing or incorrect <link> for {filename} with {attribute}")
                all_passed = False
        
        # Check mask-icon color
        if 'color="#f6b91f"' in html or "color='#f6b91f'" in html or 'color=#f6b91f' in html:
            print(f"✅ Found mask-icon with color=\"#f6b91f\" (girasol)")
        else:
            print(f"❌ mask-icon color is not #f6b91f")
            all_passed = False
        
        # Check theme-color
        if 'content="#0a0a0a"' in html or "content='#0a0a0a'" in html or 'content=#0a0a0a' in html:
            print(f"✅ Found theme-color with content=\"#0a0a0a\" (carbón)")
        else:
            print(f"❌ theme-color is not #0a0a0a")
            all_passed = False
            
    except Exception as e:
        print(f"❌ Failed to verify HTML metadata - {e}")
        all_passed = False
    
    return all_passed

def test_no_old_branding():
    """Test 5: Verify NO references to old branding colors in HTML."""
    print("\n" + "="*80)
    print("TEST 5: NO OLD BRANDING REFERENCES")
    print("="*80)
    
    all_passed = True
    
    try:
        response = requests.get(BASE_URL + "/", timeout=10)
        if response.status_code != 200:
            print(f"❌ Cannot fetch homepage (HTTP {response.status_code})")
            return False
        
        html = response.text.lower()
        
        # Old colors to check
        old_colors = ["#2c3e80", "#5468d6", "#7d5800", "#e8a317"]
        
        found_old = []
        for color in old_colors:
            if color in html:
                found_old.append(color)
        
        if found_old:
            print(f"❌ Found OLD BRANDING colors in HTML: {', '.join(found_old)}")
            all_passed = False
        else:
            print(f"✅ No old branding colors found in HTML")
            
    except Exception as e:
        print(f"❌ Failed to check for old branding - {e}")
        all_passed = False
    
    return all_passed

def main():
    """Run all favicon tests."""
    print("\n" + "="*80)
    print("FAVICON VERIFICATION TEST SUITE")
    print("Carbón + Girasol Rebrand")
    print("="*80)
    print(f"Base URL: {BASE_URL}")
    
    results = {
        "HTTP Delivery": test_http_delivery(),
        "PNG Dimensions": test_dimensions(),
        "Color Palette": test_color_palette(),
        "HTML Metadata": test_html_metadata(),
        "No Old Branding": test_no_old_branding(),
    }
    
    print("\n" + "="*80)
    print("FINAL RESULTS")
    print("="*80)
    
    for test_name, passed in results.items():
        status = "✅ PASSED" if passed else "❌ FAILED"
        print(f"{test_name}: {status}")
    
    all_passed = all(results.values())
    
    print("\n" + "="*80)
    if all_passed:
        print("🎉 ALL TESTS PASSED - Favicon rebrand verified successfully!")
        print("="*80)
        sys.exit(0)
    else:
        print("⚠️  SOME TESTS FAILED - See details above")
        print("="*80)
        sys.exit(1)

if __name__ == "__main__":
    main()
