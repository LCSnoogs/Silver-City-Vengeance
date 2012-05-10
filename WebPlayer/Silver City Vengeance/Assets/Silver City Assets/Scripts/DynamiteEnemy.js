#pragma strict

var speed : float = 1.0;
var firingRate : float = 3.0;							// Fires every .5 seconds
var flockingSpeed : float = 1.0;
private var player : GameObject;
private var controller : CharacterController;
private var startTime : float = 0;
private var weapon : DynamiteThrower;
private var canMove : boolean = true;
private var moveX : float;
private var moveY : float;
private var vectorX : float;
private var vectorY : float;
private var moveDirection : int = 0;			// 0 for left 1 for right
private var distanceToPlayer : float;
var agroRange : float = 20;

function Start () {
	player = GameObject.FindWithTag("Player");
	startTime = Time.time;
	weapon = GetComponent(DynamiteThrower);
	//GetComponent(SphereCollider).radius = weapon.range/2;
}

function Update () {
	distanceToPlayer = Vector3.Distance(player.transform.position, transform.position);
	
	if (distanceToPlayer > agroRange)
		return;
	
	var aniPlay : aniSprite = GetComponent(aniSprite);
	aniPlay.aniSprite(2,1,moveDirection,0,1,1);

	if(GetComponent(healthScript).dead == true)
		return;
	if (canMove)
	{
		move();
	}
	else if (Time.time-startTime >= firingRate)
	{
		shoot();
		startTime = Time.time;
	}
}

function shoot()
{
	if(distanceToPlayer > weapon.range)
	{
		canMove = true;
		return;
	}

	weapon.target = GameObject.FindWithTag("Player");
	weapon.position = transform.position;
	weapon.rotation = transform.rotation;
	weapon.shoot();
}

function move()
{
	
	
	if(distanceToPlayer < weapon.range / 4 * 3)
	{
		canMove = false;
		return;
	}
	
	var destination : Vector3;
	if (player.transform.position.x >= transform.position.x)
	{
		destination = Vector3(player.transform.position.x - player.transform.lossyScale.x/2 - transform.lossyScale.x/2, player.transform.position.y, 0);
	}
	else
	{
		destination = Vector3(player.transform.position.x + player.transform.lossyScale.x/2 + transform.lossyScale.x/2, player.transform.position.y, 0);
	}

	moveX = destination.x - transform.position.x;
	moveY = destination.y - transform.position.y;
	
	if (moveX == 0)
	{
		vectorY = moveY/Mathf.Abs(moveY);
		moveY = speed * vectorY;
	}
	else if (moveY == 0)
	{
		vectorX = moveX/Mathf.Abs(moveX);
		moveX = speed * vectorX;
	}
	else
	{
		vectorX = moveX/Mathf.Abs(moveX);
		vectorY = moveY/Mathf.Abs(moveY);
		moveX = Mathf.Abs(moveX);
		moveY = Mathf.Abs(moveY);
		
		moveX = speed * Mathf.Cos(Mathf.Atan(moveY/moveX));
		moveY = speed * Mathf.Sin(Mathf.Atan(moveY/moveX));
		moveX *= vectorX;
		moveY *= vectorY;
	}
	if(moveX >= 0)
		moveDirection = 1;
	else
		moveDirection = 0;
	//var particlePlacement : Vector3 = Vector3 (transform.position.x, transform.position.y -.5, transform.position.z);
	transform.Translate(moveX * Time.deltaTime, moveY * Time.deltaTime, 0);
}

function OnTriggerEnter(other : Collider)
{
	if (other.tag == "Player")
	{
		canMove = false;
	}
	else if (other.tag == "Enemy")
	{
		if (other.transform.position.x <= transform.position.x)
		{
			transform.position.x += flockingSpeed * Time.deltaTime;
		}
		else
		{
			transform.position.x -= flockingSpeed * Time.deltaTime;
		}
		if (other.transform.position.y <= transform.position.y)
		{
			transform.position.y += flockingSpeed * Time.deltaTime;
		}
		else
		{
			transform.position.y -= flockingSpeed * Time.deltaTime;
		}
	}
}

function OnTriggerExit(other : Collider)
{
	if (other.tag == "Player")
	{
		canMove = true;
	}
}