# Hồ sơ hạ tầng mạng LAN — Trường Đại học Hoa Lư

Website HTML/CSS/JavaScript tĩnh cho đồ án học tập. Logo gốc do người dùng cung cấp, giữ nguyên tỷ lệ và màu sắc.

## Các trang

- index.html: tổng quan, kiến trúc tương tác, bảng 10 VLAN/IP và trạng thái kiểm thử.
- kiem-thu.html: 21 ca kiểm thử lấy từ hồ sơ nguồn, tìm kiếm/lọc và liên kết trực tiếp từng ca.
- tai-lieu.html: giải thích kiến trúc, dịch vụ, chính sách và phạm vi kiểm chứng.

Kết quả nguồn: 19 ca đạt trong phạm vi, 2 ca một phần (TC02, FT02), complete=false. Không có dữ liệu giám sát trực tiếp. Không gọi tới IP lab, VM hoặc localhost; toàn bộ logic chạy ở trình duyệt, không cần máy người dùng bật khi host trên GitHub Pages hoặc hosting tĩnh khác.

## Bảo toàn dữ liệu

Thống kê và quan sát lấy từ full-tests/results.json. Tên ca và tiêu chí lấy từ index.html gốc. Bảng VLAN lấy từ Ho-so-thiet-ke.html. Bản gốc và toàn bộ ảnh/video, cấu hình, Packet Tracer được giữ trong bộ bàn giao cục bộ; không nằm trong bộ public này.

## Cập nhật

Sửa trang, đối chiếu dữ liệu với hồ sơ nguồn, kiểm tra cú pháp JS và các liên kết rồi commit/push lên nhánh được GitHub Pages phục vụ. Thay đổi sẽ được host xây dựng lại. Không đăng cấu hình hoặc thông tin xác thực. Không mua domain; sử dụng tên miền mặc định của hosting miễn phí.

## Tài liệu tham khảo

- https://github.com/anthropics/skills/tree/main/skills/frontend-design
- https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines
- https://github.com/xyflow/xyflow — đã kiểm tra MIT License, chưa tích hợp thư viện.

Không cài thêm thư viện UI để giữ nguyên công nghệ tĩnh và giảm phụ thuộc. Sơ đồ SVG chỉ thể hiện vai trò logic; không dùng ảnh sơ đồ cũ để khẳng định trạng thái vận hành mới.

## Trạng thái phát hành

Production: https://kkkkdmms.github.io/hoa-lu-network-infrastructure/ . Repository: https://github.com/Kkkkdmms/hoa-lu-network-infrastructure . GitHub Pages từ nhánh main, thư mục gốc, HTTPS bắt buộc. Đã mở trên Chrome và trình duyệt độc lập phiên GitHub, kiểm tra 3 trang, popup, zoom, tìm kiếm TC02, lọc 2 ca một phần, chế độ trình bày và màn hình 390 px. Ảnh kiểm thử thật lưu riêng trong outputs/kiem-thu-thuc-te; preview.png ở lượt đầu chỉ là minh họa cũ.


