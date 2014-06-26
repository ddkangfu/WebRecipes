var products = [
    {name: "Macbook Pro 15 inch", price: 1699.00},
    {name: "Mini Display Port to VGA Adapter", price: 29.00},
    {name: "Magic Trackpad", price: 69.00},
    {name: "Apple Wireless Keyboard", price: 69.00}
];

var LineItem = function(product_name, product_price) {
    this.name = product_name;
    this.price = product_price;
    this.quantity = ko.observable(1);
    this.subtotal = ko.dependentObservable(function(){
        return (this.price * parseInt("0" + this.quantity(), 10));
    }, this);
}

var Cart = function(items) {
    this.items = ko.observableArray();

    for (var i in items) {
        var item = new LineItem(items[i].name, items[i].price);
        this.items.push(item);
    }

    this.total = ko.dependentObservable(function() {
        var total = 0;
        for (item in this.items()) {
            total += this.items()[item].subtotal();
        }
        return total;
    }, this);

    this.remove = function(item) {
        this.items.remove(item);
    }
}

var cartViewModel = new Cart(products);
ko.applyBindings(cartViewModel);

/*
function remove(item) {
    cartViewModel.remove(item);
}*/