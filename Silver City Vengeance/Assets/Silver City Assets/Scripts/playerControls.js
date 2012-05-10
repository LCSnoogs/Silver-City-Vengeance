var walkSpeed 		: float = 3.0;
var startPos 		: float = 0.0;
var moveDirection 	: int = 1;					//0 = facing left, 1 = facing right
var pauseAtStart	: int = 1;
var dashSpeed 		: float = 10;
var dashDuration	: float = 0.5;
//sounds
var soundJump 		: AudioClip;
var canMove : boolean = true;

private var velocity : Vector3 = Vector3.zero;

private var afterHitForceDown : float = 1.0;
private var soundRate	: float = 0.0;			//delay on play
private var soundDelay 	: float = 0.0;			//how often a sound will play
private var startTime	: float; 
private var lastDash 	: float;
private var LEFT : int = 0;
private var RIGHT : int = 1;

function Start(){
	startTime = Time.time;
	walkSpeed *= transform.lossyScale.x;
	dashSpeed *= transform.lossyScale.x;
}

function PlaySound ( soundName, soundDelay ){

	if ( !audio.isPlaying && Time.time > soundRate ){
	
		soundRate = Time.time + soundDelay;
		audio.clip = soundName;
		audio.Play ();
		yield WaitForSeconds(audio.clip.length);
		
	}


}

function Update () {
	transform.position.z = 1;
	var aniPlay = GetComponent( "aniSprite");
	var controller : CharacterController = GetComponent( CharacterController );
	var particlePlacement : Vector3 = Vector3 (transform.position.x, transform.position.y -.5, transform.position.z);
	var properties : playerProperties = GetComponent(playerProperties);
	
	if(startTime + pauseAtStart > Time.time)
		return;
	
	
	if ( lastDash + dashDuration < Time.time) //if controller.isGrounded()
	{
		velocity = Vector3 ( Input.GetAxis ("Horizontal"), Input.GetAxis("Vertical"),0);

		if (properties.target.x > transform.position.x)
		{
			aniPlay.aniSprite(2,1,RIGHT,0,1,1);
		}
		else
		{
			aniPlay.aniSprite(2,1,LEFT,0,1,1);
		}
		
		if (velocity.x < 0 )
		{
			velocity *= walkSpeed;
			//aniPlay.aniSprite(2,1,0,0,1,1);
		}
		
		if (velocity.x > 0 )
		{
			velocity *= walkSpeed;
			//aniPlay.aniSprite(2,1,1,0,1,1);
		}
		
		if (velocity.x == 0 && Input.GetAxis("Vertical") != 0)
		{
			velocity *= walkSpeed;
		}
		
		if ( Input.GetButtonDown("Dash") && Input.GetAxis("Vertical") > 0 )
		{
			velocity.y = dashSpeed;
			lastDash = Time.time;
			PlaySound ( soundJump, 0);

		}
		else if ( Input.GetButtonDown("Dash") && Input.GetAxis("Vertical") < 0 )
		{
			velocity.y = -dashSpeed;
			lastDash = Time.time;
			PlaySound ( soundJump, 0);
		}
		
		if ( Input.GetButtonDown("Dash") && Input.GetAxis("Horizontal") > 0 )
		{
			velocity.x = dashSpeed;
			lastDash = Time.time;
			PlaySound ( soundJump, 0);

		}
		else if ( Input.GetButtonDown("Dash") && Input.GetAxis("Horizontal") < 0 )
		{
			velocity.x = -dashSpeed;
			lastDash = Time.time;
			PlaySound ( soundJump, 0);
		}

	}//end on ground
	
	if (velocity.x < 0)																	//Set move direction
		moveDirection = 0;
	if (velocity.x > 0)
		moveDirection = 1;
	
	if (canMove)
	{
		controller.Move(velocity * Time.deltaTime);											//do the move
	}
}

//@script RequireComponent(CharacterController)
