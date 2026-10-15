src/
├── components/     # component dùng chung (Button, Modal...)
├── pages/          # các trang
├── hooks/          # custom hooks
├── services/       # gọi API
├── types/          # kiểu TypeScript dùng chung
├── utils/          # hàm helper
├── App.tsx
└── main.tsx



npm install tailwindcss @tailwindcss/vite
npm install -D @types/node
npm install react-router-dom

Nhu cầu	Thư viện
<!-- Routing	react-router-dom -->
<!-- Gọi API + cache	@tanstack/react-query + axios -->
Form	react-hook-form
State toàn cục (nếu cần)	zustand


6. Nối với backend thật

Khi backend ASP.NET Core của bạn chạy, đổi VITE_API_URL sang địa chỉ API đó. Lưu ý bật CORS phía .NET cho origin http://localhost:5173:

csharp
builder.Services.AddCors(o => o.AddPolicy("dev", p =>
    p.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod()));

app.UseCors("dev");