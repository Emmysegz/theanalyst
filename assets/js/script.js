const d = portfolioData, $ = s => document.querySelector(s), esc = t => String(t).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const li = a => a.map(x => `<li>${esc(x)}</li>`).join('');
document.querySelectorAll('[data-bind]').forEach(e => e.textContent = d[e.dataset.bind]);
document.querySelectorAll('[data-resume]').forEach(e => e.href = d.resume);
document.querySelectorAll('[data-linkedin]').forEach(e => e.href = d.linkedin);
document.querySelectorAll('[data-github]').forEach(e => e.href = d.github);
document.querySelectorAll('[data-email]').forEach(e => { e.href = 'mailto:' + d.email; e.textContent = d.email; });
$('#track').innerHTML = Array(8).fill(`<span>${esc(d.tagline)}</span>`).join('');
$('#form').action = d.formspreeEndpoint; $('#yr').textContent = new Date().getFullYear();

$('#exp').innerHTML = d.experience.map(j => `<article class="job"><h3>${esc(j.role)}, ${esc(j.company)}</h3>
 <p class="meta">${esc(j.dates)} · ${esc(j.location)}</p><p>${esc(j.summary)}</p><ul>${li(j.points)}</ul>
 ${j.tools ? `<p class="meta">Tools: ${esc(j.tools)}</p>` : ''}</article>`).join('');
$('#skillGrid').innerHTML = Object.entries(d.skills).map(([k, v]) => `<div class="card"><h3>${esc(k)}</h3><ul class="tags">${li(v)}</ul></div>`).join('');
$('#projGrid').innerHTML = d.projects.map(p => `<article class="card proj-card">
 <div class="thumb"><img src="${p.image}" alt="${esc(p.title)} process map" loading="lazy" onerror="this.replaceWith('Add your project image at ${p.image}')"></div>
 <div class="proj-body"><span class="cat">${esc(p.category)}</span><h3>${esc(p.title)}</h3><p>${esc(p.short)}</p>
 <h4>Tools</h4><ul class="tags">${li(p.tools)}</ul><h4>Skills demonstrated</h4><ul class="tags">${li(p.skills)}</ul>
 <p><button class="btn" data-id="${p.id}">View case study</button></p></div></article>`).join('');

const dlg = $('#cs');
document.querySelectorAll('[data-id]').forEach(b => b.onclick = () => {
  const p = d.projects.find(x => x.id === b.dataset.id);
  dlg.innerHTML = `<div class="cs"><button class="icon-btn x" aria-label="Close case study" autofocus>✕</button>
  <h2>${esc(p.title)}</h2><p class="meta">Role: ${esc(p.role)} · Data source: ${esc(p.dataSource)}</p>
  <h3>Business problem</h3><p>${esc(p.problem)}</p><h3>Objective</h3><p>${esc(p.objective)}</p>
  <h3>Approach</h3><ul>${li(p.approach)}</ul><h3>Analysis</h3><ul>${li(p.analysis)}</ul>
  <h3>Findings</h3><ul>${li(p.findings)}</ul><h3>Recommendations</h3><ul>${li(p.recommendations)}</ul>
  <h3>Outcome</h3><p>${esc(p.outcome)}</p><h3>Business impact</h3><p>${esc(p.impact)}</p>
  ${p.document ? `<p><a class="btn" href="${p.document}" target="_blank" rel="noopener">View BRD</a></p>` : ''}</div>`;
  dlg.querySelector('.x').onclick = () => dlg.close(); dlg.showModal();
});
dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });

const root = document.documentElement, saved = (() => { try { return localStorage.getItem('theme'); } catch (e) { return null; } })();
root.dataset.theme = saved || (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
$('#theme').onclick = () => { root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark'; try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {} };
$('#menu').onclick = e => { const o = $('#links').classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded', o); };
$('#links').onclick = e => { if (e.target.tagName === 'A') $('#links').classList.remove('open'); };
const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { threshold: .08 });
document.querySelectorAll('.reveal').forEach(e => io.observe(e));
$('#form').addEventListener('submit', async e => {
  e.preventDefault(); const f = e.target, s = $('#status'), btn = $('#send');
  if (!f.checkValidity()) { s.className = 'err'; s.textContent = 'Please complete every field with a valid email address.'; f.reportValidity(); return; }
  btn.disabled = true; btn.textContent = 'Sending…'; s.className = ''; s.textContent = '';
  try {
    const r = await fetch(f.action, { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } });
    if (!r.ok) throw 0; f.reset(); s.className = 'ok'; s.textContent = 'Message sent. I will reply by email.';
  } catch (_) { s.className = 'err'; s.textContent = 'Message not sent. Try again, or email ' + d.email + ' directly.'; }
  btn.disabled = false; btn.textContent = 'Send message';
});
