/// This script moves the character controller forward 
/// and sideways based on the arrow keys.
/// It also jumps when pressing space.
/// Make sure to attach a character controller to the same game object.
/// It is recommended that you make only one call to Move or SimpleMove per frame.
var speed : float = 1.0;
var flockingSpeed : float = 1.0;
private var moveX : float;
private var moveY : float;
private var vectorX : float;
private var vectorY : float;
private var player : GameObject;
private var canMove : boolean = true;
private var distance : float;
var agroRange = 15;
private var moveDirection = 0;
function Start()
{
	player = GameObject.FindWithTag("Player");
}
function Update() 
{	
	if (GetComponent(healthScript).health <= 0)
		return;
		
	distance = Vector3.Distance(player.transform.position, transform.position);
	if(distance > this.agroRange)
		return;
		
	if (canMove)
	{
    	move();
    }
}

function move()
{
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
	
	var aniPlay : aniSprite = GetComponent(aniSprite);
	if(moveX >= 0)
		moveDirection = 1;
	else
		moveDirection = 0;
	//var particlePlacement : Vector3 = Vector3 (transform.position.x, transform.position.y -.5, transform.position.z);
	aniPlay.aniSprite(2,1,moveDirection,0,1,1);
	transform.Translate(moveX * Time.deltaTime, moveY * Time.deltaTime, 0);
}

function OnTriggerEnter(other : Collider)
{
	if (other.tag == "Player")
	{
		if (Mathf.RoundToInt(player.transform.position.y) == Mathf.RoundToInt(transform.position.y))
		{
			canMove = false;
		}
	}
}

function OnTriggerExit(other : Collider)
{
	if (other.tag == "Player")
	{
		canMove = true;
		print("Collider: Exit");
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
