if (! window.weiwait_alpine_loaded) {
    window.weiwait_alpine_loaded = true

    let alpine = document.createElement('script')
    alpine.src = '/vendor/dcat-admin-extensions/weiwait/dcat-cropper/js/weiwait.alpine.js'
    alpine.defer = true

    alpine.onerror = () => {
        window.weiwait_alpine_loaded = false
        throw new Error('Alpine js 加载失败')
    }

    document.head.append(alpine)
}

class CropperImage {
    id = Number
    uri = String
    preview = String

    constructor(uri, preview = null) {
        this.id = Math.random() * 10000 | 0
        this.uri = uri
        this.preview =  preview ? preview : uri
    }
}

class CropperHttp {
    constructor() {
        this.xml = new XMLHttpRequest()
    }

    post(url, data = {}) {
        const fd = new FormData
        Object.keys(data).forEach(key => {
            fd.append(key, data[key])
        })

        return this.send('POST', url, fd)
    }

    send(method, url, data = null) {
        return new Promise((resolve => {
            this.xml.onreadystatechange = () => {
                if (this.xml.DONE === this.xml.readyState &&  200 === this.xml.status) {
                    resolve(JSON.parse(this.xml.responseText))
                }
            }

            this.xml.open(method, url)

            if (data instanceof FormData) {
                data.append('_token', Dcat.token)
            }
            this.xml.send(data)
        }))
    }
}

function weiwait_cropper() {
    return {
        options: {
            resolution: {
                default: []
            },
            useBase64: false,
            quality: null,
            croppingUrl: '',
        },
        column: '',
        modalShow: false,
        croppingData: '',
        Cropper: {},
        nextResolve: {},
        images: [],
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
        http: Object,
        currentFile: File,
        is_cropping: false,
        croppingImageElement: null,
        currentCropperImage: CropperImage,

        _init(options, column) {
            this.column = column
            this.options = options

            if (this.options?.preview?.length > 0) {
                this.options.preview.forEach(item => {
                    this.images.push(new CropperImage(item.id, item.url))
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

            this.croppingImageElement = document.querySelector('#croppingImg-' + this.column)
        },

        async selected(e) {
            let files = e.target.files

            for (let file of files) {
                this.currentFile = file

                if (! this.changing && this.images.length >= this.options.fileNumLimit) {
                    Dcat.warning('文件数限制：' + this.options.fileNumLimit)
                    this.next()
                    break
                }

                await new Promise(resolve => {
                    this.nextResolve = resolve
                    let reader = new FileReader()
                    reader.readAsDataURL(file)
                    reader.onload = ev => {
                        const image = new CropperImage(ev.target.result)

                        if (this.changing) {
                            if (this.badImg) {
                                this.prepareCropper(image, this.currentIndex)
                            } else {
                                this.currentCropperImage = image
                                this.Cropper.replace(image.preview)
                            }
                            this.changing = false
                            this.multiple = true
                        } else {
                            this.prepareCropper(image)
                        }
                    }
                })
            }

            this.pickInput = '';
        },

        prepareCropper(cropperImage, index = false) {
            new Promise((resolve, reject) => {
                this.croppingImageElement.onload = () => resolve()
                this.croppingImageElement.onerror = () => reject()

                this.currentCropperImage = cropperImage
                this.currentIndex = index
                this.croppingData = cropperImage.preview
                this.modalShow = true
            }).then(() => {
                if (this.Cropper instanceof Cropper) {
                    this.Cropper.destroy()
                }

                this.Cropper = new Cropper(this.croppingImageElement, {
                    aspectRatio: this.aspectRatio
                });
            }).catch(() => {
                this.badImg = true
            })
        },

        cropping() {
            this.is_cropping = true
            const resolution = this.resolveResolution()

            const type = parseFloat(this.options.quality) > 0 ? 'image/jpeg' : 'image/png';

            const croppedDataUrl = this.Cropper.getCroppedCanvas(resolution).toDataURL(type, this.options.quality)

            const image = new CropperImage(croppedDataUrl, croppedDataUrl)
            this.currentCropperImage = image

            if ('number' === typeof this.currentIndex) {
                this.images[this.currentIndex] = image
            } else {
                this.currentIndex = this.images.push(image) - 1
            }

            if (! this.options.useBase64) {
                ((id, type, quality) => {
                    this.Cropper.getCroppedCanvas(resolution).toBlob(blob => {
                        new CropperHttp().post(this.options.croppingUrl, {file: blob}).then(res => {
                            const i = this.images.findIndex(item => item.id === id)

                            this.images[i] = new CropperImage(res.name, res.url)
                        })
                    }, type, quality)
                })(image.id, type, this.options.quality)
            }

            this.next()
        },

        resolveResolution() {
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

            return resolution
        },

        next() {
            this.modalShow = false
            this.croppingData = false
            this.currentFile = null
            this.is_cropping = false

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

            this.currentDrag = index
        },

        deleteCropped() {
            this.images.splice(this.currentIndex, 1)
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

        async original() {
            this.is_cropping = true

            if (false !== this.currentIndex) {
                this.images[this.currentIndex] = this.currentCropperImage
            } else {
                this.currentIndex = this.images.push(this.currentCropperImage) - 1
            }

            if (! this.options.useBase64 && this.currentFile) {
                ((id, file) => {
                    new CropperHttp().post(this.options.croppingUrl, {file}).then(res => {
                        const i = this.images.findIndex(item => item.id === id)

                        this.images[i] = new CropperImage(res.name, res.url)
                    })
                })(this.currentCropperImage.id, this.currentFile)
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
