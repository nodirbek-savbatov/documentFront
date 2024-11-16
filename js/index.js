function showSection(sectionId) {
  document.querySelectorAll('.content-section').forEach((section) => {
    section.classList.remove('active');
  });
  document.getElementById(sectionId).classList.add('active');
}
function toggleNavbar() {
  $('.navbar-collapse').collapse('hide');
}

function fetchFiles() {
  fetch('http://137.184.37.207:8080/documents')
    .then((response) => response.json())
    .then((data) => {
      const fileTableBody = document.getElementById('file-table-body');
      fileTableBody.innerHTML = '';

      data.forEach((file, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <th scope="row">${index + 1}</th>
                    <td><a href="#" onclick="showTeacherDetails(${file.teacher.id})">${file.teacher.full_name}</a></td>
                    <td><a href = "http://137.184.37.207:8080/uploads/${file.file}">${file.name}</a></td>
                `;
        fileTableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error('Error fetching files:', error);
    });
}

function showTeacherDetails(teacherId) {
  console.log(teacherId);
  fetch(`http://137.184.37.207:8080/user/${teacherId}`)
    .then((response) => response.json())
    .then((teacher) => {
      Swal.fire({
        title: `${teacher.full_name}`,
        html: `
                    <p><strong>Email:</strong> ${teacher.email}</p>
                `,
        icon: 'info',
        confirmButtonText: 'Close',
      });
    })
    .catch((error) => {
      console.error('Error fetching teacher details:', error);
      Swal.fire('Error', 'Could not fetch teacher details', 'error');
    });
}

window.onload = fetchFiles;
document
  .getElementById('settingsForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const newName = document.getElementById('settingOption1').value;
    const userId = 2;

    if (!userId) {
      Swal.fire({
        title: 'Error',
        text: 'User ID not found in localStorage',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (!newName) {
      Swal.fire({
        title: 'Error',
        text: 'Please enter a new name',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    fetch(`http://127.0.0.1:8080/user/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full_name: newName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          Swal.fire({
            title: 'Success',
            text: 'Name updated successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Failed to update name',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      })
      .catch((error) => {
        console.error('Error updating name:', error);

        Swal.fire({
          title: 'Error',
          text: 'An error occurred while updating the name',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  });
