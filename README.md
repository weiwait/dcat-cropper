# Dcat Admin Extension

### 演示地址
[demo: http://dcat.weiwait.cn (admin:admin)](http://dcat.weiwait.cn/admin/demo-distpickers/create 'user: admin psw: admin')

### 通过 composer 安装扩展
```shell
  composer require weiwait/dcat-cropper
```
### 发布静态资源
```shell
  php artisan vendor:publish --tag=weiwait.dcat-cropper --force
```

 ### 更新 dcat-admin ide-helper
```shell
  php artisan admin:ide-helper
```

```php
    $form->cropper('column', 'label')
        ->jpeg(0.5) // 0 ~ 1
        ->useBase64() // 采用base64编码图片统一提交
        ->ratio(16/9) // 快捷裁剪选项配置（裁剪比率）
        ->resolution(1920, 1080)
        ->ratio(1)
        ->resolution(100) // 等比
        ->ratio(['1:1' => 1, '16:9' => 16/9, '自定义' => null]) // 多预设
        ->resolution(['1:1' => [300, 300], '16:9' => [1920, 1080]])
        ->options([
            // https://github.com/fengyuanchen/cropperjs
            // 裁剪选项
            'cropper' => [
                'aspectRatio' = 16/9,
                'background' => false,
            ]   
        ])
    
    $form->multipleCropper('column', 'label')
        ->limit(5) // 默认为框架默认值10
        ->ratio(16/9) // 快捷裁剪选项配置（裁剪比率）
        ->resolution(1920, 1080)
        ->ratio(1)
        ->resolution(100) // 等比
        ->ratio(['1:1' => 1, '16:9' => 16/9, '自定义' => null]) // 多预设
        ->resolution(['1:1' => [300, 300], '16:9' => [1920, 1080]])
        ->options([
            // https://github.com/fengyuanchen/cropperjs
            // 裁剪选项
            'cropper' => [
                'aspectRatio' = 16/9,
                'background' => false,
            ]   
        ])
        ->accept('png')
        ->compress() // intervention/image 功能（dcat）
```

![示例图片](https://github.com/weiwait/images/blob/main/dcat-cropper.png?raw=true)

[comment]: <> (### Donate)

[comment]: <> (![示例图片]&#40;https://github.com/weiwait/images/blob/main/donate.png?raw=true&#41;)

### Dcat-admin 扩展列表
1. [单图裁剪](https://github.com/weiwait/dcat-cropper)
2. [区划级联+坐标拾取](https://github.com/weiwait/dcat-distpicker)
3. [smtp快速便捷配置](https://github.com/weiwait/dcat-smtp)
4. [sms channel 快速便捷配置](https://github.com/weiwait/dcat-easy-sms)
