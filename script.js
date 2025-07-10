const students = [
    { name: 'John Smith', class: '10th Grade', email: 'john.smith@school.edu' },
    { name: 'Emma Johnson', class: '9th Grade', email: 'emma.johnson@school.edu' },
    { name: 'Michael Brown', class: '11th Grade', email: 'michael.brown@school.edu' },
    { name: 'Anshu Khanra', class: '8th Grade', email:'anshu.khanra@shcool.edu'},
    { name: 'Shivansh Saurya', class: '8th Grade', email:'shivansh.saurya@school.edu'}
];

let currentStudent = null;

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`[onclick="showPage('${pageId}')"]`);
    if (activeLink) activeLink.classList.add('active');
}

function fillName(name) {
    document.getElementById('studentName').value = name;
    document.getElementById('loginError').textContent = '';
}

function handleLogin(event) {
    event.preventDefault();
    const name = document.getElementById('studentName').value.trim();
    const errorElement = document.getElementById('loginError');
    
    if (!name) {
        errorElement.textContent = 'Please enter your name.';
        return;
    }
    
    const student = students.find(s => s.name.toLowerCase() === name.toLowerCase());
    
    if (student) {
        currentStudent = student;
        updateUI();
        showNotification('Login successful! Welcome ' + student.name, 'success');
        showPage('home');
        document.getElementById('studentName').value = '';
    } else {
        errorElement.textContent = 'Student not found. Try: John Smith, Emma Johnson, or Michael Brown';
        showNotification('Login failed. Please try again.', 'error');
    }
}

function logout() {
    currentStudent = null;
    updateUI();
    showPage('home');
    showNotification('Logged out successfully', 'success');
}

function updateUI() {
    const loginBtn = document.getElementById('loginBtn');
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');
    
    if (currentStudent) {
        loginBtn.style.display = 'none';
        userInfo.style.display = 'flex';
        userName.textContent = currentStudent.name;
    } else {
        loginBtn.style.display = 'block';
        userInfo.style.display = 'none';
    }
}

function showNotification(message, type) {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed; top: 100px; right: 20px; z-index: 10000;
        background: ${type === 'success' ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.9)'};
        color: white; padding: 1rem 1.5rem; border-radius: 10px;
        backdrop-filter: blur(10px); animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    showPage('home');
    updateUI();
});

const style = document.createElement('style');
style.textContent = '@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }';
document.head.appendChild(style);