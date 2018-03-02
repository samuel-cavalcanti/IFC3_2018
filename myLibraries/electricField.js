var electricField = {

    raycaster: new THREE.Raycaster(),

    render: function (){
        var mouse = new THREE.Vector2();

        // calculate mouse position in normalized device coordinates
	    // (-1 to +1) for both components
        mouse.x = (universe.mouse.x / window.innerWidth) *2 -1; 
        mouse.y = (universe.mouse.y / window.innerHeight) *2 +1;

        electricField.raycaster.setFromCamera( mouse, universe.camera );

        var intersects = electricField.raycaster.intersectObjects( universe.scene.children );
        

        for ( var i = 0; i < intersects.length; i++ ) {

           
            intersects[ i ].object.material.color.set( 0xff0000 );
    
        }

        universe.renderer.render(universe.scene,universe.camera);

        requestAnimationFrame(electricField.render);
    

   }


};