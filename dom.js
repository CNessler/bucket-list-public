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

// var descriptionDiv = document.getElementsByClassName('item')
// console.log(descriptionDiv.length, 'length');
// console.log(Object.keys(description), 'descriptionDiv');
// var description = document.getElementsByClassName('description');
// console.log(description, "description");
//
// var toggleDescription = function (i) {
//   return function () {
//     console.log(description[i], 'desc');
//     description[i].style.display = (description[i].style.display === 'block' ? 'none' : 'block' );
//   }
// }
//
// for (var i = 0; i < descriptionDiv.length; i++) {
//   console.log('in loop');
//   descriptionDiv[i].addEventListener("click",  toggleDescription(i));
// }
