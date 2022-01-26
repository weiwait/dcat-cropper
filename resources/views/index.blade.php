<div class="{{$viewClass['form-group']}} {{ $class }}">

    <label for="{{$column}}" class="{{$viewClass['label']}} control-label">{!! $label !!}</label>

    <div class="{{$viewClass['field']}}">
        @include('admin::form.error')

        <div class="web-uploader clearfix {{ $fileType }}">
            <label id="{{$column}}-img-pick" style="display: none;">
                <div class="img-thumbnail"
                     style="width: 200px; height: 200px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                    <span style="font-size: 100px; color: #a6a6a6">+</span>
                </div>

                <input id="{{ $name }}-file-input" type="file" style="display: none"/>
                <input name="{{ $name }}" value="{{$value ?? ''}}" type="hidden"/>
            </label>

            <div class="img-thumbnail"
                 style="cursor: pointer; float: left; display: none;"
                 id="{{$column}}-img-preview">
                <img
                    src="" style="max-height: 200px; min-height: 100px; min-width: 100px;">
            </div>
        </div>

        @include('admin::form.help-block')
    </div>
</div>

<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="{{$column}}-cropper-modal2"
     id="{{$column}}-cropper-modal2">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">图片裁剪</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                        onclick="$('#{{$column}}-cropper-modal2').modal('hide')"><span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div style="height: 405px;" id="{{$column}}-cropper-container">
                    <img src="" alt="" style="display: none;">
                </div>
            </div>
            <div class="modal-footer">
                <div class="btn-group cropper-btn-group" role="group" aria-label="..." style="margin: 0 0 0 20px">
                    <button type="button" class="btn btn-info" data-mode="move">
                        <span class="fa fa-arrows-alt"></span>
                    </button>
                    <button type="button" class="btn btn-info active" data-mode="crop">
                        <span class="fa fa-crop" aria-hidden="true"></span>
                    </button>
                </div>
                <div class="btn-group" role="group" aria-label="..." style="margin: 0 0 0 10px">
                    <button type="button" class="btn btn-info cropper-up">↑</button>
                    <button type="button" class="btn btn-info cropper-down">↓</button>
                    <button type="button" class="btn btn-info cropper-left">←</button>
                    <button type="button" class="btn btn-info cropper-right">→</button>
                    <button type="button" class="btn btn-info cropper-clear">清空</button>
                    <button type="button" class="btn btn-info cropper-change">更换</button>
                </div>

                <div class="btn-group" role="group" aria-label="..." style="margin: 0 0 0 10px">
                    <button type="button" class="btn btn-info cropper-original">原图</button>
                    <button type="button" class="btn btn-info cropper-cropping">裁剪</button>
                </div>

                <div class="dropdown" id="{{$column}}-cropper-ratios">
                    <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
                        比例
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script require="@weiwait.dcat-cropper" init="{!! $selector !!}">
    (function (w, $) {
        new (class {
            options = {!! $options !!};
            cropper = false;
            imgData;
            is_modal = false;
            cropperInput;
            modal;
            container;
            preview;
            dimensions = {};
            ratios = {};

            constructor() {
                this.cropperInput = $("#{{$name}}-file-input");
                this.modal = $('#{{$column}}-cropper-modal2');
                this.container = $('#{{$column}}-cropper-container');
                this.preview = $('#{{$column}}-img-preview');

                this.dimensions = {
                    ...this.options.cropper,
                    aspectRatio: this.resoleRatio(this.options.dimensions?.ratio),
                }

                if (this.options?.preview?.length > 0) {
                    this.preview.show() // 显示预览图片

                    this.preview.find('img').attr('src', this.options.preview[0].url)
                } else {
                    $('#{{$column}}-img-pick').show() // 显示上传框
                }

                this.preview.on('click', e => {
                    this.imgData = $(e.currentTarget).find('img').attr('src');

                    if (this.cropper instanceof Cropper) {
                        this.cropper.destroy();
                    }

                    this.is_modal ? this.cropping() : this.modal.modal('show')
                });

                this.modal.on('shown.bs.modal', () => {
                    this.is_modal = true;

                    if (this.cropper instanceof Cropper) {
                        this.cropper.destroy();
                    }

                    this.cropping()
                })

                this.modal.on('hide.bs.modal', () => {
                    this.is_modal = false;

                    if (this.cropper instanceof Cropper) {
                        this.cropper.destroy()
                    }
                })

                this.cropperInput.change(e => {
                    if (!e.currentTarget.value) return false;

                    let img = e.currentTarget.files[0]
                    let reader = new FileReader();
                    reader.readAsDataURL(img)
                    reader.onload = ev => {
                        this.imgData = ev.target.result;

                        if (this.cropper instanceof Cropper) {
                            this.cropper.destroy();
                        }

                        this.is_modal ? this.cropping() : this.modal.modal('show')
                    }
                })
            }

            resoleRatio(ratio) {
                if (!ratio) {
                    return null
                }

                if (ratio instanceof Object) {
                    this.ratios = ratio

                    $('#{{$column}}-cropper-ratios').show()
                    $('#{{$column}}-cropper-ratios button').text(Object.keys(ratio)[0])

                    Object.keys(ratio).forEach(key => {
                        $('#{{$column}}-cropper-ratios .dropdown-menu').append(`
                            <div class="dropdown-item" style="padding: 5px 10px">${key}</div>
                        `)
                    })

                    $('#{{$column}}-cropper-ratios .dropdown-item').click(e => {
                        this.dimensions.aspectRatio = this.ratios[$(e.target).text().trim()]
                        $('#{{$column}}-cropper-ratios button').text($(e.target).text().trim())

                        this.cropper.setAspectRatio(this.dimensions.aspectRatio)
                    })

                    return Object.values(ratio)[0]
                }

                $('#{{$column}}-cropper-ratios').hide()
                return ratio
            }

            cropping () {
                let $this = this;
                let img = document.createElement('img');

                this.container.empty();
                this.container.html(img);

                let cropperImg = $('#{{$column}}-cropper-container img');
                cropperImg.hide();
                cropperImg.attr('src', this.imgData);

                if (this.cropper instanceof Cropper) {
                    this.cropper.destroy();
                }

                new Promise((resolve, reject) => {
                    cropperImg[0].onload = () => resolve()
                    cropperImg[0].onerror = () => reject()
                }).then(() => {
                    this.cropper = new Cropper(cropperImg[0], {
                        ...this.dimensions,
                        ready() {
                            $('.cropper-btn-group button').off('click').click(e => {
                                let current = $(e.currentTarget);
                                current.addClass('active')
                                current.siblings('button').removeClass('active')

                                $this.cropper.setDragMode(current.data('mode'))
                            })

                            $('.cropper-up').off('click').click(() => {
                                $this.cropper.move(0, -10)
                            })

                            $('.cropper-down').off('click').click(() => {
                                $this.cropper.move(0, 10)
                            })

                            $('.cropper-left').off('click').click(() => {
                                $this.cropper.move(-10, 0)
                            })

                            $('.cropper-right').off('click').click(() => {
                                $this.cropper.move(10, 0)
                            })

                            $('.cropper-clear').off('click').click(() => {
                                $('#{{$column}}-img-preview img').attr('src', '');
                                $('#{{$column}}-img-preview').hide();
                                $('#{{$column}}-img-pick').show()

                                $this.modal.modal('hide')
                            })

                            $('.cropper-change').off('click').click(() => {
                                $this.cropperInput.click()
                            })

                            $('.cropper-original').off('click').click(() => {
                                $('#{{$column}}-img-preview img').attr('src', $this.imgData);
                                $('#{{$column}}-img-pick').hide()
                                $('#{{$column}}-img-preview').show()

                                $('input[name="{{$name}}"]').val($this.imgData)

                                $this.modal.modal('hide')
                            })

                            $('.cropper-cropping').off('click').click(() => {
                                let resolution = {}
                                if ($this.options.resolution) {
                                    if (Object.keys($this.ratios).length === 0) {
                                        resolution = {
                                            width: $this.options.resolution.default[0],
                                            height: $this.options.resolution.default[1],
                                        }
                                    } else {
                                        let currentRatio = $('#{{$column}}-cropper-ratios button').text().trim()

                                        if ($this.options.resolution[currentRatio]?.length === 2) {
                                            resolution = {
                                                width: $this.options.resolution[currentRatio][0],
                                                height: $this.options.resolution[currentRatio][1],
                                            }
                                        }
                                    }
                                }

                                let img = $this.cropper.getCroppedCanvas(resolution).toDataURL()
                                $('#{{$column}}-img-preview img').attr('src', img);
                                $('#{{$column}}-img-pick').hide()
                                $('#{{$column}}-img-preview').show()

                                $('input[name="{{$name}}"]').val(img)

                                $this.modal.modal('hide')
                            })
                        }
                    })
                }).catch(() => {
                    Dcat.confirm('图片加载失败', '是否更换图片？', ()=>this.cropperInput.click(), ()=>this.modal.modal('hide'))
                })
            }
        })();
    })(window, jQuery);
</script>
