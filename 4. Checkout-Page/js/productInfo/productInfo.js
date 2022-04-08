import * as c from "./const.js"

const productData = loadProductData()
addEventListeners()

function loadProductData() {
    let defaultData = {
        products: {
            "Vintage Backbag": {
                name: "Vintage Backbag",
                num: 1,
                originalPrice: 94.99,
                discountedPrice: 54.99,
            },
            "Levi Shoes": {
                name: "Levi Shoes",
                num: 1,
                originalPrice: 124.99,
                discountedPrice: 74.99
            },
        },
        shipping: {
            price: 19
        }
    };

    return defaultData;
}

function addEventListeners() {
    for (let productName of Object.keys(productData.products)) {
        let addButtonId = getAddButtonId(productName);
        let deductButtonId = getDeductButtonId(productName);

        let addButton = document.getElementById(addButtonId)
        let deductButton = document.getElementById(deductButtonId);

        addButton.addEventListener("click", onButtonClick);
        deductButton.addEventListener("click", onButtonClick);
    }
}

function onButtonClick(e) {    
    let [operator, productName] = extractProductName(e.target.id)
    
    let productInfo = productData.products[productName]
    if (productInfo === null || productInfo === undefined) {
        return
    }

    switch(operator) {
        case c.ADD_PREFIX:
            addProduct(productInfo)
            break;
        case c.DEDUCT_PREFIX:
            deductProduct(productInfo);
            break;
        default:
            return;
    }

    updateProductInfoView();
}

function addProduct(productInfo) {
    productInfo.num += 1
}

function deductProduct(productInfo) {
  if (productInfo.num == 0) {
    return;
  }

  productInfo.num -= 1;
}

function updateProductInfoView() {
    updateProductCount()
    updateTotalPrice()
}

function updateProductCount() {
    for (let [productName, productInfo] of Object.entries(productData.products)) {
        let productNumId = getProductNumId(productName);
        let countLabel = document.getElementById(productNumId);

        countLabel.textContent = productInfo.num;
    }
}

function updateTotalPrice() {
    let totalPrice = calculateTotalPrice()
    let totalPriceLabel = document.getElementById(c.TOTAL_PRICE_ID)

    totalPriceLabel.textContent = `$${totalPrice}`
}

function calculateTotalPrice() {
    let totalPrice = 0

    for (let productInfo of Object.values(productData.products)) {        
        totalPrice += (productInfo.discountedPrice * productInfo.num)
    }

    if (totalPrice !== 0) {
        totalPrice += productData.shipping.price;
        totalPrice = (Math.round(totalPrice * 100) / 100).toFixed(2);
    }

    return totalPrice
}

function getAddButtonId(productName) {
    return `${c.ADD_PREFIX}${c.ID_SEPARATOR}${productName}`
}

function getDeductButtonId(productName) {
    return `${c.DEDUCT_PREFIX}${c.ID_SEPARATOR}${productName}`;
}

function getProductNumId(productName) {
    return `${c.COUNT_PREFIX}${c.ID_SEPARATOR}${productName}`;
}

function extractProductName(id) {
    let productName = id.split(c.ID_SEPARATOR);

    if (productName.length != 2) {
        return ""
    }

    return [productName[0], productName[1]]
}