
document.getElementById('emailForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const loadingDiv = document.querySelector('.loading');
    const responseDiv = document.querySelector('.response');

    // Add additional data to FormData
    formData.append(item_name,item_price,item_quantity); // Add 'apple' or any other value

    // Clear previous messages and show loading
    responseDiv.textContent = '';
    loadingDiv.style.display = 'block';

    fetch('getInfo.php', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        loadingDiv.style.display = 'none'; // Hide loading
        if (data.status === 'success') {
            responseDiv.style.color = 'green';
        } else {
            responseDiv.style.color = 'red';
        }
        responseDiv.textContent = data.message;
        form.reset(); // Optional: Reset form after submission
    })
    .catch(error => {
        loadingDiv.style.display = 'none'; // Hide loading
        console.error('Error:', error);
        responseDiv.textContent = 'An error occurred while sending the message.';
        responseDiv.style.color = 'red';
    });
});
