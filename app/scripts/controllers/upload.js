'use strict';

/**
 * @ngdoc function
 * @name leadScoreClientApp.controller:UploadCtrl
 * @description
 * # UploadCtrl
 * Controller of the leadScoreClientApp
 */
angular.module('leadScoreClientApp')
  .controller('UploadCtrl', function ($scope) {
    // TODO: all of these
    // get extension - if the file is not a csv do not process
    // read line by line - ?
    // create a new text stream from these and send this through `binaryjs`
    function showFileInDom(file) {
      /**
       * Check for the various File API support.
       */
      function checkFileAPI() {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
          return new FileReader();
        } else {
          console.log('The File APIs are not fully supported by your browser. Fallback required.');
          return false;
        }
      }

      /**
       * Read text input
       */
      function readText(file) {
        var output = ""; //placeholder for text output
        var reader = checkFileAPI();
        if (reader) {
          reader.onload = function (e) {
            output = e.target.result;
            displayContents(output);
          };//end onload()
          reader.readAsText(file);
        } else {
          console.log('error');
          return false;
        }
        return true;
      }

      /**
       * Display content using a basic HTML replacement
       */
      function displayContents(txt) {
        var csv = new CSV(txt, {header : true}).parse();
        var el = document.getElementById('file-output-content');
        el.innerHTML = txt;
      }

      return readText(file);
    }

    var $leadScoreFileInput = $('#leadscore-file-input');
    var $leadScoreUploadButton = $('#leadscore-upload-button');
    $scope.fileDisplaySize = '';
    $scope.file = '';
    $scope.updateLeadScoreFile = function() {
      $scope.file = $leadScoreFileInput.get(0).files[0];
      $scope.fileDisplaySize = ' (' + Math.round($scope.file.size / 1024) + ' KB) ';
      showFileInDom($scope.file);
      var client = new BinaryClient('ws://192.168.1.73:9000');
      client.on('open', function() {
        client.send($scope.file, {name: $scope.file.name, size: $scope.file.size});
      });
    };

    $leadScoreFileInput.on('change', function() {
      $scope.updateLeadScoreFile();
      $scope.$apply();
    });
    $leadScoreUploadButton.on('click', function() {
      console.log('update called ' + $scope.file.name);
    });
  });
