import requests
import unittest
import sys
import os
import json
import random
import string

# Get the backend URL from the frontend .env file
BACKEND_URL = "https://37ce022c-c890-4e7c-b8f7-01bec4e039e1.preview.emergentagent.com"
API_URL = f"{BACKEND_URL}/api"

def random_email():
    """Generate a random email for testing"""
    random_str = ''.join(random.choices(string.ascii_lowercase + string.digits, k=8))
    return f"test_{random_str}@example.com"

class PrognosCoreAPITest(unittest.TestCase):
    """Test suite for PrognosCore API endpoints"""
    
    def test_01_root_endpoint(self):
        """Test the root API endpoint"""
        print("\n🔍 Testing root endpoint...")
        response = requests.get(f"{API_URL}/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("message", data)
        self.assertIn("PrognosCore API", data["message"])
        print("✅ Root endpoint test passed")
    
    def test_02_newsletter_signup(self):
        """Test newsletter signup functionality"""
        print("\n🔍 Testing newsletter signup...")
        email = random_email()
        
        # Test successful signup
        response = requests.post(
            f"{API_URL}/newsletter", 
            json={"email": email}
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("id", data)
        self.assertEqual(data["email"], email)
        print(f"✅ Newsletter signup successful with email: {email}")
        
        # Test duplicate email rejection
        response = requests.post(
            f"{API_URL}/newsletter", 
            json={"email": email}
        )
        self.assertEqual(response.status_code, 400)
        print("✅ Duplicate email rejection test passed")
        
        # Test invalid email format
        response = requests.post(
            f"{API_URL}/newsletter", 
            json={"email": "invalid-email"}
        )
        self.assertEqual(response.status_code, 422)
        print("✅ Invalid email format test passed")
    
    def test_03_contact_form(self):
        """Test contact form submission"""
        print("\n🔍 Testing contact form submission...")
        contact_data = {
            "name": "Test User",
            "email": random_email(),
            "company": "Test Company",
            "reason": "general-inquiry",
            "message": "This is a test message from the automated test suite."
        }
        
        response = requests.post(
            f"{API_URL}/contact", 
            json=contact_data
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("id", data)
        self.assertEqual(data["name"], contact_data["name"])
        self.assertEqual(data["email"], contact_data["email"])
        print("✅ Contact form submission test passed")
        
        # Test with missing required fields
        incomplete_data = {
            "name": "Test User",
            "email": random_email()
            # Missing reason and message
        }
        response = requests.post(
            f"{API_URL}/contact", 
            json=incomplete_data
        )
        self.assertEqual(response.status_code, 422)
        print("✅ Missing fields validation test passed")
    
    def test_04_get_newsletter_signups(self):
        """Test retrieving newsletter signups"""
        print("\n🔍 Testing newsletter signups retrieval...")
        response = requests.get(f"{API_URL}/newsletter")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIsInstance(data, list)
        if data:
            self.assertIn("email", data[0])
            self.assertIn("id", data[0])
        print(f"✅ Retrieved {len(data)} newsletter signups")
    
    def test_05_get_contacts(self):
        """Test retrieving contacts"""
        print("\n🔍 Testing contacts retrieval...")
        response = requests.get(f"{API_URL}/contacts")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIsInstance(data, list)
        if data:
            self.assertIn("name", data[0])
            self.assertIn("email", data[0])
            self.assertIn("message", data[0])
        print(f"✅ Retrieved {len(data)} contacts")

if __name__ == "__main__":
    print(f"🚀 Running API tests against {API_URL}")
    unittest.main(argv=['first-arg-is-ignored'], exit=False)
    print("\n📊 API Testing completed")
