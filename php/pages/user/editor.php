<div id="editor" class="">
	<div class="user-code-block" id="user-code-block">
		<div class="user-code-block-header">
			<div class="pull-left user-code-block-title" id="code-title">
				<i class="fa fa-arrow-left"></i>
			</div>
			<div class="pull-right" id="user-code-block-menu">
				<span id="last-save"></span>
				<button type="button" id="save-button" class="btn btn-primary btn-xs editor-btn" onclick="saveSubmission();" data-toggle="tooltip" data-placement="top" data-delay="1000" title="Save" disabled="disabled">
					<i class="fa fa-floppy-o"></i>
				</button>
				<button id="rename-button" class="btn btn-primary btn-xs editor-btn" disabled onclick="showRename()"  data-toggle="tooltip" data-placement="top" data-delay="1000" title="Rename" >
					<i class="fa fa-tag"></i>
				</button>
				<button type="button" id="" class="btn btn-primary btn-xs editor-btn" onclick="confirmDelete();" data-toggle="tooltip" data-placement="top" data-delay="1000" title="Delete" disabled="disabled">
					<i class="fa fa-trash-o"></i>
				</button>
				<button type="button" id="publish-button" class="btn btn-primary btn-xs editor-btn" onclick="publishSubmission()" disabled="disabled">Publish</button>
			</div>
		</div>
		<div id="code-block">
			<textarea id="code-box" class="user-code-text-box" spellcheck="false" disabled="true">No file selected</textarea>
		</div>
	</div>
</div>