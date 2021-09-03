# Dcat Admin Extension

### 演示地址
[demo: http://dcat.weiwait.cn (admin:admin)](http://dcat.weiwait.cn/admin/demo-distpickers/create 'user: admin psw: admin')

### 通过 composer 安装扩展
```shell
  composer require weiwait/dcat-cropper
```
### 发布静态资源
```shell
  php artisan vendor:publish --tag=weiwait.dcat-cropper
```

 ### 更新 dcat-admin ide-helper
```shell
  php artisan admin:ide-helper
```

```php
    $form->cropper('column', 'label')
        ->ratio(16/9) // 快捷裁剪选项配置（裁剪比率）
        ->options([
            // https://github.com/fengyuanchen/cropperjs
            // 裁剪选项
            'cropper' => [
                'aspectRatio' = 16/9,
                'background' => false,
            ]   
        ])
```

![示例图片](https://github.com/weiwait/images/blob/main/dcat-cropper.png?raw=true)

### Donate
![示例图片](https://github.com/weiwait/images/blob/main/donate.png?raw=true)

### Dcat-admin 扩展列表
1. [单图裁剪](https://github.com/weiwait/dcat-cropper)
2. [区划级联+坐标拾取](https://github.com/weiwait/dcat-cropper)
3. [smtp快速便捷配置](https://github.com/weiwait/dcat-smtp)
