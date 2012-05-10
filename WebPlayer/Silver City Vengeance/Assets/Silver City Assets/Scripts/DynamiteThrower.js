#pragma strict

var target : GameObject;
var distX : float;
var distY : float;
var position : Vector3;
var rotation : Quaternion;
var dynamite : Transform;
var speed : float = 5.0;
var range : float = 5.0;
var ammoCapacity : int = 1;
var dynamitesLeft : int = ammoCapacity;
var reloadTime : float = 3.0;
private var angle : float;
private var reloading : boolean = false;
private var startTime : float;

function shoot () {
	if (!reloading)
	{
		calculatePath();
		
		var thrownDynamite : Transform;
		
		thrownDynamite = Instantiate(dynamite, position, Quaternion.identity);	
		thrownDynamite.GetComponent(Dynamite).speed = speed;
		thrownDynamite.GetComponent(Dynamite).range = Mathf.Sqrt(distX*distX + distY*distY);
		thrownDynamite.GetComponent(Dynamite).rotation = angle;
		thrownDynamite.GetComponent(Dynamite).isActive = true;
		
		dynamitesLeft--;
		if (dynamitesLeft == 0)
		{
			reloading = true;
			startTime = Time.time;
		}
	}
	else
	{
		if (startTime + reloadTime <= Time.time)
		{
			reloading = false;
			dynamitesLeft = ammoCapacity;
		}
	}
}

function calculatePath()
{
	distX = target.transform.position.x - position.x;
	distY = target.transform.position.y - position.y;
		
	angle = Mathf.Rad2Deg * Mathf.Atan(distY/distX);
	if (distX < 0)
	{
		angle += 180;
	}
}