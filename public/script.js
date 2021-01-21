'use strict';

const parser = (function() {
    //Cache DOM
    const solutionOutput = document.querySelector('.solution');
    const fileSelector = document.getElementById('files');
    const parseButton = document.querySelector('.parse');
    const statusMessage = document.querySelector('.message');
    const jsonInput = document.querySelector('.left-col textarea');

    //REGISTER EVENT HANDLERS
    document.querySelector('#drop-area p')
        .addEventListener('click', function() {
            //trigger the hidden choose file button
            document.getElementById('files').click();
        });

    //get json through file selection or input
    fileSelector.addEventListener('change', onFileDrop);
    parseButton.addEventListener('click', parseInput);

    function onFileDrop(evt) {
        const file = evt.target.files[0];

        // if file is not JSON
        if (!file.type.includes('json')) {
            showMessage(1, 'Please select a JSON file');
            return false;
        }

        let reader = new FileReader();
        reader.readAsText(file);

        // when content  has been read with  readAsText.
        reader.onload = function(e) {
            let content = e.target.result;

            if (isValidJSON(content)) {
                let obj = JSON.parse(content);
                //given that index.js property is common to all json files 
                 //  {"index.js":"let x = 7...
                showReadableSolution(obj['index.js']);

                copyToClipboard();
            }
        };
    }

    function parseInput(e) {
        e.preventDefault();

        let json = jsonInput.value;

        if (isValidJSON(json)) {
            let obj = JSON.parse(json);
             //given that index.js property is common to all json files 
            //  {"index.js":"let x = 7...
            showReadableSolution(obj['index.js']); 

            copyToClipboard();
        }
    }

    function showReadableSolution(code) {
        solutionOutput.value = code;
    }

    function isValidJSON(str) {
        try {
            JSON.parse(str);
            showMessage(0, 'Valid JSON');
        } catch (e) {
            showMessage(1, 'Please validate your JSON data');
            return false;
        }
        return true;
    }

    function showMessage(type, text = '') {
        let color = { GREEN: 0, RED: 1 };

        if (type === color.RED) statusMessage.style.backgroundColor = '#E5625E';
        else statusMessage.style.backgroundColor = '#58c371';

        statusMessage.textContent = text;
    }

    function copyToClipboard() {
        // Select all contents of a textarea:
        solutionOutput.select();

        try {
            var successful = document.execCommand('copy');
            var msg = successful
                ? 'Copied to Clipboard' 
                : 'Manually Copy the code';
            showMessage(0, msg);
        } catch (err) {
            console.log('Oops, copy to clipboard unsuccessful');
        }
    }
})();
