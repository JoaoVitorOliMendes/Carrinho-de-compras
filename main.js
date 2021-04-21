const formAdd = document.getElementById("adicionar");
const formEdit = document.getElementById("update");
const editId = document.getElementById("editproductId");
const editProduct = document.getElementById("editproduct");
const editQuant = document.getElementById("editquant");
const produto = document.getElementById("addproduct");
const quant = document.getElementById("addquant");
const tableBody = document.getElementById("tableBody");

formAdd.addEventListener('submit', function(event) {
    event.preventDefault();
    const { target } = event;

    addToStorage(produto.value,quant.value)
    
    target.reset();
});



formEdit.addEventListener('submit', function(event) {
    event.preventDefault();
    const { target } = event;

    updateStorage(editId.value,editProduct.value,editQuant.value)
    
    target.reset();
});



editId.addEventListener('input', function(event) {
    selectById(event.data)
});



function addToStorage(produto, quantidade)
{
    const list = {
        id: 1,
        product: produto,
        quant: quantidade
    }

    const lenght = getAllItems()

    lenght.forEach(element => {
        if(element.id > list.id)
        {
            list.id = element.id + 1
        }
        else{
            list.id += 1
        }
    });

    
    lenght.push(list)

    if(list) localStorage.setItem('shopList', JSON.stringify(lenght))
    f5Table()
}



function getAllItems()
{
    let todos = [];
    const todosStr = localStorage.getItem('shopList');
    if(todosStr) todos = JSON.parse(todosStr);
    return todos;
}

function f5Table()
{
    const lenght = getAllItems()

    tableBody.innerHTML = ""

    lenght.forEach(element => {
        tableBody.innerHTML +=  `
        <tr>
            <th scope="row">${element.id}</th>
            <td>${element.product}</td>
            <td>${element.quant}</td>
            <td><button onclick="deleteCell(${element.id})" class="btn btn-danger">Excluir</button></td>
        </tr>
        `
    });
}


function deleteCell(id)
{
    let list = getAllItems();
    list = list.filter(todos => todos.id != id);
    localStorage.setItem('shopList', JSON.stringify(list));
    f5Table()
}


function selectById(id)
{
    let list = getAllItems();

    list = list.filter(function(todos)
    {
        return todos.id == id
    })

    editProduct.value = list[0].product
    editQuant.value = list[0].quant
}


function updateStorage(id,product,quant)
{
    const list = getAllItems();

    const index = list.findIndex((todos) => todos.id == id);

    if(index != -1) {
        list[index] = {id, product, quant};
    }

    localStorage.setItem('shopList', JSON.stringify(list));
    f5Table()
}



window.onload = f5Table();