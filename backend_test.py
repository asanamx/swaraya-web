#!/usr/bin/env python3
"""
Backend test for /api/og endpoint verification.

Tests:
1. GET /api/og returns HTTP 200 with Content-Type: image/png
2. Response body is a valid PNG with correct magic bytes and dimensions
3. PNG can be opened with PIL and has size (1200, 630)
4. Two consecutive requests both work
5. Home page has correct og:image meta tag
6. PNG size is reasonable (>20KB, <500KB)
"""

import requests
import io
import struct
from PIL import Image
from bs4 import BeautifulSoup

# Base URL from environment
BASE_URL = "https://nextjs-swaraya.preview.emergentagent.com"
OG_ENDPOINT = f"{BASE_URL}/api/og"
HOME_URL = BASE_URL

def test_og_endpoint_basic():
    """Test 1: Basic HTTP 200 and Content-Type verification"""
    print("\n" + "="*80)
    print("TEST 1: Basic HTTP 200 and Content-Type verification")
    print("="*80)
    
    try:
        response = requests.get(OG_ENDPOINT, timeout=30)
        
        print(f"✓ Request URL: {OG_ENDPOINT}")
        print(f"✓ Status Code: {response.status_code}")
        print(f"✓ Content-Type: {response.headers.get('Content-Type', 'NOT SET')}")
        print(f"✓ Content-Length: {len(response.content)} bytes")
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        content_type = response.headers.get('Content-Type', '')
        assert 'image/png' in content_type, f"Expected image/png, got {content_type}"
        
        print("\n✅ TEST 1 PASSED: Endpoint returns 200 with image/png")
        return response.content
        
    except Exception as e:
        print(f"\n❌ TEST 1 FAILED: {str(e)}")
        raise


def test_png_magic_bytes(png_data):
    """Test 2: Verify PNG magic bytes signature"""
    print("\n" + "="*80)
    print("TEST 2: PNG Magic Bytes Verification")
    print("="*80)
    
    try:
        # PNG magic bytes: 89 50 4E 47 0D 0A 1A 0A
        expected_magic = b'\x89\x50\x4E\x47\x0D\x0A\x1A\x0A'
        actual_magic = png_data[:8]
        
        print(f"✓ Expected magic bytes: {expected_magic.hex().upper()}")
        print(f"✓ Actual magic bytes:   {actual_magic.hex().upper()}")
        
        assert actual_magic == expected_magic, f"Invalid PNG magic bytes"
        
        print("\n✅ TEST 2 PASSED: Valid PNG magic bytes")
        
    except Exception as e:
        print(f"\n❌ TEST 2 FAILED: {str(e)}")
        raise


def test_png_dimensions(png_data):
    """Test 2b: Verify PNG dimensions from IHDR chunk"""
    print("\n" + "="*80)
    print("TEST 2b: PNG Dimensions from IHDR chunk")
    print("="*80)
    
    try:
        # IHDR chunk starts at byte 8, dimensions are at bytes 16-23
        # Width: bytes 16-19 (big-endian)
        # Height: bytes 20-23 (big-endian)
        width_bytes = png_data[16:20]
        height_bytes = png_data[20:24]
        
        width = struct.unpack('>I', width_bytes)[0]
        height = struct.unpack('>I', height_bytes)[0]
        
        print(f"✓ Width from IHDR:  {width}px")
        print(f"✓ Height from IHDR: {height}px")
        
        assert width == 1200, f"Expected width 1200, got {width}"
        assert height == 630, f"Expected height 630, got {height}"
        
        print("\n✅ TEST 2b PASSED: PNG dimensions are 1200×630")
        
    except Exception as e:
        print(f"\n❌ TEST 2b FAILED: {str(e)}")
        raise


def test_png_size_reasonable(png_data):
    """Test 2c: Verify PNG size is reasonable (not error image)"""
    print("\n" + "="*80)
    print("TEST 2c: PNG Size Reasonableness Check")
    print("="*80)
    
    try:
        size_bytes = len(png_data)
        size_kb = size_bytes / 1024
        
        print(f"✓ PNG size: {size_bytes} bytes ({size_kb:.2f} KB)")
        
        assert size_bytes > 20 * 1024, f"PNG too small ({size_kb:.2f} KB), likely an error image"
        assert size_bytes < 500 * 1024, f"PNG too large ({size_kb:.2f} KB), unexpected"
        
        print(f"✓ Size is within expected range (20 KB - 500 KB)")
        print("\n✅ TEST 2c PASSED: PNG size is reasonable")
        
    except Exception as e:
        print(f"\n❌ TEST 2c FAILED: {str(e)}")
        raise


def test_pil_validation(png_data):
    """Test 3: Validate PNG with PIL/Pillow"""
    print("\n" + "="*80)
    print("TEST 3: PIL/Pillow Validation")
    print("="*80)
    
    try:
        img = Image.open(io.BytesIO(png_data))
        
        print(f"✓ PIL successfully opened the image")
        print(f"✓ Format: {img.format}")
        print(f"✓ Size: {img.size}")
        print(f"✓ Mode: {img.mode}")
        
        assert img.format == 'PNG', f"Expected PNG format, got {img.format}"
        assert img.size == (1200, 630), f"Expected (1200, 630), got {img.size}"
        
        print("\n✅ TEST 3 PASSED: PIL validation successful")
        
    except Exception as e:
        print(f"\n❌ TEST 3 FAILED: {str(e)}")
        raise


