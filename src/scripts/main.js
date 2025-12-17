'use strict';

const table = document.querySelector('table');

if (table) {
  const headers = table.querySelector('thead');
  const rows = [...table.querySelector('tbody').querySelectorAll('tr')];

  if (headers && rows) {
    headers.addEventListener('click', (ev) => {
      const key = ev.target.closest('th');
      const colNumber = [...headers.firstElementChild.children].indexOf(key);

      if (['Salary', 'Age'].includes(key.textContent)) {
        rows.sort(
          (a, b) =>
            parseCellToNumber(a, colNumber) - parseCellToNumber(b, colNumber),
        );
      } else {
        rows.sort((a, b) => {
          return a.children[colNumber].textContent.localeCompare(
            b.children[colNumber].textContent,
          );
        });
      }

      table.querySelector('tbody').replaceChildren(...rows);
    });
  }
}

function parseCellToNumber(row, index) {
  return parseInt(row.children[index].textContent.match(/\d+/g).join(''));
}
