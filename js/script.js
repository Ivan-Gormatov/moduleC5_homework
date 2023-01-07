// Ищем ноду для вставки результата запроса 
const resultNode = document.querySelector('.j-result');
// ... и сообщений
const messegeNode = document.querySelector('.j-message');
// Ищем кнопку, по нажатии на которую будет запрос
const btn = document.querySelector('.j-btn');

// вывод изображений на страницу
const displayResult =  (apiData) => {
    let cards = '';
 // создание поля под каждое изображение 
     apiData.forEach(item => {
        const cardBlock = `
        <div class="card">
            <img
            src="${item.download_url}"
            class="card-image"
            />
        </div>
        `;
    cards = cards + cardBlock;
    });
  
// вывод HTML
    resultNode.innerHTML = cards;
}

// запрос по URL и подготовка json
const useRequest = (urlRes) => {
    return fetch(urlRes)
    .then((response) => {
       return response.json();
    })
    .then((json) => { return json; })
    .catch(() => { console.log('error') });
}
 

const prel= async (urlRes) => {
    const requestResult = await useRequest(urlRes);    
    displayResult(requestResult);
    localStorage.setItem('recRes', JSON.stringify(requestResult));

}
// проверка и обработка введенных данных
const checkInput = (pic, limit) => {
    if (!Number.isFinite(pic) || pic>10 || pic<1) {
        if (!Number.isFinite(limit) || limit>10 || limit<1) {
            messegeNode.innerHTML = '<div class="messege j-messege" style="color: red">Номер страницы и лимит вне диапазона от 1 до 10</div>'}
        else { messegeNode.innerHTML = '<div class="messege j-messege" style="color: red">Номер страницы вне диапазона от 1 до 10</div>' }
        
    } 
    else if (!Number.isFinite(limit) || limit>10 || limit<1) {
       messegeNode.innerHTML = '<div class="messege j-messege" style="color: red">Лимит вне диапазона от 1 до 10</div>'
    }
    else  {
         pic=Math.floor(pic);
         limit=Math.floor(limit);
         vr = ("https://picsum.photos/v2/list?page="+pic+"&limit="+limit);
         messegeNode.innerHTML = '<div class="messege j-messege">URL запроса : '+vr+ '</div>';
         // вызываем функцию подготовки запроса и вывода изображения
         prel(vr);

    }
}

// если ключь recRos в localStorage существует то выводим изображения по этим данным
const recRes =  localStorage.getItem('recRes');
if (recRes) {//console.log(JSON.parse(recRes));
    displayResult(JSON.parse(recRes));}
  


// Вешаем обработчик на кнопку для запроса

btn.addEventListener('click', () => { 
    
    const pic = document.querySelector('.j-inpPage').value;
    const limit = document.querySelector('.j-inpLimit').value;
    checkInput (pic*1, limit*1)
    
})