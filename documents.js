const search = document.querySelector('#caseSearch');
const statusSelect = document.querySelector('#caseStatus');
const cases = [...document.querySelectorAll('.test-case')];
function filterCases() {
  const query = (search?.value || '').toLocaleLowerCase('vi');
  const status = statusSelect?.value || 'all';
  let visible = 0;
  for (const item of cases) {
    item.hidden = !(item.textContent.toLocaleLowerCase('vi').includes(query) && (status === 'all' || item.dataset.status === status));
    if (!item.hidden) visible++;
  }
  document.querySelector('#caseCount').textContent = `${visible} / ${cases.length} kịch bản`;
  document.querySelector('#noCases').hidden = visible !== 0;
  const url = new URL(location.href);
  query ? url.searchParams.set('q', search.value) : url.searchParams.delete('q');
  status !== 'all' ? url.searchParams.set('status', status) : url.searchParams.delete('status');
  history.replaceState(null, '', url);
}
if (search) {
  const params = new URLSearchParams(location.search);
  search.value = params.get('q') || '';
  statusSelect.value = ['pass', 'partial'].includes(params.get('status')) ? params.get('status') : 'all';
  search.addEventListener('input', filterCases);
  statusSelect.addEventListener('change', filterCases);
  filterCases();
}
if (location.hash) {
  const selected = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (selected?.tagName === 'DETAILS') selected.open = true;
}
document.querySelector('#presentationToggle')?.addEventListener('click', event => {
  const active = document.body.classList.toggle('presentation-mode');
  event.currentTarget.setAttribute('aria-pressed', String(active));
  event.currentTarget.querySelector('span').textContent = active ? 'Thoát trình bày' : 'Trình bày';
});
