#pragma strict

var target : GameObject;
var distX : float;
var distY : float;
var position : Vector3;
var rotation : Quaternion;
var bullet : Transform;
var speed : float = 5.0;
var range : float = 5.0;
var ammoCapacity : int = 6;
var bulletsLeft : int = ammoCapacity;
var reloadTime : float = 3.0;
var soundRate : float;
var soundDelay : float = 0;
var revolverClip				: AudioClip;

private var angle : float;
private var reloading : boolean = false;
private var startTime : float;

function shoot () {
	if (!reloading)
	{
		calculatePath();
		var side : float;
		var firedBullet : Transform;
		if (target.transform.position.x > transform.position.x)
			side = 1;
		else
			side = -1;
		
		firedBullet = Instantiate(bullet, Vector3(position.x+side, position.y, position.z), Quaternion.identity);	
		firedBullet.GetComponent(Bullet).speed = speed;
		firedBullet.GetComponent(Bullet).range = range;
		firedBullet.GetComponent(Bullet).rotation = angle;
		firedBullet.GetComponent(Bullet).isActive = true;
		audio.clip = revolverClip;
		audio.Play();
		bulletsLeft--;
		if (bulletsLeft == 0)
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
			bulletsLeft = ammoCapacity;
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
