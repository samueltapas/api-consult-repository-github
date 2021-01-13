//Imports
import api from './api';
import 'babel-polyfill';

//Inicio da Aplicação, construção de todos os elemnetos
class App {
  constructor () {
    //Referenciação de elementos do front e back-end
    this.repositories =[];

    this.inputEl = document.querySelector('input[name=repository]');
    this.formEl = document.getElementById('repo-form');
    this.listEl = document.getElementById('repo-list');

    this.registerHandlers();
  }

  //Captura do onsubmit do formEl
  registerHandlers() {
    this.formEl.onsubmit = event => this.addRepository(event);
  }

  //Mandar informações do event para para o repositorio
  async addRepository(event) {
    //prevent Default para impedir carregamento padrão da pagina
    event.preventDefault();

    //Variavel para pegar o valor do input
    const inputValue = this.inputEl.value;

    //Verificar se existe valor nesse input
    if (inputValue.lenght === 0)
      return
    
    //Pegar resposta da api usando await
    const response = await api.get(`/users/${inputValue}`);

    //Desestruturação de objeto para associar a reposta da api para o repositorio
    const {avatar_url, name, bio, html_url} = response.data;

    //Mandar informações para o array
    this.repositories.push({
      avatar_url,
      name,
      bio,
      html_url
    });
    
    //Função que renderiza os elementos em tela
    this.render();
  }

  //Contrução dinamica do frontEnd
  render() {
    //Limpar a lista de elementos para não haver duplicação
    this.listEl.innerHTML = '';

    //Percorrer o Array para pegar os elementos
    this.repositories.forEach(repo => {
      //Criar os elementos de forma dinamica
      let imgEl = document.createElement('img');
      imgEl.setAttribute('src', repo.avatar_url);

      let nameEl = document.createElement('strong');
      nameEl.appendChild(document.createTextNode(repo.name));

      let bioEl = document.createElement('p');
      bioEl.appendChild(document.createTextNode(repo.bio));

      let linkEl = document.createElement('a');
      linkEl.setAttribute('target', '_blank');

      linkEl.setAttribute('href', repo.html_url);
      linkEl.appendChild(document.createTextNode('Acess Repository'));

      //Variavel para criar elemento da lista
      let listItemEl = document.createElement('li');
      
      //Passar os elementos criados dinamicamente como elementos filhos
      listItemEl.appendChild(imgEl);
      listItemEl.appendChild(nameEl);
      listItemEl.appendChild(bioEl);
      listItemEl.appendChild(linkEl);

      //Passar o LI como elemnto filho para a minha lista
      this.listEl.appendChild(listItemEl);
    });
  }
}

new App;