function Arrow(origin, target, length) {
    var object = this;
    this.arrow = new THREE.ArrowHelper(target, origin, length, "#ffffff");
   

    this.show = function () {

        universe.scene.add(this.arrow);
    };

    this.hide = function () {
        universe.scene.remove(this.arrow);
    }

    this.update = function (origin, target, length) {
        universe.scene.remove(this.arrow);
        this.arrow = new THREE.ArrowHelper(target, origin, length, "#ffffff");
        universe.scene.add(this.arrow);



    }

}