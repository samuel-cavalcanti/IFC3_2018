function LineField(origin, target) {
    this.material = new THREE.LineBasicMaterial({
        color: "#ffffff"
    });

    this.geometry = new THREE.Geometry();
    this.geometry.vertices.push(origin);
    this.geometry.vertices.push(target);
    this.line = new THREE.Line(this.geometry, this.material);

    this.show = function () {

        universe.scene.add(this.line);
    };

    this.hide = function () {
        universe.scene.remove(this.line);
    }

    this.update = function (origin,target ){
      this.geometry.vertices[0].copy(origin);
      this.geometry.vertices[1].copy(target);
      this.geometry.verticesNeedUpdate = true;
      
      

    }



}