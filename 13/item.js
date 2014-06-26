var LineItem = function(product_name, product_price) {
    this.name = product_name;
    this.price = product_price;
    this.quantity = ko.observable(1);
    this.subtotal = ko.dependentObservable(function(){
        return (this.price * parseInt("0" + this.quantity(), 10));
    }, this);
}

var item = new LineItem("Macbook Pro 15", 1699.00);
ko.applyBindings(item);