
var cameraTarget			: GameObject;						//object to look at or follow
var player					: GameObject;						//The player
var smoothTime				: float = 0.1;
var cameraFollowX			: boolean = true;
var cameraFollowY			: boolean = true;
var cameraFollowHeight		: boolean = false;					//camera is going to follow camera object Height not the Y
var cameraHeight			: float = 2.5;						//adjustable height for designer
var velocity 				: Vector2;							//Speed of camera movement
var cameraZoom				: boolean = false;					//toggle for zoom in and out, orthographic size
var cameraZoomMax			: float = 2.5;						//Max amount camera can pull in
var cameraZoomMin			: float = 4.0;						//Max amount camera can pull out
var zoomTime				: float = 0.03;						//speed for camera zooming


private var thisTransform 	: Transform;						//Camera's transform
private var curPos 			: float	= 0.0;						//pos of camera target player focus here
private var playerJumpHeight: float = 0.0;						//sets pull out amount



function Start(){

	thisTransform = transform;

}

function Update ()
{
	if (cameraFollowX){						//do you want to follow horizontally?
		thisTransform.position.x =  Mathf.SmoothDamp(thisTransform.position.x, cameraTarget.transform.position.x,
                                 velocity.x, smoothTime);
	
	}
	
	if (cameraFollowY){						//do you want to follow vertically?
	
		thisTransform.position.y =  Mathf.SmoothDamp(thisTransform.position.y, cameraTarget.transform.position.y,
                             velocity.y, smoothTime);



	} 
	if (!cameraFollowY && cameraFollowX) {			// do you want to manually control the height of the camera?
	
		camera.transform.position.y = cameraHeight;
			
	}
	
	var playerControl = player.GetComponent(playerControls);
	
	if (cameraZoom){								//Do you want to enable zooming?
		
		curPos = player.transform.position.y;  		//sets camera y to player y
		
		playerJumpHeight = curPos - playerControl.startPos;
	
	}
	
	
}