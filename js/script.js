// script.js

// Mock login para demonstração
const adminUser = {
    username: "admin",
    password: "1234"
};

// Função de login
function login() {
    const username = document.getElementById("adminUsername").value;
    const password = document.getElementById("adminPassword").value;

    if (username === adminUser.username && password === adminUser.password) {
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("mainSection").style.display = "block";
        loadDataFromLocalStorage(); // Carregar dados do localStorage ao fazer login
    } else {
        alert("Usuário ou senha incorretos!");
    }
}

// Função para adicionar produto
function addProduct() {
    const name = document.getElementById("productName").value;
    const quantity = document.getElementById("productQuantity").value;
    const date = document.getElementById("productDate").value;

    if (name && quantity && date) {
        const products = getLocalStorageData('products') || [];
        products.push({ name, quantity: parseInt(quantity), date });
        setLocalStorageData('products', products);
        updateProductList();
        alert("Produto adicionado com sucesso!");
    } else {
        alert("Preencha todos os campos para adicionar um produto.");
    }
}

// Atualiza a lista de produtos no dropdown
function updateProductList() {
    const products = getLocalStorageData('products') || [];
    const productList = document.getElementById("productList");
    productList.innerHTML = "";
    products.forEach(product => {
        const option = document.createElement("option");
        option.value = product.name;
        option.text = product.name;
        productList.add(option);
    });
}

// Função para adicionar pessoa
function addPerson() {
    const name = document.getElementById("personName").value;
    if (name) {
        const people = getLocalStorageData('people') || [];
        people.push(name);
        setLocalStorageData('people', people);
        updatePersonList();
        alert("Pessoa adicionada com sucesso!");
    } else {
        alert("Preencha o nome para adicionar uma pessoa.");
    }
}

// Atualiza a lista de pessoas no dropdown
function updatePersonList() {
    const people = getLocalStorageData('people') || [];
    const personList = document.getElementById("personList");
    personList.innerHTML = "";
    people.forEach(person => {
        const option = document.createElement("option");
        option.value = person;
        option.text = person;
        personList.add(option);
    });
}

// Função para registrar retirada
function registerWithdraw() {
    const product = document.getElementById("productList").value;
    const person = document.getElementById("personList").value;
    const quantity = document.getElementById("withdrawQuantity").value;
    const date = new Date().toLocaleString();

    if (product && person && quantity) {
        const withdrawals = getLocalStorageData('withdrawals') || [];
        withdrawals.push({ product, person, quantity: parseInt(quantity), date });
        setLocalStorageData('withdrawals', withdrawals);
        alert("Retirada registrada com sucesso!");
    } else {
        alert("Preencha todos os campos para registrar a retirada.");
    }
}

// Função para exportar dados para Excel
function exportToExcel() {
    const withdrawals = getLocalStorageData('withdrawals') || [];
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Produto,Pessoa,Quantidade,Data\n";

    withdrawals.forEach(row => {
        csvContent += `${row.product},${row.person},${row.quantity},${row.date}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "registro_estoque.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Função para carregar dados do localStorage ao iniciar o sistema
function loadDataFromLocalStorage() {
    updateProductList();
    updatePersonList();
}

// Função para obter dados do localStorage
function getLocalStorageData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Função para salvar dados no localStorage
function setLocalStorageData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Carregar dados do localStorage ao carregar a página
window.onload = loadDataFromLocalStorage;
