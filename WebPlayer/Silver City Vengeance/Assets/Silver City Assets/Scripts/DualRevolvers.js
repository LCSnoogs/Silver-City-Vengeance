#pragma strict

var target : Vector3;
var distX : float;
var distY : float;
var position : Vector3;
var rotation : Quaternion;
var gun1Position : Vector3 = Vector3.zero;
var gun2Position : Vector3 = Vector3.zero;
var gunSpacing : float = 0.1;
var bullet : Transform;
var speed : float = 10.0;
var angle : float;
var range : float = 5.0;
var ammoCapacity : int = 12;
var bulletsLeft : int = ammoCapacity;
var reloadTime : float = 3.0;
private var reloading : boolean = false;
private var startTime : float;
private var fireGun1 : boolean = true;

function Start()
{
	gunSpacing *= transform.lossyScale.x;
}

function shoot () {
	if (!reloading)
	{
		calculatePath();
		
		var side : float;
		if (target.x > transform.position.x)
			side = transform.lossyScale.x;
		else
			side = -transform.lossyScale.x;
		
		var firedBullet : Transform;
		
		gun1Position.x += side;
		gun2Position.x += side;
		
		if (fireGun1)
		{
			firedBullet = Instantiate(bullet, gun1Position, rotation);
			fireGun1 = false;
		}
		else
		{
			firedBullet = Instantiate(bullet, gun2Position, rotation);
			fireGun1 = true;
		}
		
		firedBullet.GetComponent(Bullet).speed = speed;
		firedBullet.GetComponent(Bullet).rotation = angle;
		firedBullet.GetComponent(Bullet).range = range;
		firedBullet.GetComponent(Bullet).isActive = true;
		
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
	
	gun1Position = position;
	gun2Position = position;
	if (distX == 0)
	{
		gun1Position.x += gunSpacing;
		gun2Position.x -= gunSpacing;
	}
	else
	{
		gun1Position.y += gunSpacing;
		gun2Position.y -= gunSpacing;
	}
}