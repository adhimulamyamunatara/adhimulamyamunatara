# 1. Go to your project folder
cd C:\Portfolio\my-portfolio

# 2. Check correct repo connection
git remote -v

# 3. (Optional but SAFE) reset remote to your repo
git remote set-url origin https://github.com/adhimulamyamunatara/adhimulamyamunatara.github.io.git

# 4. Ensure correct branch
git branch -M main

# 5. Pull latest changes (avoids conflicts)
git pull origin main --rebase

# 6. NOW your main update command
git add . && git commit -m "update" && git push && npm run deploy