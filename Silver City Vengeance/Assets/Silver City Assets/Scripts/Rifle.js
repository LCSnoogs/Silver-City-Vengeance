#pragma strict

var target : Vector3;
var distX : float;
var distY : float;
var position : Vector3;
var rotation : Quaternion;
var rifleBullet : Transform;
var speed : float = 10.0;
var range : float = 5.0;
var ammoCapacity : int = 6;
var bulletsLeft : int = ammoCapacity;
var reloadTime : float = 3.0;
var chargeTime : float = 2.0;
var charging : boolean = false;
var soundRate : float;
var soundDelay : float = 0;
var revolverClip				: AudioClip;

private var angle : float;
private var reloading : boolean = false;
private var startTime : float;

function shoot () {
	if (!reloading)
	{
		if (!charging)
		{
			charging = true;
			startTime = Time.time;
		}
		else if (chargeTime + startTime <= Time.time)
		{
			calculatePath();
			var side : float;
			var firedBullet : Transform;
			if (target.x > transform.position.x)
				side = 1;
			else
				side = -1;
			
			firedBullet = Instantiate(rifleBullet, Vector3(position.x+side, position.y, position.z), Quaternion.identity);	
			firedBullet.GetComponent(RifleBullet).speed = speed;
			firedBullet.GetComponent(RifleBullet).range = range;
			firedBullet.GetComponent(RifleBullet).rotation = angle;
			firedBullet.GetComponent(RifleBullet).isActive = true;
			audio.clip = revolverClip;
			audio.Play();
			bulletsLeft--;
			if (bulletsLeft == 0)
			{
				reloading = true;
				startTime = Time.time;
			}
			charging = false;
		}
	}
	else
	{
		if (startTime + reloadTime <= Time.time)
		{
			reloading = false;
			bulletsLeft = ammoCapacity;
			shoot();
		}
	}
}

function calculatePath()
{
	distX = target.x - position.x;
	distY = target.y - position.y;
		
	angle = Mathf.Rad2Deg * Mathf.Atan(distY/distX);
	if (distX < 0)
	{
		angle += 180;
	}
}
