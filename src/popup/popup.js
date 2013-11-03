var settings = new Store("settings");

function status() {
				var httpGet = new XMLHttpRequest();
				httpGet.onload = function() {
					var response =  eval("(" + httpGet.responseText + ')');
					document.getElementById("load").innerHTML = response.load;
					document.getElementById("state").innerHTML = response.state.stateString;
					document.getElementById("bedCurrent").innerHTML = response.temperatures.bed.current;
					document.getElementById("bedTarget").innerHTML = response.temperatures.bed.target;
					document.getElementById("extruderCurrent").innerHTML = response.temperatures.extruder.current;
					document.getElementById("extruderTarget").innerHTML = response.temperatures.extruder.target;
					
					document.getElementById("printTimeLeft").innerHTML = response.progress.printTimeLeft;
					document.getElementById("progress").innerHTML = response.progress.progress * 100;
					document.getElementById("filepos").innerHTML = response.progress.filepos;
					document.getElementById("printTime").innerHTML = response.progress.printTime;
					document.getElementById("currentZ").innerHTML = response.currentZ;
					document.getElementById("filename").innerHTML = response.job.filename;
					document.getElementById("estimatedPrintTime").innerHTML = response.job.filament;
					document.getElementById("filament").innerHTML = response.job.filament;					
				};
				httpGet.open('GET', 'http://' + settings.get("ip") + '/api/state?apikey=' + settings.get("apikey"));				
				httpGet.send();	
}

document.addEventListener('DOMContentLoaded', function () {
 status();
});
