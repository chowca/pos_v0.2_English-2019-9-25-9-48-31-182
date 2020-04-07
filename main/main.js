'use strict';

class BoughtItem {
    constructor(item) {
        this.barcode = item.barcode;
        this.name = item.name;
        this.unit = item.unit;
        this.price = item.price;
        this.quantity = 0;
    }
    subTotal() {
        return this.price * this.quantity;
    };
    receiptMsg() {
        return "Name: "+ this.name +
        ", Quantity: " + this.quantity.toString() + " " + ((this.quantity > 1) ? this.unit+"s" : this.unit) +
        ", Unit: " + this.price.toFixed(2).toString() + " (yuan), Subtotal: " + this.subTotal().toFixed(2).toString() + " (yuan)";
    };
};

function printReceipt(inputs) {
    let itemList = loadAllItems();
    let boughtItems = getBoughtItems(inputs,itemList);
    console.log(constructFullReceipt(boughtItems));
}

function countQuantity(boughtItemIDList){
    let boughtItemIDCountList = {};
    boughtItemIDList.forEach(
        boughtItemID => { boughtItemIDCountList[boughtItemID] = (boughtItemIDCountList[boughtItemID] || 0) + 1;
        }
    );
    return boughtItemIDCountList;
}

function getBoughtItems(boughtItemIDList, itemList){
    let boughtItemList = [];
    let boughtItemIDCountList = countQuantity(boughtItemIDList);
    for (let boughtItemID in boughtItemIDCountList) {
        var boughtItemDetail = new BoughtItem(itemList.filter(item => item.barcode == boughtItemID)[0]);
        boughtItemDetail.quantity = boughtItemIDCountList[boughtItemID];
        boughtItemList.push(boughtItemDetail);
    };
    return boughtItemList;
}

function calItemTotal(checkoutItemSet){
    let totalCost = 0;
    checkoutItemSet.forEach(checkoutItem => totalCost += checkoutItem.subTotal());
    return totalCost;
}

function constructFullReceipt(itemsInReceipt){
    let fullReceipt = "***<store earning no money>Receipt ***\n";
    itemsInReceipt.forEach(itemInReceipt => fullReceipt += itemInReceipt.receiptMsg() + "\n");
    fullReceipt += "----------------------\ntotal: " + calItemTotal(itemsInReceipt).toFixed(2).toString() + " (yuan)\n**********************";
    return fullReceipt;
}