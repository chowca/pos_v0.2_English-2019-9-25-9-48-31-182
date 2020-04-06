'use strict';

class boughtItem {
    constructor(item) {
        this.barcode = item.barcode;
        this.name = item.name;
        this.unit = item.unit;
        this.price = item.price;
        this.qty = 0;
    }
    subTotal() {return this.price * this.qty};
    receiptMsg() {return "Name: "+ this.name +
    ", Quantity: " + this.qty.toString() + " " + ((this.qty>1) ? this.unit+"s" : this.unit) +
    ", Unit: " + this.price.toFixed(2).toString() + " (yuan), Subtotal: " + this.subTotal().toFixed(2).toString() + " (yuan)"
    };
  };

function printReceipt(inputs) {
  //console.log('Implement the exercise requirements here and rewrite the line of code.');
  let itemList = loadAllItems();
  let fullReceipt = "***<store earning no money>Receipt ***\n";
  let boughtItems = loadBoughtItems(inputs,itemList);
  let total = calItemTotal(boughtItems);
  boughtItems.forEach(boughtItem => fullReceipt += boughtItem.receiptMsg() + "\n");
  fullReceipt += "----------------------\ntotal: " + total.toFixed(2).toString() + " (yuan)\n**********************"
  console.log(fullReceipt);
}
function countQuantity(boughtItemIDList){
    let boughtItemIDCountList = {};
    boughtItemIDList.forEach(
        boughtItemID => { boughtItemIDCountList[boughtItemID] = (boughtItemIDCountList[boughtItemID] || 0) + 1;
        }
     );
    return boughtItemIDCountList;
}
function loadBoughtItems(boughtItemIDList, itemList){
    let boughtItemList = [];
    let boughtItemIDCountList = countQuantity(boughtItemIDList);
    for (let boughtItemID in boughtItemIDCountList) {
        var boughtItemDetail = new boughtItem(itemList.filter(item => item.barcode == boughtItemID)[0]);
        boughtItemDetail.qty = boughtItemIDCountList[boughtItemID];
        boughtItemList.push(boughtItemDetail);
        };
    return boughtItemList;
    //itemList.forEach(item => itemIDList.push(item.barcode));
    //return itemIDList.filter(boughtItemID => boughtItemIDList.includes(boughtItemID));
}
function calItemTotal(checkoutItemSet){
    let totalCost = 0;
    checkoutItemSet.forEach(checkoutItem => totalCost += checkoutItem.subTotal());
    return totalCost;
}