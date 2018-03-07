   function ElectricCharge(type) {
       // 
       var direction = 1;
       var typeColor = 0xffff00;

       if (type == "negative") {
           direction = -1;
           typeColor = "#0d076b";

       }


       var visible = false;
       var object = this;

       this.sphere = null;
       this.lineField = null;
       this.properties = {
           coulombConstant: 9e-9,
           charge: 9e+12 * direction,
           guiCharge: 500,
           electricPotentialVector: new THREE.Vector3(),
           electricPotentialUnitVector: new THREE.Vector3(),
           positionUnitVector: new THREE.Vector3(),
           distance: 1,
           type: type,
           arrowLength:1
       };

       createSphere();
       createLineField();

       this.show = function () {

           universe.scene.add(this.sphere);
           

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

           calculatingTheElectricPotential()
          
         
           object.lineField = new LineField(object.sphere.position, object.properties.electricPotentialUnitVector,object.properties.arrowLength,type);
           

           
       }

       function calculatingTheElectricPotential() {



           object.properties.positionUnitVector.copy(object.sphere.position);
           object.properties.positionUnitVector.normalize();
           object.properties.electricPotentialVector.copy(object.properties.positionUnitVector);

           var distance = object.sphere.position.distanceTo(new THREE.Vector3());

           if (distance == 0.0)
               distance = 1e-10;

           var scalar = (object.properties.coulombConstant * object.properties.charge * object.properties.guiCharge) / Math.pow (distance,2);

           object.properties.arrowLength = Math.abs(scalar);
           if ( object.properties.arrowLength > 207)
             object.properties.arrowLength= 207;

           object.properties.electricPotentialVector.multiplyScalar(scalar);
          
           object.properties.electricPotentialUnitVector.copy(object.properties.electricPotentialVector);
           object.properties.electricPotentialUnitVector.normalize();


           
       }

       function updateLineField() {

           calculatingTheElectricPotential()

           object.lineField.update(object.sphere.position, object.properties.electricPotentialUnitVector,object.properties.arrowLength);

       
       

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
               color: typeColor
           });
           var sphere = new THREE.Mesh(geometry, material);

           sphere.name = "electricCharge";
           sphere.position.x = 300;

           object.properties.positionVector = sphere.position;

           object.sphere = sphere;
       }




   };