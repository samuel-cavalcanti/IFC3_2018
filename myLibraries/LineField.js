function LineField(origin, target, length, type) {
    var object = this;
    this.density = Math.PI / 3;
    this.type = type;
    this.arrows  = new THREE.Group();
    createLineField();



    this.update = function (pOrigin, pTarget, length) {
        
        var index = 0;



        for (var angleX = 0; angleX < 2 * Math.PI; angleX += this.density) {
            for (var angleY = 0; angleY < 2 * Math.PI; angleY += this.density) {
                for (var angleZ = 0; angleZ < 2 * Math.PI; angleZ += this.density) {
                    eulerAngle = new THREE.Euler(angleX, angleY, angleZ, 'XYZ');
                    updateArrow(eulerAngle, index, pOrigin, pTarget, length);

                    index++;
                }

            }

        }

        

    }

    this.hide = function () {
      universe.scene.remove(this.arrows);
    }



    


    function createLineField() {

        for (var angleX = 0; angleX < 2 * Math.PI; angleX += object.density) {
            for (var angleY = 0; angleY < 2 * Math.PI; angleY += object.density) {
                for (var angleZ = 0; angleZ < 2 * Math.PI; angleZ += object.density) {
                    eulerAngle = new THREE.Euler(angleX, angleY, angleZ, 'XYZ');
                    object.arrows.add(createVector(eulerAngle));


                }

            }

        }

        universe.scene.add(object.arrows);

    }


    function createVector(angle) {
        var pOrigin = new THREE.Vector3().copy(origin);

        pOrigin.applyEuler(angle);
        pOrigin.add(origin);



        var pTarget = new THREE.Vector3().copy(target);
        pTarget.applyEuler(angle);



        var arrow = new THREE.ArrowHelper(pTarget, pOrigin, length, "#ffffff");

    
        return arrow;
    }




    function updateArrow(angle, index, origin, target, length) {

        var pTarget = new THREE.Vector3().copy(target);
        pTarget.applyEuler(angle);

        var pOrigin = new THREE.Vector3().copy(origin);
       
        pOrigin.applyEuler(angle);
        pOrigin.add(origin);


    

      
        object.arrows.children[index].position.copy(pOrigin);
        object.arrows.children[index].setDirection(pTarget);
        object.arrows.children[index].setLength(length);
 

      

     

    }







};