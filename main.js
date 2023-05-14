console.log('Hello World!');

window.onload = function() {
    var svgContainer = document.getElementById('svg-container');
    var svgInput = document.getElementById('svg-input');
    var convertBtn = document.getElementById('convert-btn');
    var downloadLink = document.getElementById('download-link');

    svgInput.addEventListener('change', function(event) {
        var file = event.target.files[0];
        var reader = new FileReader();

        reader.onload = function(e) {
            var svgContent = e.target.result;
            svgContainer.innerHTML = svgContent;
            convertBtn.disabled = false;
        };

        reader.readAsText(file);
    });

    convertBtn.addEventListener('click', function() {
        var svg = svgContainer.querySelector('svg');
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');

        canvas.width = svg.getAttribute('width');
        canvas.height = svg.getAttribute('height');

        canvg(canvas, svg.outerHTML, {
            ignoreMouse: true,
            ignoreAnimation: true,
            renderCallback: function() {
                var dataURL = canvas.toDataURL('image/png');

                // Muestra la imagen PNG resultante
                var resultImage = new Image();
                resultImage.src = dataURL;
                document.body.appendChild(resultImage);

                // Agrega la descarga del archivo
                downloadLink.href = dataURL;
                downloadLink.style.display = 'inline';
            }
        });
    });
};