def test_consecutive_requests():
    """Test 4: Two consecutive requests both work"""
    print("\n" + "="*80)
    print("TEST 4: Consecutive Requests")
    print("="*80)
    
    try:
        print("Making first request...")
        response1 = requests.get(OG_ENDPOINT, timeout=30)
        print(f"✓ Request 1: Status {response1.status_code}, Size {len(response1.content)} bytes")
        
        assert response1.status_code == 200, f"Request 1 failed with {response1.status_code}"
        assert 'image/png' in response1.headers.get('Content-Type', ''), "Request 1 not image/png"
        
        print("\nMaking second request...")
        response2 = requests.get(OG_ENDPOINT, timeout=30)
        print(f"✓ Request 2: Status {response2.status_code}, Size {len(response2.content)} bytes")
        
        assert response2.status_code == 200, f"Request 2 failed with {response2.status_code}"
        assert 'image/png' in response2.headers.get('Content-Type', ''), "Request 2 not image/png"
        
        # Verify both are valid PNGs
        img1 = Image.open(io.BytesIO(response1.content))
        img2 = Image.open(io.BytesIO(response2.content))
        
        print(f"✓ Both images are valid PNGs with size {img1.size}")
        
        print("\n✅ TEST 4 PASSED: Consecutive requests both work")
        
    except Exception as e:
        print(f"\n❌ TEST 4 FAILED: {str(e)}")
        raise


def test_home_og_meta():
    """Test 5: Verify home page has correct og:image meta tag"""
    print("\n" + "="*80)
    print("TEST 5: Home Page og:image Meta Tag")
    print("="*80)
    
    try:
        response = requests.get(HOME_URL, timeout=30)
        print(f"✓ Home page status: {response.status_code}")
        
        assert response.status_code == 200, f"Home page returned {response.status_code}"
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find og:image meta tag
        og_image = soup.find('meta', property='og:image')
        
        if og_image:
            og_url = og_image.get('content', '')
            print(f"✓ Found og:image meta tag")
            print(f"✓ Content: {og_url}")
            
            # Verify it points to /api/og
            assert '/api/og' in og_url, f"og:image doesn't point to /api/og: {og_url}"
            assert BASE_URL in og_url or og_url.startswith('/api/og'), \
                f"og:image URL doesn't match expected domain: {og_url}"
            
            print(f"✓ og:image correctly points to /api/og endpoint")
        else:
            raise AssertionError("og:image meta tag not found in home page")
        
        # Also check Twitter card
        twitter_image = soup.find('meta', attrs={'name': 'twitter:image'})
        if twitter_image:
            twitter_url = twitter_image.get('content', '')
            print(f"✓ Found twitter:image: {twitter_url}")
        
        print("\n✅ TEST 5 PASSED: Home page has correct og:image meta tag")
        
    except Exception as e:
        print(f"\n❌ TEST 5 FAILED: {str(e)}")
        raise


def main():
    """Run all tests"""
    print("\n" + "="*80)
    print("STARTING /api/og ENDPOINT VERIFICATION")
    print("="*80)
    print(f"Base URL: {BASE_URL}")
    print(f"OG Endpoint: {OG_ENDPOINT}")
    
    all_passed = True
    
    try:
        # Test 1: Basic endpoint check
        png_data = test_og_endpoint_basic()
        
        # Test 2: PNG magic bytes
        test_png_magic_bytes(png_data)
        
        # Test 2b: PNG dimensions
        test_png_dimensions(png_data)
        
        # Test 2c: PNG size check
        test_png_size_reasonable(png_data)
        
        # Test 3: PIL validation
        test_pil_validation(png_data)
        
        # Test 4: Consecutive requests
        test_consecutive_requests()
        
        # Test 5: Home page meta tag
        test_home_og_meta()
        
    except Exception as e:
        all_passed = False
        print(f"\n{'='*80}")
        print(f"TEST SUITE FAILED")
        print(f"{'='*80}")
        print(f"Error: {str(e)}")
    
    if all_passed:
        print("\n" + "="*80)
        print("✅ ALL TESTS PASSED")
        print("="*80)
        print("\nSUMMARY:")
        print("  ✓ Endpoint returns HTTP 200 with image/png")
        print("  ✓ PNG has valid magic bytes (89 50 4E 47 0D 0A 1A 0A)")
        print("  ✓ PNG dimensions are 1200×630 (from IHDR chunk)")
        print("  ✓ PNG size is reasonable (>20KB, <500KB)")
        print("  ✓ PIL can open and validate the PNG")
        print("  ✓ Consecutive requests both work correctly")
        print("  ✓ Home page has correct og:image meta tag")
        print("\n/api/og endpoint is working correctly! ✅")
        return 0
    else:
        return 1


if __name__ == "__main__":
    exit(main())
