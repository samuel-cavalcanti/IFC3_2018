function LineField(origin, target, length,type) {
    var object = this;
    this.arrows = [];
    this.density =  Math.PI / 3;
    this.type = type;
    createLineField();



    this.update = function (pOrigin, pTarget, length) {

        var index = 0;
        
        

    for (var angleX = 0; angleX < 2 * Math.PI; angleX += this.density) {
          for (var angleY = 0; angleY < 2 * Math.PI; angleY += this.density){
              for (var angleZ = 0; angleZ < 2 * Math.PI; angleZ += this.density){
                   eulerAngle = new THREE.Euler( angleX, angleY, angleZ, 'XYZ');
                   updateArrow(eulerAngle, index, pOrigin, pTarget, length);

                    index++;
            }
              
          }
          
        }



    }

    this.hide = function () {
        for (var i in this.arrows) {
            this.arrows[i].hide();
        }

        this.arrows = [];

    }



    //this.arrows[i].update(pOrigin, pTarget, length);



    function createLineField() {

         for (var angleX = 0; angleX < 2 * Math.PI; angleX += object.density) {
          for (var angleY = 0; angleY < 2 * Math.PI; angleY += object.density){
              for (var angleZ = 0; angleZ < 2 * Math.PI; angleZ += object.density){
                   eulerAngle = new THREE.Euler( angleX, angleY, angleZ, 'XYZ');                
                    object.arrows.push(createArrow(eulerAngle));
                   
                   
            }
              
          }
          
        }
      
    }


    function createArrow(angle) {
        var pOrigin = new THREE.Vector3().copy(origin);
        
        pOrigin.applyEuler(angle);
        pOrigin.add(origin);
     
        var pTarget = new THREE.Vector3().copy(target);
        pTarget.applyEuler(angle);
       
        
       
        var arrow = new Arrow(pOrigin, pTarget, length);
        arrow.show();
        return arrow;
    }


 

    function updateArrow(angle, index, origin, target, length) {
    
        var pTarget = new THREE.Vector3().copy(target);
        pTarget.applyEuler(angle);

        var pOrigin = new THREE.Vector3().copy(origin);
        
        pOrigin.applyEuler(angle);
        pOrigin.add(origin);

        object.arrows[index].update(pOrigin, pTarget, length);

    }

 
    




};