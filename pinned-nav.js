(() => {
 const nav=document.querySelector('.tabs');
 if(nav&&!nav.querySelector('.pinned-link')) {
  const a=document.createElement('a');a.className='generator-link pinned-link';a.href='pinned-connector.html';a.textContent='07 — Pinned Connector ↗';nav.appendChild(a);
 }
 const style=document.createElement('style');style.textContent='.tabs .pinned-link{display:inline-flex;align-items:center;padding:18px 12px;color:#9cdbff;text-decoration:none;font-weight:800;white-space:nowrap;border-bottom:3px solid #547995;font-size:14px}';document.head.appendChild(style);
})();