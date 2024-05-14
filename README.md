# Hướng dẫn

## Yêu cầu

- nvm (node version manager):
  - MacOS: <https://github.com/nvm-sh/nvm>
  - Windows: <https://github.com/coreybutler/nvm-windows>
- Node: 20.11.1 (nvm sẽ tự động cài đặt phiên bản này nếu chưa có)
  - MacOS: <https://nodejs.org/dist/v20.11.1/node-v20.11.1.pkg>
  - Windows: <https://nodejs.org/dist/v20.11.1/node-v20.11.1-x64.msi>
- Dùng npm, không dùng các công cụ khác để tránh xung đột

## Cài đặt

```bash
npm i --color=always
```

## Chạy ở môi trường development

```bash
npm run dev
```

Khi thành công sẽ thấy terminal/console hiển thị thông báo:

```bash
▲ Next.js 14.1.3
- Local:        http://localhost:3000
- Environments: .env
```

## Kiểm tra lỗi (chạy thủ công)

```bash
npm run lint:check
```

## Sửa lỗi (chạy thủ công)

```bash
npm run lint:fix
```

## Một số quy ước

### Quy ước đặt tên

- Tên biến: `camelCase`
- Tên hàm: `camelCase`
- Tên biến parameter: `camelCase`
- Tên biến argument: `camelCase`

- Tên biến private: `_camelCase`
- Tên biến protected: `camelCase_`
- Tên biến static: `camelCase_`
- Tên class: `PascalCase`
- Tên hằng số: `UPPER_CASE`
- Tên file: `kebab-case`
- Tên thư mục: `kebab-case`

### Quy ước đặt tên type typescript

- Dùng tiền tố `I_` cho interface (ví dụ: `I_User`)
- Dùng tiền tố `T_` cho type (ví dụ: `T_User`)
- Dùng tiền tố `E_` cho enum (ví dụ: `E_User`)

### Quy ước đặt tên biến môi trường

- Dùng tiền tố `REACT_APP_` cho biến môi trường của react
- Dùng tiền tố `NEXT_PUBLIC_` cho biến môi trường của nextjs
- Dùng tiền tố `VITE_` cho biến môi trường của vite
- Dùng tiền tố `NODE_` cho biến môi trường của node

### Quy ước viết code

- Không dùng `var`
- Không dùng `==`
- Xóa `console.log` trước khi commit
- Xóa `debugger` trước khi commit
- Không dùng `any`, `unknown`, `never` nếu không cần thiết
- Không dùng `@ts-ignore`
- Không dùng `@ts-nocheck`

### Quy ước commit

- Commit message có dạng: `type(scope): message` (ví dụ: `feat(user): add user feature`)

### Quy ước pull request

- Pull request có dạng: `type(scope): message` (ví dụ: `feat(user): add user feature`)

## Cấu trúc thư mục và ý nghĩa

```text
.
├── api/                   => Tích hợp API
├── app/                   => Logic ứng dụng
├── assets/                => Tài nguyên
├── auth/                  => Xác thực
├── components/            => Các thành phần tái sử dụng
├── hooks/                 => Hook React tùy chỉnh
├── layouts/               => Bố cục
├── public/                => Tài nguyên công khai
├── routes/                => Routing
├── sections/              => Các phần của ứng dụng
├── theme/                 => Cấu hình chủ đề
├── types/                 => Định nghĩa kiểu TypeScript
├── utils/                 => Tiện ích
├── .env                   => Biến môi trường
├── .commitlintrc          => Quy ước commit
├── .editorconfig          => Quy ước định dạng mã
├── .env.example           => Mẫu biến môi trường
├── .eslintrc              => Cấu hình eslint
├── .gitignore             => Cấu hình git
├── .lintstagedrc          => Cấu hình lint-staged
├── .ncurc.js              => Cấu hình commitizen
├── .nvmrc                 => Phiên bản Node
├── .prettierrc            => Quy ước định dạng mã
├── next-env.d.ts          => Kiểu Next.js
├── next.config.mjs        => Cấu hình Next.js
├── package-lock.json      => Cấu hình npm
├── package.json           => Cấu hình npm
├── postcss.config.js      => Cấu hình postcss
├── README.md              => Hướng dẫn
├── tailwind.config.ts     => Cấu hình tailwindcss
└── tsconfig.json          => Cấu hình TypeScript
```
## deploy server 
### set up self hosted runner action on VPS
- access github settings>actions>runners>New self-hosted runner
- follow documents
when run config it will require sudo, run cmd as below instead (add RUNNER_ALLOW_RUNASROOT=1 before config)
```
RUNNER_ALLOW_RUNASROOT=1 ./config.cmd --url https://github.com/xxxxxx --token xxxxxxxxxx
```
to start runner as service, instead of run.sh, run below cmds:
for help
```
sudo ./svc.sh help
```
install and start
```
sudo ./svc.sh install
sudo ./svc.sh start
```
to check runner status
```
sudo ./svc.sh status
```
### install pm2
```
npm install pm2 -g
```
- To automatically generate and configuration a startup script
```
pm2 startup
```
- Once you have started all desired apps, save the app list so it will respawn after reboot
```
pm2 save
```
### nginx
- install nginx
```
apt install -y nginx
```
### Copy default nginx config to new file
- Use your own hostname (staging:  staging.saybong.com/saybong.com)
```
cp /etc/nginx/sites-available/default /etc/nginx/sites-available/saybong-staging
```
- edit above file, update your own server name and port
```
server {
    listen 80;
    server_name  staging.saybong.com;

    location / {
        proxy_pass http://127.0.0.1:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
- link config file from site sites-available to sites-enable
```
ln -s /etc/nginx/sites-available/saybong-staging /etc/nginx/sites-enabled/saybong-staging
```
- Test config
```
service nginx configtest
```
- Restart nginx
```
service nginx restart
```
- Startup default run nginx
```
update-rc.d nginx defaults
```
- check nginx status
```
service nginx status
```
- status working but website can not be reached (if you want to run without SSL follow below, if not, skip this and continue set up SSL)
run below command in server
```
curl -v http://localhost
```
if resposne nginx html page -> good
check firewall
```
sudo ufw status
```
if no port 80 allow
```
sudo ufw allow 80/tcp
```
### Setup SSL for domain
- Enable firewall
```
sudo ufw enable
```
- Enable SSH
```
sudo ufw allow ssh
```
- Allow SSL in nginx
```
ufw allow 'Nginx Full'
```
- if you already add rule to allow port 80 and run without ssl run below command to remove it
```
sudo ufw delete deny 80/tcp
```
- Install cerbot
```
add-apt-repository ppa:certbot/certbot
```

```
apt-get update
```

```
apt-get install python3-certbot-nginx
```

- Test nginx config

```
nginx -t
```

Reload nginx

```
systemctl reload nginx
```
- Apply cerbot to domain ( staging.saybong.com)

```
certbot --nginx -d  staging.saybong.com
```

Choose 1 (no redirect) or 2 (redirect) base on your need
Auto renew SSL certificate

```
certbot renew --dry-run
```
