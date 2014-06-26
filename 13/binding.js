var Person = function() {
    this.firstname = ko.observable("John");
    this.lastname = ko.observable("Smith");
    this.fullname = ko.dependentObservable(function() {
        return (this.firstname() + " " + this.lastname());
    }, this);
}

ko.applyBindings(new Person);