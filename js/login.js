const container = document.querySelector('.container');
const LoginLink = document.querySelector('.SignInLink');
const RegisterLink = document.querySelector('.SignUpLink');

RegisterLink.addEventListener('click', () =>{
    container.classList.add('active');
})

LoginLink.addEventListener('click', () => {
    container.classList.remove('active');
})



document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    try {
        const response = await fetch('http://137.184.37.207:8080/auth/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }

        const data = await response.json();
        Swal.fire('Success', 'Login successful!', 'success');
        if(data.user.role === 'admin') {
            localStorage.setItem("userId",data.user.id)
            localStorage.setItem("accesToken",data.access_token)
            localStorage.setItem("refreshToken",data.refresh_token)
            localStorage.setItem("role",data.user.role)
            localStorage.setItem("username", data.user.full_name)
            window.location.href = "admin.html"
        } else if (data.user.role === 'student'){
            localStorage.setItem("userId",data.user.id)
            localStorage.setItem("accesToken",data.access_token)
            localStorage.setItem("refreshToken",data.refresh_token)
            localStorage.setItem("role",data.user.role)
            localStorage.setItem("username", data.user.full_name)
            window.location.href = "student.html"
        } else if(data.user.role === 'teacher'){
            localStorage.setItem("userId",data.user.id)
            localStorage.setItem("accesToken",data.access_token)
            localStorage.setItem("refreshToken",data.refresh_token)
            localStorage.setItem("role",data.user.role)
            localStorage.setItem("username", data.user.full_name)
            window.location.href = "teacher.html"
        }
        console.log('Login successful:', data);


    } catch (error) {
        Swal.fire('Login Error', error.message, 'error');
        console.error('Error during login:', error);
    }
});


document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('http://137.184.37.207:8080/auth/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const data = await response.json();
          if (data.user.role === 'student'){
                localStorage.setItem("userId",data.user.id)
                localStorage.setItem("accesToken",data.access_token)
                localStorage.setItem("refreshToken",data.refresh_token)
                localStorage.setItem("role",data.user.role)
                localStorage.setItem("username", data.user.full_name)
                window.location.href = "student.html"
            } 
   
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message || 'Registration failed.'}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again later.');
    }
});

