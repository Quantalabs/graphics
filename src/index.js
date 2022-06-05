class Game {
    constructor (canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;

        this.layers = []
        this.images = {}
    }

    addLayer (layer, index) {
        // Delete layer in the same index
        this.layers.splice(index, 1, layer);
    }

    addImage (src, name) {
        if (typeof name != "number") {
            throw new Error("Name must be a number");
        }
        if (this.images[name]) {
            throw new Error("Name already exists");
        }

        // Get image from id (src)
        let image = document.getElementById(src);

        // Add image to images
        this.images[name] = image;
    }

    draw () {
        // Check if all images are loaded
        let loaded = true;
        for (let i in this.images) {
            if (!this.images[i].complete) {
                loaded = false;
            }
        }

        if (loaded) {
            this.layers.forEach(layer => {
                let rowNum = 0;
                layer.forEach(row => {
                    rowNum++;
                    let tileDim = this.width / row.length;
                    for (let i = 0; i < row.length; i++) {
                        let tile = row[i];
                        if (tile != 0) {
                            this.ctx.drawImage(this.images[tile], i * tileDim, rowNum * tileDim, tileDim, tileDim);
                        }
                    }
                })
            })
        }
        else {
            setTimeout(() => {
                this.draw()
            }, 100);
        }
        
    }
}