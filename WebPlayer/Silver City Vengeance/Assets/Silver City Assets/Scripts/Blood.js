#pragma strict

private var startTime : float;

function Start () {
	startTime = Time.time;
}

function Update () {
	if (startTime + particleSystem.duration < Time.time)
	{
		Destroy(gameObject);
	}
}