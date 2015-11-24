/**
 * unittest.js - This files will contains all nit test we will do on the app
 * @author B00290473, B00294525
 */

function modelUnitTest(){
	console.log("****** MODEL UNIT TEST ******")
	console.log("* Can be disable in init.js *")
	console.log("*****************************")


	console.log("Unit test on {OBJECT} DEPARTURE")
	/* Check Departure Object Definition */
	d1 = new Departure("PAS", new Date(), "GLA", 1);
	console.log(d1.getStationCode());
	console.log(d1.getTime());
	console.log(d1.getArrival());
	console.log(d1.getPlatform());
	console.log(d1.toString());

	console.log("*************************")
	console.log("Unit test on {OBJECT} ARRIVAL")
	/* Check Arrival Object Definition */
	a1 = new Arrival("GLA", new Date(), "PAS", 5);
	console.log(a1.getStationCode());
	console.log(a1.getTime());
	console.log(a1.getDeparture());
	console.log(a1.getPlatform());
	console.log(a1.toString());

	console.log("*************************")
	console.log("Unit test on {OBJECT} STATION")
	/* Check Station Object Definition */
	s1 = new Station("Paisley Gilmour Station", "PSL");
	console.log(s1.getName());
	console.log(s1.getCode());
	console.log(s1.toString());

	console.log("*************************")
	console.log("Unit test on {OBJECT} FAVORIT")
	/* Check Arrival Object Definition */
	f1 = new Favorit(2, "GLA", "PSL", new Date());
	console.log(f1.getType());
	console.log(f1.getDeparture());
	console.log(f1.getArrival());
	console.log(f1.getDate());
	console.log(f1.toString());
}

function ApiUnitTest(){
	console.log("******* API UNIT TEST *******")
	console.log("* Can be disable in init.js *")
	console.log("*****************************")

	getTrain();
}