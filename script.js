window.addEventListener('DOMContentLoaded', () => {
    const pageBoxes = document.getElementsByClassName('pagebox');
    for (let i = 0; i < pageBoxes.length; i++) {
        let currentBox = pageBoxes[i]
        let boxLink = document.getElementById('link' + (i+1)).href;
        currentBox.addEventListener('click', function() {
            alert(boxLink);
            window.location.href = boxLink;
        });
    }
    
});

