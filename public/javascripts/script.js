function Editor(input) {
    this.showMd = function () {
        input.innerHTML = input.dataset.md;
    };

    this.showHtml = function () {
        input.dataset.md = input.innerHTML;
        input.innerHTML = markdown.toHTML(input.innerHTML);;
    }

    this.keydown = function(event) {
        if (event.which === 13) { // Enter
            event.preventDefault();
            addLine();
        }
    }

  input.editor = this;
}

function addLine () {
    var line = document.createElement('div'),
        container = document.getElementById('container');

    line.dataset.md = '';
    line.setAttribute('contenteditable', 'plaintext-only');
    line.className = 'line';

    line.onfocus = function () {
        this.className = 'focused line';
        this.editor.showMd();
    };

    line.onblur = function () {
        this.className = 'line';
        this.editor.showHtml();
    };

    line.onkeydown = function () {
        this.editor.keydown(event);
    };

    new Editor(line);

    container.appendChild(line);
    line.focus();
}

addLine();