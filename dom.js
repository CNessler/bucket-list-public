$(document).ready(function () {
  $('#searchResults').focus(function () {
    alert('HI');
  })
})

function uploadFile() {
  var fd = new FormData();
  fd.append("fileToUpload", document.getElementById('photo').files[0]);
  var xhr = new XMLHttpRequest();
  // xhr.upload.addEventListener("progress", uploadProgress, false);
  // xhr.addEventListener("load", uploadComplete, false);
  // xhr.addEventListener("error", uploadFailed, false);
  // xhr.addEventListener("abort", uploadCanceled, false);
  xhr.open("POST", "http://localhost:3000/api/insert");
  xhr.send(fd);
}
