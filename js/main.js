// VARIAVEIS 
let tarefaUsuarioTexto = document.querySelector('#tarefaUsuarioTexto');
let btnAddTarefasUsuario = document.querySelector('#btnAddTarefasUsuario');
let listaDeTarefas = document.querySelector('#listaDeTarefas');
const qntTarefasModificaEstruturaLista = 7;

// BANCO DE DADOS
let arrayTarefasUsuario = [];

// CONDIÇÕES
tarefaUsuarioTexto.addEventListener('keypress', event => {
    if(tarefaUsuarioTexto.value.length > 20) {
        openModalErrorQntCaracteres();
        setTimeout(() => {
            closeModalErrorQntCaracteres();
        }, 3500);
    } else {
        if(event.key == 'Enter' && tarefaUsuarioTexto.value != '') {
            setArrayTarefasUsuario();
        } else if(event.key == 'Enter' && tarefaUsuarioTexto.value == '') {
            openModalError();
            setTimeout(() => {
                closeModalError();
            }, 2000);
        }
    }
})

btnAddTarefasUsuario.onclick = () => {
    if(tarefaUsuarioTexto.value.length > 20) {
        openModalErrorQntCaracteres();
        setTimeout(() => {
            closeModalErrorQntCaracteres();
        }, 3500);
    } else {
        if(tarefaUsuarioTexto.value != '') {
            setArrayTarefasUsuario();
        } else {
            openModalError();
            setTimeout(() => {
                closeModalError();
            }, 2000);
        }
    }
}

// MÁXIMO DE TAREFAS 
const setArrayTarefasUsuario = () => {
    if(arrayTarefasUsuario.length == 10) {
        openModalErrorMaximoTarefas();
        setTimeout(() => {
            closeModalErrorMaximoTarefas();
        }, 3500);
    } else {
        arrayTarefasUsuario.push(({tarefa: tarefaUsuarioTexto.value}));
        openModalSuccess();
        setTimeout(() => {
            closeModalSuccess();
        }, 2000);
        updateTarefasUsuario();
    }
}

// UPDATE ARRAY
const updateTarefasUsuario = () => {
    localStorage.setItem('listaDeTarefas', JSON.stringify(arrayTarefasUsuario));
    loadArrayTarefasUsuario();
}

// ATUALIZA ARRAY
const loadArrayTarefasUsuario = () => {
    listaDeTarefas.textContent = '';
    arrayTarefasUsuario = JSON.parse(localStorage.getItem('listaDeTarefas')) ?? [];
    arrayTarefasUsuario.forEach((item, i) => {
        exibirArrayTarefasUsuario(item.tarefa, i)
    })
}

// EXIBIR TAREFAS ARRAY
const exibirArrayTarefasUsuario = (tarefa, index) => {
    console.log('arrayTarefasUsuario.length', arrayTarefasUsuario.length )
    if(arrayTarefasUsuario.length >= qntTarefasModificaEstruturaLista) {
        switch(arrayTarefasUsuario.length) {
            case 7 :
                listaDeTarefas.style.paddingTop = "3rem";
                break;
            case 8 :
                listaDeTarefas.style.paddingTop = "6rem";
                break;
            case 9 :
                listaDeTarefas.style.paddingTop = "9rem";
                break;
            case 10 :
                listaDeTarefas.style.paddingTop = "12rem";
                break;
        }
    } else {
        listaDeTarefas.style.paddingTop = "0px";
    }

    let novaTarefaUsuario = document.createElement('li');
    novaTarefaUsuario.setAttribute('id', 'tarefaUsuario')
    novaTarefaUsuario.classList.add('flex');
    novaTarefaUsuario.innerHTML = 
    `
    <span index=${index}> ${tarefa} </span>
    <button id="btnExcluirTarefaUsuario" onclick=excluirTarefa(${index})> Excluir </button>
    `
    listaDeTarefas.appendChild(novaTarefaUsuario);
    tarefaUsuarioTexto.value = '';
}

// EXCLUIR TAREFA 
const excluirTarefa = (index) => {
    let decisaoUsuario = confirm('Deseja excluir essa tarefa?');
    if(decisaoUsuario) {
        arrayTarefasUsuario.splice(index, 1);
        updateTarefasUsuario();
        openModalDelete();
        setTimeout(() => {
            closeModalDelete();
        }, 2000);
    }
}

// MODALS 
const openModalSuccess = () => document.querySelector('#modalSuccess').classList.add('block');
const closeModalSuccess = () => document.querySelector('#modalSuccess').classList.remove('block');
const openModalDelete = () => document.querySelector('#modalDelete').classList.add('block');
const closeModalDelete = () => document.querySelector('#modalDelete').classList.remove('block');
const openModalError = () => document.querySelector('#modalError').classList.add('block');
const closeModalError = () => document.querySelector('#modalError').classList.remove('block');
const openModalErrorMaximoTarefas = () => document.querySelector('#modalErrorMaxTarefas').classList.add('block');
const closeModalErrorMaximoTarefas = () => document.querySelector('#modalErrorMaxTarefas').classList.remove('block');
const openModalErrorQntCaracteres = () => document.querySelector('#modalErrorQntCaracteres').classList.add('block');
const closeModalErrorQntCaracteres = () => document.querySelector('#modalErrorQntCaracteres').classList.remove('block');

// CARREGANDO ARRAY LOCAL STORAGE
loadArrayTarefasUsuario();
