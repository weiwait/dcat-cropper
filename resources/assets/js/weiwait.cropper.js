if (!window.weiwait_alpine_loaded) {

    let alpine = document.createElement('script')
    alpine.src = '/vendor/dcat-admin-extensions/weiwait/dcat-cropper/js/weiwait.alpine.js'
    alpine.defer = true
    document.head.append(alpine)

    window.weiwait_alpine_loaded = true
}

function weiwait_cropper() {
    return {
        options: {},
        column: '',
        modalShow: false,
        croppingData: '',
        Cropper: {},
        nextResolve: {},
        images: [],
        value: [],
        pickInput: '',
        currentIndex: false,
        currentDrag: false,
        multiple: true,
        changing: false,
        modeActive: 'crop',
        showPick: true,
        ratios: {},
        currentRatio: '',
        aspectRatio: null,
        accept: 'image/*',
        badImg: false,

        _init(options, column) {
            this.column = column
            this.options = options

            if (this.options?.preview?.length > 0) {
                this.options.preview.forEach(item => {
                    this.images.push(item.url)
                    this.value.push(item.id)
                })
            }

            if (options.dimensions?.ratio) {
                if (options.dimensions?.ratio instanceof Object) {
                    this.ratios = options.dimensions?.ratio
                    this.aspectRatio = Object.values(options.dimensions?.ratio)[0]
                    this.currentRatio = Object.keys(options.dimensions?.ratio)[0]
                } else {
                    this.aspectRatio = options.dimensions?.ratio
                }
            }

        },

        async selected(e) {
            let files = e.target.files

            for (let file of files) {
                await new Promise(resolve => {
                    this.nextResolve = resolve
                    let reader = new FileReader()
                    reader.readAsDataURL(file)
                    reader.onload = ev => {
                        if (this.changing) {
                            if (this.badImg) {
                                this.prepareCropper(ev.target.result, this.currentIndex)
                            } else {
                                this.Cropper.replace(ev.target.result)
                            }
                            this.changing = false
                            this.multiple = true
                        } else {
                            this.prepareCropper(ev.target.result)
                        }
                    }
                })
            }

            this.pickInput = '';
        },

        prepareCropper(imgData, index = false) {
            this.currentIndex = index
            this.croppingData = imgData
            this.modalShow = true

            let img = document.querySelector('#croppingImg-' + this.column)

            new Promise((resolve, reject) => {
                img.onload = () => resolve()
                img.onerror = () => reject()
            }).then(() => {
                if (this.Cropper instanceof Cropper) {
                    this.Cropper.destroy()
                }

                this.Cropper = new Cropper(img, {
                    aspectRatio: this.aspectRatio
                });
            }).catch(() => {
                this.badImg = true
            })
        },

        cropping() {
            let resolution = {}
            if (this.options?.resolution) {
                if (Object.keys(this.ratios).length === 0) {
                    resolution = {
                        width: this.options.resolution.default[0],
                        height: this.options.resolution.default[1],
                    }
                } else {
                    if (this.options.resolution[this.currentRatio]?.length === 2) {
                        resolution = {
                            width: this.options.resolution[this.currentRatio][0],
                            height: this.options.resolution[this.currentRatio][1],
                        }
                    }
                }
            }

            if (false !== this.currentIndex) {
                this.images[this.currentIndex] = this.Cropper.getCroppedCanvas(resolution).toDataURL()
                this.value[this.currentIndex] = this.Cropper.getCroppedCanvas(resolution).toDataURL()
            } else {
                this.images.push(this.Cropper.getCroppedCanvas(resolution).toDataURL())
                this.value.push(this.Cropper.getCroppedCanvas(resolution).toDataURL())
            }

            this.next()
        },

        next() {
            this.modalShow = false
            this.croppingData = false

            if (this.Cropper instanceof Cropper) {
                this.Cropper.destroy()
            }

            setTimeout(() => {
                if (this.nextResolve instanceof Function)
                    this.nextResolve()
            }, 200)
        },

        croppedDragover(index) {
            let current = this.images.splice(this.currentDrag, 1)
            this.images.splice(index, 0, ...current)

            let currentValue = this.value.splice(this.currentDrag, 1)
            this.value.splice(index, 0, ...currentValue)

            this.currentDrag = index
        },

        deleteCropped() {
            this.images.splice(this.currentIndex, 1)
            this.value.splice(this.currentIndex, 1)
            this.modalShow = false
        },

        targetUp() {
            this.Cropper.move(0, -10)
        },

        targetDown() {
            this.Cropper.move(0, 10)
        },

        targetLeft() {
            this.Cropper.move(-10, 0)
        },

        targetRight() {
            this.Cropper.move(10, 0)
        },

        targetChange() {
            this.multiple = false
            this.changing = true
            document.getElementById(`${this.column}-img-input`).click()
        },

        original() {
            if (false !== this.currentIndex) {
                this.images[this.currentIndex] = this.croppingData
                this.value[this.currentIndex] = this.croppingData
            } else {
                this.images.push(this.croppingData)
                this.value.push(this.croppingData)
            }

            this.next()
        },

        changeMode(mode) {
            this.modeActive = mode
            this.Cropper.setDragMode(mode)
        },

        changeRatio(v, k) {
            this.aspectRatio = v;
            this.currentRatio = k;
            this.Cropper.setAspectRatio(v)
        },
    }
}

