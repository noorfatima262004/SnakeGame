let isSoundOn1 = true; // Flag to track if the sound is on
const musicSound1 = new Audio('music/music.mp3');


    document.getElementById('startGameButton').addEventListener('click', function () {
        document.body.classList.add('slide-in');
        setTimeout(() => {
            window.open('FrontPage.html', '_self'); // Open index.html in the same window
        }, 500); 
    });



    let modal = document.getElementById("rulesModal");

let btn = document.getElementById("rulesButton");

let span = document.getElementsByClassName("close")[0];

// Function to close the modal with shrink animation
function closeModal() {
    var modalContent = document.querySelector('.modal-content');
    modalContent.classList.add('shrink');
    
    // Wait for the shrink animation to complete (0.5s), then hide the modal
    setTimeout(() => {
        modal.style.display = "none";
        modalContent.classList.remove('shrink');
    }, 500); // Duration should match the animation duration in CSS
}

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    closeModal();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}
