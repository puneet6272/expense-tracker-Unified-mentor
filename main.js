const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('income');
const moneyMinus = document.getElementById('expense')
const list = document.getElementById('list');
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')
const date = document.getElementById('date')
const button = document.getElementById('btn')
let updateId = null

// -------------Web local storage section code --------------
const localStorageTr = JSON.parse(localStorage.getItem('transections'))

let trArray = localStorage.getItem('transections') !== null ? localStorageTr : []


const updateLocalStorage = () => {
    localStorage.setItem('transections', JSON.stringify(trArray))
}

// ----------------------------------------------------------------


// --------------adding new transections section---------------------
const addtransection = (transection) => {
    const sign = transection.amount > 0 ? "+" : "-";
    const icon = transection.amount > 0 ? "up" : "down";
    const item = document.createElement('li');
    item.classList.add(transection.amount > 0 ? 'plus' : 'minus');
    item.innerHTML = `<h1> ${transection.text}</h1>
    <span id="display_date">${transection.date}</span> <span id="price"> ${sign}$${Math.abs(transection.amount)}

     <i class="fa-solid fa-trash" onclick="removeItem(${transection.id})" id="dlt_icon"></i>
                            <i class="fa-solid fa-pen-to-square" id="edit_icon" onclick="editItem(${transection.id})"></i>
    </span>`
    list.appendChild(item);
}
// ----------------------------------------------------------------------




const updateValues = () => {
    const amaount = trArray.map(transection => transection.amount)
    const total = amaount.reduce((sum, amount) => (sum += amount), 0).toFixed(2)

    const income = amaount
        .filter(transection => transection > 0)
        .reduce((sum, amount) => (sum += amount), 0)
        .toFixed(2)
    const expense = amaount
        .filter(transection => transection < 0)
        .reduce((sum, amount) => (sum += amount), 0)
        .toFixed(2)

    balance.innerHTML = `${total}`
    moneyPlus.innerHTML = `$${income} <i class="fa-solid fa-sort-up"></i>`
    moneyMinus.innerHTML = `$${Math.abs(expense).toFixed(2)} <i class="fa-solid fa-sort-down"></i>`

}



function randomId() {
    return Math.floor(Math.random() * 1000) + 1;
}


form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please fill your data')
    } else {
        const newDateFotmate = date.value.split('-').reverse().join('-')
        const NewTransections = { id: randomId(), text: text.value, amount: parseInt(amount.value), date: newDateFotmate }


        if (button.innerHTML === 'Update') {


            const modifiedArry = { id: updateId, text: text.value, amount: parseInt(amount.value), date: newDateFotmate }
            indexx = trArray.findIndex(tr => tr.id == updateId)


            // trArray.split(indexx,1,modifiedArry)


            trArray[indexx] = modifiedArry

            button.innerHTML = "Add Transections"
            init()

        } else {

            trArray.push(NewTransections)
            addtransection(NewTransections)
        }

        updateValues()
        updateLocalStorage()
        text.value = ''
        amount.value = ''
        date.value = ''
    }
})



const removeItem = (id) => {
    trArray = trArray.filter((tr) => tr.id !== id)
    updateLocalStorage()
    init()
}



const editItem = (id) => {
    t = trArray.find(tr => tr.id == id)
    text.value = t.text
    amount.value = t.amount
    date.value = t.date.split('-').reverse().join('-')
    updateId = id

    button.innerHTML = "Update"

}




function init() {
    list.innerHTML = '';
    trArray.forEach(addtransection);
    updateValues()


}

init()