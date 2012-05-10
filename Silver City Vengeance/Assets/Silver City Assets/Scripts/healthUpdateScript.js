#pragma strict

function Start () {
	
}

var mat1 : Material;
var mat2 : Material;
var mat3 : Material;
var mat4 : Material;

function Update () {

	var player = GameObject.FindGameObjectWithTag("Player");
	
	var playerProperties = player.GetComponent(playerProperties);
	if(playerProperties.health >= 90)
		renderer.sharedMaterial = mat1;
	else if(playerProperties.health < 100 && playerProperties.health > 50)
		renderer.sharedMaterial = mat2;
	else if(playerProperties.health <= 50 && playerProperties.health > 20)
		renderer.sharedMaterial = mat3;
	else 
		renderer.sharedMaterial = mat4;

}