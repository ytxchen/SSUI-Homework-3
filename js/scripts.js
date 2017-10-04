function changeSelectedSize(size) {
    var sizeLabels = document.getElementsByClassName("size_label");
    for (var i=0; i<sizeLabels.length; i++) {
        if (!sizeLabels[i].classList.contains(size)){
            sizeLabels[i].classList.remove('size_selected');
        } else {
            sizeLabels[i].classList.add('size_selected');
        }
    }
}

function changeSelectedColor(color) {
    removeColorSelection();
    document.getElementsByClassName(color)[0]
    .parentElement.classList.add("selected_color");
}

function removeColorSelection() {
    var colorTags = document.getElementsByClassName("color_tag");
    for (var i=0; i<colorTags.length; i++) {
        colorTags[i].classList.remove("selected_color");
    }
}

function decreaseQuantity(el){
    var quantityElem = el.parentElement.childNodes[3];
    var count = parseInt(quantityElem.innerHTML);
    if (count > 1) {
        count--;
    }
    quantityElem.innerHTML = count.toString();
    updateCartSubtotal();
}

function increaseQuantity(el){
    var quantityElem = el.parentElement.childNodes[3];
    var count = parseInt(quantityElem.innerHTML);
    if (count < 99) {
        count++;
    }
    quantityElem.innerHTML = count.toString();
    updateCartSubtotal();
}

function removeCartEntry(el) {
    el.parentElement.parentElement.nextSibling.nextSibling.remove();
    el.parentElement.parentElement.remove();
    updateCartSubtotal();
}

function updateCartSubtotal() {
    if (document.getElementsByClassName("cart_header").length>0) {
        var totalQuantity = 0;
        var quantities = document.getElementsByClassName("quantity_number");
        for (var i=0; i<quantities.length; i++) {
            totalQuantity += parseInt(quantities[i].innerHTML);
        }
        var newSubtotal = "$ " + (totalQuantity*20).toString() + ".00";
        var subtotalElem = document.getElementsByClassName("cart_subtotal_value")[0]
        subtotalElem.innerHTML = newSubtotal;
    }
}

function addToCart() {
    var quantityElem = document.getElementsByClassName("quantity_number")[0];
    var quantityNumber = parseInt(quantityElem.innerHTML);
    var cartCountElem = document.getElementsByClassName("cart_count")[0];
    var currentCount = parseInt(cartCountElem.innerHTML);
    cartCountElem.innerHTML = (currentCount+quantityNumber).toString();
}

function loadProductDetails() {
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('item')) {
        var itemType = urlParams.get('item');
        console.log(itemType);
        if (itemType === "dog_harness") {return;}

        var itemImageElem = document.getElementsByClassName("details_image")[0];
        var itemNameElem = document.getElementsByClassName("item_name")[0];
        var itemDescElem = document.getElementsByClassName("details_description")[0];
        itemImageElem.src = "assets/" + itemType + ".jpg";

        if (itemType === "cat_harness") {
            itemNameElem.innerHTML = "Cat Harness";
            itemDescElem.innerHTML = "The walking vests provide more "
            + "coverage and pressure distribution than leads, "
            + "and it can be a good choice for cats who pull a lot during "
            + "walks or for flexible felines who can wriggle out of a lead "
            + "and scamper away.";
        } else if (itemType === "harness_attachment") {
            itemNameElem.innerHTML = "Harness Attachment";
            itemDescElem.innerHTML = "Food and water storage attachment to "
            + "harness. Convenient way to carry small items while taking"
            + " our friends with paws out for a walk.";
        } else if (itemType === "gps_collar") {
            itemNameElem.innerHTML = "GPS Tracker Collar";
            itemDescElem.innerHTML = "Mini Waterproof Multi-functional GPS "
            + "pet tracker with powerful location monitoring and an extremely "
            + "high technical specifcation - follow the footprints of your "
            + "beloved kitten, puppy, or pony.";
        }
    }
}