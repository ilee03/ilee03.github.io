document.addEventListener('DOMContentLoaded', function() {
    const text = document.getElementById('text');
    const colors = ['#ff6347', '#4682b4', '#32cd32', '#ba55d3', '#ffd700']; // Array of colors for text

    const words = text.innerText.trim().split(/\s+/); // Trim and split text into words

    text.innerHTML = ''; // Clear existing content

    words.forEach(word => {
        const span = document.createElement('span');
        span.textContent = word;
        text.appendChild(span);
        text.appendChild(document.createElement('br')); // Add line break after each word
        
        span.addEventListener('mouseover', function() {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            span.style.color = randomColor;
        });

        span.addEventListener('mouseleave', function() {
            span.style.color = '#000'; // Black color
        });
    });


    // Hide mouse cursor
    document.documentElement.style.cursor = 'none'; // Apply to the html element

    function createShape(x, y) {
        const shape = document.createElement('div');
        shape.classList.add('shape');
        const shapeType = Math.floor(Math.random() * 3); // Randomly choose between 0, 1, or 2 (for circle, square, or ellipse respectively)
        switch (shapeType) {
            case 0:
                shape.classList.add('circle');
                break;
            case 1:
                shape.classList.add('square');
                break;
            case 2:
                shape.classList.add('ellipse');
                break;
        }
        shape.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        shape.style.left = x + 'px';
        shape.style.top = y + 'px';
        document.body.appendChild(shape);
        setTimeout(() => {
            shape.style.opacity = 0; // Fade out the shape
            setTimeout(() => {
                shape.remove();
            }, 500); // Remove shape after fading out
        }, 500); // Fade out after 500ms
    }

    document.addEventListener('mousemove', function(event) {
        const numShapes = 10; // Number of shapes to create
        const spread = 100; // Spread of shapes around cursor
        for (let i = 0; i < numShapes; i++) {
            const offsetX = (Math.random() * spread - spread / 2) + event.pageX;
            const offsetY = (Math.random() * spread - spread / 2) + event.pageY;
            const delay = Math.random() * 1000; // Random delay up to 1000ms
            setTimeout(() => {
                createShape(offsetX, offsetY);
            }, delay);
        }
    });
});
