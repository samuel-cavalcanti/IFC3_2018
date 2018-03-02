var electricField = {

    raycaster: new THREE.Raycaster(),
    transformControl: null,

    render: function () {

        electricField.findCharge();
        electricField.transformControl.update();




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
                console.log(electricCharge);

                this.transformControl.attach(electricCharge);
                
               


            }


        }

    },

    params: {
        addCharge: electricCharge.addCharge
    },

    setTransformControl: function () {
        // universe.controls.addEventListener('start', function(){
        //     electricField.cancelHideTransorm();
        // } );
        // universe.controls.addEventListener("end",function(){
        //     electricField.delayHideTransform();
        // });
        
        electricField.transformControl = new THREE.TransformControls(universe.camera, universe.renderer.domElement);
        electricField.transformControl.addEventListener('change', electricField.render);
        
        universe.scene.add(electricField.transformControl);

    },

    hiding: null,

    delayHideTransform : function(){
        this.cancelHideTransorm();
        this.hideTransform();
    },

    cancelHideTransorm : function(){
        if (this.hiding) clearTimeout(this.hiding);
    },

    hideTransform: function (){
        this.hiding = setTimeout(function(){
            electricField.transformControl.detach( electricField.transformControl.object);

        }, 2000);
        

    },


    init: function () {
        electricField.setTransformControl();
        universe.gui.add(electricField.params, "addCharge");


    }




};


electricField.init();
electricField.render();