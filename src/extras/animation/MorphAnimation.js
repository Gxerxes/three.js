/**
 * @author mrdoob / http://mrdoob.com
 */

THREE.MorphAnimation = function ( mesh ) {

	this.mesh = mesh;
	this.frames = mesh.morphTargetInfluences.length;
	this.currentTime = 0;
	this.duration = 1000;
	this.loop = true;

	this.isPlaying = false;

};

THREE.MorphAnimation.prototype = {

	play: function () {

		this.isPlaying = true;

	},

	pause: function () {

		this.isPlaying = false;
	},

	update: ( function () {

		var lastFrame = 0;
		var currentFrame = 0;

		return function ( delta ) {

			if ( this.isPlaying === false ) return;

			this.currentTime += delta;

			var currentTime = this.currentTime;

			if ( this.loop === true ) {

				currentTime %= this.duration;

			}

			var interpolation = this.duration / this.frames;
			var frame = Math.floor( currentTime / interpolation );

			if ( frame != currentFrame ) {

				this.mesh.morphTargetInfluences[ lastFrame ] = 0;
				this.mesh.morphTargetInfluences[ currentFrame ] = 1;
				this.mesh.morphTargetInfluences[ frame ] = 0;

				lastFrame = currentFrame;
				currentFrame = frame;

			}

			this.mesh.morphTargetInfluences[ frame ] = ( currentTime % interpolation ) / interpolation;
			this.mesh.morphTargetInfluences[ lastFrame ] = 1 - this.mesh.morphTargetInfluences[ frame ];

		}

	} )()

};
