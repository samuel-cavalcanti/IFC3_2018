var electricField = {

    raycaster: new THREE.Raycaster(),
    transformControl: null,
    positiveCharges: [],
    negativeCharges: [],
    allCharges: [],
    sphereOptions: {
        folder: null,
        item: null
    },

    render: function () {

        electricField.findCharge();
        electricField.transformControl.update();
      //  electricField.updateCharges();




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



                var indexCharge = electricField.findbySphere(electricCharge);


                if (this.sphereOptions.item == null) {
                    this.sphereOptions.item = this.sphereOptions.folder.add(this.allCharges[indexCharge].properties, "guiCharge", 1, 1000).name("arrow length: ");
                    this.sphereOptions.folder.open();
                } else {
                    this.sphereOptions.item.object = this.allCharges[indexCharge].properties;

                }


            }


        }

    },

    addPositiveCharge: function () {
        var charge = new ElectricCharge("positive");
        charge.show();
        electricField.allCharges.push(charge);
    },

    addNegativeCharge: function () {
        var charge = new ElectricCharge("negative");
        charge.show();
        electricField.allCharges.push(charge);
    },

    deleteCharge: function () {
        if (!electricField.transformControl.object)
            return;

        var indexCharge = electricField.findbySphere(electricField.transformControl.object);

        electricField.allCharges[indexCharge].hide();
        electricField.transformControl.detach();
        electricField.allCharges.splice(indexCharge, 1);

    },

    findbySphere: function (object) {
        for (var i in electricField.allCharges) {
            if (object.uuid == electricField.allCharges[i].sphere.uuid)
                return i;
        }
        return null;
    },

    removeCharge: function (indexCharge) {




    },

    setTransformControl: function () {

        electricField.transformControl = new THREE.TransformControls(universe.camera, universe.renderer.domElement);
        electricField.transformControl.addEventListener('change', electricField.render);

        universe.scene.add(electricField.transformControl);

    },


    init: function () {
        electricField.setTransformControl();
        electricField.params.addPositiveCharge = electricField.addPositiveCharge;
        electricField.params.addNegativeCharge = electricField.addNegativeCharge;
        electricField.params.deleteCharge = electricField.deleteCharge;
        universe.gui.add(electricField.params, "addPositiveCharge").name("addPositive");
        universe.gui.add(electricField.params, "addNegativeCharge").name("addNegative");
        universe.gui.add(electricField.params, "deleteCharge");
        electricField.sphereOptions.folder = universe.gui.addFolder("electricCharge");
        universe.gui.open();
    },


    params: {
        addPositiveCharge: null,
        addNegativeCharge: null,
        deleteCharge: null
    },

    updateCharges: function () {
        for (var i in this.allCharges) {
            this.allCharges[i].update();
        }

    },

    





};


electricField.init();
electricField.render();

electricField.transformControl.addEventListener("change",function(e){
    if (!electricField.transformControl.object)
        return;

        var indexCharge = electricField.findbySphere(electricField.transformControl.object);
        electricField.allCharges[indexCharge].update();


} )
