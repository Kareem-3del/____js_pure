const availableFood = document.getElementById('available-foods');
const addFoodBtn    = document.querySelector('#addFood');

function GeneratorFood(title, description, price, img = '', countAvailable = 10,) {
    if (!title && !description && !price && !countAvailable) {
        return false
    }
    if (title.split(' ').length > 3) {
        title = title.split(' ').slice(0, 3).join(' ') + '...';
    }

    if (title.length > 30) {
        title = title.substr(0, 30) + '...'
    }

    if (title.description > 60) {
        description = description.substr(0, 60) + '...'
    }

    return {
        title,
        description,
        price,
        img,
        countAvailable,
        id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10)
    }

}

// snake case function name //
function add_available_food(food) {
    let HtmlFood = document.createElement('li')
    HtmlFood.className = 'food-card'
    HtmlFood.id = food.id
    HtmlFood.innerHTML = `
                          <div class="food-card-wrap" ">
                            <img class="food-card__img" src="${food.img || 'images/ads.jpg'}" alt="ads">
                            <div class="food-card-info">
                                <h1 class="food-card__title">Hello my name</h1>
                                <p class="food-card__description">
                                 ${food.description}
                                </p>
                                <div class="stars">

                                </div>
                            </div>
                            <div class="food-card-order">
                                <h2 class="food-card__price" >${food.price}</h2>
                                <div class="food-card__orderNum">
                                    <span class="food-card__plus">
                                        +
                                    </span>
                                    <span class="food-card__orderNum__input">
                                        0
                                    </span>
                                    <span class="food-card__mines">
                                        -
                                    </span>
                                </div>
                                <button class="food-card__btn">Add to cart</button>
                            </div>
                        </div>`
    availableFood.append(HtmlFood)
    let priceElem = document.querySelector(`#${food.id} .food-card__price`);
    let countElem = document.querySelector(`#${food.id} .food-card__orderNum__input`);
    let plusPriceBtn = document.querySelector(`#${food.id} .food-card__plus`);
    let minesPriceBtn = document.querySelector(`#${food.id} .food-card__mines`);
    let BuyBtn = document.querySelector(`#${food.id} .food-card__btn`);
    let control = {
        food,
        elem: HtmlFood,
        priceElem,
        plusPriceBtn,
        minesPriceBtn,
        countElem,
        BuyBtn
    }
    plusFood(control)
    minesFood(control)
    return control
}

function plusFood(control) {
    control.plusPriceBtn.onclick = ()=>{
        if(control.food.countAvailable > 0)
        {
            let count = Number(control.countElem.innerText||0) + 1;
            control.countElem.innerText = count.toString();
            control.priceElem.innerText = `${count * control.food.price}`;
            control.food.countAvailable--
        }else
        {
            alert('No Foods Available')
        }
    }
}

function minesFood(control) {
    control.minesPriceBtn.onclick = ()=>{
        if(Number(control.countElem.innerText||0))
        {
            let count = Number(control.countElem.innerText||0) - 1;
            control.countElem.innerText = count.toString();
            control.priceElem.innerText = `${count * control.food.price}`;
            control.food.countAvailable++
        }
    }
}


addFoodBtn.onclick = ()=>{
    add_available_food(GeneratorFood('Pizza', 'Example description .....',10,))
}
add_available_food(GeneratorFood('Pizza', 'Example description .....',10,))
