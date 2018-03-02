var electricField = {

    raycaster: new THREE.Raycaster(),
    transformControl: null,
    charges: [],

    render: function () {

        electricField.findCharge();
        electricField.transformControl.update();
        electricField.updateCharges();




        requestAnimationFrame(electricField.render);


    },

    normalizeMouseCoordinates: function () {
        var mouse = new THREE.Vector2();

        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
        mouse.x = (universe.mouse.x / window.innerWidth) * 2 - 1;
        mouse.y = -(universe.mouse.y / window.innerHeight) * 2 + 1;

        return mouse;
    },


    findCharge: function () {

        var mouse = electricField.normalizeMouseCoordinates();

        electricField.raycaster.setFromCamera(mouse, universe.camera);

        var intersects = electricField.raycaster.intersectObjects(universe.scene.children);


        for (var i = 0; i < intersects.length; i++) {


            if (intersects[i].object.name == "electricCharge") {
                
                var electricCharge = intersects[i].object;

                this.transformControl.attach(electricCharge);
                
            }


        }

    },

    addCharge : function (){
        var change = new ElectricCharge();
        change.show();
        electricField.charges.push(change);
    },

    
    setTransformControl: function () {
        
        electricField.transformControl = new THREE.TransformControls(universe.camera, universe.renderer.domElement);
        electricField.transformControl.addEventListener('change', electricField.render);
        
        universe.scene.add(electricField.transformControl);

    },


    init: function () {
        electricField.setTransformControl();
        electricField.params.addCharge = electricField.addCharge;
        universe.gui.add(electricField.params, "addCharge");
    },


    params: {
        addCharge: null
    },

    updateCharges : function(){
        for (var i in this.charges){
            this.charges[i].update();
        }
    }


};


electricField.init();
electricField.render();