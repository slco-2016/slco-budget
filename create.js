// need to dl the whole data set from https://opendata.utah.gov/dataset/Salt-Lake-County-Checkbook-2014/qezx-jvdv

var sodaURL = "rows.json";
$.get(sodaURL)
	.fail(function (e) {
		console.log(e);
	})
	.done(function (r) {
		console.log(r, r.data.length);
		for (var i = 0; i < r.data.length; i++) {
			var d = r.data[i];

			var fund = d[24].trim().toUpperCase();
			var acct = d[22].trim().toUpperCase();
			var desc = d[13].trim().toUpperCase();
			var amt = Math.round(100*Number(d[10]))/100;
			
			if (!budget.hasOwnProperty(fund)) {
				budget[fund] = {total: 0, accts: {}};
			}
			if (!budget[fund].accts.hasOwnProperty(acct)) {
				budget[fund].accts[acct] = {total: 0, specifics: {}};
			}
			if (!budget[fund].accts[acct].specifics.hasOwnProperty(desc)) {
				budget[fund].accts[acct].specifics[desc] = 0;
			}

			budget[fund].total += amt;
			budget[fund].accts[acct].total += amt;
			budget[fund].accts[acct].specifics[desc] += amt;

		};
		console.log(budget)
	});