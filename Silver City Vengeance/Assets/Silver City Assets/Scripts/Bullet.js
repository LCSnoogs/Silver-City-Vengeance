#pragma strict

var target : GameObject;
var range : float;
var isActive : boolean = false;
var speed : float;
var blood : Transform;
var rotation : float;
var rotated : boolean = false;
var moveX : float;
var moveY : float;
var damage : float = 0.5;
private var distance : float = 0;
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
		
		transform.Translate(speed*Time.deltaTime, 0, 0);
		distance += speed*Time.deltaTime;
		
		if (distance >= range)
		{
			Destroy(gameObject);
		}
	}
}

function OnTriggerEnter(other : Collider)
{
	if (other.tag == "Player")
	{
		Destroy(gameObject);
		
		//I need to put health information here.
		
		Instantiate(blood, transform.position, transform.rotation);
		
		var playerScript : playerProperties = other.GetComponent(playerProperties);
		
		playerScript.health-=damage;
	}		
	
	if (other.tag == "Enemy")
	{
	
		Destroy(gameObject);
		Instantiate(blood, transform.position, transform.rotation);
		
		var healthScript = other.GetComponent(healthScript);
		
		healthScript.health-=damage;
		
	
	}
}