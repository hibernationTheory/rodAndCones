var id = "particle-container";
var el = document.getElementById(id);
if (el) {
	var path = '/static/blog/assets/particles.json'
	particlesJS.load(id, path);
}
