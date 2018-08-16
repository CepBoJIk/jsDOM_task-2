class EmailList {

    constructor(input, list, error, itemCountEl) {
        this.input = input;
        this.list = list;
        this.error = error;
        this.itemCountElement = itemCountEl

        this.emailPattern = /^\w+@[a-z_]+\.[a-z]{2,3}$/i;

        [].forEach.call(list.children, (li) => {
            let btn = li.querySelector('button');

            if(!btn) btn = this.addRemoveBtn(li);
        })

        this.recalculateCount();

        this.input.addEventListener('keyup', this.addEmail.bind(this));
        this.list.addEventListener('click', this.removeEmail.bind(this));
    }

    addEmail(event) {
        if( event.keyCode != 13 ) return;
        
        let value = this.input.value;

        if(!this.validateValue(value)) {
            this.addErrorMessage();
        } else {
            this.removeErrorMessage();
            this.addToList(value);

            this.input.value = '';
        }
    }

    validateValue(value) {
        return this.emailPattern.test(value);
    }

    addErrorMessage() {
        this.error.style.display = 'block';
    }

    removeErrorMessage() {
        this.error.style.display = '';
    }

    addToList(value) {
        let li = document.createElement('li');
        li.textContent = value;
        
        this.addRemoveBtn(li);

        this.list.insertBefore(li, this.list.children[0]);

        this.recalculateCount();
    }

    addRemoveBtn(li) {
        let removeBtn = document.createElement('button');
        removeBtn.textContent = 'X';

        li.appendChild(removeBtn);

        return removeBtn;
    }

    removeEmail(event) {
        if(event.target.tagName !== 'BUTTON') return;
        let btn = event.target;
        let li = btn.parentElement;
        
        this.list.removeChild(li);

        this.recalculateCount();
    }

    recalculateCount() {
        this.itemCountElement.textContent = this.list.children.length + ' element\'s';
    }

}

let input = document.querySelector('.email-list__input');
let list = document.querySelector('.email-list__box');
let error = document.querySelector('.email-list__error');
let itemCountEl = document.querySelector('.email-list__item-count');

new EmailList(input, list, error, itemCountEl);