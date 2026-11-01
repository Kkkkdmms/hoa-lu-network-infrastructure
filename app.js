const details = {
  wan: ['Miền mô phỏng', 'Điểm WAN của sơ đồ là ISP/Internet mô phỏng trong Cisco Packet Tracer. Kiểm thử NAT/PAT phản ánh môi trường lab, không phải Internet công cộng.'],
  edge: ['Thiết bị biên', 'Router EDGE đảm nhiệm định tuyến ra miền ISP mô phỏng và NAT/PAT. Hồ sơ hiện hành có minh chứng PAT nguồn Sales; không cung cấp dịch vụ truy cập từ Internet thật.'],
  core1: ['Core chính', 'CORE1 là switch Layer 3 Catalyst 3560, tham gia các SVI, HSRP, ACL theo VLAN và EtherChannel/LACP được mô tả trong hồ sơ. Trạng thái failover vật lý chưa được khẳng định.'],
  core2: ['Core dự phòng', 'CORE2 là switch Layer 3 Catalyst 3560. Hồ sơ ghi nhận vai trò HSRP standby ở các ảnh đối chiếu; một số kiểm thử gateway còn một phần.'],
  access1: ['Access tầng 1', 'SW-T1 phục vụ VLAN 10 (SALES) theo sơ đồ và hồ sơ thiết kế.'],
  access2: ['Access tầng 2', 'SW-T2 phục vụ các VLAN 20 (BGĐ), 30 (HR) và 40 (ACCOUNTING) theo hồ sơ.'],
  access3: ['Access tầng 3', 'SW-T3 phục vụ các VLAN 50 (IT), 60 (SERVER), 70 (CAM_IOT), 90 (VOICE) và 99 (MGMT). VLAN 80 Guest có kiểm chứng TC10/TC11; vị trí kết nối vật lý không suy ra từ sơ đồ cũ.'],
};
const viewport = document.getElementById('diagramViewport');
const canvas = document.getElementById('diagramCanvas');
const zoomLabel = document.getElementById('zoomLabel');
const detail = document.getElementById('nodeDetail');
let zoom = 1;
let offsetX = 0;
let offsetY = 0;
let dragging = false;
let origin = null;

function renderTransform() {
  canvas.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${zoom})`;
  zoomLabel.textContent = `${Math.round(zoom * 100)}%`;
}
function resetView() { zoom = Math.min(1, (viewport.clientWidth - 30) / 1100); offsetX = 0; offsetY = 0; renderTransform(); }
document.getElementById('zoomIn').addEventListener('click', () => { zoom = Math.min(1.5, zoom + 0.1); renderTransform(); });
document.getElementById('zoomOut').addEventListener('click', () => { zoom = Math.max(0.55, zoom - 0.1); renderTransform(); });
document.getElementById('fitView').addEventListener('click', resetView);
viewport.addEventListener('wheel', event => { event.preventDefault(); zoom = Math.max(0.55, Math.min(1.5, zoom + (event.deltaY < 0 ? 0.06 : -0.06))); renderTransform(); }, { passive: false });
viewport.addEventListener('pointerdown', event => { if (event.target.closest('.node')) return; dragging = true; origin = { x: event.clientX - offsetX, y: event.clientY - offsetY }; viewport.classList.add('dragging'); viewport.setPointerCapture(event.pointerId); });
viewport.addEventListener('pointermove', event => { if (!dragging || !origin) return; offsetX = event.clientX - origin.x; offsetY = event.clientY - origin.y; renderTransform(); });
function endDrag() { dragging = false; origin = null; viewport.classList.remove('dragging'); }
viewport.addEventListener('pointerup', endDrag);
viewport.addEventListener('pointercancel', endDrag);
document.querySelectorAll('.node').forEach(node => node.addEventListener('click', () => {
  const item = details[node.dataset.node];
  detail.querySelector('.detail-tag').textContent = item[0].toUpperCase();
  detail.querySelector('p').textContent = item[1];
  detail.classList.add('visible');
}));
document.getElementById('closeDetail').addEventListener('click', () => detail.classList.remove('visible'));
const presentationToggle = document.getElementById('presentationToggle');
presentationToggle.addEventListener('click', () => {
  const active = document.body.classList.toggle('presentation-mode');
  presentationToggle.setAttribute('aria-pressed', String(active));
  presentationToggle.querySelector('span').textContent = active ? 'Thoát trình bày' : 'Trình bày';
});
resetView();

viewport.addEventListener('keydown', event => {
  const deltas = {ArrowLeft: [40,0], ArrowRight: [-40,0], ArrowUp:[0,40], ArrowDown:[0,-40]};
  if(deltas[event.key]) { event.preventDefault(); offsetX += deltas[event.key][0]; offsetY += deltas[event.key][1]; renderTransform(); }
  if(event.key === 'Escape') detail.classList.remove('visible');
  if(event.key === 'Home') { event.preventDefault(); resetView(); }
});
window.addEventListener('resize', resetView);
