// const sql = require('mssql');

// const config = {
//     user: "sa", // User từ docker-compose.yml
//     password: "StrongP@ssw0rd!", // Password từ docker-compose.yml
//     server: "database", // Tên service trong docker-compose.yml
//     database: "Shopee", // Đúng với tên database trong SQL Server
//     port: 1433, // Cổng mặc định của SQL Server trong Docker
//     options: {
//         encrypt: false, // Không dùng SSL
//         enableArithAbort: true,
//         trustServerCertificate: true, // Fix lỗi chứng chỉ
//     },
// };

// const poolPromise = new sql.ConnectionPool(config)
//     .connect()
//     .then((pool) => {
//         console.log("Connected to SQL Server");
//         return pool;
//     })
//     .catch((err) => {
//         console.error("Database Connection Failed!", err);
//         process.exit(1);
//     });

// module.exports = {
//     sql,
//     poolPromise,
// };

const sql = require("mssql");

const config = {
  user: "sa",
  password: "StrongP@ssw0rd!",
  server: "database",  // Dùng tên service trong docker-compose
  database: "Shopee",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

// Hàm tạo poolPromise và retry nếu lỗi
const createPoolWithRetry = async (retries = 10, delay = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const pool = await new sql.ConnectionPool(config).connect();
      console.log("✅ Database connected successfully!");
      return pool;
    } catch (err) {
      console.error(`❌ Database connection failed (${i + 1}/${retries})`, err);
      await new Promise(res => setTimeout(res, delay));
    }
  }
  console.error("❌ Database connection failed after multiple retries. Exiting...");
  process.exit(1);
};

// Khởi tạo poolPromise ngay khi module được load
const poolPromise = createPoolWithRetry();

module.exports = {
  sql,
  poolPromise,
};

