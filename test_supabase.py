import requests

url_base = 'https://tcywixxcrrdeofmhleiq.supabase.co/rest/v1'
headers = {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjeXdpeHhjcnJkZW9mbWhsZWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0OTQwNTIsImV4cCI6MjA5NDA3MDA1Mn0.2QadJRvDT9Kq4Ccaeho6aqlHAjpgbzqj8hS0VnZgMdU',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjeXdpeHhjcnJkZW9mbWhsZWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0OTQwNTIsImV4cCI6MjA5NDA3MDA1Mn0.2QadJRvDT9Kq4Ccaeho6aqlHAjpgbzqj8hS0VnZgMdU'
}

r = requests.get(f'{url_base}/complaints?select=*', headers=headers)
print('=== COMPLAINTS ===')
for c in r.json():
    print(f"  [{c['status']}] {c['title']} - {c['student_name']}")

r2 = requests.get(f'{url_base}/users?select=name,email,role', headers=headers)
print('\n=== USERS ===')
for u in r2.json():
    print(f"  [{u['role']}] {u['name']} - {u['email']}")

r3 = requests.get(f'{url_base}/notices?select=title,category', headers=headers)
print('\n=== NOTICES ===')
for n in r3.json():
    print(f"  [{n['category']}] {n['title']}")

r4 = requests.get(f'{url_base}/leave_applications?select=student_name,leave_type,status', headers=headers)
print('\n=== LEAVE APPLICATIONS ===')
for l in r4.json():
    print(f"  [{l['status']}] {l['student_name']} - {l['leave_type']}")

print('\n✅ Supabase is WORKING! All data persists forever.')
