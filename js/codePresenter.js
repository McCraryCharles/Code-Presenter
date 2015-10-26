/* 
	Primary JS for CodePresenter

	-- Code Presenter - http://www.codepresenter.net --
	A simple, educational tool to engage student participation through real-time code sharing and presentation in the classroom
	An open source project coded by Charles McCrary https://github.com/McCraryCharles/ 
	
*/

function checkBodyHeight(elementId, classToAdd) { // If the body height is below 500px add this class to this element
	if (document.body.clientHeight < 500) {
		document.getElementById(elementId).className += classToAdd;
	}
}
function joinRoom() { // Called to join a room from the home page
	var room = document.getElementById('codeEntry').value;
	if (room === '') { // Make sure a room id was entered
		document.getElementById('idError').className = 'form-error'; // Show the error div if no id was entered
		document.getElementById('codeEntry').focus();
	}
	else {
		//changeUrl('Code Presenter', "?roomCode=" + room);
		//ajaxToId('php/pages/loader.php', '', 'page-container');
		window.location.replace("?roomCode=" + room);
	}
	return false;
}
function leaveRoom() { // Called to leave a room and load the home page
	window.location.replace(".");
	return false;
}
function loadSubmission(submissionId) { // Single submission for host
	ajaxToId('php/db/ajaxHandler.php', 'function=loadSubmission&submissionId=' + submissionId, 'code-box');
}
function loadUserSubmission(submissionId) { // Single submission on the user page
	ajaxToId('php/db/ajaxHandler.php', 'function=loadSubmission&submissionId=' + submissionId, 'code-box');
	ajaxToId('php/db/ajaxHandler.php', 'function=loadSubmissionName&submissionId=' + submissionId, 'code-title');
	ajaxToId('php/db/ajaxHandler.php', 'function=loadSubmissionLastSave&submissionId=' + submissionId, 'last-save');
	$('#code-box').removeAttr('disabled');
	$('#user-code-block-menu :button').removeAttr('disabled');
	$('#user-sidebar-content').children().removeClass('user-sidebar-selected');
	$("#user-submission-tab-" + submissionId).addClass('user-sidebar-selected');
}
function loadSubmissions(roomId) { // All submissions for host
	ajaxToId('php/db/ajaxHandler.php', 'function=loadSubmissions&roomId=' + roomId, 'host-sidebar-content');
}
function loadUserSubmissions(userKey) { // All submissions for user
	if (userKey.substring(0,3) == 'MAX') {
		ajaxToId('php/db/ajaxHandler.php', 'function=loadUserSubmissions&error=maxSubmissions&userKey=' + userKey.substring(3), 'user-sidebar-content');
	}
	else {
		ajaxToId('php/db/ajaxHandler.php', 'function=loadUserSubmissions&userKey=' + userKey, 'user-sidebar-content');
	}
}
function newSubmission(roomId) {
	var userKey = getCookie('userKey');
	ajax('php/db/ajaxHandler.php', 'function=newSubmission&roomId=' + roomId + '&userKey=' + userKey, loadUserSubmissions);
}
function toggleSidebar(){ // Toggels the sidebar in and out on the host page
	if (document.getElementById('host-sidebar').className == 'host-sidebar') {
		document.getElementById('host-sidebar').className = 'host-sidebar-open';
		document.getElementById('host-code-block').className = 'host-code-block-compressed';
	}
	else {
		document.getElementById('host-sidebar').className = 'host-sidebar';
		document.getElementById('host-code-block').className = 'host-code-block';
	}
}
function clearSubmissions(roomId) { // Clears all submissions for a room
	if (confirm('Are you sure you want to delete all submissions?')) {
		ajax('php/db/ajaxHandler.php', 'function=clearSubmissions&roomId=' + roomId, loadSubmissions());
	}
}
function getCookie(name) { // Gets the value of a cookie by name
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
$('body').on('keydown', 'textarea', function(e) { // Inserts a tab escape character to allow for tabbing in the textareas
	if (e.keyCode === 9) { // tab was pressed
		// get caret position/selection
		var start = this.selectionStart;
		end = this.selectionEnd;

		var $this = $(this);

		// set textarea value to: text before caret + tab + text after caret
		$this.val($this.val().substring(0, start) + "\t" + $this.val().substring(end));

		// put caret at right position again
		this.selectionStart = this.selectionEnd = start + 1;

		// prevent the focus lose
		return false;
	}
});
$(function () { // Opt in to bootstrap tooltips
  $('[data-toggle="tooltip"]').tooltip();
});