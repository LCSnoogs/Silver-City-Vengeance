#pragma strict

var target : GameObject;
var range : float = 5.0;
var isActive : boolean = false;
var speed : float;
var explosion : Transform;
var rotation : float;
var rotated : boolean = false;
var moveX : float;
var moveY : float;
var gravity : float = 5.0;
var damage : int;
var aoeRange : float;
private var hasGravity : boolean = false;
private var distance : float = 0;
private var velocityY : float;


function Start () {
	
}

function Update () {
	if (isActive)
	{
		if (!rotated)
		{
			transform.Rotate(0,0,rotation, Space.World);
			rotated = true;
		}
		if (!hasGravity)
		{
			velocityY = gravity * (range/2/speed);
			hasGravity = true;
		}
		transform.Translate(speed*Time.deltaTime, 0, 0);
		transform.position.y += velocityY*Time.deltaTime;
		velocityY -= gravity*Time.deltaTime;
		
		distance += speed*Time.deltaTime;
		var dist : float;
		if (distance >= range)
		{
			
			
			
			Destroy(gameObject);
			Instantiate(explosion, transform.position, Quaternion(0,0,0,0));
			
			
			var allObjects = FindObjectsOfType (GameObject);
			for (var child : GameObject in allObjects) {
    			dist = Vector3.Distance(child.transform.position, transform.position);
 		   		if (dist < aoeRange && child.tag.Equals("Enemy")) {
        			child.GetComponent(healthScript).health -= 10;
    			}
    			if(dist < aoeRange && child.tag.Equals("Player")) {
					var playerScript : playerProperties = child.GetComponent(playerProperties);
					playerScript.health  -= 10;    			
				}
			}
		}
	}
}