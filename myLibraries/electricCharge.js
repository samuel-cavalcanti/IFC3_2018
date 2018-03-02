var electricCharge = {

    addCharge: function () {
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

        universe.scene.add(sphere);


       

    },

    






};

