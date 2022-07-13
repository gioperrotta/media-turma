const listContainer = document.getElementById('list-container') as HTMLDivElement;

const inputTurma = document.getElementById('input-turma') as HTMLInputElement;

const form = document.getElementById('form') as HTMLFormElement;
const inputName = document.getElementById('input-name') as HTMLInputElement;
const inputP1 = document.getElementById('input-P1') as HTMLInputElement;
const inputP2 = document.getElementById('input-P2') as HTMLInputElement;

const btnMediaTurma = document.getElementById('btn-media-turma') as HTMLButtonElement;
const h2MediaTurma = document.getElementById('h2-media-turma') as HTMLBaseElement;

type TAluno = {
  nome: string,
  notaP1: number,
  notaP2: number,
  media?: number
}

let alunos: TAluno[] = [];

function claculaMediaTurma(alunos: TAluno[]) {
  let somaMedias: number = 0;
  let numMedias: number = 0;
  alunos.forEach((aluno) => {
    if (aluno.media) {
      somaMedias = somaMedias + aluno.media;
      numMedias = numMedias + 1;
    }
  });
  if (numMedias > 0) {
    return somaMedias / numMedias;
  }
  return 0;
}

function printNumTurma(numTurma: string) {
  const h2NumTurma = document.getElementById('h2-num-turma');
  if (h2NumTurma) {
    h2NumTurma.innerHTML = numTurma;
  }
}


inputTurma?.addEventListener('keyup', () => {
  let value: string = inputTurma.value;
  if (value.length >= 2) {
    printNumTurma(value)
  }
});

function calculaMedia(p1: number, p2: number) {
  return (p1 + p2) / 2
}

function printAlunoOnList({ nome, notaP1, notaP2, media }: TAluno) {
  const newRowList = document.createElement('div') as HTMLDivElement;
  newRowList.classList.add('row-table');
  const columnName = document.createElement('div') as HTMLDivElement;
  const columnP1 = document.createElement('div') as HTMLDivElement;
  const columnP2 = document.createElement('div') as HTMLDivElement;
  const columnMedia = document.createElement('div') as HTMLDivElement;
  columnName.innerText = nome;
  columnP1.innerText = notaP1.toFixed(2);
  columnP2.innerText = notaP2.toFixed(2);
  media ? columnMedia.innerText = media.toFixed(2) : columnMedia.innerText = '';
  newRowList.appendChild(columnName);
  newRowList.appendChild(columnP1);
  newRowList.appendChild(columnP2);
  newRowList.appendChild(columnMedia);
  listContainer.appendChild(newRowList);
}

function addAlunoToList({ nome, notaP1, notaP2 }: TAluno) {
  let aluno: TAluno;
  aluno = {
    nome,
    notaP1,
    notaP2,
    media: calculaMedia(notaP1, notaP2)
  }
  alunos.push(aluno);
  return aluno
}

function clearInputs() {
  inputName.value = '';
  inputP1.value = '';
  inputP2.value = '';
}


form.onsubmit = (e) => {
  e.preventDefault();
  const aluno = {
    nome: inputName.value,
    notaP1: Number(inputP1.value),
    notaP2: Number(inputP2.value),
  }
  console.log('estou aqui', aluno)
  printAlunoOnList(addAlunoToList(aluno));
  clearInputs();
}

btnMediaTurma.addEventListener('click', () => {
  const mediaTurma: number = claculaMediaTurma(alunos);
  const msgMediaTurma = `Média de alunos da turma = ${mediaTurma.toFixed(2)}`
  h2MediaTurma.innerText = msgMediaTurma
})