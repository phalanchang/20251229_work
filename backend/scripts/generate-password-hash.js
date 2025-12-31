// パスワードハッシュ生成スクリプト
// 使用方法: node scripts/generate-password-hash.js <password>

import bcrypt from 'bcrypt';

const password = process.argv[2];

if (!password) {
  console.error('使用方法: node scripts/generate-password-hash.js <password>');
  process.exit(1);
}

// パスワードをハッシュ化
bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('エラー:', err);
    process.exit(1);
  }
  
  console.log('パスワード:', password);
  console.log('ハッシュ:', hash);
  console.log('\nSQL文:');
  console.log(`UPDATE users SET password_hash = '${hash}' WHERE email = 'test@example.com';`);
});

