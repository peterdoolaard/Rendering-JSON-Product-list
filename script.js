async function getStock() {
  const response = await fetch('data.json');
  if (response.status === 200) {
    return await response.json();
  }
  throw new Error(response.status);
}

function buildList() {
  getStock()
    .catch((error) => {
      window.location.href = 'error.html';
    })
    .then(
      (stockItems) => {
        const families = [];
        stockItems.forEach((stockItem) => {
          const modelFamily = stockItem.modelFamily;
          let family = families.find((f) => f.modelFamily === modelFamily);
          if (!family) {
            family = {
              modelFamily: modelFamily,
              items: []
            };
            families.push(family);
            family.items.push({
              itemNo: stockItem.itemNo,
              description: stockItem.Description,
              qty_avail: stockItem.QTY_Avail,
              comment: stockItem.comment
            });
          } else {
            family.items.push({
              itemNo: stockItem.itemNo,
              description: stockItem.Description,
              qty_avail: stockItem.QTY_Avail,
              comment: stockItem.comment
            });
          }
        });
        return families;
      })
    .then(
      // sort all items by family
      (families) => families.sort((a, b) => {
        let fa = a.modelFamily.toLowerCase();
        let fb = b.modelFamily.toLowerCase();
        if (fa < fb) return -1;
        if (fa > fb) return 1;
        return 0;
      }))
    .then(
      (families) => {
        // get a reference to the list container
        const stockListContainer = document.querySelector('.stock-list-container');
        // create the list
        const stockList = document.createElement('ul');
        stockList.classList.add('stock-list');
        stockListContainer.appendChild(stockList);
        // create the column headings row
        const headingRow = document.createElement('li');
        const headings = ['Family', 'Item No.', 'Description', 'Stock', 'Comments'];
        headings.forEach((heading) => {
          let headingSpan = document.createElement('span');
          let strong = document.createElement('strong');
          strong.innerHTML = heading;
          headingSpan.appendChild(strong);
          headingRow.appendChild(headingSpan);
        })
        stockList.appendChild(headingRow);
        // iterate the families list
        families.forEach((family) => {
          //iterate the items list of each family
          family.items.forEach((item) => {
            // create a li element
            let listItem = document.createElement('li');
            // create a span element for the family name
            let span = document.createElement('span');
            span.innerHTML = family.modelFamily;
            listItem.appendChild(span);
            // iterate the elements of the items list and place them in a span
            Object.keys(item).forEach(i => {
              span = document.createElement('span');
              span.innerHTML = item[i];
              listItem.appendChild(span);
            });
            stockList.appendChild(listItem);
          });
        });
        // move items without a modelFamily to the end of the list
        stockList.querySelectorAll('span:first-child:empty').forEach(el => {
          stockList.appendChild(el.parentElement);
        });
      }
    )
}

buildList();
