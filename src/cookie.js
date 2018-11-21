/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');



filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    updateListCookie();
});

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    document.cookie = `${addNameInput.value}=${addValueInput.value};`;
    updateListCookie();
});

listTable.addEventListener('click', e => {
    let el = e.target;
    if(el.tagName === 'BUTTON'){
        e.preventDefault();
        deleteCookie(el.dataset.cook);
        updateListCookie();
    }
});


function updateListCookie() {
    const filterInp = filterNameInput.value;
    listTable.innerHTML = '';
    let arrCookie = getCookie();
    if(arrCookie.length !== 0){
        if (filterInp){
            arrCookie = arrCookie.filter(el=>{
                const flagName = el.name.toUpperCase().includes(filterInp.toUpperCase());
                const flagValue = el.value.toUpperCase().includes(filterInp.toUpperCase());
                if(flagName || flagValue){
                    return true;
                }
            });
        }
        arrCookie.forEach(el =>{
            const tr = document.createElement('tr');
            const tdName = document.createElement('td');
            const tdVal = document.createElement('td');
            const tdBtnDel = document.createElement('td');
            const btnDel = document.createElement('button');

            tdName.innerText = el.name;
            tdVal.innerText = el.value;
            btnDel.value = 'удалить';
            btnDel.dataset.cook = el.name;
            tdBtnDel.appendChild(btnDel);
            [tdName,tdVal,tdBtnDel].forEach(td => tr.appendChild(td));
            listTable.appendChild(tr);
        });
    }
}
function getCookie() {
   if(document.cookie){
       return document.cookie.split('; ').map(elem =>{
           const [name,value]= elem.split('=');
           return {name,value};
       });
   }else{
       return [];
   }
}

function deleteCookie(name) {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
}