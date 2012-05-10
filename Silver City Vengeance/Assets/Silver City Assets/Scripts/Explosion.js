#pragma strict

private var startTime : float;
var explosionClip : AudioClip;

function Start () {
	startTime = Time.time;
	transform.Rotate(-90,0,0);
	audio.clip = explosionClip;
			audio.Play();
}

function Update () {


	
	if (!particleSystem.isPlaying)
	{
		Destroy(gameObject);
	}
}