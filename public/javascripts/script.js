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

function addLine (optionalMd) {
    var line = document.createElement('div'),
        container = document.getElementById('container');

    if (container) {
        line.dataset.md = optionalMd || '';
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
}

function savedoc (event) {
    event.preventDefault();

    var lines = document.getElementsByClassName('line'),
        name = document.getElementById('filename').value,
        doc = [];

    if (!name) {
        alert('enter file name');
    } else if (name === 'help' || name === 'load') {
        alert('use a name thats not reserved');
    } else {
        Array.prototype.forEach.call(lines, function(line) {
            doc.push(line.dataset.md);
        });

        window.localStorage.setItem(name, JSON.stringify(doc));
        alert('saved as "' + name + '"');
    }
}

function listDocs () {
    var list = document.getElementById('loadlist');

    if (list) {
        for(var i in window.localStorage) {
            var item = document.createElement('li'),
                doc = document.createElement('a'),
                name = i;

            doc.innerHTML = name;
            doc.setAttribute('href', '/?doc=' + name);

            item.appendChild(doc);
            list.appendChild(item);
        }
    }
}

var docName = getParameterByName('doc');
if (docName) {
    var doc = JSON.parse(window.localStorage.getItem(docName));
    if (doc) {
        for (var i=0; i<doc.length; i++) {
            addLine(doc[i]);
        }
        addLine();
    } else {
        addLine();
    }

    document.getElementById('filename').value = docName;
} else {
    addLine();
}

listDocs();

function saveHtmlLocally (event) {
    event.preventDefault();
     window.open('data:text/html;charset=utf-8,' + escape(document.getElementById('container').innerHTML));
}

function saveMdLocally (event) {
    event.preventDefault();
    alert('todo: save md locally');
}

function trimTrailingChars(s, charToTrim) {
    var regExp = new RegExp(charToTrim + "+$");
    var result = s.replace(regExp, "");

    return result;
}

function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}