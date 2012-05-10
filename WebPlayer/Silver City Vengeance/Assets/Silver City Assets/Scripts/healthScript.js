#pragma strict

var health : int = 10;
var dead : boolean = false;
var blood : Transform;
var timeOfDeath : float;
var deathClip : AudioClip;

function Update () {


	if(health <= 0)
		playDeath();

}

function playDeath(){
	
	var smooth = 2.0;
	var tiltAngle = 30.0;
	
    //var tiltAroundZ = Input.GetAxis("Horizontal") * tiltAngle;
    //var tiltAroundX = Input.GetAxis("Vertical") * tiltAngle;
    //var target = Quaternion.Euler (gameObject.transform.rotation.x, gameObject.transform.rotation.y, 90);
    // Dampen towards the target rotation
    //transform.rotation = Quaternion.Slerp(transform.rotation, target,
//                                   Time.deltaTime * smooth);
	
	//this.active = false;	
	//gameObject.layer = 9;
	
	var deadBlood;
	if(Time.time < timeOfDeath + 3){
		deadBlood = Instantiate(blood, transform.position, transform.rotation);
		
	}
	
	
	
	if(dead == false){
		audio.clip = deathClip;
		audio.Play();
//		transform.renderer.color = Color.red;
		transform.Rotate (0,0,90);
		 //actually just resizes it
  	 	var myCollider = GetComponent(BoxCollider);
 	   	
 	   	myCollider.size=Vector3(0,0,0);
		dead = true;
		
		 //actually just resizes it
  	 	var mySCollider = GetComponent(SphereCollider);
 	   	if(mySCollider != null)
 	   		mySCollider.radius = 0;
 	   	
 	   	var controller = GetComponent(CharacterController);
 	   	controller.radius = 0;
 	   	controller.height = 0;
		
		timeOfDeath = Time.time;
	}
	if(Time.time > timeOfDeath + 5)
		Destroy(gameObject);
}