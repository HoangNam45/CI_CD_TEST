# Dùng Node.js 18
FROM node:18

# Cài đặt thư viện cần thiết cho node-gyp
RUN apt-get update && apt-get install -y python3 build-essential && \
    rm -rf /var/lib/apt/lists/*

# Đặt thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json trước
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ source code
COPY . .

# Expose cổng 5000
EXPOSE 5000

# Chạy server
CMD ["npm", "start"]
