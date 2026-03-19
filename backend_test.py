import requests
import sys
from datetime import datetime
import json

class ABSCloisonAPITester:
    def __init__(self, base_url="https://modular-spaces-5.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            print(f"   Expected: {expected_status}, Got: {response.status_code}")
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                if response.headers.get('content-type', '').startswith('application/json'):
                    try:
                        response_data = response.json()
                        print(f"   Response: {json.dumps(response_data, indent=2)[:200]}")
                        return success, response_data
                    except:
                        return success, {}
                else:
                    return success, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}")
                self.failed_tests.append({"test": name, "expected": expected_status, "actual": response.status_code, "response": response.text[:200]})
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({"test": name, "error": str(e)})
            return False, {}

    def test_basic_endpoints(self):
        """Test basic API endpoints"""
        print("\n📋 Testing Basic Endpoints...")
        
        # Test API root
        self.run_test("API Root", "GET", "/", 200)
        
        # Test testimonials endpoint
        success, data = self.run_test("Get Testimonials", "GET", "/testimonials", 200)
        if success and data:
            print(f"   Found {len(data)} testimonials")
            if len(data) >= 3:
                print("✅ Testimonials seeded correctly")
            else:
                print("⚠️  Expected at least 3 testimonials")
        
        # Test portfolio endpoint
        success, data = self.run_test("Get Portfolio", "GET", "/portfolio", 200)
        if success and data:
            print(f"   Found {len(data)} portfolio items")
            if len(data) >= 6:
                print("✅ Portfolio seeded correctly")
            else:
                print("⚠️  Expected at least 6 portfolio items")

    def test_devis_submission(self):
        """Test devis submission"""
        print("\n📝 Testing Devis Submission...")
        
        # Test valid devis submission
        devis_data = {
            "cloison_type": "vitree",
            "metrage": "25m",
            "hauteur": "2.70m",
            "confidentialite": "confidentiel",
            "nom": "Jean Test",
            "email": "jean.test@example.com",
            "telephone": "0700000000",
            "entreprise": "Test Company",
            "message": "Test devis submission"
        }
        
        success, response = self.run_test("Submit Valid Devis", "POST", "/devis", 200, devis_data)
        if success:
            print("✅ Devis submission working correctly")
            return response.get('id') if response else None
        else:
            print("❌ Devis submission failed")
            return None

    def test_rappel_submission(self):
        """Test rappel submission"""
        print("\n📞 Testing Rappel Submission...")
        
        # Test rappel submission
        rappel_data = {
            "telephone": "0700000001",
            "nom": "Test User"
        }
        
        success, response = self.run_test("Submit Rappel Request", "POST", "/rappel", 200, rappel_data)
        if success:
            print("✅ Rappel submission working correctly")
        else:
            print("❌ Rappel submission failed")

    def test_contact_submission(self):
        """Test contact submission"""
        print("\n💬 Testing Contact Submission...")
        
        # Test contact submission  
        contact_data = {
            "nom": "Test Contact",
            "email": "contact.test@example.com",
            "telephone": "0700000002",
            "sujet": "Test Subject",
            "message": "This is a test contact message"
        }
        
        success, response = self.run_test("Submit Contact Form", "POST", "/contact", 200, contact_data)
        if success:
            print("✅ Contact submission working correctly")
        else:
            print("❌ Contact submission failed")

    def test_error_scenarios(self):
        """Test error scenarios"""
        print("\n🚫 Testing Error Scenarios...")
        
        # Test invalid devis submission (missing required fields)
        invalid_devis = {
            "cloison_type": "vitree",
            # Missing required fields
        }
        
        self.run_test("Invalid Devis (missing fields)", "POST", "/devis", 422, invalid_devis)
        
        # Test invalid email format
        invalid_email_devis = {
            "cloison_type": "vitree",
            "nom": "Test User",
            "email": "invalid-email",
            "telephone": "0700000000"
        }
        
        self.run_test("Invalid Devis (bad email)", "POST", "/devis", 422, invalid_email_devis)

def main():
    print("🚀 Starting ABS Cloison API Tests")
    print("=" * 50)
    
    # Setup
    tester = ABSCloisonAPITester()

    # Run all tests
    tester.test_basic_endpoints()
    tester.test_devis_submission()
    tester.test_rappel_submission()
    tester.test_contact_submission()
    tester.test_error_scenarios()

    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Test Results Summary:")
    print(f"   Tests Run: {tester.tests_run}")
    print(f"   Tests Passed: {tester.tests_passed}")
    print(f"   Tests Failed: {tester.tests_run - tester.tests_passed}")
    print(f"   Success Rate: {(tester.tests_passed/tester.tests_run*100):.1f}%")
    
    if tester.failed_tests:
        print(f"\n❌ Failed Tests:")
        for failure in tester.failed_tests:
            print(f"   - {failure.get('test', 'Unknown')}: {failure.get('error', 'Status mismatch')}")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())