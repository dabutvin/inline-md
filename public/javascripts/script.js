function Editor(input) {
    this.showMd = function () {
        input.innerHTML = input.dataset.md;
    };

    this.showHtml = function () {
        input.dataset.md = input.innerHTML;
        input.innerHTML = markdown.toHTML(input.innerText);;
    }

    this.keydown = function(event) {
        if (event.which === 13 && event.shiftKey) { // Enter + shift will give you new line
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
        this.innerHTML = trimTrailingChars(this.innerHTML, '<br>');
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

function trimTrailingChars(s, charToTrim) {
    var regExp = new RegExp(charToTrim + "+$");
    var result = s.replace(regExp, "");

    return result;
}