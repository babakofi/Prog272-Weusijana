define(
		[ 'jquery', 'jqm' ],
		function() {
			'use strict';

			var buttons = null;
			var options = null;
			var transformOptions = null;
			var dataIndex = 0;
			var dataIndexTransform = 0;

			function AwsUi() {
				$("#listBuckets").click(listBuckets);
				$("#copyToS3").click(copyToS3);
				$("#getOptions").click(getOptions);
				$("#transformForwardButton").click(forwardTransform);
				$("#tranformBackButton").click(backwardTransform);
				$("#forwardButton").click(forward);
				$("#backButton").click(backward);

				$("#buildAll").click(buildAll);

				$("#pathToPython").change(updateHandler);
				$("#copyFrom").change(updateHandler);
				$("#copyTo").change(updateHandler);
				$("#filesToCopy").change(updateHandler);

				getBuildConfig();
				getOptions();
			}

			var updateHandler = function(event) {
				console.log("updateHandler called with event:");
				console.log(event);
				console.log("$(this).attr('id'):");
				var id = $(this).attr('id');
				console.log(id);
				console.log("$(this).val():");
				var newValue = $(this).val();
				console.log(newValue);
				if (transformOptions) {
					console.log("Old transformOptions value:",
							transformOptions[dataIndexTransform][id]);
					if (id === "filesToCopy") {
						// Array data must be built from the string
						transformOptions[dataIndexTransform][id] = newValue
								.split(",");
					} else {
						transformOptions[dataIndexTransform][id] = newValue;
					}
					console.log("Newly set transformOptions value:",
							transformOptions[dataIndexTransform][id]);
				}
			};

			var buildAll = function() {
				console.log("buildAll called in AwsUI");
				$.getJSON("/buildAll", {
					options : JSON.stringify(transformOptions),
					index : dataIndexTransform
				}, function(result) {
					$("#buildData").empty();
					var fileArray = result.data.split("\n");
					for ( var i = 0; i < fileArray.length; i++) {
						if (fileArray[i].length > 0) {
							$("#buildData").append(
									"<li>" + fileArray[i] + "</li>");
						}
					}
				});
			};

			var copyToS3 = function() {
				$.getJSON("/copyToS3", {
					options : JSON.stringify(options[dataIndex])
				}, function(data) {
					$("#copyResult").html("Result: " + data.result);
				});
			};

			var displayTransformConfig = function(options) {
				$("#pathToPython").val(options.pathToPython);
				$("#copyFrom").val(options.copyFrom);
				$("#copyTo").val(options.copyTo);
				$("#filesToCopy").val(options.filesToCopy);
			};

			var displayOptions = function(options) {
				$("#currentDocument").val(dataIndex + 1);
				$("#pathToConfig").val(options.pathToConfig);
				$("#reallyWrite").attr("checked",
						options.reallyWrite ? "checked" : "");
				$("#bucketName").val(options.bucketName);
				$("#folderToWalk").val(options.folderToWalk);
				$("#s3RootFolder").val(options.s3RootFolder);
				$("#createFolderToWalkOnS3").attr("checked",
						options.createFolderToWalkOnS3 ? "checked" : "");
				$("#createIndex").attr("checked",
						options.createIndex ? "checked" : "");
				$("#filesToIgnore").val(options.filesToIgnore);
			};

			var getBuildConfig = function() {
				$
						.getJSON(
								"/getBuildConfig",
								function(optionsInit) {
									transformOptions = optionsInit;
									displayTransformConfig(transformOptions[dataIndexTransform]);
								}).fail(function(a) {
							alert(JSON.stringify(a));
						});
			};
			var getOptions = function() {
				$.getJSON("/getOptions", function(optionsInit) {
					options = optionsInit;
					$('#documentCount').val(options.length);
					displayOptions(options[0]);
				}).fail(function(a) {
					alert(JSON.stringify(a));
				});
			};

			var forwardTransform = function() {
				if (dataIndexTransform < transformOptions.length - 1) {
					dataIndexTransform++;
					displayTransformConfig(transformOptions[dataIndexTransform]);
				}
			};

			var backwardTransform = function() {
				if (dataIndexTransform > 0) {
					dataIndexTransform--;
					displayTransformConfig(transformOptions[dataIndexTransform]);
					return dataIndexTransform;
				}
				return dataIndexTransform;
			};

			var forward = function() {
				if (dataIndex < options.length - 1) {
					dataIndex++;
					displayOptions(options[dataIndex]);
				}
			};

			var backward = function() {
				if (dataIndex > 0) {
					dataIndex--;
					displayOptions(options[dataIndex]);
					return true;
				}
				return false;
			};

			var listBuckets = function() {
				$.getJSON("/listBuckets", {
					options : JSON.stringify(options[dataIndex])
				}, function(data) {
					for ( var i = 0; i < data.length; i++) {
						$("#buckets").append("<li>" + data[i] + "</li>");
					}
				});
			};

			return AwsUi;
		});
/*
 * $(document).ready(function() { 'use strict'; new AwsUi(); });
 */
