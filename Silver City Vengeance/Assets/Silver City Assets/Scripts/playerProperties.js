//PlayerProperties component

//disc: This is the basic properties of a Mario.  We all know them.  (the ghetto version though)


private var startTime : float = 0;
var firingRate : float = 0.5;							// Fires every .5 seconds
var currentWeapon : int = 0;
var target : Vector3;
var weapon1 : DualRevolvers;
var weapon2 : Rifle;
var weapon3 : Shotgun;

var weapons;

var health					: int 			= 100;
var playerMaterial	: Material;
 	
private var canShoot		: boolean		= false;
 	
function Start(){
 	startTime = Time.time;
 	
	weapon1 = GetComponent(DualRevolvers);
	weapon2 = GetComponent(Rifle);
	weapon3 = GetComponent(Shotgun);
	
	weapons = Array(weapon1, weapon2, weapon3);
}
 	
 	
function Update(){
 	
	var playerControls = GetComponent("playerControls");

	findTarget();

	if(Input.GetKeyDown(KeyCode.Alpha1)){		// for revolver
	
		currentWeapon = 0;
	}
	if(Input.GetKeyDown(KeyCode.Alpha2)){		// for rifle
		currentWeapon = 1;
	}
	if(Input.GetKeyDown(KeyCode.Alpha3)){		// for shotgun
		currentWeapon = 2;
	}
	
	
	if(Input.GetMouseButtonDown(0)){
		currentWeapon = 0;
		shoot();
	}
	else if (Input.GetMouseButton(1))
	{
		currentWeapon = 1;
		playerControls.canMove = false;
		shoot();
	}
	else if (Input.GetMouseButtonUp(1))
	{
		weapon2.charging = false;
		playerControls.canMove = true;
	}
	else if (Input.GetMouseButtonDown(2))
	{
		currentWeapon = 2;
		shoot();
	}
}

function findTarget()
{
	var targets = GameObject.FindGameObjectsWithTag("Enemy");
	var distance : float = 20000;
	target = transform.position;
	
	if (GetComponent(playerControls).moveDirection == 0)
	{
		target.x -= transform.lossyScale.x;
	}
	else
	{
		target.x += transform.localScale.x;
	}
	
	for(var each in targets){
		//print(distance + " closest first, compared to" + Vector3.Distance(each.transform.position, this.transform.position));
		if (Vector3.Distance(each.transform.position, this.transform.position) < distance && each.GetComponent(healthScript).dead == false){
			target = each.transform.position;
			distance = Vector3.Distance(each.transform.position, this.transform.position);
		}
	}
}
	
function shoot()
{
	weapons[currentWeapon].target = target;
	weapons[currentWeapon].position = transform.position;
	weapons[currentWeapon].rotation = transform.rotation;
	weapons[currentWeapon].shoot();
}
 			
 	@script AddComponentMenu ( "Colwick/Actor/Player Properties Script" )  //Assigns this script to the menu