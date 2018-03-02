   function ElectricCharge() {
       var visible = false;
       var object = this;

       this.sphere = null;
       this.lineField = null;
       this.properties = {
           coulombConstant: 9e-9,
           charge: 9e+16,
           electricPotentialVector: new THREE.Vector3(),
           electricPotentialUnitVector: new THREE.Vector3(),
           positionUnitVector: new THREE.Vector3(),
           distance: 1
       };

       createSphere();
       createLineField();

       this.show = function () {

           universe.scene.add(this.sphere);
           this.lineField.show();

           visible = true;

       };

       this.hide = function () {

           universe.scene.remove(this.sphere);
           this.lineField.hide();

           visible = false;

       }


       this.print = function () {

       };


       this.update = function () {
        updateLineField();

       };


       function createLineField() {

           object.properties.positionUnitVector.copy(object.sphere.position);
           object.properties.positionUnitVector.normalize();
           object.properties.electricPotentialVector.copy(object.properties.positionUnitVector);
           var scalar = (object.properties.coulombConstant * object.properties.charge) / (Math.pow(object.sphere.position.length(), 2));
           object.properties.electricPotentialVector.multiplyScalar(scalar);
           object.properties.electricPotentialVector.add(object.sphere.position);

           object.lineField = new LineField(object.sphere.position, object.properties.electricPotentialVector);



       }

       function updateLineField() {

           object.properties.positionUnitVector.copy(object.sphere.position);
           object.properties.positionUnitVector.normalize();
           object.properties.electricPotentialVector.copy(object.properties.positionUnitVector);
           var scalar = (object.properties.coulombConstant * object.properties.charge) / (Math.pow(object.sphere.position.length(), 2));
           object.properties.electricPotentialVector.multiplyScalar(scalar);
           object.properties.electricPotentialVector.add(object.sphere.position);

           object.lineField.update(object.sphere.position, object.properties.electricPotentialVector);

       }

       function createSphere() {
           var radius = 13;
           var widthSegments = 28;
           var heightSegments = 18;
           var phiStart = 0;
           var phiLength = 6.3;
           var thetaStart = 0;
           var thetaLength = 6.3;

           var geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);
           var material = new THREE.MeshBasicMaterial({
               color: 0xffff00
           });
           var sphere = new THREE.Mesh(geometry, material);

           sphere.name = "electricCharge";
           sphere.position.x = 300;

           object.properties.positionVector = sphere.position;

           object.sphere = sphere;
       }




   };