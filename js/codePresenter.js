/* 
	Primary JS for CodePresenter

	-- Code Presenter - http://www.codepresenter.net --
	A simple, educational tool to engage student participation through real-time code sharing and presentation in the classroom
	An open source project coded by Charles McCrary https://github.com/McCraryCharles/ 
	
*/
var loadedSubmission; // Variable to store the currently loaded submission id
var lastUpdate; // Variable to store last database update time
var roomType; // Variable to store type of room loaded (host or user)
var roomId; // Variable to store the current room id;

function initRoomUpdates(roomIdIn, roomTypeIn) {
	roomType = roomTypeIn;
	roomId = roomIdIn;
	ajax('php/db/ajaxHandler.php', 'function=checkRoomUpdate&roomId=' + roomId, initLastUpdate); // Inits lastUpdate var
	switch (roomType) {
		case 'host':
			window.setInterval(function () {checkRoomUpdate(roomId);}, 2000); // Starts checking for updates every 2 seconds
			window.setInterval(function () {checkRoomExpire();}, 60000); // Starts checking for expiration every 60 seconds
			break;
		case 'user':
			window.setInterval(function () {checkRoomUpdate(roomId);}, 5000); // Starts checking for updates every 5 seconds
			window.setInterval(function () {checkUserExpire();}, 60000); // Starts checking for expiration every 60 seconds
			break;
	}
}
function initLastUpdate(updateTime) { // Initalizes the lastUpdate var
	lastUpdate = updateTime;
}
function checkRoomUpdate(roomId){
	ajax('php/db/ajaxHandler.php', 'function=checkRoomUpdate&roomId=' + roomId, compareUpdateTime);
}
function compareUpdateTime(updateTime){ // Compares room update time from DB with stored update time
	if (lastUpdate != updateTime) { // If the room has updated since last check
		roomUpdated(); // Run room updated
		lastUpdate = updateTime;
	}
}
function roomUpdated(){ // Called whenever the room's update var has changed
	switch (roomType) {
		case 'host':
			loadSubmissions(roomId); // Reload user submissions
			break;
		case 'user':
			loadUserSubmissions(getCookie('userKey')); // Update sidebar
			break;
	}
}
function updateRoom() { // Updates the rooms updated var to current time to signify there has been a change in the room
	ajax('php/db/ajaxHandler.php', 'function=updateRoom&roomId=' + roomId, '');
}
function checkBodyHeight(elementId, classToAdd) { // If the body height is below 500px add this class to this element
	if (document.body.clientHeight < 500) {
		document.getElementById(elementId).className += classToAdd;
	}
}
function createRoom() {
	//$('#room-id-cont').className = 'selection-box-content-row-collapsed';
	document.getElementById('room-id-cont').className = 'hidden';
	document.getElementById('roomButton').className = 'btn btn-default btn-invert nav-button btn-invert-active';
	document.getElementById('selection-box-title').innerHTML = 'Create New Room';
	document.getElementById('joinRoomButton').innerHTML = 'Create Room';
	document.getElementById('new-room-form').value = 'true';
}
function joinRoom() { // Called to join a room from the home page
	var room = document.getElementById('codeEntry').value;
	var newRoom = document.getElementById('new-room-form').value;
	if (room === '' && newRoom == 'false') { // Make sure a room id was entered, unless a new room is being created
		document.getElementById('idError').className = 'form-error'; // Show the error div if no id was entered
		document.getElementById('codeEntry').focus();
		return false;
	}
	else {
		document.getElementById('connection-form').action = '?room=' + room;
		return true;
	}
}
function leaveRoom() { // Called to leave a room and load the home page
	expireCookie('userKey'); // Expire user key
	window.location.replace(".");
	return false;
}
function loadSubmission(submissionId) { // Single submission for host
	ajaxToIdValue('php/db/ajaxHandler.php', 'function=loadSubmissionCode&submissionId=' + submissionId, 'code-box');
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
function reSelectSidebar() { // Reselects latest sidebar item after an update
	selectSidebar(loadedSubmission);
}
function unselectSidebar() { // Hilights a sidebar item and enables sidebar controls
	$('#rename-button').attr('disabled', 'disabled');
	$('#delete-submission-button').attr('disabled', 'disabled');
	$('#user-sidebar-content').children().removeClass('user-sidebar-selected');
}
function loadUserEditor(submissionId) { // Loads a submission ID into the editor and enables editor buttons
	ajaxToIdValue('php/db/ajaxHandler.php', 'function=loadSubmissionCode&submissionId=' + submissionId, 'code-box');
	ajaxToId('php/db/ajaxHandler.php', 'function=loadSubmissionName&submissionId=' + submissionId, 'code-title');
	ajaxToId('php/db/ajaxHandler.php', 'function=loadSubmissionLastSave&submissionId=' + submissionId, 'last-save');
	setPublishButton(submissionId);
	$('#code-box').removeAttr('disabled');
	$('#user-code-block-menu :button').removeAttr('disabled');
	$('#code-box').focus();
}
function setPublishButton(submissionId) { // sets the published button for the loaded submission
	ajax('php/db/ajaxHandler.php', 'function=loadSubmissionPublished&submissionId=' + submissionId, publishButtonResponse);
}
function publishButtonResponse(response) {
	if (response == 1) {
		document.getElementById('publish-button').innerHTML = 'Recall';
	}
	else {
		document.getElementById('publish-button').innerHTML = 'Publish';
	}
}
function unloadUserEditor() { // Unloads a submission from the editor, and disables editor buttons
	document.getElementById('code-box').value = 'No file selected';
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
		ajaxToIdCb('php/db/ajaxHandler.php', 'function=loadUserSubmissions&error=maxSubmissions&userKey=' + userKey.substring(3), 'user-sidebar-content', reSelectSidebar);
	}
	else {
		ajaxToIdCb('php/db/ajaxHandler.php', 'function=loadUserSubmissions&userKey=' + userKey, 'user-sidebar-content', reSelectSidebar);
	}
}
function loadUserSubmissionsNew(userKey) { // All submissions for user after a new submission was created
	if (userKey.substring(0,3) == 'MAX') {
		ajaxToIdCb('php/db/ajaxHandler.php', 'function=loadUserSubmissions&error=maxSubmissions&userKey=' + userKey.substring(3), 'user-sidebar-content', reSelectSidebar);
	}
	else {
		ajaxToIdCb('php/db/ajaxHandler.php', 'function=loadUserSubmissions&userKey=' + userKey, 'user-sidebar-content',loadLatestSubmission);
	}
}
function loadLatestSubmission() {
	var userKey = getCookie('userKey');
	ajax('php/db/ajaxHandler.php', 'function=latestSubmission&userKey=' + userKey, loadUserSubmission);
}
function newSubmission() { // Prompts user for new submission name
	document.getElementById('rename-input').value = '';
	document.getElementById('rename-input').placeholder = 'New Submission';
	document.getElementById('naming-button').innerHTML = 'Create';
	document.getElementById('naming-button').onclick = createSubmission;
	$('#rename-submission-modal').modal({ // Disable backdrop closing of modal
  		backdrop: false,
		keyboard: true
	});
	$('#rename-submission-modal').modal('show');
	document.getElementById('rename-input').focus();
}
function createSubmission() { // Creates a new submission for the user
	var userKey = getCookie('userKey');
	$('#rename-submission-modal').modal('hide');
	var name = document.getElementById('rename-input').value;
	ajax('php/db/ajaxHandler.php', 'function=newSubmission&userKey=' + userKey + '&name=' + name, loadUserSubmissionsNew);
	normalizeRenameModal();
}
function normalizeRenameModal() { // Restores body of rename modal after 1 sec
	window.setTimeout(function () {document.getElementById('rename-submission-modal-body').innerHTML = '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="nameEntryLabel">Name file:</h4><br /><form id="name-modal-form" onsubmit="return false"><div class="form-group"><input type="text" class="form-control input-center" id="rename-input" placeholder="First Last"></div><button type="button" id="naming-button" class="btn btn-primary pull-right" onclick="renameSubmission()">Save</button><button type="button" class="btn btn-primary btn-invert-b pull-right" data-dismiss="modal">Cancel</button><span class="clearfix"></span></form>';}, 1000);
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
	setCookie('userKey', userKey, 12);
	// Change modal to user created
	document.getElementById('create-user-modal-body').innerHTML = '<center><i class="fa fa-check fa-3x loading-text"></i><br /><span class="loading-text">User Created!</span><span class="clearfix"></span>';
	// Close modal
	window.setTimeout(function () {$('#create-user-modal').modal('hide');}, 1000);
}
function clearSubmissions(roomId) { // Clears all submissions for a room by setting them to unpublished
	if (confirm('Are you sure you want to unpublish all submissions?')) {
		ajax('php/db/ajaxHandler.php', 'function=clearSubmissions&roomId=' + roomId, loadSubmissions);
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
	document.getElementById('naming-button').innerHTML = 'Save';
	document.getElementById('naming-button').onclick = renameSubmission;
	$('#rename-submission-modal').modal('show');
	document.getElementById('rename-input').focus();
}
function renameSubmission() { // Called on click of the save button in the submission rename modal
	// Get new name value
	var name = document.getElementById('rename-input').value;
	// Change prompt modal to renaming submission + loading animation
	document.getElementById('rename-submission-modal-body').innerHTML = '<center><i class="fa fa-circle-o-notch fa-spin fa-3x loading-text"></i><br /><span class="loading-text">Renaming Submission...</span><span class="clearfix"></span>';
	ajax('php/db/ajaxHandler.php', 'function=renameSubmission&submissionId=' + loadedSubmission + '&name=' + name + '&roomId=' + roomId, submissionRenamed);
	return false; // Prevent browser reloading on enter key press
}
function submissionRenamed(response) { // Called after submission has been renamed
	// Change modal to submission renaed
	document.getElementById('rename-submission-modal-body').innerHTML = '<center><i class="fa fa-check fa-3x loading-text"></i><br /><span class="loading-text">Submission Renamed!</span><span class="clearfix"></span>';
	// Close modal
	window.setTimeout(function () {$('#rename-submission-modal').modal('hide');}, 1000);
	loadUserSubmissions(getCookie('userKey')); // Updates sidebar
	ajaxToId('php/db/ajaxHandler.php', 'function=loadSubmissionName&submissionId=' + loadedSubmission, 'code-title'); // Updates title in the editor
	normalizeRenameModal();
}
function saveSubmission() { // Saves the current submission
	// Disable save button
	$('#save-button').attr('disabled', 'disabled');
	// Set last-save to saving
	document.getElementById('last-save').innerHTML = 'Saving... <i class="fa fa-circle-o-notch fa-spin"></i>';
	// AJAX call to delete the submission
	var content = document.getElementById('code-box').value;
	ajax('php/db/ajaxHandler.php', 'function=saveSubmission&submissionId=' + loadedSubmission + '&content=' + content + '&roomId=' + roomId, submissionSaved());
}
function submissionSaved(response) { // Called after a submission is saved
	// Set last-save to saved
	window.setTimeout(function () {document.getElementById('last-save').innerHTML = 'Saved';}, 500);
	// Re-enable save button
	window.setTimeout(function () {$('#save-button').removeAttr('disabled');}, 500);
	// Update last save time
	window.setTimeout(function () {ajaxToId('php/db/ajaxHandler.php', 'function=loadSubmissionLastSave&submissionId=' + loadedSubmission, 'last-save');}, 3000);
	loadUserSubmissions(getCookie('userKey'));
}
function publishSubmission() { // Publishes the current submission
	// Disable publish
	$('#publish-button').attr('disabled', 'disabled');
	var published;
	var buttonText = document.getElementById('publish-button').innerHTML;
	if (buttonText == 'Publish') {
		saveSubmission(); // Save current Submission
		published = 1;
	}
	else {published = 0;}
	// AJAX call to publish the submission
	ajax('php/db/ajaxHandler.php', 'function=publishSubmission&submissionId=' + loadedSubmission + '&published=' + published + '&roomId=' + roomId, submissionPublished);
}
function submissionPublished(response) { // Called after a submission is saved
	// Set publish button state
	if (response == 1) {
		document.getElementById('publish-button').innerHTML = 'Recall';
	}
	else {
		document.getElementById('publish-button').innerHTML = 'Publish';
	}
	$('#publish-button').removeAttr('disabled');// Re-enable publish button
	loadUserSubmissions(getCookie('userKey')); // Updates sidebar
}
function confirmDelete() { // Called when the delete button is pressed, confirms a submission deletion
	document.getElementById('confirm-button').innerHTML = 'Delete';
	document.getElementById('confirm-button').onclick = deleteSubmission;
	document.getElementById('confirm-dialog').innerHTML = 'Are you sure you would like to delete "' + document.getElementById('code-title').innerHTML + '"?';
	$('#user-confirm-modal').modal({ // Disable backdrop closing of modal
  		backdrop: false,
		keyboard: true
	});
	$('#user-confirm-modal').modal('show');
}
function deleteSubmission() {
	// If submission is loaded in editor, unload it, disable editor and save/publish buttons
	unloadUserEditor();
	// Change prompt modal to deleting submission + loading animation
	document.getElementById('user-confirm-modal-body').innerHTML = '<center><i class="fa fa-circle-o-notch fa-spin fa-3x loading-text"></i><br /><span class="loading-text">Deleting Submission...</span><span class="clearfix"></span>';
	// AJAX call to delete the submission
	ajax('php/db/ajaxHandler.php', 'function=deleteSubmission&submissionId=' + loadedSubmission + '&roomId=' + roomId, submissionDeleted());
	return false; // Prevent browser reloading on enter key press
}
function submissionDeleted(response) {
	// Change modal to submission deleted
	document.getElementById('user-confirm-modal-body').innerHTML = '<center><i class="fa fa-check fa-3x loading-text"></i><br /><span class="loading-text">Submission Deleted!</span><span class="clearfix"></span>';
	// Close modal
	window.setTimeout(function () {$('#user-confirm-modal').modal('hide');}, 1000);
	loadUserSubmissions(getCookie('userKey')); // Updates sidebar
	// Restores body of rename modal
	window.setTimeout(function () {document.getElementById('user-confirm-modal-body').innerHTML = '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="nameEntryLabel">Confirm:</h4><form  onsubmit="return false"><div id="confirm-dialog"></div><button type="button" id="confirm-button" class="btn btn-primary pull-right" onclick="">Yes</button><button type="button" class="btn btn-primary btn-invert-b pull-right" data-dismiss="modal">Cancel</button><span class="clearfix"></span></form>';}, 1500);
}
function checkRoomExpire() { // Checks room id for session expiration
	ajax('php/db/ajaxHandler.php', 'function=checkRoomExpire&roomId=' + roomId, checkExpire);
}
function checkUserExpire() { // Checks user id for session expiration
	ajax('php/db/ajaxHandler.php', 'function=checkUserExpire&userKey=' + getCookie('userKey'), checkExpire);
}
function checkExpire(response) { // Notifies of expired session if session is missing
	if (response == 'expired') {
		sessionExpired();
	}
}
function sessionExpired() { // Called when session has expired
	document.getElementById('user-confirm-modal-body').innerHTML = '<h4 class="modal-title" id="nameEntryLabel">Your Session Has Expired</h4><form id="confirm-modal-form" action="." method="POST"><div id="confirm-dialog">Click exit to leave the room.</div><button type="submit" id="confirm-button" class="btn btn-primary pull-right" onclick="">Exit</button><span class="clearfix"></span></form>';
	$('#user-confirm-modal').modal({ // Disable backdrop closing of modal
  		backdrop: "static",
		keyboard: true
	});
	$('#user-confirm-modal').modal('show');
	expireCookie('userKey');
	expireCookie('hostId');
}
function getCookie(name) { // Gets the value of a cookie by name
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2) return parts.pop().split(";").shift();
}
function setCookie(name, value, hours) { // Sets a cookie per name, value and relative expiration
	var date = new Date();
    date.setTime(date.getTime()+hours*60*60*1000);
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