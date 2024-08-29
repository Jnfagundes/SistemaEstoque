// script.js

// Mock login para demonstração
const adminUser = {
    username: "djrc",
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

// Função para alternar entre as seções
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Função para adicionar produto
function addProduct() {
    const code = document.getElementById("productCode").value;
    const name = document.getElementById("productName").value;
    const quantity = document.getElementById("productQuantity").value;
    const descricao = document.getElementById("descricaoProduto").value;
    const date = document.getElementById("productDate").value;

    if (code && name && quantity && descricao && date) {
        const products = getLocalStorageData('products') || [];
        products.push({ code, name, quantity: parseInt(quantity), descricao, date });
        setLocalStorageData('products', products);
        alert("Produto adicionado com sucesso!");
        clearInputFields(['productCode', 'productName', 'productQuantity', 'descricaoProduto','productDate']);
        updateProductTable(); // Atualiza a tabela de produtos após adicionar
    } else {
        alert("Preencha todos os campos para adicionar um produto.");
    }
}

// Função para exibir produtos na tabela
function updateProductTable() {
    const products = getLocalStorageData('products') || [];
    const productTableBody = document.getElementById("productTable").getElementsByTagName('tbody')[0];
    productTableBody.innerHTML = ''; // Limpa a tabela

    products.forEach(product => {
        const row = productTableBody.insertRow();
        row.insertCell(0).innerText = product.code;
        row.insertCell(1).innerText = product.name;
        row.insertCell(2).innerText = product.quantity;
        row.insertCell(3).innerText = product.descricao;
        row.insertCell(4).innerText = product.date;
    });
}

// Função para buscar produto
function searchProduct() {
    const searchQuery = document.getElementById("searchProduct").value.toLowerCase();
    const products = getLocalStorageData('products') || [];
    const results = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery) ||
        product.code.toLowerCase().includes(searchQuery)
    );

    const searchResultsDiv = document.getElementById("searchResults");
    searchResultsDiv.innerHTML = '';

    if (results.length > 0) {
        results.forEach(product => {
            const div = document.createElement('div');
            div.innerText = `Código: ${product.code}, Nome: ${product.name}, Quantidade: ${product.quantity}`;
            searchResultsDiv.appendChild(div);
        });
    } else {
        searchResultsDiv.innerText = 'Nenhum produto encontrado.';
    }
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
        clearInputFields(['personName']);
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

// Função para registrar solicitação
function registerRequest() {
    const productSearch = document.getElementById("searchProduct").value.toLowerCase();
    const person = document.getElementById("personList").value;
    const quantity = document.getElementById("requestQuantity").value;
    const date = new Date().toLocaleString();

    const products = getLocalStorageData('products') || [];
    const product = products.find(p => p.name.toLowerCase().includes(productSearch) || p.code.toLowerCase().includes(productSearch));

    if (product && person && quantity) {
        const requests = getLocalStorageData('requests') || [];
        requests.push({ product: product.name, person, quantity, date });
        setLocalStorageData('requests', requests);
        alert("Solicitação registrada com sucesso!");
        clearInputFields(['searchProduct', 'requestQuantity']);
        updateRequestTable(); // Atualiza a tabela de solicitações após adicionar
    } else {
        alert("Verifique os campos e tente novamente.");
    }
}

// Função para exibir solicitações na tabela
function updateRequestTable() {
    const requests = getLocalStorageData('requests') || [];
    const requestTableBody = document.getElementById("requestTable").getElementsByTagName('tbody')[0];
    requestTableBody.innerHTML = ''; // Limpa a tabela

    requests.forEach(request => {
        const row = requestTableBody.insertRow();
        row.insertCell(0).innerText = request.product;
        row.insertCell(1).innerText = request.person;
        row.insertCell(2).innerText = request.quantity;
        row.insertCell(3).innerText = request.date;
    });
}

// Função para gerar relatório
function generateReport(period) {
    const requests = getLocalStorageData('requests') || [];
    const now = new Date();
    let filteredRequests = [];

    if (period === 'week') {
        const lastWeek = new Date();
        lastWeek.setDate(now.getDate() - 7);
        filteredRequests = requests.filter(request => new Date(request.date) >= lastWeek);
    } else if (period === 'month') {
        const lastMonth = new Date();
        lastMonth.setMonth(now.getMonth() - 1);
        filteredRequests = requests.filter(request => new Date(request.date) >= lastMonth);
    }

    const reportResultsDiv = document.getElementById("reportResults");
    reportResultsDiv.innerHTML = '';

    if (filteredRequests.length > 0) {
        filteredRequests.forEach(request => {
            const div = document.createElement('div');
            div.innerText = `Produto: ${request.product}, Pessoa: ${request.person}, Quantidade: ${request.quantity}, Data: ${request.date}`;
            reportResultsDiv.appendChild(div);
        });
    } else {
        reportResultsDiv.innerText = 'Nenhuma solicitação encontrada para o período.';
    }
}

// Funções utilitárias para manipulação do localStorage
function getLocalStorageData(key) {
    return JSON.parse(localStorage.getItem(key));
}

function setLocalStorageData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function clearInputFields(ids) {
    ids.forEach(id => {
        document.getElementById(id).value = '';
    });
}

// Carregar dados iniciais ao fazer login
function loadDataFromLocalStorage() {
    updateProductTable();
    updatePersonList();
    updateRequestTable();
}

