#pragma strict

var speed : float = 1.0;
var firingRate : float = 0.5;							// Fires every .5 seconds
var agroRange : float = 30;
var flockingSpeed : float = 1.0;

private var player : GameObject;
private var controller : CharacterController;
private var startTime : float = 0;
private var weapon : Shotgun;
private var canMove : boolean = true;
private var moveX : float;
private var moveY : float;
private var vectorX : float;
private var vectorY : float;
private var moveDirection : int = 0;   //0 facing left 1 facing right

private var distance : float;


function Start () {
	player = GameObject.FindWithTag("Player");
	startTime = Time.time;
	weapon = GetComponent(Shotgun);
	//GetComponent(SphereCollider).radius = weapon.range/2;
}

function Update () {

	if (GetComponent(healthScript).health <= 0)
		return;


	distance = Vector3.Distance(player.transform.position, transform.position);
	if(distance > this.agroRange)
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
	var aniPlay : aniSprite = GetComponent(aniSprite);
	
	//var particlePlacement : Vector3 = Vector3 (transform.position.x, transform.position.y -.5, transform.position.z);
	aniPlay.aniSprite(2,1,moveDirection,0,1,1);
}

function shoot()
{
	if(distance > weapon.range){
		canMove = true;
		return;
	}
	weapon.target = GameObject.FindWithTag("Player").transform.position;
	weapon.position = transform.position;
	weapon.rotation = transform.rotation;
	weapon.shoot();
}

function move()
{
	var destination : Vector3;
	
	if(Vector3.Distance(player.transform.position, transform.position) <= weapon.range/3 * 2)
	{
		canMove = false;
		return;
	}
	
	
	if (player.transform.position.x >= transform.position.x)
	{
		destination = Vector3(player.transform.position.x - player.transform.lossyScale.x/2 - transform.lossyScale.x/2, player.transform.position.y, 0);
		moveDirection = 1;
	}
	else
	{
		destination = Vector3(player.transform.position.x + player.transform.lossyScale.x/2 + transform.lossyScale.x/2, player.transform.position.y, 0);
		moveDirection = 0;
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
	
	
	transform.Translate(-moveX * Time.deltaTime, moveY * Time.deltaTime, 0);
}

function OnTriggerEnter(other : Collider)
{
	if (other.tag == "Player")
	{
		canMove = false;
	}
	else if (other.tag == "Enemy" && GetComponent(healthScript).health <= 0)
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

//needs to be implemented
