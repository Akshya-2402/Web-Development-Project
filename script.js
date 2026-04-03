const country = document.getElementById('country');
const start_date = document.getElementById('start_date');
const end_date = document.getElementById('end_date');
const nop = document.getElementById('nop');
const alertName = document.getElementById('alertName');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const resetBtn = document.getElementById('resetBtn');
const myTable = document.getElementById('myTable');

let productList = JSON.parse(localStorage.getItem('products')) || [];  


function displayProducts() {
  myTable.innerHTML = '';
  productList.forEach((product, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${product.name}</td>
      <td>${product.startDate}</td>
      <td>${product.endDate}</td>
      <td>${product.persons}</td>
      <td><button class="btn btn-warning" onclick="editProduct(${index})">Edit</button></td>
      <td><button class="btn btn-danger" onclick="deleteProduct(${index})">Delete</button></td>
    `;
    myTable.appendChild(row);
  });
}


function addProduct() {
  const name = country.value.trim();
  const startDate = start_date.value.trim();
  const endDate = end_date.value.trim();
  const persons = nop.value.trim();


  if (!name || !startDate || !endDate || !persons || isNaN(persons)) {
    if (!name) alertName.classList.remove('d-none');
    return;
  }

  alertName.classList.add('d-none');

  const newProduct = {
    name,
    startDate,
    endDate,
    persons
  };

  productList.push(newProduct);
  localStorage.setItem('products', JSON.stringify(productList));
  displayProducts();
  resetForm();
}


function resetForm() {
  country.value = '';
  start_date.value = '';
  end_date.value = '';
  nop.value = '';
}


function editProduct(index) {
  const product = productList[index];
  country.value = product.name;
  start_date.value = product.startDate;
  end_date.value = product.endDate;
  nop.value = product.persons;

 
  updateBtn.onclick = function() {
    updateProduct(index);
  };
  updateBtn.style.display = 'inline-block';
  addBtn.style.display = 'none';
}


function updateProduct(index) {
  const name = country.value.trim();
  const startDate = start_date.value.trim();
  const endDate = end_date.value.trim();
  const persons = nop.value.trim();

  if (!name || !startDate || !endDate || !persons || isNaN(persons)) {
    if (!name) alertName.classList.remove('d-none');
    return;
  }

  alertName.classList.add('d-none');

  productList[index] = {
    name,
    startDate,
    endDate,
    persons
  };

  localStorage.setItem('products', JSON.stringify(productList));
  displayProducts();
  resetForm();
  addBtn.style.display = 'inline-block'; 
  updateBtn.style.display = 'none'; 
}


function deleteProduct(index) {
  productList.splice(index, 1);
  localStorage.setItem('products', JSON.stringify(productList));
  displayProducts();
}


addBtn.addEventListener('click', addProduct);
resetBtn.addEventListener('click', resetForm);


displayProducts();

