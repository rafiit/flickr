var flickrController = function(data) {

    this.options = {
        boxClass: '.flickr-content',
        imgSelector: '.flickr-content img',
        storage: []
    };

    this.init = function() {

        if(window.localStorage['liked']) {
            this.options.storage = JSON.parse(window.localStorage['liked']);
        }

        printPhotos();
    };

    var events = function(img) {
        img.addEventListener('click', function() {

            if(hasClass(this, 'active')) {
                removeClass(this, 'active');
                removeLiked(img.src);
            } else {
                addClass(this, 'active');
                addLiked(img.src);
            }

            save();

            return false;
        });
    };

    var printPhotos = function() {
        var box = document.querySelector(this.options.boxClass),
            photos = data.items;

        for(var k in photos) {
            var i = parseInt(k) + 1;

            var div = document.createElement('div');
            div.setAttribute('class', 'col-md-3');

            var img = document.createElement('img');
            img.setAttribute('src', photos[k].media.m);

            var index = this.options.storage.indexOf(photos[k].media.m);

            if(index !== -1) {
                addClass(img, 'active');
            }

            div.appendChild(img);
            box.appendChild(div);

            if((i%4) == 0) {
                var divClear = document.createElement('div');
                divClear.setAttribute('class', 'clearfix');

                box.appendChild(divClear);
            }

            events(img);
        }
    };

    var addLiked = function(url) {
        var index = this.options.storage.indexOf(url);

        if(index === -1) {
            this.options.storage.push(url);
        }
    };

    var removeLiked = function(url) {
        var index = this.options.storage.indexOf(url);

        if(index !== -1) {
            this.options.storage.splice(index, 1);
        }
    };

    var save = function() {
        window.localStorage['liked'] = JSON.stringify(this.options.storage);
    };

    this.init();
};

function hasClass(ele, cls) {
    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(ele, cls) {
    if (!hasClass(ele, cls)) {
        ele.className += " " + cls;
    }
}

function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}