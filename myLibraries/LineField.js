function LineField(origin, target, length) {
    var object = this;
    this.arrows = [];
    createLineField();


    this.update = function (pOrigin, pTarget, length) {



        var index = 0;

        index = updateX(index, pOrigin, pTarget, length);

        index = updateY(index, pOrigin, pTarget, length);

        updateZ(index, pOrigin, pTarget, length);

    }

    this.hide = function () {
        for (var i in this.arrows) {
            this.arrows[i].hide();
        }

        this.arrows = [];

    }



    //this.arrows[i].update(pOrigin, pTarget, length);



    function createLineField() {
        rotateX();
        rotateY();
        rotateZ();
    }


    function rotateX() {
        for (var angle = 0; angle < 2 * Math.PI; angle += Math.PI / 6) {
            var eulerAngle = new THREE.Euler(angle, 0, 0, 'XYZ');
            object.arrows.push(createArrow(eulerAngle));
        }
    }

    function rotateY() {

        for (var angle = Math.PI / 6; angle < 2 * Math.PI; angle += Math.PI / 6) {
            var eulerAngle = new THREE.Euler(0, angle, 0, 'XYZ');
            object.arrows.push(createArrow(eulerAngle));
        }

    }

    function rotateZ() {
        for (var angle = Math.PI / 6; angle < 2 * Math.PI; angle += Math.PI / 6) {
            var eulerAngle = new THREE.Euler(0, 0, angle, 'XYZ');
            object.arrows.push(createArrow(eulerAngle));
        }

    }

    function createArrow(angle) {
        var pTarget = new THREE.Vector3().copy(target);
        pTarget.applyEuler(angle);
        var arrow = new Arrow(origin, pTarget, length);
        arrow.show();
        return arrow;
    }

    function updateX(index, pOrigin, pTarget, length) {
        for (var angle = 0; angle < 2 * Math.PI; angle += Math.PI / 6) {
            var eulerAngle = new THREE.Euler(angle, 0, 0, 'XYZ');
            updateArrow(eulerAngle, index, pOrigin, pTarget, length);
            index++;
        }
        return index;

    }

    function updateY(index, pOrigin, pTarget, length) {
        for (var angle = Math.PI / 6; angle < 2 * Math.PI; angle += Math.PI / 6) {
            var eulerAngle = new THREE.Euler(0, angle, 0, 'XYZ');
            updateArrow(eulerAngle, index, pOrigin, pTarget, length);
            index++;
        }
        return index;

    }

    function updateZ(index, pOrigin, pTarget, length) {
        for (var angle = Math.PI / 6; angle < 2 * Math.PI; angle += Math.PI / 6) {
            var eulerAngle = new THREE.Euler(0, 0, angle, 'XYZ');
            updateArrow(eulerAngle, index, pOrigin, pTarget, length);
            index++;
        }


    }

    function updateArrow(angle, index, origin, target, length) {
     //   console.log(target);
        var pTarget = new THREE.Vector3().copy(target);
        pTarget.applyEuler(angle);
        object.arrows[index].update(origin, pTarget, length);

    }




};