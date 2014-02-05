/**
 * @author Baba Kofi Weusijana
 */

describe("Test InfoMan", function() {

	it("expects loadParagraph('02') to load content into #div02", function() {
		var infoMan = new InfoMan();
		runs(function() {
			infoMan.loadParagraph('02');
		});
		waits(400);
		var result = $('#div02').html().length;
		console.log(result);
		expect(result > 9).toBe(true);
	});

});
