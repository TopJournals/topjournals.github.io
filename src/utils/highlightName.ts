const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

export const highlightDaweiLi = (value: string) =>
  escapeHtml(value)
    .replaceAll('Dawei Li', '<strong class="font-semibold text-academic-heading">Dawei Li</strong>')
    .replaceAll('李大伟', '<strong class="font-semibold text-academic-heading">李大伟</strong>');
