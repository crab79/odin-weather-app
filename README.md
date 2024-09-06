# A project template with Prettier & ESlint
# Notice

Before you deploy a website on github, follow the following steps.

# Step1: Edit .gitignore file, and comment out dist in this area 

Nuxt.js build / generate output  
.nuxt  
dist  

# Step2: Run the scripts

npm run gh-deploy  
npm run gh-deploy-init  

# Step3: Change the web deploy branch on github 

# Step4: Change to another branch before you push
先在main保存變更  
點選 簽出至 gh-page  
然後只push你要的部份(記得把檔案從資料夾撈出來，不能放到資料夾裡面)  

# To Use ESlint
npx audit fix  
https://eslint.org/docs/latest/use/getting-started  

# To Use Prettier
npx prettier --check src/  
npx prettier --write src/  
https://prettier.io/docs/en/install
