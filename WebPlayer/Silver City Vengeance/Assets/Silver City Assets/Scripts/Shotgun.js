#pragma strict

var target : Vector3;
var position : Vector3;
var rotation : Quaternion;
var bullet : Transform;
var speed : float = 5.0;
var angle : float;
var bulletSpread : float = 5.0;
var range : float = 1.5;
var ammoCapacity : int = 2;
var bulletsLeft : int = ammoCapacity;
var reloadTime : float = 1.0;
var shotgunClip : AudioClip;
private var reloading : boolean = false;
private var startTime : float;
private var distX : float;
private var distY : float;

function shoot () {
	if (!reloading)
	{
		calculatePath();
		
		createBullets();
		
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
	if (distX > 0)
	{
		if(this.tag != "Player")
			angle += 180;
	}
	
	if(distX < 0)
	{
		if(this.tag == "Player")
			angle += 180;
	}
}

function createBullets()
{
	var firedBullet : Transform;
	
	audio.clip = shotgunClip;
	audio.Play();
	
	var lateralOffset : float;
	
	if(position.x > target.x)
		lateralOffset = -transform.lossyScale.x;
	else
		lateralOffset = transform.lossyScale.x;
	
	firedBullet = Instantiate(bullet, Vector3(position.x+lateralOffset, position.y, position.z), rotation);
	
	firedBullet.GetComponent(Bullet).speed = speed;
	firedBullet.GetComponent(Bullet).rotation = angle;
	firedBullet.GetComponent(Bullet).range = range;
	firedBullet.GetComponent(Bullet).isActive = true;
	
	firedBullet = Instantiate(bullet,  Vector3(position.x+lateralOffset, position.y, position.z), rotation);
	
	firedBullet.GetComponent(Bullet).speed = speed;
	firedBullet.GetComponent(Bullet).rotation = angle + bulletSpread;
	firedBullet.GetComponent(Bullet).range = range;
	firedBullet.GetComponent(Bullet).isActive = true;
	
	firedBullet = Instantiate(bullet,  Vector3(position.x+lateralOffset, position.y, position.z), rotation);
	
	firedBullet.GetComponent(Bullet).speed = speed;
	firedBullet.GetComponent(Bullet).rotation = angle - bulletSpread;
	firedBullet.GetComponent(Bullet).range = range;
	firedBullet.GetComponent(Bullet).isActive = true;
}