/* 
	Primary JS for CodePresenter

	-- Code Presenter - http://www.codepresenter.net --
	A simple, educational tool to engage student participation through real-time code sharing and presentation in the classroom
	An open source project coded by Charles McCrary https://github.com/McCraryCharles/ 
	
*/
var loadedSubmission; // Variable to store the currently loaded submission id

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
	expireCookie('userKey'); // Expire user key
	window.location.replace(".");
	return false;
}
function loadSubmission(submissionId) { // Single submission for host
	ajaxToId('php/db/ajaxHandler.php', 'function=loadSubmission&submissionId=' + submissionId, 'code-box');
}
function loadUserSubmission(submissionId) { // Single submission on the user page
	loadUserEditor(submissionId);
	loadedSubmission = submissionId;
	selectSidebar(submissionId);
}
function selectSidebar(submissionId) { // Hilights a sidebar item and enables sidebar controls
	$('#rename-button').removeAttr('disabled');
	$('#delete-submission-button').removeAttr('disabled');
	$('#user-sidebar-content').children().removeClass('user-sidebar-selected');
	$("#user-submission-tab-" + submissionId).addClass('user-sidebar-selected');
}
function unselectSidebar() { // Hilights a sidebar item and enables sidebar controls
	$('#rename-button').attr('disabled', 'disabled');
	$('#delete-submission-button').attr('disabled', 'disabled');
	$('#user-sidebar-content').children().removeClass('user-sidebar-selected');
}
function loadUserEditor(submissionId) { // Loads a submission ID into the editor and enables editor buttons
	ajaxToId('php/db/ajaxHandler.php', 'function=loadSubmission&submissionId=' + submissionId, 'code-box');
	ajaxToId('php/db/ajaxHandler.php', 'function=loadSubmissionName&submissionId=' + submissionId, 'code-title');
	ajaxToId('php/db/ajaxHandler.php', 'function=loadSubmissionLastSave&submissionId=' + submissionId, 'last-save');
	$('#code-box').removeAttr('disabled');
	$('#user-code-block-menu :button').removeAttr('disabled');
}
function unloadUserEditor() { // Unloads a submission from the editor, and disables editor buttons
	document.getElementById('code-box').innerHTML = 'No file selected';
	document.getElementById('code-title').innerHTML = '<i class="fa fa-arrow-left"></i>';
	document.getElementById('last-save').innerHTML = '';
	$('#code-box').attr('disabled', 'disabled');
	$('#user-code-block-menu :button').attr('disabled', 'disabled');
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
function promptUser(){ // Prompts user to input username
	$('#create-user-modal').modal({ // Disable backdrop closing of modal
  		backdrop: 'static'
	});
	$('#create-user-modal').modal('show');
	document.getElementById('name-input').focus();
}
function createUser(){ // Gets user name from input field, and creates a user in the DB
	var userName = document.getElementById('name-input').value; // Get user name value
	var roomCode = document.getElementById('room-code').value; // Get room code value
	ajax('php/db/ajaxHandler.php', 'function=createUser&roomCode=' + roomCode + '&userName=' + userName, userCreated);
	// Change prompt modal to creating user + loading animation
	document.getElementById('create-user-modal-body').innerHTML = '<center><i class="fa fa-circle-o-notch fa-spin fa-3x loading-text"></i><br /><span class="loading-text">Creating User...</span><span class="clearfix"></span>';
	return false; // Prevent browser reloading on enter key press
}
function userCreated(userKey){ // After user is created
	// Set user key
	setCookie('userKey', userKey, 1);
	// Change modal to user created
	document.getElementById('create-user-modal-body').innerHTML = '<center><i class="fa fa-check fa-3x loading-text"></i><br /><span class="loading-text">User Created!</span><span class="clearfix"></span>';
	// Close modal
	window.setTimeout(function () {$('#create-user-modal').modal('hide');}, 1000);
}
function clearSubmissions(roomId) { // Clears all submissions for a room
	if (confirm('Are you sure you want to delete all submissions?')) {
		ajax('php/db/ajaxHandler.php', 'function=clearSubmissions&roomId=' + roomId, loadSubmissions());
	}
}
function showRename() {
	if ($('#rename-button').attr('disabled') == 'disabled'){return 0;} // If button is disabled, do not run the function
	document.getElementById('rename-input').value = '';
	document.getElementById('rename-input').placeholder = document.getElementById('code-title').innerHTML;
	$('#rename-submission-modal').modal({ // Disable backdrop closing of modal
  		backdrop: false,
		keyboard: true
	});
	$('#rename-submission-modal').modal('show');
	document.getElementById('rename-input').focus();
}
function renameSubmission() { // Called on click of the save button in the submission rename modal
	// Get new name value
	var name = document.getElementById('rename-input').value;
	// Change prompt modal to renaming submission + loading animation
	document.getElementById('rename-submission-modal-body').innerHTML = '<center><i class="fa fa-circle-o-notch fa-spin fa-3x loading-text"></i><br /><span class="loading-text">Renaming Submission...</span><span class="clearfix"></span>';
	ajax('php/db/ajaxHandler.php', 'function=renameSubmission&submissionId=' + loadedSubmission + '&name=' + name, renamedSubmission());
	return false; // Prevent browser reloading on enter key press
}
function renamedSubmission(response) { // Called after submission has been renamed
	// Change modal to submission renaed
	document.getElementById('rename-submission-modal-body').innerHTML = '<center><i class="fa fa-check fa-3x loading-text"></i><br /><span class="loading-text">Submission Renamed!</span><span class="clearfix"></span>';
	// Close modal
	window.setTimeout(function () {$('#rename-submission-modal').modal('hide');}, 1000);
	window.setTimeout(function () {loadUserSubmissions(getCookie('userKey'));}, 500); // Updates sidebar
	window.setTimeout(function () {selectSidebar(loadedSubmission);}, 1000); // Reselects sidebar
	window.setTimeout(function () {ajaxToId('php/db/ajaxHandler.php', 'function=loadSubmissionName&submissionId=' + loadedSubmission, 'code-title');}, 500); // Updates title in the editor
	// Restores body of rename modal
	window.setTimeout(function () {document.getElementById('rename-submission-modal-body').innerHTML = '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="nameEntryLabel">Rename file:</h4><br /><form onsubmit="return renameSubmission()"><div class="form-group"><input type="text" class="form-control input-center" id="rename-input" placeholder="First Last"></div><button type="button" class="btn btn-primary pull-right" onclick="renameSubmission()">Save</button><span class="clearfix"></span></form>';}, 1500);
}
function deleteSubmission() {
	// IN PROGRESS --------------------------------
	// Confirm
	// If submission is loaded in editor, unload it, disable editor and save/publish buttons
	unloadEditor();
	// Disable rename and delete buttons
	unselectSidebar();
}
function getCookie(name) { // Gets the value of a cookie by name
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2) return parts.pop().split(";").shift();
}
function setCookie(name, value, days) { // Sets a cookie per name, value and relative expiration
	var date = new Date();
    date.setTime(date.getTime()+days*24*60*60*1000);
    var expires = "; expires=" + date.toGMTString(); 
  	document.cookie = name + "=" + value + expires + ";"; 
}
function expireCookie(name){
	document.cookie = name + "=0; expires=Thu, 01 Jan 1970 00:00:00 GMT";
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