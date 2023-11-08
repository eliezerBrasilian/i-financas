import {format, fromUnixTime} from 'date-fns';

function formatarDataMilissegundos(milissegundos) {
  const data = new Date(Number(milissegundos));

  return format(data, 'dd/MM/yyyy');
}

function formatFileSize(sizeInBytes) {
  if (sizeInBytes < 1024) {
    return sizeInBytes + ' bytes';
  } else if (sizeInBytes < 1024 * 1024) {
    return (sizeInBytes / 1024).toFixed(2) + ' KB';
  } else if (sizeInBytes < 1024 * 1024 * 1024) {
    return (sizeInBytes / (1024 * 1024)).toFixed(2) + ' MB';
  } else {
    return (sizeInBytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  }
}
function dateFromFirestoreToBrasilianFormat(firestoreDate) {
  const firebaseDate = firestoreDate; // Exemplo de objeto de data do Firebase Firestore
  const dataUnix = firebaseDate.seconds;
  const dataBrasileira = format(fromUnixTime(dataUnix), 'dd/MM/yyyy HH:mm:ss');
  // console.log(dataBrasileira); // Saída: '12/10/2023 18:49:45'
  return dataBrasileira;
}

function formatarCPF(cpf) {
  // Remove qualquer caractere não numérico da string
  cpf = cpf.replace(/\D/g, '');
  // Aplica a formatação do CPF (###.###.###-##)
  cpf = cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  return cpf;
}
function formatarCelular(celular) {
  celular = celular.replace(/\D/g, '');
  celular = celular.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  return celular;
}
function formatarDataNascimento(birthDay) {
  birthDay = birthDay.replace(/\D/g, '');
  birthDay = birthDay.replace(/^(\d{4})(\d{2})(\d{2})$/, '$3/$2/$1');
  return birthDay;
}

export {
  formatarDataMilissegundos,
  formatFileSize,
  dateFromFirestoreToBrasilianFormat,
  formatarCPF,
  formatarCelular,
  formatarDataNascimento,
};
