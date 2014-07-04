var Product = Backbone.Model.extend({
    defaults: {
        name: "",
        description: "",
        price: ""
    },
    url: function() {
        return(this.isNew() ? "/products.json" : "/products/" + this.id + ".json");
    }
});

var ProductsCollection = Backbone.Collection.extend({
    model: Product,
    url: "products.json"
});

ProductView = Backbone.View.extend({
    template: $("#product_template"),
    events: {
        "click .delete": "destroy"
    },
    initialize: function() {
        this.render();
    },
    render: function() {
        var html = Mustache.to_html(this.template.html(), this.model.toJSON());
        $(this.el).html(html);
        return this;
    },
    destroy: function() {
        var self = this;
        this.model.destroy({
            success: function() {
                self.remove();
            },
            error: function() {
                $("notice").html("There was a problem deleting the product.");
            }
        });
    }
});

ListView = Backbone.View.extend({
    el: $("#list"),
    initialize: function() {
        this.collection.bind("add", this.renderProduct, this);
        this.render();
    },
    renderProduct: function(product) {
        var productView = new ProductView({model: product});
        this.el.append(productView.render().el);
    },
    render: function() {
        if (this.collection.length > 0) {
            this.collection.each(this.renderProduct, this);
        } else {
            $("#notic").html("There are no products to display.")
        }
    }
});

ProductRouter = Backbone.Router.extend({
    routes: {
        "new": "newProduct",
        "": "index"
    },
    index: function() {
        window.products.fetch({
            success: function() {
                new ListView({collection: window.products});
            },
            error: function() {
                $("#notice").html("Coluld not load the products");
            }
        });
    },
    newProduct: function() {
        new FormView({model: new Product()});
    }
});

FormView = Backbone.View.extend({
    el: $("#form"),
    template: $("#product_form_template"),
    events: {
        "click #cancel": "close",
        "submit form": "save"
    },
    initialize: function() {
        this.render()
    },
    render: function() {
        var html = Mustache.to_html(this.template.html(), this.model.toJSON());
        this.el.html(html);
    },
    close: function() {
        this.el.unbind();
        this.el.empty();
    },
    save: function(e) {
        e.preventDefault();
        data = {
            name: $("product_name").val(),
            description: $("product_description").val(),
            price: $("product_price").val()
        };
        var self = this;
        this.model.save(data, {
            success: function(model, resp) {
                $("#notice").html("Product saved.");
                window.products.add(self.model);
                window.router.navigate("#");
                self.close();
            },
            error: function(model, resp) {
                $("#notice").html("Error preventd the product from being created.");
            }
        });
    }
});

$(function(){
    window.products = new ProductsCollection();
    $.ajaxSetup({cache: false});
    window.router = new ProductRouter();
    Backbone.history.start();
});